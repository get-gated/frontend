#!/bin/sh
yarn start &
nginx -g 'daemon off;'
