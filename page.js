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
    if(get_query_string('dev')) {
        document.getElementById('dev_mode').checked = true;
        document.getElementById('dev').style.display = 'block';
        if(window.sessionStorage.getItem("last_page")) {
            page = window.sessionStorage.getItem("last_page");
            block = window.sessionStorage.getItem("last_block");
        }
    }

    initialize_debuggers();
    update_page();
};

// called when a menu is clicked
function menu(id) {
    if(id === 'doc' || id === 'debug' || id === 'test') {
        block = id;
    } else {
        page = id;
    }
    update_page();
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
function get_query_string(key) {  
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}


// update contents based on the selected page
function update_page()
{
    // update menus
    let ch = document.getElementById('topmenu').children;
    for(let i=0; i<ch.length; ++i) {
        ch[i].className = "";
    }
    document.getElementById(block).className = 'selected';

    ch = document.getElementById('leftmenu').children;
    for(let i=0; i<ch.length; ++i) {
        ch[i].className = "";
    }
    document.getElementById(page).className = 'selected';

    // update debuggers
    update_debuggers();

    // show page
    let id = page + '_' + block;
    ch = document.getElementById('content').children;
    for(let i=0; i<ch.length; ++i) {
        ch[i].style.display = 'none';
    }
    try {
        document.getElementById(id).style.display = 'block';
    } catch(_) {
        document.getElementById('not_avaliable').style.display = 'block';
    }
}


function initialize_debuggers()
{
    document.getElementById('mmap').innerHTML = tinyvm.debug();
}


function update_debuggers()
{
}


// vim: ts=4:sw=4:sts=4:expandtab
