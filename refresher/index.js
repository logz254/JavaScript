console.log('Hello World');

let name = 'Logz'; //String Literal
console.log(name);

const interestRate = 0.3;
//interestRate = 1; Need to use let in prev. for this to work
console.log(interestRate);

let age = 30; //Number Literal
let isApproved = false; //Boolean Literal
let firstName = undefined;
let lastName = null;

let person = {  //Object
    name: 'John',
    age: 70
};

//Dot Notation for accessing object
person.age = 200;
person.name = 'Allan';

//Bracket Notation for accessing object
person['name'] = 'Julie';
person['age'] = 90;
console.log(person);

//Arrays
let selectedColors = ['red','blue'];
selectedColors[2] = 'green';
selectedColors[3] = 1;
console.log(selectedColors.length);

//Functions
//performing a task
function greet(name,lastName)
{

    console.log('Hello ' + name + ' ' + lastName);
}

greet('James');
greet('Grace','Muhondo');

//calculate a value
function square(number)
{
    return number * number;
}

console.log(square(4));