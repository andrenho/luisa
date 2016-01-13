;
; REGISTERS
;
.define MMU_TYPE           0xf0001000
.define MMU_VERSION        0xf0001001
.define MMU_INTERRUPT      0xf0001002
.define MMU_NAME           0xf0001003
.define MMU_RAM_SZ         0xf0001010
.define MMU_VMEM           0xf0001014
.define MMU_ERR            0xf0001018
.define CPU_A              0xf0002010
.define CPU_B              0xf0002014
.define CPU_C              0xf0002018
.define CPU_D              0xf000201c
.define CPU_E              0xf0002020
.define CPU_F              0xf0002024
.define CPU_G              0xf0002028
.define CPU_H              0xf000202c
.define CPU_I              0xf0002030
.define CPU_J              0xf0002034
.define CPU_K              0xf0002038
.define CPU_L              0xf000203c
.define CPU_FP             0xf0002040
.define CPU_SP             0xf0002044
.define CPU_PC             0xf0002048
.define CPU_FL             0xf000204c
.define CPU_INTERRUPT_VECT 0xf0002100
.define CPU_SYSCALL_VECT   0xf0002500
.define STG_TYPE           0xf0003000
.define STG_VERSION        0xf0003001
.define STG_INTERRUPT      0xf0003002
.define STG_NAME           0xf0003003
.define STG_MODE           0xf0003010
.define STG_OP_STATUS      0xf0003011
.define STG_UNIT_LIST      0xf0003012
.define STG_OP             0xf0003013
.define STG_P0             0xf0003014
.define STG_P1             0xf0003018
.define STG_P2             0xf000301c
.define STG_P3             0xf0003020
.define STG_P4             0xf0003024
.define STG_P5             0xf0003028
.define STG_P6             0xf000302c
.define STG_P7             0xf0003030
.define STG_R0             0xf0003034
.define STG_R1             0xf0003038
.define KBD_TYPE           0xf0004000
.define KBD_VERSION        0xf0004001
.define KBD_INTERRUPT      0xf0004002
.define KDB_NAME           0xf0004003
.define KBD_MODE           0xf0004010
.define KBD_QUEUE_FULL     0xf0004011
.define KBD_DEQUEUE        0xf0004012
.define KBD_FRONT          0xf0004014
.define TM_TYPE            0xf0005000
.define TM_VERSION         0xf0005001
.define TM_INTERRUPT       0xf0005002
.define TM_NAME            0xf0005003
.define TM_CLOCK           0xf0005010
.define TM_TIMER0          0xf0005014
.define TM_TIMER1          0xf0005018
.define TM_TIMER2          0xf000501c
.define TM_TIMER3          0xf0005020
.define TM_TIMER4          0xf0005024
.define TM_TIMER5          0xf0005028
.define TM_TIMER6          0xf000502c
.define TM_TIMER7          0xf0005030
.define TM_TIMER8          0xf0005034
.define TM_TIMER9          0xf0005038
.define TM_COUNTER0        0xf000503c
.define TM_COUNTER1        0xf0005040
.define TM_COUNTER2        0xf0005044
.define TM_COUNTER3        0xf0005048
.define TM_COUNTER4        0xf000504c
.define TM_COUNTER5        0xf0005050
.define TM_COUNTER6        0xf0005054
.define TM_COUNTER7        0xf0005058
.define TM_COUNTER8        0xf000505c
.define TM_COUNTER9        0xf0005060
.define TM_CUR_INT         0xf0005064
.define BIOS_TYPE          0xf0006000
.define BIOS_VERSION       0xf0006001
.define BIOS_INTERRUPT     0xf0006002
.define BIOS_NAME          0xf0006003
.define BIOS_CODE          0xf0006010
.define VID_TYPE           0xf0016000
.define VID_VERSION        0xf0016001
.define VID_INTERRUPT      0xf0016002
.define VID_NAME           0xf0016003
.define VID_WIDTH          0xf0016010
.define VID_HEIGHT         0xf0016011
.define VID_OP             0xf0016012
.define VID_P0             0xf0016014
.define VID_P1             0xf0016018
.define VID_P2             0xf001601c
.define VID_P3             0xf0016020
.define VID_P4             0xf0016024
.define VID_P5             0xf0016028
.define VID_P6             0xf001602c
.define VID_P7             0xf0016030
.define VID_R0             0xf0016034
.define VID_R1             0xf0016038
.define VID_DATA           0xf0026000

;
; DOMAINS
;
.define VID_OP_CLRSCR      0x2
.define VID_OP_DRAW_PX     0x3
.define VID_OP_GET_PX      0x4
.define VID_OP_WRITE       0x5

; 
; COLORS
;
.define BLACK		0x000000
.define GREEN		0x00FF00

; vim: syntax=las
