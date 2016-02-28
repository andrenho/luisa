'use strict';

class StrBox {

    constructor(parent, model) {
        // verify types
        if(!(model.get && model.set)) {
            throw 'model must have "get" and "set"';
        }

        this.parent = parent;
        this.model = model;
        this.parameters = this._parseParameters(parent.innerHTML);

        if(this.parameters.addr === undefined) {
            throw 'addr is required';
        }

        this.size = this.parameters.size || 1;
        this.addr = this.parameters.addr;
        this.rw = this.parameters.rw || false;

        this._setupField();
    }


    _parseParameters(p) {
        const pars = p.split(',');
        let r = {};
        for(let pr of pars) {
            const n = pr.split('=');
            if(n[1]) {
                const v = parseInt(n[1]);
                r[n[0]] = (v !== NaN) ? v : n[1];
            } else {
                r[pr] = true;
            }
        }
        return r;
    }


    _setupField() {
        this.parent.innerHTML = '"';
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
            this.input.style.textAlign = 'left';
            this.input.autocomplete = 'off';
            this.input.object = this;
            this.input.maxLength = this.input.size = this.size;
            this.input.style.display = 'none';
            this.parent.appendChild(this.input);
            
            // event for double-clicking text
            this.data.onclick = () => {
                this.input.value = this.data.innerHTML;
                this.data.style.display = 'none';
                this.input.style.display = 'inline';
                this.input.select();
            };

            // event for leaving text field
            this.input.onAccept = () => {
                for(let a=0; a<this.size; ++a) {
                    this.model.set(a + this.addr, 
                        (a >= this.input.value.length) ? 0 : this.input.value[a].charCodeAt());
                }
                this.update();
                this.data.style.display = 'inline';
                this.input.style.display = 'none';
                this.afterUpdate(this.input.value);
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

        this.parent.appendChild(document.createTextNode('"'));
        this.update();
    }


    update() {
        let s = [];
        for(let i=0; i<this.size; ++i) {
            const c = this.model.get(this.addr + i);
            if(c == 0) {
                break;
            } else if(c < 32) {
                s.push('?');
            } else {
                s.push(String.fromCharCode(c));
            }
        }

        this.data.innerHTML = s.join('');
    }


    // called after changing the data
    afterUpdate(newValue) {
        // this can be implemented by the instances
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
