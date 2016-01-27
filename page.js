'use strict';

// this source file contains everything that is necessary for managing
// the web page

// 
// GLOBALS
//
let page = 'about';
let block = 'doc';


//
// EVENTS
//

// called when page is loaded
window.onload = function()
{
    // are we in development mode?
    if(getQueryString('dev')) {
        document.getElementById('dev_mode').checked = true;
        document.getElementById('dev').style.display = 'block';
        if(window.sessionStorage.getItem("last_page")) {
            page = window.sessionStorage.getItem("last_page");
            block = window.sessionStorage.getItem("last_block");
        }
    }

    initializePage();
    updatePage();
};


// called when a menu is clicked
function menu(id) {
    if(id === 'doc' || id === 'debug' || id === 'test') {
        block = id;
    } else {
        page = id;
    }
    updatePage();
    window.sessionStorage.setItem('last_page', page);
    window.sessionStorage.setItem('last_block', block);
}


// called when "Development mode" box is checked
function update_dev_mode(c)
{
    document.getElementById('dev').style.display = (c ? 'block' : 'none');
}


// 
// FUNCTIONS
//


// return a letiable from a query string
function getQueryString(key) {  
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}


// update contents based on the selected page
function updatePage()
{
    // update menus
    const ch = document.getElementById('topmenu').children;
    for(let i=0; i<ch.length; ++i) {
        ch[i].className = "";
    }
    document.getElementById(block).className = 'selected';

    const ch2 = document.getElementById('leftmenu').children;
    for(let i=0; i<ch2.length; ++i) {
        ch2[i].className = "";
    }
    document.getElementById(page).className = 'selected';

    // update debuggers
    updateDebuggers();

    // show page
    const id = page + '_' + block;
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


function initializePage()
{
    // initialize empty sections
    document.getElementById('mmap').innerHTML = tinyvm.mmapDebug();

    // initialize tag "memory_data"
    [].forEach.call(document.getElementsByClassName('memory_data'), e => {
        createMemoryData(e);
    });
}


function updateDebuggers()
{
}


// vim: ts=4:sw=4:sts=4:expandtab
