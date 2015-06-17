psc_deps := $(shell find jspm_packages -name *.purs)

all:: build

build: purescript

purescript:
	@psc $(psc_deps) src/Squared/Main.purs --output lib/generated.js --module Squared.Main
