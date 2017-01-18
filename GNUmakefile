all: install test

install:
	npm i
	npm run bootstrap

test: install
	npm run lint
	npm run coverage -- --silent

deploy: install
	npm run site:release
	npm run site:deploy

release: install
	npm run all

.PHONY: install test deploy release
