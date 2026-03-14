// Esto es un comentario de una sola línea
/* Esto es un comentario
   de varias líneas */

// Tipos de datos
// Boolean
let esActivo: boolean = true; // let: El ámbito es local, funciona dentro del scrop (función, ciclo, if, {})
var esActivo2: boolean = false; // var: El ámbito es global, funciona en todo el programa
const esActivo3: boolean = true; // const: Para constantes, no se puede reasignar el valor

// Number
let entero: number = 25;
let enteroLargo: bigint = 901564646546546n;
let enteroLargo2: number = 901564646546546;
let real: number = 3.1416;
let binario: number = 0b101;
let octal: number = 0o011;
let hexadecimal: number = 0xA;

// String
let sigla: string = 'SIS257';
let materia: string = 'Desarrollo de Aplicaciones Int/Internet II';
let concatenar: string = sigla + ' - ' + materia;
let concatenar2: string = `${sigla} - ${materia}`; // Template literals
let mayusculas: string = materia.toUpperCase();
let minusculas: string = materia.toLowerCase();
let reemplazo: string = materia.replace(/i/g, '1').replace(/ /g, '_');
let repetir: string = sigla.repeat(3);
let sinEspaciosExtremos: string = ('     ' + materia + '        ').trim();
let subcadena: string = materia.substring(7, 20);
let logitud: number = materia.length;
let contiene: boolean = materia.includes('II');
let caracter: string = materia.charAt(5);
let separar: string[] = materia.split(' ');

// Array
let numeros: number[] = [1, 2, 3, 4, 5];
let palabras: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
let longitudArray: number = palabras.length;
let dobles: number[] = numeros.map(numero => numero * 2);
let revertir: number[] = numeros.reverse();
let factorial: number = numeros.reduce((prev, curr) => prev * curr, 1);
let impares: number[] = numeros.reverse().filter(numero => numero % 2 !== 0);
let ordenar: number[] = [2, 5, 3, 1, 4].sort((a, b) => a - b);
palabras.shift(); // Elimina el primer elemento del array
palabras.pop(); // Elimina el último elemento del array
palabras.unshift('cero'); // Agrega un elemento al inicio del array
palabras.push('seis'); // Agrega un elemento al final del array

// Tuple
let tuple = [1, 'uno', true] as [number, string, boolean];

// Enum
enum Sexo { M = 'Masculino', F = 'Femenino' };
enum Color { red = 'Rojo', green = 'Verde', Yellow = 'Amarillo' };

// Any
let cualquiera: any = 'Cualquier valor';
cualquiera = 123;
cualquiera = true;

// Object
let objeto: object = { nombre: 'Juan', edad: 20 };

// Estructuras de control
let incluye: boolean;
if (palabras.includes('tres')) incluye = true;
else incluye = false;
incluye = palabras.includes('tres') ? true : false; // Operador ternario
incluye = palabras.includes('tres');

// switch, while, do-while

for (let i = 0; i < palabras.length; i++) console.log(`for clásico: ${palabras[i]}`);
for (const palabra of palabras) console.log(`for of: ${palabra}`); // Obtiene valores
for (const indice in palabras) console.log(`for in: ${indice}`); // Obtiene posiciones
palabras.forEach(palabra => console.log(`forEach: ${palabra}`));

// Interface
interface IVehiculo {
   placa: string,
   chasis: string,
}
let automovil: IVehiculo = { placa: 'ABC123', chasis: 'ASDF3A4F5D4DSF' };

// Funciones
function saludar (nombre: string): void {
   console.log(`Hola ${nombre}`);
}
saludar('Juan Pérez');

function sumar(a: number, b: number): number {
   return a + b;
}
const sumar2 = (a: number, b: number): number => a + b;

console.log(sumar2(5, 6));
