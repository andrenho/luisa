TARGETS=src/emu/chars.js src/emu/bioscode.js

all: ${TARGETS}

src/emu/chars.js: src/data/font.png
	tools/genchars $< > $@

src/emu/bioscode.js: host/bios.rom
	tools/genbios $< > $@

host/bios.rom: host/bios/bios.ls
	tools/assembler $^ > $@

clean:
	rm -f ${TARGETS} host/bios.rom
