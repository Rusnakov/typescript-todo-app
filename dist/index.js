"use strict";
/*console.clear();
console.log("Lista Tomasza");*/
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const inquirer = require("inquirer"); //działające dla wersji 7.3.3
// w książce podana jest inport, który się kompiluje ale przy uruchomieniu wywala błąd
//import * as inquirer from 'inquirer';
//import { input } from '@inquirer/prompts'
let todos = [
    new todoItem_1.TodoItem(1, "Kupić kwiaty"),
    new todoItem_1.TodoItem(2, "Odebrać buty"),
    new todoItem_1.TodoItem(3, "Zamówić bilety"),
    new todoItem_1.TodoItem(4, "Zadzwonić do Siebie", true),
];
let collection = new todoCollection_1.TodoCollection("Tomasz", todos);
let showCompleted = true;
let newId = collection.addTodo("Iść pobiegać");
let todoItem = collection.getTodoById(newId);
function displayTodoList() {
    console.log(`Lista ${collection.userName}a ` +
        `(liczba zadań pozostałych do zrobienia: ${collection.getItemCounts().incomplete})`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Toggle"] = "Poka\u017C lub ukryj wykonane";
    Commands["Quit"] = "Koniec";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer
        .prompt([
        {
            type: "list",
            name: "command",
            message: "Wybierz opcję",
            choices: Object.values(Commands),
            badProperty: true
        },
    ])
        .then((answers) => {
        /*
        if (answers["command"] !== Commands.Quit) {
          promptUser();
        }
        */
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
        }
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
