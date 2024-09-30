import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TodoListComponent],
  template : `<app-todo-list></app-todo-list>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list-pwa';
}
