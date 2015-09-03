#
# source
#
SRC = tinycpu1.c


#
# compilation options
#





.DEFAULT_GOAL = testbox

#
# sources
# 

SRC=$(filter-out physics/testbox.cc, $(wildcard physics/*.cc))	\
    $(filter-out game/testbox.cc, $(wildcard game/*.cc))	\
    $(filter-out geo/testbox.cc, $(wildcard geo/*.cc))

SRC_TESTBOX = $(filter-out g2d/testbox.cc, $(wildcard g2d/*.cc))	\
	      $(filter-out gui2d/testbox.cc, $(wildcard gui2d/*.cc))	\
	      testbox.cc

#
# compilation options
#

# libraries
ifneq (${OS},Windows_NT)
  CPPFLAGS += `pkg-config --cflags sdl2 SDL2_ttf`
  LDFLAGS += `pkg-config --libs sdl2 SDL2_ttf` -lBox2D
else
  #SHELL=C:/Windows/System32/cmd.exe
  CPPFLAGS += -isystem windows/include
  LDFLAGS += -Lwindows/lib -lSDL2 -lSDL2_gfx_dll -lSDL2_ttf -lBox2D
endif

# header directories
CPPFLAGS += -I.

# default compilation options
CPPFLAGS += -fdiagnostics-color=always -pipe -std=c++14 -DVERSION=${VERSION} -DDATADIR=\"../data\" -MMD -MP

# add debugging
ifeq (${DEBUG},1)
  CPPFLAGS += -g3 -ggdb -DDEBUG
else
  LUACFLAGS += -s
endif

# add sanitization
ifeq (${SANITIZE},1)
  CPPFLAGS += -fsanitize=address,undefined,shift,integer-divide-by-zero,unreachable,vla-bound,null,return,signed-integer-overflow,bounds,alignment,object-size,float-divide-by-zero,float-cast-overflow,nonnull-attribute,returns-nonnull-attribute,bool,enum,vptr
  ifeq (${CXX},clang++)
    CPPFLAGS += -fsanitize=integer#,memory,safe-stack
  endif
endif

# add optimization
ifeq (${OPTIMIZE},1)
  CPPFLAGS += -Ofast -fomit-frame-pointer -ffast-math -mfpmath=sse -msse -msse2 -msse3 -mssse3 -msse4
  ifneq (${DEBUG},1)
    CPPFLAGS += -s
  endif
endif

# add warnings
ifeq (${WARNINGS},1)
  CXXFLAGS += \
      -Wextra  -Wall -Wcast-align -Wcast-qual  -Wchar-subscripts  -Wcomment \
      -Wdisabled-optimization -Wfloat-equal  -Wformat  -Wformat=2 \
      -Wformat-nonliteral -Wformat-security -Wformat-y2k -Wimport  -Winit-self \
      -Winvalid-pch -Wmissing-braces -Wmissing-field-initializers -Wmissing-format-attribute   \
      -Wmissing-include-dirs -Wmissing-noreturn -Wpacked -Wparentheses  -Wpointer-arith \
      -Wredundant-decls -Wreturn-type -Wsequence-point  -Wsign-compare  -Wstack-protector \
      -Wstrict-aliasing -Wstrict-aliasing=2 -Wswitch -Wuninitialized \
      -Wunknown-pragmas  -Wunreachable-code -Wunused -Wunused-function  -Wunused-label \
      -Wunused-parameter -Wunused-value  -Wunused-variable  -Wvariadic-macros \
      -Wvolatile-register-var  -Wwrite-strings -Wfatal-errors -Winvalid-pch \
      -Wold-style-cast -Wsign-promo -Winline -Wswitch-enum -Wmissing-declarations -Wfatal-errors
  ifeq (${CXX},clang++)
    CXXFLAGS += -Weffc++
  endif
endif

# (TODO) - we remove this warning because it gets in the way of unimplemented functions
ifeq (${CXX},g++)
  CXXFLAGS += -Wno-suggest-attribute=noreturn
else
  CXXFLAGS += -Wno-missing-noreturn
endif

# debug Makefile
Q := @
ifeq (${DEBUG_MAKE},1)
  Q =
endif


#
# constants
#

VERSION='0.0.1'

ifneq (${OS},Windows_NT)
  red =\033[0;31m
  green =\033[0;32m
  magenta =\033[0;35m
  done =\033[0m
else
  red =
  green =
  magenta =
  done =
endif

LINT_FILTERS = -legal,-build/include,-whitespace,-readability/namespace,-readability/function,-build/namespaces,-readability/todo,-build/c++11,-runtime/references

SUPPRESSIONS=sdl2.supp


# 
# print Makefile information

$(info DEBUG    = $(if ${DEBUG},yes,no))
$(info OPTIMIZE = $(if ${OPTIMIZE},yes,no))
$(info WARNINGS = $(if ${WARNINGS},yes,no))
$(info SANITIZE = $(if ${SANITIZE},yes,no))
$(info CXX      = ${CXX})
$(info LDLFLAGS = ${LDFLAGS})
$(info CPPFLAGS = ${CPPFLAGS} $(if $WARNINGS,...WARNINGS...))
$(info ----------------)


#
# compile C++ sources
#

OBJ = ${SRC:.cc=.o}
OBJ_TESTBOX = ${SRC_TESTBOX:.cc=.o}

.cc.o:
ifneq (${DEBUG_MAKE},1)	
	@echo ${CXX} -c $<
endif
	${Q} ${CXX} -c ${CPPFLAGS} ${CXXFLAGS} $< -o $@


#
# rules
#

testbox: ${OBJ} ${OBJ_TESTBOX}
ifneq (${DEBUG_MAKE},1)	
	@echo -e '${green}${CXX} -o $@${done}'
endif
	${Q} ${CXX} -o $@ $^ ${EXTRA_LIBS} ${CPPFLAGS} ${CXXFLAGS} ${LDFLAGS}


test: ./testbox
	./testbox

#
# non-compilation rules
# 
clean:
ifneq (${DEBUG_MAKE},1)	
	@echo -e '${red}cleaning${done}'
endif
	${Q} rm -f testbox testbox.exe *.o *.d **/*.o **/*.d

gensuppressions: testbox
ifneq (${DEBUG_MAKE},1)	
	@echo -e '${red}creating suppression list${done}'
endif
	@valgrind --leak-check=full --show-leak-kinds=all --gen-suppressions=yes \
	  $(addprefix --suppressions=util/,${SUPPRESSIONS}) ./testbox

checkleaks: testbox
ifneq (${DEBUG_MAKE},1)	
	@echo -e '${red}checking for memory leaks${done}'
endif
	@valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes \
	  $(addprefix --suppressions=util/,${SUPPRESSIONS}) ./testbox

lint: 
	cpplint --filter=${LINT_FILTERS} --linelength=120 g2d/*.h g2d/*.cc gui2d/*.h gui2d/*.cc game/*.h game/*.cc geo/*.h geo/*.cc physics/*.h physics/*.cc

cloc:
	cloc common/ GNUmakefile game/ geo/ physics/

doc:
ifneq (${DEBUG_MAKE},1)	
	@echo -e '${red}generating docs${done}'
endif
	@util/create_doc.rb game > game/doc.uml
	@java -jar util/plantuml.jar game/doc.uml

help:
	@echo 'Variables that will influence this make:'
	@echo '  CXX          choose a different compiler'
	@echo '  OPTIMIZE     turn on all optimizations'
	@echo '  WARNINGS     turn on all warnings'
	@echo '  DEBUG        create debug symbols'
	@echo '  SANITIZE     look for undefined behaviours'
	@echo '  DEBUG_MAKE   debug this Makefile'

.PHONY: all clean help checkleaks lint gensuppressions doc

-include ${SRC:.cc=.d}
