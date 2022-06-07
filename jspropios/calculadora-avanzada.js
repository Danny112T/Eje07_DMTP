function agregardigito(digito){
    let display=document.getElementById("display");
    display.value= display.value + digito;   
}

function allClear(){
    document.getElementById("display").value='';
}

function agregarOperador(operador){
    let display = document.getElementById("display");
    display.value=display.value + operador;
}

function calcularResultado(){
    display.value=eval(display.value);
}

function calcularPotencia(){
    let display = document.getElementById("display");
    let base = eval(display.value);
    let exponente = document.getElementById("elevar_pontencia").value;
    let resultadoPotencia = Math.pow(base,exponente);
    display.value=resultadoPotencia;
}

function calcularRaiz(){
    let display = document.getElementById("display");
    let numero = eval(display.value);
    let resultadoPotencia = Math.sqrt(numero);
    display.value=resultadoPotencia;
}

function baseLog(){
    let display = document.getElementById("display");
    let y = eval(display.value);
    let x = document.getElementById("base_logaritmo").value;
    let resultadoLogaritmo = Math.log(y)/Math.log(x);
    display.value=resultadoLogaritmo;
}

function calcularLogaritmoNat(){
    let display = document.getElementById("display");
    let z = eval(display.value);
    let resultadoLn = Math.log(z);
    display.value = resultadoLn;
}

function calcularPorcentaje(){
    let display = document.getElementById("display");
    let numPor = eval(display.value);
    let porCien = document.getElementById("tanto_porciento").value;
    let resultadoPorciento = Math.floor(numPor*porCien)/100;
    display.value = resultadoPorciento;
}

function calcularFactorial(){
    let display = document.getElementById("display");
    let numFact = eval(display.value);
    let total = 1;
    for(i=1; i<=numFact; i++){
        total = total * i;
    }
    display.value = total;
}