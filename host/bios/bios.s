.import host/luisa.s

;------------------------------------
;
; .TEXT - MAIN PROCEDURE
;
;------------------------------------
.section text
	mov	sp, 0xF000

	jsr	print_welcome
	jsr	print_cpu
	jsr	print_memory
	jsr	print_storage
	halt


;------------------------------------
;
; MAIN SUBROUTINES - PRINT MESSAGES
;
;------------------------------------

print_welcome:
	movd	[VID_P1], 0 		; x
	movd	[VID_P2], 0 		; y
	movd	[VID_P3], BLACK
	movd	[VID_P4], GREEN
	mov	A, welcome		; print welcome message
	jsr	print

	ret

print_cpu:
	movd	[VID_P1], 5		; x
	movd	[VID_P2], 3		; y
	movd	[VID_P4], LIGHTGRAY
	mov	A, t_cpu
	jsr	print

	movd	[VID_P1], 21
	movd	[VID_P4], LIGHTYELLOW
	mov	A, CPU_NAME
	jsr	print

	inc	A
	movd	[VID_P1], A
	movd	[VID_P0], 'v'
	movb	[VID_OP], VID_OP_WRITE

	inc	A
	movd	[VID_P1], A
	movb	A, [CPU_VERSION]
	jsr	print_dec

	ret

print_memory:
	movd	[VID_P1], 5
	movd	[VID_P2], 4
	movd	[VID_P4], LIGHTGRAY
	mov	A, t_memory
	jsr	print

	movd	[VID_P1], 21
	movd	[VID_P4], LIGHTYELLOW
	movd	A, [MMU_RAM_SZ]

	mov	E, size_def
	sub	E, 3

.next_def:
	idiv	A, 1024
	add	E, 3
	cmp	A, 1000
	bgt	.next_def

	jsr	print_dec
	movd	[VID_P1], A
	mov	A, E
	jsr	print
	
	ret

; 
; print storage units
;
print_storage:
	mov	E, 0			; E = storage number
	mov	G, E			; G = current line
	add	G, 5			

.next_unit:
	; print title
	movd	[VID_P1], 5		; x
	movd	[VID_P2], G		; y
	movd	[VID_P3], BLACK		; bg
	movd	[VID_P4], LIGHTGRAY	; fg
	mov	A, t_storage
	jsr	print

	movd	[VID_P1], 18		; x
	mov	F, G
	add	F, 43
	movd	[VID_P0], F		; numeric char
	movb	[VID_OP], VID_OP_WRITE	; write

	movd	[VID_P0], ':'
	movd	[VID_P1], 19
	movb	[VID_OP], VID_OP_WRITE

	; go to next storage
	inc	G			; storage++
	inc	E
	cmp	E, 4
	bnz	.next_unit

	ret


;------------------------------------
;
; HELPER FUNCTIONS - PRINTING
;
;------------------------------------

;
; print (A: string), return x position
;
print:
	movd	C, [VID_P1]
.next:
	movb	B, [A]			; if c == '\0', return
	bz	.done
	movd	[VID_P0], B		; print
	movb	[VID_OP], VID_OP_WRITE

	movd	B, [VID_P1]		; increment X
	inc	B
	movd	[VID_P1], B

	inc	A			; increment text pointer
	inc	C
	jmp	.next

.done:
	mov	A, C
	ret

;
; print the decimal number contained in A, return x position
;
print_dec:
	; convert number (reversed)
	mov	B, A			; B -> rest of the number
	mov	C, 0			; C -> current position in memory (using the first bytes of RAM)

.next_digit:
	mov	A, B
	mod	A, 10
	add	A, '0'

	movb	[C], A			; dec_tmp[_] = c
	inc	C
	idiv	B, 10
	cmp	B, 0
	bnz	.next_digit

	; print chars
	dec	C
	movd	D, [VID_P1]

.next_char:
	movb	[VID_P0], [C]
	movd	[VID_P1], D
	movb	[VID_OP], VID_OP_WRITE

	dec	C
	inc	D

	cmp	C, -1
	bnz	.next_char

	mov	A, D
	ret

;------------------------------------
;
; HELPER FUNCTIONS - STORAGE INFO
;
;------------------------------------

;
; storage present (storage number in A, return boolean)
;
storage_present:
	mov	A, 0
	ret

;
; return if storage is bootable (storage number in A, return boolean)
;
storage_bootable:
	mov	A, 0
	ret

;
; return pointer to storage name (storage number in A, return boolean)
;
storage_name:
	mov	A, no_storage_present
	ret


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
t_memory:
	db	"Memory:", 0
t_storage:
	db	"Storage unit", 0
size_def:
	db	"kB", 0, "MB", 0, "GB"
no_storage:
	db	"(no storage present)"


; vim: syntax=las
