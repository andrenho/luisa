'use strict';

// this source file contains everything that is necessary for managing
// the web page

let page;

window.onload = function() {
    let timer = window.setInterval(() => {

        // avoid infinite loop on errors
        try {
            tinyvm;
        } catch(e) {
            window.clearInterval(timer);
            document.getElementById('loading').innerHTML = 'Error: ' + e;
            return;
        }

        // initialize page
        if(tinyvm.available()) {
            page = new Page();
            window.clearInterval(timer);
        }
    }, 50);    
}



class Page {

    constructor() {
        this.page = 'about';
        this.block = 'doc';

        // hide "Loading...", show page
        document.getElementById('loading').style.display = 'none';
        document.getElementById('choose_dev_mode').style.display = 'block';

        // are we in development mode?
        if(this._getQueryString('dev')) {
            document.getElementById('dev_mode').checked = true;
            document.getElementById('dev').style.display = 'block';
            if(window.sessionStorage.getItem("last_page")) {
                this.page = window.sessionStorage.getItem("last_page");
                this.block = window.sessionStorage.getItem("last_block");
            }
        }

        this.initializePage();
        this.updatePageContents();
    }



    initializePage()
    {
        // initialize empty sections
        document.getElementById('mmap').innerHTML = tinyvm.mboard.mmapDebug();
        document.getElementById('ram_debug').innerHTML = tinyvm.mboard.mmu.ram.debug();
        document.getElementById('bios_source').innerHTML = tinyvm.mboard.bios.source;

        // initialize tag "memory_table"
        [].forEach.call(document.getElementsByClassName('memory_table'), e => {
            e.memoryTable = new MemoryTable(e);
        });

        // initialize tag "memory_data"
        [].forEach.call(document.getElementsByClassName('hex_data'), e => {
            e.memoryData = new HexValueBox(e, tinyvm.mboard);
        });
        [].forEach.call(document.getElementsByClassName('memory_data'), e => {
            e.memoryData = new MemoryDataBox(e, tinyvm.mboard);
        });
    }


    // update contents based on the selected page
    updatePageContents()
    {
        // update menus
        const ch = document.getElementById('topmenu').children;
        for(let i=0; i<ch.length; ++i) {
            ch[i].className = "";
        }
        document.getElementById(this.block).className = 'selected';

        const ch2 = document.getElementById('leftmenu').children;
        for(let i=0; i<ch2.length; ++i) {
            ch2[i].className = "";
        }
        document.getElementById(this.page).className = 'selected';

        // show page
        const id = this.page + '_' + this.block;
        const ch3 = document.getElementById('content').children;
        for(let i=0; i<ch3.length; ++i) {
            ch3[i].style.display = 'none';
        }
        try {
            document.getElementById(id).style.display = 'block';
        } catch(_) {
            document.getElementById('not_avaliable').style.display = 'block';
        }
    }


    updateDebuggers()
    {
    }


    // 
    // EVENTS
    //
        
    // called when a menu is clicked
    menuSelected(id) {
        if(id === 'doc' || id === 'debug' || id === 'test') {
            this.block = id;
        } else {
            this.page = id;
        }
        this.updatePageContents();
        window.sessionStorage.setItem('last_page', this.page);
        window.sessionStorage.setItem('last_block', this.block);
    }


    // called when "Development mode" box is checked
    developmentModeUpdated(c)
    {
        document.getElementById('dev').style.display = (c ? 'block' : 'none');
    }

    
    // 
    // PRIVATE
    //
    
    // return a letiable from a query string
    _getQueryString(key) {  
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
