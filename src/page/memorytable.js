'use strict';

class MemoryTable {

    constructor(parent, model) {
        this.parent = parent;
        this.model = model;

        this._elements = { data: [], chars: [], row_header: [] };

        // read parameters
        this.parameters = this._parseParameters(parent.innerHTML);
        this.start = this.parameters.start || 0;
        if(this.parameters.end == 'physical_memory_size') {
            this.end = model.memSize - 1;
        } else if(this.parameters.end) {
            this.end = this.parameters.end;
        } else {
            throw 'end required';
        }
        
        this._setupHeader();
        this._setupTable();

        this.update();
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
        for(let d of this._elements.data) {
            d.memoryData.update();
        }
        for(let c of this._elements.chars) {
            this._updateChars(c);
        }
    }


    _setupHeader() {
        this.parent.innerHTML = '';
        this.parent.style.display = 'block';

        // title
        const p = document.createElement('p');
        p.innerHTML = 'Base address: ';

        const base = document.createElement('span');
        base.innerHTML = 'value=' + Math.floor(this.start / 0x100) + ',size=6,prefix,rw';
        base.numberData = new HexValueBox(base);
        base.style.paddingRight = '5px';
        p.appendChild(base);
        this.numberData = base.numberData;
        this.numberData.afterUpdate = v => {
            console.log(v);
            console.log(this.start);
            console.log(this.end);
            if(v * 0x100 < this.start) {
                this.numberData.setValue(Math.floor(this.start / 0x100));
            } else if(v * 0x100 >= this.end) {
                this.numberData.setValue(Math.floor(this.end / 0x100));
            }
            this.numberData.update();
            this._updateBaseAddress(base.numberData.value);
        };

        // buttons
        const back = document.createElement('button');
        back.type = 'button';
        back.innerHTML = '&#9664;';
        p.appendChild(back);
        back.onclick = () => {
            if(this.numberData.value() > Math.floor(this.start / 0x100)) {
                this.numberData.setValue(this.numberData.value() - 1);
                this.numberData.update();
                this._updateBaseAddress(base.numberData.value());
            }
        };

        const forward = document.createElement('button');
        forward.type = 'button';
        forward.innerHTML = '&#9654;';
        p.appendChild(forward);
        forward.onclick = () => {
            if(this.numberData.value() < Math.floor(this.end / 0x100)) {
                this.numberData.setValue(this.numberData.value() + 1);
                this.numberData.update();
                this._updateBaseAddress(base.numberData.value());
            }
        };

        this.parent.appendChild(p);
    }


    _setupTable() {

        // table
        const table = document.createElement('table');
        table.className = 'memory';

        // title row
        function th(klass, content) {
            const t = document.createElement('th')
            t.className = klass;
            if(content) t.innerHTML = content;
            return t;
        }

        const tr_header = document.createElement('tr');
        tr_header.appendChild(th('noborder'));
        tr_header.appendChild(th('noborder'));
        for(let i=0; i<16; ++i) {
            tr_header.appendChild(th('addr_header', `_${toHex(i, 1)}`));
            if(i == 7) tr_header.appendChild(th('noborder'));
        }
        tr_header.appendChild(th('noborder'));
        table.appendChild(tr_header);

        // data row
        function td(klass, content) {
            const t = document.createElement('td')
            t.className = klass;
            if(content) t.innerHTML = content;
            return t;
        }

        let pos = this.numberData.value() * 0x100;
        for(let i=0; i<16; ++i) {
            const row = document.createElement('tr');
            let row_header = td("addr", '0x' + toHex(pos / 0x10, 7) + '_');
            row.appendChild(row_header);
            this._elements.row_header.push(row_header);

            row.appendChild(td('noborder'));

            const chars = td('data');
            chars.origins = [];
            this._elements.chars.push(chars);

            for(let x=0; x<0x10; ++x) {
                const addr = pos;
                const cell = td('data');
                cell.addr = addr;

                const base = document.createElement('span');
                base.innerHTML = "addr=" + addr + ',rw';
                base.memoryData = new MemoryDataBox(base, this.model);
                base.memoryData.afterUpdate = v => {
                    this._updateChars(base.chars);
                };
                this._elements.data.push(base);

                // link data and chars
                base.chars = chars;
                chars.origins.push(base);

                cell.appendChild(base);

                row.appendChild(cell);

                if(x == 7) row.appendChild(td('noborder'));

                ++pos;
            }

            row.appendChild(td('noborder'));

            // chars
            this._updateChars(chars);
            row.appendChild(chars);

            table.appendChild(row);
        }

        this.parent.appendChild(table);
    }

    
    _updateChars(chars) {
        let cs = [];
        for(let b of chars.origins) {
            const c = b.memoryData.value();
            cs.push(c >= 32 ? String.fromCharCode(c) : '.');
        }
        chars.innerHTML = cs.join('');
    }


   _updateBaseAddress(base) {
        let pos = base * 0x100;
        for(let i=0; i<0x10; ++i) {
            this._elements.row_header[i].innerHTML = '0x' + toHex(pos / 0x10, 7) + '_';
            for(let x=0; x<0x10; ++x) {
                const md = this._elements.data[(i*0x10)+x].memoryData;
                md.changeAddress(pos);
                ++pos;
            }
        }
        for(let c of this._elements.chars) {
            this._updateChars(c);
        }
   }

}


// vim: ts=4:sw=4:sts=4:expandtab
