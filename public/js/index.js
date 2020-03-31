
function setListeners(){

window.addEventListener("keydown",function(event){
    alert(event.key);
    // event.key
    var opA=document.getElementById("changeOPT1").value;
    if(opA.charCodeAt(0) <=97)
        opA.toLowerCase();
    if(event.key===opA){
        document.getElementById("opt1").checked=true;
        document.getElementById("opt1").form.submit();
    }
    if(event.keyCode===66){
        document.getElementById("opt2").checked=true;
        document.getElementById("opt2").form.submit();   
    }
    if(event.keyCode===67){
        document.getElementById("opt3").checked=true;
        document.getElementById("opt3").form.submit();
    }
    if(event.keyCode===68){
        document.getElementById("opt4").checked=true;
        document.getElementById("opt4").form.submit();
    }
});

}
