"use strict";
/*console.clear();
console.log("Lista Tomasza");*/
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer"); //działające dla wersji 7.3.3
// w książce podana jest inport, który się kompiluje ale przy uruchomieniu wywala błąd
//import * as inquirer from 'inquirer';
//import { input } from '@inquirer/prompts'
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Kupić kwiaty"),
    new todoItem_1.TodoItem(2, "Odebrać buty"),
    new todoItem_1.TodoItem(3, "Zamówić bilety"),
    new todoItem_1.TodoItem(4, "Zadzwonić do Siebie", true),
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Tomasz", todos);
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
    Commands["Add"] = "Dodaj nowe zadanie";
    Commands["Complete"] = "Wykonanie zadania";
    Commands["Toggle"] = "Poka\u017C lub ukryj wykonane zadania";
    Commands["Purge"] = "Usu\u0144 wykonane zadania";
    Commands["Quit"] = "Koniec";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer
        .prompt({ type: "input", name: "add", message: "Podaj zadanie:" })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Oznaczenie zadań jako wykonanych",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            chcked: item.complete,
        })),
    })
        .then((answers) => {
        let completedTask = answers["complete"];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTask.find((id) => id === item.id) != undefined));
        promptUser();
    });
}
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
            badProperty: true,
        },
    ])
        .then((answers) => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
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
