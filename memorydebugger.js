'use strict';

class MemoryDebugger {

    constructor(mb, begin, end, physical, lines) {
        this.mb = mb;
        this.begin = begin;
        this.end = end;
        this.physical = physical;
        this.base_address = begin;
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

    set_initial_html(id) {
        let s = [];

        // buttons
        s.push('<p>');
        s.push(`Base address: <span class="base_address">0x${to_hex(this.base_address, 8)}</span>`);
        s.push('<button type="button">&#9664;</button>');
        s.push('<button type="button">&#9654;</button>');
        s.push('</p>');

        // memory table
        let pos = this.base_address;
        s.push('<table class="memory">');

        // table title
        s.push('<tr><th class="noborder"></th><th class="noborder"></th>');
        for(let i=0; i<16; ++i) {
            s.push(`<th class="addr_header">_${to_hex(i, 1)}</th>`);
            if(i == 7) s.push('<th class="noborder"></th>');
        }
        s.push('<th class="noborder"></th><th class="noborder"></th></tr>');

        // data
        for(let i=0; i<16; ++i) {
            let chars = [];
            s.push('<tr>');
            s.push(`<td class="addr">${to_hex(pos, 8)}</td>`);
            s.push('<td class="noborder"></td>');
            for(let x=0; x<16; ++x) {
                s.push(`<td class="data">${this.data_html(pos)}</td>`);
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

    data_html(addr) {
        //return to_hex(this.get(addr), 2);
        return `<input class="data_input" type="text" value="${to_hex(this.get(addr), 2)}">`
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
