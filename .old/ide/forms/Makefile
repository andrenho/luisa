SRC = $(wildcard *.ui)
DEST = ${SRC:.ui=.py}

%.py : %.ui
	pyuic5 -x $^ -o $@

all: ${DEST}

clean:
	rm ${DEST}
