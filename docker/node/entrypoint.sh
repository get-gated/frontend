#!/bin/ash

# Add node as command if needed
if [ "${1:0:1}" = '-' ]; then
	set -- node "$@"
fi

# Drop root privileges if we are running node related commands
# allows the container to be started with `--user`
if [ "$1" = 'node' -o "$1" = 'npm' -o "$1" = "yarn" -o "$1" = "next" -o "$1" = "pnpm" -o "$1" = "npx" ] && [ "$(id -u)" = '0' ]; then
	set -- gosu gated "$@"
fi

# Run the user command
exec "$@"
