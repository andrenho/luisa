'use strict';

class MemoryData {

    constructor(parent) {
        this.parent = parent;

        // read parameters
        const pars = parent.innerHTML.split(',');
        this.addr = parseInt(pars[0]);
        this.access = pars[1];
        this.prefix = false;
        for(let i=2; i<pars.length; ++i) {
            if(pars[i] === 'prefix') {
                this.prefix = true;
            }
        }
        if(this.access !== 'r' && this.access !== 'rw') {
            throw `Invalid access type ${this.access}.`;
        }

        this._setupField();
    }


    update() {
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(tinyvm.mboard.get(this.addr), 2);
    }


    _setupField() {
        this.parent.innerHTML = '';
        this.parent.style.display = 'block';

        // create data
        this.data = document.createElement('span');
        this.parent.appendChild(this.data);

        if(this.access === 'rw') {
            // create input
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.className = 'data_input';
            this.input.autocomplete = 'off';
            this.input.maxLength = this.input.size = (this.prefix ? 4 : 2);
            this.input.style.display = 'none';
            this.parent.appendChild(this.input);
            
            // event for double-clicking text
            this.data.ondblclick = () => {
                this.data.style.display = 'none';
                this.input.value = this.data.innerHTML;
                this.input.style.display = 'block';
                this.input.select();
            };

            // event for leaving text field
            this.input.onblur = () => {
                const value = parseInt((this.input.value.toLowerCase().startsWith('0x') ? '' : '0x') + this.input.value, 16);
                // TODO - check for max
                if(!isNaN(value)) {
                    tinyvm.mboard.set(this.addr, value);
                    this.update();
                    this.data.style.display = 'block';
                    this.input.style.display = 'none';
                }
            };
        }

        this.update();
    }

};

// vim: ts=4:sw=4:sts=4:expandtab
