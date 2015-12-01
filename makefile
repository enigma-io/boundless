all: install check

check:
	npm run test

deploy: install
	npm run site_release

install:
	npm i

release: install
	npm run all
