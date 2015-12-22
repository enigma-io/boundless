all: install check

check:
	npm run lint
	npm run test

deploy: install
	npm run site:release
	npm run site:deploy

install:
	npm i

release: install
	npm run all
