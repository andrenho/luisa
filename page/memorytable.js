'use strict';

class MemoryTable {

    constructor(parent) {
        this.parent = parent;

        // read parameters
        const pars = parent.innerHTML.split(',');
        this.start = parseInt(pars[0]);
        if(pars[1] == 'physical_memory_size') {
            this.end = tinyvm.mboard.memSize - this.start;
        } else {
            this.end = parseInt(pars[1]) - this.start;
        }
        this.physical = false;
        for(let i=2; i<pars.length; ++i) {
            if(pars[i] === 'physical') {
                this.physical = true;
            }
        }

        this._setupHeader();
        this._setupTable();
    }

    
    _setupHeader() {
        this.parent.innerHTML = '';
        this.parent.style.display = 'block';

        // title
        const p = document.createElement('p');
        p.innerHTML = 'Base address: ';

        const base = document.createElement('span');
        base.innerHTML = '0,6,prefix,rw';
        base.numberData = new NumberData(base);
        base.style.paddingRight = '5px';
        p.appendChild(base);

        // buttons
        const back = document.createElement('button');
        back.type = 'button';
        back.innerHTML = '&#9664;';
        p.appendChild(back);

        const forward = document.createElement('button');
        forward.type = 'button';
        forward.innerHTML = '&#9654;';
        p.appendChild(forward);

        this.parent.appendChild(p);
    }


    _setupTable() {

        function th(klass, content) {
            const t = document.createElement('th')
            t.className = klass;
            if(content) t.innerHTML = content;
            return t;
        }

        // table
        const table = document.createElement('table');
        table.className = 'memory';

        // title row
        const tr_header = document.createElement('tr');
        tr_header.appendChild(th('noborder'));
        for(let i=0; i<16; ++i) {
            tr_header.appendChild(th('addr_header', `_${toHex(i, 1)}`));
            if(i == 7) tr_header.appendChild(th('noborder'));
        }
        tr_header.appendChild(th('noborder'));
        table.appendChild(tr_header);

        // data row
        
/*
        // data
        for(let i=0; i<16; ++i) {
            let chars = [];
            s.push('<tr>');
            s.push(`<td class="addr">${toHex(pos, 8)}</td>`);
            s.push('<td class="noborder"></td>');
            for(let x=0; x<16; ++x) {
                s.push(`<td class="data">${this.dataHTML(pos)}</td>`);
                const c = this.get(pos);
                chars.push(c >= 32 ? String.fromCharCode(c) : '.');
                if(x == 7) s.push('<td class="noborder"></td>');
                ++pos;
            }
            s.push('<td class="noborder"></td>');
            s.push(`<td class="data">${chars.join('')}</td>`);
            s.push('</tr>');
        }
*/

        this.parent.appendChild(table);
    }

}

/*
class MemoryDebugger {

    constructor(mb, begin, end, physical) {
        this.mb = mb;
        this.begin = begin;
        this.end = end;
        this.physical = physical;
        this.baseAddress = begin;
    }

    set(addr, value) {
        if(this.physical) {
            this.mb.mem[addr] = value;
        } else {
            this.mb.set(addr, value);
        }
    }

    get(addr) {
        if(this.physical) {
            return this.mb.mem[addr];
        } else {
            return this.mb.get(addr);
        }
    }

    setInitialHTML(id) {
        let s = [];

        // buttons
        s.push('<p>');
        s.push(`Base address: <span class="base_address">0x${toHex(this.baseAddress, 8)}</span>`);
        s.push('<button type="button">&#9664;</button>');
        s.push('<button type="button">&#9654;</button>');
        s.push('</p>');

        // memory table
        let pos = this.baseAddress;
        s.push('<table class="memory">');

        // table title
        s.push('<tr><th class="noborder"></th><th class="noborder"></th>');
        for(let i=0; i<16; ++i) {
            s.push(`<th class="addr_header">_${toHex(i, 1)}</th>`);
            if(i == 7) s.push('<th class="noborder"></th>');
        }
        s.push('<th class="noborder"></th><th class="noborder"></th></tr>');

        // data
        for(let i=0; i<16; ++i) {
            let chars = [];
            s.push('<tr>');
            s.push(`<td class="addr">${toHex(pos, 8)}</td>`);
            s.push('<td class="noborder"></td>');
            for(let x=0; x<16; ++x) {
                s.push(`<td class="data">${this.dataHTML(pos)}</td>`);
                const c = this.get(pos);
                chars.push(c >= 32 ? String.fromCharCode(c) : '.');
                if(x == 7) s.push('<td class="noborder"></td>');
                ++pos;
            }
            s.push('<td class="noborder"></td>');
            s.push(`<td class="data">${chars.join('')}</td>`);
            s.push('</tr>');
        }

        s.push('</table>');
        document.getElementById(id).innerHTML = s.join('');
    }

    dataHTML(addr) {
        //return toHex(this.get(addr), 2);
        return `<input class="data_input" type="text" value="${toHex(this.get(addr), 2)}">`
    }

}
*/

// vim: ts=4:sw=4:sts=4:expandtab
