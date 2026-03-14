"use strict";
// Esto es un comentario de una sola línea
/* Esto es un comentario
   de varias líneas */
Object.defineProperty(exports, "__esModule", { value: true });
// Tipos de datos
// Boolean
let esActivo = true; // let: El ámbito es local, funciona dentro del scrop (función, ciclo, if, {})
var esActivo2 = false; // var: El ámbito es global, funciona en todo el programa
const esActivo3 = true; // const: Para constantes, no se puede reasignar el valor
// Number
let entero = 25;
let enteroLargo = 901564646546546n;
let enteroLargo2 = 901564646546546;
let real = 3.1416;
let binario = 0b101;
let octal = 0o011;
let hexadecimal = 0xA;
// String
let sigla = 'SIS257';
let materia = 'Desarrollo de Aplicaciones Int/Internet II';
let concatenar = sigla + ' - ' + materia;
let concatenar2 = `${sigla} - ${materia}`; // Template literals
let mayusculas = materia.toUpperCase();
let minusculas = materia.toLowerCase();
let reemplazo = materia.replace(/i/g, '1').replace(/ /g, '_');
let repetir = sigla.repeat(3);
let sinEspaciosExtremos = ('     ' + materia + '        ').trim();
let subcadena = materia.substring(7, 20);
let logitud = materia.length;
let contiene = materia.includes('II');
let caracter = materia.charAt(5);
let separar = materia.split(' ');
// Array
let numeros = [1, 2, 3, 4, 5];
let palabras = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
let longitudArray = palabras.length;
let dobles = numeros.map(numero => numero * 2);
let revertir = numeros.reverse();
let factorial = numeros.reduce((prev, curr) => prev * curr, 1);
let impares = numeros.reverse().filter(numero => numero % 2 !== 0);
let ordenar = [2, 5, 3, 1, 4].sort((a, b) => a - b);
palabras.shift(); // Elimina el primer elemento del array
palabras.pop(); // Elimina el último elemento del array
palabras.unshift('cero'); // Agrega un elemento al inicio del array
palabras.push('seis'); // Agrega un elemento al final del array
// Tuple
let tuple = [1, 'uno', true];
// Enum
var Sexo;
(function (Sexo) {
    Sexo["M"] = "Masculino";
    Sexo["F"] = "Femenino";
})(Sexo || (Sexo = {}));
;
var Color;
(function (Color) {
    Color["red"] = "Rojo";
    Color["green"] = "Verde";
    Color["Yellow"] = "Amarillo";
})(Color || (Color = {}));
;
// Any
let cualquiera = 'Cualquier valor';
cualquiera = 123;
cualquiera = true;
// Object
let objeto = { nombre: 'Juan', edad: 20 };
// Estructuras de control
let incluye;
if (palabras.includes('tres'))
    incluye = true;
else
    incluye = false;
incluye = palabras.includes('tres') ? true : false; // Operador ternario
incluye = palabras.includes('tres');
// switch, while, do-while
for (let i = 0; i < palabras.length; i++)
    console.log(`for clásico: ${palabras[i]}`);
for (const palabra of palabras)
    console.log(`for of: ${palabra}`); // Obtiene valores
for (const indice in palabras)
    console.log(`for in: ${indice}`); // Obtiene posiciones
palabras.forEach(palabra => console.log(`forEach: ${palabra}`));
let automovil = { placa: 'ABC123', chasis: 'ASDF3A4F5D4DSF' };
// Funciones
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}
saludar('Juan Pérez');
function sumar(a, b) {
    return a + b;
}
const sumar2 = (a, b) => a + b;
console.log(sumar2(5, 6));
//# sourceMappingURL=index.js.map