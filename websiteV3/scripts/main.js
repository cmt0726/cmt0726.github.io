window.onload = function() {    
    document.getElementById('test').addEventListener('submit', submitFunction);
}
function submitFunction(e) {
    var fName = document.getElementById('text1').value;
    console.log(fName);
    e.preventDefault();
    var lName = document.getElementById('text2').value;
    console.log(lName);
    var eAddress = document.getElementById('text3').value;
    console.log(eAddress);
}
