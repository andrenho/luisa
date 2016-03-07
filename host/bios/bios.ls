.import host/luisa.ls

.section text
	mov	sp, 0xF000

	jsr	print_messages
	jmp	done

;
; print initial messages
;
print_messages:
	movd	[VID_P1], 0x0 		; x
	movd	[VID_P2], 0x0 		; y
	movd	[VID_P3], 0x000000	; black
	movd	[VID_P4], 0xFFFF00	; yellow

	mov	A, welcome		; print welcome message
	jsr	print

	ret

;
; print (A: string)
;
print:
	movb	B, [A]		; if c == '\0', return
	bz	.done
	movd	[VID_P0], B	; print
	movb	[VID_OP], 5			; TODO - use constant

	movd	B, [VID_P1]	; increment X
	inc	B
	movd	[VID_P1], B

	inc	A		; increment text pointer
	jmp	print

.done:
	ret

; 
; hang microprocessor
;
done:

.section data
	db	0	; hang
welcome:
	db	"Welcome to LuisaVM!", 0

; vim: syntax=las
