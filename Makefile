TARGETS=src/emu/chars.js src/emu/bioscode.js

ifeq ($(OS),Windows_NT)
	LUA = ./lua53.exe
endif

all: ${TARGETS}

src/emu/chars.js: src/data/font.png
	${LUA} tools/genchars $< 127 > $@

src/emu/bioscode.js: host/bios.rom
	${LUA} tools/genbios $< > $@

host/bios.rom: host/bios/bios.s
	${LUA} tools/assembler -b 0xf0006010 $^ > $@

clean:
	rm -f ${TARGETS} host/bios.rom
