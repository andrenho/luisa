.import host/luisa.ls

.section text
	mov	sp, 0xF000

	jsr	printc
	jmp	done

printc:
	movd	[VID_P0], 0x00000043
	movd	[VID_P1], 0x00000005
	movd	[VID_P2], 0x00000005
	movd	[VID_P3], 0x00000000
	movd	[VID_P4], 0x00FF00FF
	movb	[VID_OP], 5
	ret

done:

; vim: syntax=las
