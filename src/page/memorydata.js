'use strict';

class NumberData {

    constructor(parent) {
        this.parent = parent;

        // read parameters
        const pars = parent.innerHTML.split(',');
        this.addr = parseInt(pars[0]);
        this.size = parseInt(pars[1]);
        this.value = this.addr;
        this.maxValue = Math.pow(16, this.size) - 1;
        this.prefix = false;
        this.writable = false;
        for(let i=2; i<pars.length; ++i) {
            if(pars[i] === 'prefix') {
                this.prefix = true;
            } else if(pars[i] == 'rw') {
                this.writable = true;
            }
        }

        this._setupField();
    }


    update() {
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(this.value, this.size);
    }


    // called after changing the data
    afterUpdate(newValue) {
        // this can be implemented by the instances
    }


    _set(value) {
        this.value = value;
    }


    _setupField() {
        this.parent.innerHTML = '';
        this.parent.style.display = 'inline';

        // create data
        this.data = document.createElement('span');
        this.parent.appendChild(this.data);

        if(this.writable) {
            this.data.className = 'editable';
            
            // create input
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.className = 'data_input';
            this.input.autocomplete = 'off';
            this.input.maxLength = this.input.size = this.size;
            if(this.prefix) this.input.size += 2;
            this.input.style.display = 'none';
            this.parent.appendChild(this.input);
            
            // event for double-clicking text
            this.data.onclick = () => {
                if(this.prefix) {
                    this.input.value = this.data.innerHTML.substring(2);
                } else {
                    this.input.value = this.data.innerHTML;
                }
                this.data.style.display = 'none';
                this.input.style.display = 'inline';
                this.input.select();
            };

            // event for leaving text field
            this.input.onAccept = () => {
                const value = parseInt(this.input.value, 16);
                if(!isNaN(value) && value >= 0 && value <= this.maxValue) {
                    this._set(value);
                }
                this.update();
                this.data.style.display = 'inline';
                this.input.style.display = 'none';
                this.afterUpdate(value);
            }

            this.input.onblur = () => {
                this.input.onAccept();
            };

            this.input.onkeydown = () => {
                let e = event || window.event;
                if(e.keyCode == 13) {  // return
                    this.input.onAccept();
                    return false;
                } else if(e.keyCode == 27) {  // ESC
                    this.input.value = this.data.value;
                    this.data.style.display = 'inline';
                    this.input.style.display = 'none';
                    return false;
                }
                return true;
            };

        }

        this.update();
    }

}


class MemoryData extends NumberData {

    constructor(parent) {
        super(parent)
        this.data.title = '0x' + toHex(this.addr, 8);
    }

    update() {
        const d = this._get();
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(d, 2);
    }

    changeAddress(addr) {
        this.addr = addr;
        this.data.title = '0x' + toHex(this.addr, 8);
        this.update();
    }

    memoryValue() {
        return this._get();
    }

    _get() {
        return tinyvm.mboard.mmu.ram.get(this.addr);
    }

    _set(value) {
        tinyvm.mboard.mmu.ram.set(this.addr, value);
    }

}


class PhysicalMemoryData extends MemoryData {

    _get() {
        return tinyvm.mboard.mmu.ram.get(this.addr);
    }

    _set(value) {
        tinyvm.mboard.mmu.ram.set(this.addr, value);
    }

}


class LogicalMemoryData extends MemoryData {

    _get() {
        return tinyvm.mboard.get(this.addr);
    }

    _set(value) {
        tinyvm.mboard.set(this.addr, value);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
