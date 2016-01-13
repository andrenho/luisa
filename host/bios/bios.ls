.import host/luisa.ls

.section text
	movd	[VID_P0], 0x00000043
	movd	[VID_P1], 0x00000005
	movd	[VID_P2], 0x00000005
	movd	[VID_P3], 0x00000000
	movd	[VID_P4], 0x00FF00FF
	movb	[VID_OP], 5

; vim: syntax=las
