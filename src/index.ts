/*console.clear();
console.log("Lista Tomasza");*/

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
const inquirer = require('inquirer'); //działające dla wersji 7.3.3
// w książce podana jest inport, który się kompiluje ale przy uruchomieniu wywala błąd
//import * as inquirer from 'inquirer';


//import { input } from '@inquirer/prompts'

let todos: TodoItem[] = [
    new TodoItem(1, "Kupić kwiaty"),
    new TodoItem(2, "Odebrać buty"),
    new TodoItem(3, "Zamówić bilety"),
    new TodoItem(4, "Zadzwonić do Siebie", true)
];

let collection: TodoCollection = new TodoCollection("Tomasz", todos);
let showCompleted = true;

let newId: number = collection.addTodo("Iść pobiegać");
let todoItem: TodoItem = collection.getTodoById(newId);

function displayTodoList(): void {
    console.log(`Lista ${collection.userName}a `
        + `(liczba zadań pozostałych do zrobienia: ${
            collection.getItemCounts().incomplete })`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
   //Toggle = "Pokaż lub ukryj wykonane",
    Quit = "Koniec"
}

function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt([{
        type: "list",
        name: "command",
        message: "Wybierz opcję",
        choices: Object.values(Commands)
        //badProperty: true
    }]).then(answers => {
        if (answers["command"] !== Commands.Quit){
            promptUser();
        }
        /*
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
        }
                */
    });
}

promptUser();

//console.log(`Lista ${collection.userName}a `+ `(liczba zadań pozostałych do zrobienia: ${ collection.getItemCounts().incomplete})`);
//todoItem.printDetails();
/*for (let i=0; i<newId; i++) {
    todos[i].printDetails();
}*/

//collection.addTodo(todoItem);
//collection.removeComplete();

//console.log(JSON.stringify(todoItem));