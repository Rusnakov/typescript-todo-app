/*console.clear();
console.log("Lista Tomasza");*/

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
const inquirer = require("inquirer"); //działające dla wersji 7.3.3
// w książce podana jest inport, który się kompiluje ale przy uruchomieniu wywala błąd
//import * as inquirer from 'inquirer';
//import { input } from '@inquirer/prompts'
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Kupić kwiaty"),
  new TodoItem(2, "Odebrać buty"),
  new TodoItem(3, "Zamówić bilety"),
  new TodoItem(4, "Zadzwonić do Siebie", true),
];

let collection: TodoCollection = new JsonTodoCollection("Tomasz", todos);
let showCompleted = true;

let newId: number = collection.addTodo("Iść pobiegać");
let todoItem: TodoItem = collection.getTodoById(newId);

function displayTodoList(): void {
  console.log(
    `Lista ${collection.userName}a ` +
      `(liczba zadań pozostałych do zrobienia: ${
        collection.getItemCounts().incomplete
      })`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Dodaj nowe zadanie",
  Complete = "Wykonanie zadania",
  Toggle = "Pokaż lub ukryj wykonane zadania",
  Purge = "Usuń wykonane zadania",
  Quit = "Koniec",
}

function promptAdd(): void {
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

function promptComplete(): void {
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
      let completedTask = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTask.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}

function promptUser(): void {
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
          } else {
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
