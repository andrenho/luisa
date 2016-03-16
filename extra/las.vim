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
syn keyword lsOpcode pushd popb popw popd popx nop halt dbg swap
syn match lsOpcode 'push\.a'
syn match lsOpcode 'pop\.a'
syn keyword lsIndicator db dw dd resb resw resd
syn keyword lsRegister a b c d e f g h i j k l fp sp pc fl y v z s gt lt p t
syn keyword lsSectionType text data bss rodata

syn keyword lsConstant MMU_TYPE MMU_VERSION MMU_INTERRUPT MMU_NAME MMU_RAM_SZ
syn keyword lsConstant MMU_VMEM MMU_ERR CPU_A CPU_B CPU_C CPU_D CPU_E CPU_F CPU_G
syn keyword lsConstant CPU_NAME CPU_VERSION
syn keyword lsConstant CPU_H CPU_I CPU_J CPU_K CPU_L CPU_FP CPU_SP CPU_PC CPU_FL
syn keyword lsConstant CPU_INTERRUPT_VECT CPU_SYSCALL_VECT STG_TYPE STG_VERSION
syn keyword lsConstant STG_INTERRUPT STG_NAME STG_MODE STG_OP_STATUS STG_UNIT_LIST
syn keyword lsConstant STG_OP STG_P0 STG_P1 STG_P2 STG_P3 STG_P4 STG_P5 STG_P6 STG_P7
syn keyword lsConstant STG_R0 STG_R1 KBD_TYPE KBD_VERSION KBD_INTERRUPT KDB_NAME KBD_MODE
syn keyword lsConstant KBD_QUEUE_FULL KBD_DEQUEUE KBD_FRONT TM_TYPE TM_VERSION
syn keyword lsConstant TM_INTERRUPT TM_NAME TM_CLOCK TM_TIMER0 TM_TIMER1 TM_TIMER2
syn keyword lsConstant TM_TIMER3 TM_TIMER4 TM_TIMER5 TM_TIMER6 TM_TIMER7 TM_TIMER8
syn keyword lsConstant TM_TIMER9 TM_COUNTER0 TM_COUNTER1 TM_COUNTER2 TM_COUNTER3
syn keyword lsConstant TM_COUNTER4 TM_COUNTER5 TM_COUNTER6 TM_COUNTER7 TM_COUNTER8
syn keyword lsConstant TM_COUNTER9 TM_CUR_INT BIOS_TYPE BIOS_VERSION BIOS_INTERRUPT
syn keyword lsConstant BIOS_NAME BIOS_CODE VID_TYPE VID_VERSION VID_INTERRUPT VID_NAME
syn keyword lsConstant VID_WIDTH VID_HEIGHT VID_OP VID_P0 VID_P1 VID_P2 VID_P3 VID_P4
syn keyword lsConstant VID_P5 VID_P6 VID_P7 VID_R0 VID_R1 VID_DATA

syn keyword lsConstant VID_OP_CLRSCR VID_OP_DRAW_PX VID_OP_GET_PX VID_OP_WRITE
syn keyword lsConstant STG_OP_READ STG_OP_WRITE STG_OP_SIZE
syn keyword lsConstant MB_ERR MMU_ERR STG_MODE STG_OP_STATUS KBD_MODE
syn keyword lsConstant MB_ERR_NONE MB_ERR_UNAUTH_READ MB_ERR_UNAUTH_WRITE MMU_ERR_NONE
syn keyword lsConstant MMU_ERR_OUT_OF_BOUNDS MMU_PAGE_FAULT STG_MODE_POLL STG_MODE_INTERRUPT
syn keyword lsConstant STG_STATUS_OK STG_STATUS_WAITING STG_STATUS_ADDRESS_ERROR
syn keyword lsConstant STG_STATUS_UNAVALIABLE STG_STATUS_PHYSICAL_ERROR KBD_MODE_POLL
syn keyword lsConstant KBD_MODE_INTERRUPT

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
hi def link lsSectionType PreProc
hi def link lsLabel       Type
hi def link lsConstant    Special

" vim: ts=2:sw=2:sts=2:expandtab
