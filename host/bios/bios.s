.import host/luisa.s

;------------------------------------
;
; .TEXT
;
;------------------------------------
.section text
	mov	sp, 0xF000

	jsr	print_messages
	jmp	done

;
; print initial messages
;
print_messages:
	movd	[VID_P1], 0 		; x
	movd	[VID_P2], 0 		; y
	movd	[VID_P3], BLACK
	movd	[VID_P4], GREEN

	mov	A, welcome		; print welcome message
	jsr	print

	movd	[VID_P1], 5		; x
	movd	[VID_P2], 3		; y
	movd	[VID_P4], LIGHTGRAY

	mov	A, t_cpu
	jsr	print

	ret

;
; print (A: string)
;
print:
	movb	B, [A]			; if c == '\0', return
	bz	.done
	movd	[VID_P0], B		; print
	movb	[VID_OP], VID_OP_WRITE

	movd	B, [VID_P1]		; increment X
	inc	B
	movd	[VID_P1], B

	inc	A			; increment text pointer
	jmp	print

.done:
	ret

; 
; hang microprocessor
;
done:	jmp	done


;------------------------------------
;
; .DATA
;
;------------------------------------
.section data
	db	0	; hang
welcome:
	db	"Welcome to LuisaVM!", 0
t_cpu:
	db	"Microprocessor:", 0

; vim: syntax=las
