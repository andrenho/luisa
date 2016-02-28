SRC = $(wildcard src/tinyvm/*.js src/page/*.js)
LIB = $(SRC:src/tinyvm/%.js=lib/tinyvm/%.js) \
      $(SRC:src/page/%.js=lib/page/%.js)

lib: $(LIB)
lib/%.js: src/%.js
	babel $< -o $@
