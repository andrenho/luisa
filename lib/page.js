"use strict";var tinyvm;var dbg;window.onload=function(){var b=[];b=b.concat(CPU.encode("movd [0xF0016014], 65"));b=b.concat(CPU.encode("movd [0xF0016018], 5"));b=b.concat(CPU.encode("movd [0xF001601C], 5"));b=b.concat(CPU.encode("movd [0xF0016020], 0"));b=b.concat(CPU.encode("movd [0xF0016024], 0xFF0000"));b=b.concat(CPU.encode("movb [0xF0016012], 0x5"));tinyvm=new TinyVM(256,[],document.getElementById("canvas"),new Uint8Array(b));dbg=new Debugger(tinyvm);document.onkeypress=function(e){if(e.code==="KeyD"){document.getElementById("debugger_input").focus();return false}};document.getElementById("debugger_input").onkeypress=function(e){if(!e){e=window.event}var keyCode=e.keyCode||e.which;if(keyCode==13){var txt=document.getElementById("debugger_input").value;var output=document.getElementById("debugger_output");var pr=dbg.parse(txt).replace(/ /g,"&nbsp;").split("\n").join("<br>");output.innerHTML="<div>"+pr+"</div><div>- <b>"+txt+"</b></div>"+output.innerHTML;document.getElementById("debugger_input").value="";return false}};document.getElementById("clear_debugger").onclick=function(e){document.getElementById("debugger_output").innerHTML=""}};