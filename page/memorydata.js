'use strict';

class NumberData {

    constructor(parent) {
        this.parent = parent;
        this.value = 0;

        // read parameters
        const pars = parent.innerHTML.split(',');
        this.addr = parseInt(pars[0]);
        this.size = parseInt(pars[1]);
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
        this.data.className = 'editable';
        this.parent.appendChild(this.data);

        if(this.writable) {
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
            this.data.ondblclick = () => {
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
            this.input.onblur = () => {
                const value = parseInt(this.input.value, 16);
                if(!isNaN(value) && value >= 0 && value <= this.maxValue) {
                    this._set(value);
                }
                this.update();
                this.data.style.display = 'inline';
                this.input.style.display = 'none';
                this.afterUpdate(value);
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
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(tinyvm.mboard.get(this.addr), 2);
    }

    changeAddress(addr) {
        this.addr = addr;
        this.data.title = '0x' + toHex(this.addr, 8);
        this.update();
    }

    _set(value) {
        tinyvm.mboard.set(this.addr, value);
    }

    memoryValue() {
        return tinyvm.mboard.get(this.addr);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
