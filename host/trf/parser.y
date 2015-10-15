%{
#include <cstdio>
#include <string>
using namespace std;

#include "trffile.h"

extern "C" {
    int yylex(void);
    int yywrap() { return 1; }
}

extern int yylineno;
extern char* yytext;

void yyerror(const char* s) 
{
    fprintf(stderr, "error: %s in line %d (token \"%s\")\n", s, yylineno, yytext);
}

TRFFile f;

int main()
{
    extern int yyparse(void);
    yyparse();
    f.OutputBinary();
}

%}

%union {
    uint32_t hex;
    char* text;
}
%type<hex> HEX8 HEX16 HEX32
%type<text> SECTION_ID IDENTIFIER RELOC SYMBOL STRING

%token O_PAREN C_PAREN HEX8 HEX16 HEX32 IDENTIFIER SECTION SECTION_ID 
%token RELOC SYMBOL STRING EQ HEADER TRF_VERSION CPU_VERSION OBJECT_TYPE
%token ENTRY_POINT

%% 

file: header sections

header: O_PAREN SECTION HEADER C_PAREN defs;

defs:
    | defs def
    ;

def: TRF_VERSION EQ HEX8        { f.SetTRFVersion($3); }
   | CPU_VERSION EQ HEX8        { f.SetCPUVersion($3); }
   | OBJECT_TYPE EQ HEX8        { f.SetObjectType($3); }
   | ENTRY_POINT EQ HEX32       { f.SetEntryPoint($3); }
   ;

sections: 
        | sections section
        ;

section: O_PAREN SECTION SECTION_ID C_PAREN { f.SetCurrentSection(string($3)); } ids
       ;

ids: 
   | ids id
   ;

id: HEX8    { f.Add8($1); }
  | HEX16   { f.Add16($1); }
  | HEX32   { f.Add32($1); }
  | RELOC   { f.AddReloc(string($1)); }
  | SYMBOL  { f.AddSymbol(string($1)); }
  | STRING  { f.AddStr($1); }
  ;

%%

/* vim: ts=4:sw=4:sts=4:expandtab */
