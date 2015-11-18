all: install check

check:
	npm run test

install:
	npm i

release: install
	npm run all
