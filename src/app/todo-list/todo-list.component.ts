import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class TodoListComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle,
        status: 'pending'
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }

  changeStatus(task: Task) {
    if (task.status === 'pending') {
      task.status = 'in-progress';
    } else if (task.status === 'in-progress') {
      task.status = 'completed';
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }



  deferredPrompt: any;
  showInstallButton = false;

  ngOnInit(): void {
    // Escucha el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (event) => {
      // Evita que el prompt se muestre automáticamente
      event.preventDefault();

      // Almacena el evento para usarlo más tarde
      this.deferredPrompt = event;

      // Muestra el botón de instalación
      this.showInstallButton = true;
    });
  }

  installPWA() {
    if (this.deferredPrompt) {
      // Muestra el prompt de instalación
      this.deferredPrompt.prompt();

      // Maneja la elección del usuario
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar la PWA');
        } else {
          console.log('El usuario rechazó instalar la PWA');
        }
        this.deferredPrompt = null; // Limpia el evento después de usarlo
      });
    }
  }
}
