import React, { useEffect, useState } from 'react';
import { AnalyticsContext, IAnalyticsContext } from './analytics.context';
import * as snippet from '@segment/snippet';
import { useRouter } from 'next/router';
import { useApp } from '../app/use-app.hook';
import { useAuth } from '../auth/use-auth.hook';
import Script from 'next/script';
import nookies from 'nookies';

declare global {
  interface Window {
    analytics: any;
    FS: any;
  }
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({
  children,
  ...rest
}: AnalyticsProviderProps) {
  const router = useRouter();
  const { config, appName } = useApp();
  const { userId } = useAuth();

  const [script, setScript] = useState('');

  useEffect(() => {
    const handleRouteChange = () => {
      window.analytics?.page(appName);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (!config) return;
    const opts = {
      apiKey: config.analytics.segmentWriteKey,
      page: true,
    };
    if (config.env === 'production') {
      setScript(snippet.min(opts));
    } else {
      setScript(snippet.max(opts));
    }
  }, [config]);

  useEffect(() => {
    if (!userId) return;
    identify();
  }, [userId]);

  useEffect(() => {
    const params = new URL(location.href).searchParams;
    const gatedChannel = params.get('utm_channel');
    const ref = params.get('ref');

    if (ref) {
      const expires = new Date();
      expires.setMonth(expires.getMonth() + 1);
      nookies.set(undefined, 'referral-code', ref, {
        expires,
        path: '/',
      });
    }

    if (gatedChannel) {
      track('product_visitor', { gatedChannel });
    }

    params.delete('ref');
    params.delete('utm_channel');
    params.delete('utm_medium');
    params.delete('utm_campaign');
    params.delete('utm_content');

    const newParams = params.toString().length ? `?${params.toString()}` : '';
    const { protocol, host, pathname, hash } = window.location;
    const newUrl = `${protocol}//${host}${pathname}${newParams}${hash}`;

    router.replace(newUrl);
  }, []);

  const page = (pageName: string, properties: { [key: string]: any }) => {
    if (typeof window === 'undefined') return;
    if (!window.analytics) {
      return setTimeout(() => page(pageName, properties), 500);
    }
    window.analytics.page({ name: pageName, ...properties });
  };

  const identify = (traits?: [key: string]) => {
    window.analytics?.identify(userId, traits);
  };

  const track = async (
    event: string,
    attributes: { [key: string]: string },
  ) => {
    await new Promise((resolve) => {
      let hasResolved = false;
      const doResolve = () => {
        if (hasResolved) return;
        hasResolved = true;
        resolve(null);
      };

      if (!window.analytics) {
        return setTimeout(() => track(event, attributes), 200);
      }
      setTimeout(doResolve, 200);

      window.analytics?.track(event, attributes, doResolve);
    });
  };

  const value: IAnalyticsContext = { script, track, page, identify };

  return (
    <AnalyticsContext.Provider value={value} {...rest}>
      {script && (
        <Script id="segment" strategy="afterInteractive">
          {script}
        </Script>
      )}
      <Script id="fullstory" strategy="afterInteractive">
        {`
        window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
        window['_fs_org'] = '184H2X';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
        if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
        g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
        o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
        y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
        g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
        g.anonymize=function(){g.identify(!!0)};
        g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
        g.log = function(a,b){g("log",[a,b])};
        g.consent=function(a){g("consent",!arguments.length||a)};
        g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
        g.clearUserCookie=function(){};
        g.setVars=function(n, p){g('setVars',[n,p]);};
        g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
        if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
        g._v="1.3.0";
        })(window,document,window['_fs_namespace'],'script','user');
        `}
      </Script>
      {children}
    </AnalyticsContext.Provider>
  );
}
