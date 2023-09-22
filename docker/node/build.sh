#!/bin/sh

NODE_VERSION=16.17.1
YARN_VERSION=1.22.19

export NODE_VERSION
export YARN_VERSION

docker build . -t us-central1-docker.pkg.dev/gated-inc-prod/docker/node:$NODE_VERSION
