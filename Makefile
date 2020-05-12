start_server:
	@node --inspect=0.0.0.0:9229 ./bin/dev

dev_server:
	@node_modules/.bin/nodemon --exec "make start_server || exit 1"

