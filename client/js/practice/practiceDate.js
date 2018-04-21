
class Conta {
    constructor(saldo){
        this._saldo = saldo;
    }

    get saldo(){
        return this._saldo;
    }

    update(taxa){
        throw new Error('This method must be implemented!');
    }
}

class ContaCorrente extends Conta{
    update(taxa){
        this._saldo += this.saldo + taxa;
    }
}

class ContaPoupanca extends Conta{
    update(taxa){
        this._saldo += this.saldo + (2*taxa);
    }
}

let cc = new ContaCorrente(200);
let cp = new ContaPoupanca(200);

cc.update(2);
cp.update(2);

console.log(cc);
console.log(cp);
























// let dataString = '01-01-2018';

// let date = new Date(
//     ...dataString.split('-')
//     .reverse()
//     .map((item, index) => item - index % 2)
// );

// let lista1 = ['banana', 'laranja', 'mamão'];
// let lista2 = ['caju', 'tangerina', 'abacaxi'];

// lista1.push(...lista2);
// console.log(lista1);


// let numbers = [3,2,11,20,8,7];
// console.log(doubleOdds(numbers));
// console.log(numbers);

// let numeros = [10, 30];
// console.log(somaDoisNumeros(...numeros));



// class Aluno {

//     constructor(matricula, nome) {
//         this.matricula = matricula;
//         this.nome = nome;
//     }
// }

// class Prova {

//     constructor(aluno, nota) {
//         this.aluno = aluno;
//         this.nota = nota;
//     }
// }


// var avaliacoes = [
//     new Prova(new Aluno(1, 'Luana'), 8),
//     new Prova(new Aluno(2, 'Cássio'), 6),
//     new Prova(new Aluno(3, 'Barney'), 9),
//     new Prova(new Aluno(4, 'Bira'), 5)
// ];


// var aprovados = avaliacoes
//     .filter( (prova) => prova.nota >= 7)
//     .map( (prova) => prova.aluno.nome)

// console.log(aprovados);

// function somaDoisNumeros(numero1, numero2) {
//     return numero1 + numero2;                                            
// }


// function doubleOdds(numbers){
//     let newList = numbers.map((item) => {
//         if(item % 2 != 0){
//             return item * 2
//         }
//         return item
//     })

//     return newList;
// }

// class Code {
//     constructor(code){
//         this._code = this.validate(code);
//     }

//     validate(code){
//         if(!/\D{3}-\D{2}-\d{2}/.test(code)){
//             throw new Error('invalid code');
//         }else{
//             return code;
//         }
//     }
// }

// let code = new Code('DDD-DD-22');
// console.log(code);


// function exibeNoConsole(lista) {
//     lista.forEach(item => console.log(item));
// }

// let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];

// let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];

// let juntada = listaDeNomes1.concat(listaDeNomes2);

// exibeNoConsole(juntada);


// class ConversorXML {

//     static converte(objeto) {
//         // converte um objeto em XML
//     }
// }
// //Agora, vamos criar uma instância desta classe e chamar o método converte:

// ConversorXML.converte({nome: 'Guaraci', idade: 40});


