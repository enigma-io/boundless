all: install test

install:
	npm i

test: install
	npm run lint
	npm run coverage

deploy: install
	npm run site:release
	npm run site:deploy

release: install
	npm run all

.PHONY: install test deploy release
