'use strict';

class HexBox {

    constructor(parent) {
        if(new.target === HexBox) throw 'abstract class';

        this.parent = parent;
        this.parameters = this._parseParameters(parent.innerHTML);
        this.domain = this._parseDomain();

        // read parameters
        this.size = this.parameters.size || 2;
        this.addr = this.parameters.addr || 0;
        this.maxValue = Math.pow(16, this.size) - 1;
        this.prefix = this.parameters.prefix || false;
        this.rw = this.parameters.rw || false;
        
        this._setupField();
    }


    value() {
        return this._get();
    }


    setValue(v) {
        this._set(v);
        this.update();
    }


    _parseParameters(p) {
        const pars = p.split(',');
        let r = {};
        for(let pr of pars) {
            const n = pr.split('=');
            if(n[1]) {
                r[n[0]] = isNaN(n[1]) ? n[1] : parseInt(n[1]);
            } else {
                r[pr] = true;
            }
        }
        return r;
    }


    _parseDomain() {
        if(!this.parameters.domain) {
            return null;
        }
        let dom = {};
        for(let d of this.parameters.domain.split(';')) {
            const n = d.split(':');
            dom[n[0]] = n[1];
        }
        return dom;
    }


    update() {
        const v = this._get();
        this.data.innerHTML = (this.prefix ? '0x' : '') + toHex(v, this.size);
        if(this.domain) {
            const s = this.domain[v];
            if(s) {
                this.domain_data.innerHTML = s;
            } else if(this.domain['*']) {
                this.domain_data.innerHTML = this.domain['*'];
            } else {
                this.domain_data.innerHTML = '?';
            }
        }
    }


    // called after changing the data
    afterUpdate(newValue) {
        // this can be implemented by the instances
    }


    _setupField() {
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
                    this._set(value);
                }
                this.update();
                this.data.style.display = 'inline';
                this.input.style.display = 'none';
                this.afterUpdate(value);
                if(page) page.update(this);  // update everything in the page
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

        // create domain
        if(this.domain) {
            this.parent.appendChild(document.createElement('br'));
            this.domain_data = document.createElement('span');
            this.parent.appendChild(this.domain_data);
        }

        //this.update();
    }

    _get() { throw 'abstract method'; }
    _set(v) { throw 'abstract method'; }

}


class HexValueBox extends HexBox {

    constructor(parent) {
        super(parent);
        this._value = this.parameters.value || 0;
        this.update();
    }

    _get() { return this._value; }
    _set(v) { this._value = v; }

};


class MemoryDataBox extends HexBox {

    constructor(parent, model) {
        super(parent);
        this.model = model;
                
        // verify types
        if(!(model.get && model.set)) {
            throw 'model must have "get" and "set"';
        }

        if(this.parameters.addr !== undefined) {
            this.addr = this.parameters.addr;
        } else {
            throw 'expected address';
        }

        this.update();
    }


    changeAddress(addr) {
        this.addr = addr;
        this.update();
    }


    _get() {
        let n = 0;
        for(let i=(this.size/2)-1; i>=0; --i) {
            n <<= 8;
            try {
                n |= this.model.get(this.addr + i);
            } catch(e) {
                console.log(e);
            }
        }
        return n;
    }
    
    _set(v) {
        for(let i=0; i<(this.size/2); ++i) {
            this.model.set(this.addr + i, (v >> (8*i)) & 0xff); 
        }
        
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
