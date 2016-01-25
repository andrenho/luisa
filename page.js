'use strict';

// this source file contains everything that is necessary for managing
// the web page

// 
// GLOBALS
//
var page = 'about';
var block = 'doc';


//
// EVENTS
//

// called when page is loaded
window.onload = function()
{
    update_page();

    // are we in development mode?
    if(get_query_string('dev')) {
        document.getElementById('dev_mode').checked = true;
        document.getElementById('dev').style.display = 'block';
    }
}

// called when a menu is clicked
function menu(id) {
    if(id == 'doc' || id == 'debug' || id == 'test') {
        block = id;
    } else {
        page = id;
    }
    update_page();
}


function update_dev_mode(c)
{
    document.getElementById('dev').style.display = (c ? 'block' : 'none');
}


// 
// FUNCTIONS
//

function get_query_string(key) {  
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

function update_page()
{
    // update menus
    var ch = document.getElementById('topmenu').children;
    for(var i=0; i<ch.length; ++i) {
        ch[i].className = "";
    }
    document.getElementById(block).className = 'selected';

    var ch = document.getElementById('leftmenu').children;
    for(var i=0; i<ch.length; ++i) {
        ch[i].className = "";
    }
    document.getElementById(page).className = 'selected';

    // show page
    var id = page + '_' + block;
    var ch = document.getElementById('content').children;
    for(var i=0; i<ch.length; ++i) {
        ch[i].style.display = 'none';
    }
    try {
        document.getElementById(id).style.display = 'block';
    } catch(_) {
        document.getElementById('not_avaliable').style.display = 'block';
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
