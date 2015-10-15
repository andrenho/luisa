%{
#include <stdlib.h>
#include <string.h>

#include "parser.hh"
%}

H           [A-Fa-f0-9]

%option     8bit
%option     warn nodefault
%option     yylineno
%option     nounput noinput default

%%

\[                       return O_PAREN;
\]                       return C_PAREN;
=                        return EQ;

{H}{H}                   yylval.hex = strtol(yytext, NULL, 16); return HEX8;
{H}{H}{H}{H}             yylval.hex = strtol(yytext, NULL, 16); return HEX16;
{H}{H}{H}{H}{H}{H}{H}{H} yylval.hex = strtol(yytext, NULL, 16); return HEX32;

section                  return SECTION;
\.header                 return HEADER;
TRF_version              return TRF_VERSION;
CPU_version              return CPU_VERSION;
object_type              return OBJECT_TYPE;
entry_point              return ENTRY_POINT;

\.[A-Za-z]+              yylval.text = strdup(yytext); return SECTION_ID;
\([A-Za-z][A-Za-z0-9]*\) yylval.text = strdup(&yytext[1]); yylval.text[strlen(yylval.text)-1] = '\0'; return RELOC;
\<[A-Za-z][A-Za-z0-9]*\> yylval.text = strdup(&yytext[1]); yylval.text[strlen(yylval.text)-1] = '\0'; return SYMBOL;
\"(\\.|[^\\"])*\"        yylval.text = strdup(&yytext[1]); yylval.text[strlen(yylval.text)-1] = '\0'; return STRING;
[A-Za-z][A-Za-z0-9_]*    yylval.text = strdup(yytext); return IDENTIFIER;

;.*\n       
[ \t\n]     

%%

// vim: ts=4:sw=4:sts=4:expandtab
