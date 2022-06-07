function Suma(){
    //1.- referencia a los objetos del documento html
    let Num1 = document.getElementById("Num1").value;
    let Num2 = document.getElementById("Num2").value;
    let suma = Number(Num1) + Number(Num2);
    alert("La suma es: "+suma);
}
function Resta(){
    let Num1 = document.getElementById("Num1").value;
    let Num2 = document.getElementById("Num2").value;
    let resta = Num1 - Num2;
    alert("La resta es: "+resta);
}

function Multi(){
    let Num1 = document.getElementById("Num1").value;
    let Num2 = document.getElementById("Num2").value;
    let multi = Num1 * Num2;
    alert("La multiplicación es: "+multi);
}

function Division(){
    let Num1 = document.getElementById("Num1").value;
    let Num2 = document.getElementById("Num2").value;
    let div = Num1 / Num2;
    alert("La división es: "+div);
}