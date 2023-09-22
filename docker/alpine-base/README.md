# Alpine Base

alpine image intended to be used as a base for other images at Gated.

## Goals
- Provide a common base image to build apps on.
- Support a common non-root, `gated`, user for app containers to run with.
- Be as lightweight as possible. Do not bloat this image with extra
  utilities.


This includes [gosu](https://github.com/tianon/gosu), a utility that
operates like `su` or `sudo` but avoids some of the problems encountered
with those commands when running in containerized environments.
