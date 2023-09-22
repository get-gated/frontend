import { useAtom, useSetAtom } from 'jotai';
import { Action, actionAtom, dataAtom } from '../../store';
import Challenge from '@components/views/challenge.view';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Sandbox() {
  const [data, setData] = useAtom(dataAtom);
  const setAction = useSetAtom(actionAtom);
  const router = useRouter();
  const action = router.query.action as Action;
  const thankyou = router.query.thankyou as string;

  useEffect(() => {
    setAction(action || Action.Donate);
    setData({
      firstName: 'Jennifer',
      lastName: 'Smith',
      fullName: 'Jennifer Smith',
      avatar:
        'https://dvyvvujm9h0uq.cloudfront.net/com/articles/1567147770-231381-headshot5jpg.jpg',
      minimumDonationInCents: 200,
      isActive: true,
      hasDonation: !!thankyou && action === Action.Donate,
      hasExpected: !!thankyou && action === Action.Bypass,
      nonprofitName: 'Save The Whales',
      nonprofitArt: '',
      senderEmail: 'sender@domain.com',
      donationAmountInCents: null,
      referralCode: 'XXXX',
    });
  }, [action, thankyou, setAction, setData]);
  if (!data) return null;
  return <Challenge />;
}
