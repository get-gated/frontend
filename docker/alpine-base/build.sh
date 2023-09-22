#!/bin/sh

ALPINE_VERSION=3.16.2
docker build . -t us-central1-docker.pkg.dev/gated-inc-prod/docker/alpine-base:$ALPINE_VERSION
