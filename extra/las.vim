" Vim syntax file
" Language:  LuisaVM assembler
" By: André Wagner <andre.nho@gmail.com>
" Creation date: 07-Mar-2016
" Version 0.01

if exists("b:current_syntax")
  finish
endif

syn case ignore

syn match lsDecNumber "-\?\d\+"
syn match lsHexNumber "0[xX]\x\+"
syn match lsBinNumber "0[Bb][01_]\+"
syn region lsString   start=+"+ skip=+\\"+ end=+"+
syn region lsString   start=+'+ skip=+\\'+ end=+'+

syn keyword lsOpcode mov movb movw movd or xor and shl shr not add sub cmp
syn keyword lsOpcode mul idiv mod inc dec bz beq bnz bneq bneg bpos bgt bgte
syn keyword lsOpcode blt blte bv bnv jmp jsr ret sys iret sret pushb pushw
syn keyword lsOpcode pushd popb popw popd popx nop
syn match lsOpcode 'push\.a'
syn match lsOpcode 'pop\.a'
syn keyword lsIndicator db dw dd resb resw resd
syn keyword lsRegister a b c d e f g h i j k l fp sp pc fl y v z s gt lt p t
syn keyword lsSectionType text data bss rodata

syn match lsSection '\.section'
syn match lsDefine '\.define'
syn match lsImport '\.import'

syn match lsLabel "[\.@\$]\?[a-z]\w\+:"

" comments
syn case match
syn keyword lsTODO contained TODO FIXME XXX NOTE
syn match lsComment ";.*$" contains=lsTODO

hi def link lsComment     Comment
hi def link lsTodo        Todo
hi def link lsOpcode      Statement
hi def link lsIndicator   Statement
hi def link lsHexNumber   Constant
hi def link lsDecNumber   Constant
hi def link lsBinNumber   Constant
hi def link lsRegister    Constant
hi def link lsString      Constant
hi def link lsSection     PreProc
hi def link lsDefine      PreProc
hi def link lsImport      PreProc
hi def link lsLabel       Type
hi def link lsSectionType Special

" vim: ts=2:sw=2:sts=2:expandtab
