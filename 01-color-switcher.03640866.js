const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,console.log(1),n=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;o.setAttribute("style",`background-color: ${t}`)}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}));let n=null;
//# sourceMappingURL=01-color-switcher.03640866.js.map
