'use strict';

class HexBox {

    constructor(parent, model) {
        if(new.target === HexBox) throw 'abstract class';
        
        // verify types
        if(!(model.get && model.set)) {
            throw 'model must have "get" and "set"';
        }

        this.parent = parent;
        this.model = model;
        this.parameters = this._parseParameters(parent.innerHTML);

        // read parameters
        this.size = this.parameters.size || 2;
        this.addr = this.parameters.addr || 0;
        this.maxValue = Math.pow(16, this.size) - 1;
        this.prefix = this.parameters.prefix || false;
        this.rw = this.parameters.rw || false;
        
        this._setupField();
    }


    _parseParameters(p) {
        const pars = p.split(',');
        let r = {};
        for(let pr of pars) {
            const n = pr.split('=');
            if(n[1]) {
                r[n[0]] = n[1];
            } else {
                r[pr] = true;
            }
        }
        return r;
    }


    update() {
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(this.model.get(this.addr), this.size);
    }


    // called after changing the data
    afterUpdate(newValue) {
        // this can be implemented by the instances
    }


    _setupField() {
        if(!this.model) {
            throw "a model is needed";
        }

        this.parent.innerHTML = '';
        this.parent.style.display = 'inline';

        // create data
        this.data = document.createElement('span');
        this.parent.appendChild(this.data);

        if(this.rw) {
            this.data.className = 'editable';
            
            // create input
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.className = 'data_input';
            this.input.autocomplete = 'off';
            this.input.object = this;
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
                    this.model.set(this.addr, value);
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


class HexValueBox extends HexBox {

    constructor(parent) {
        class ValueModel {
            constructor(initial_value) {
                this.value = initial_value || 0;
            }

            get(addr) {
                return this.value;
            }

            set(addr, value) {
                this.value = value;
            }
        };
        super(parent, new ValueModel());
        if(this.parameters.value) {
            this.model.set(0, this.parameters.value);
        }
        this.update();
    }

};


class MemoryDataBox extends HexBox {

    constructor(parent, model) {
        super(parent, model);
        if(this.parameters.addr) {
            this.addr = this.parameters.addr;
        } else {
            throw 'expected address';
        }
        this.update();
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
