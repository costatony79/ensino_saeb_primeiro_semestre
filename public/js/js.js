function semautocompletar(){
    var inputs = querySelectorAll('input[type="text"], input[type="password"]');

    for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('autocomplete', 'off');
    }
   
    console.log("Recebendo o semautocompletar");
}

module.exports = semautocompletar;
