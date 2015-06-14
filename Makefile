all:: build

build: purescript

purescript:
	psc src/Squared/Main.purs > lib/generated.js
