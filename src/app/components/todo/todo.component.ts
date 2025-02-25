import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  tareas: {
    texto: string,
    completada: boolean,
    fechaCreacion: Date,
    prioridad: string,
    vencida: boolean
  }[] = [];

  nuevaTarea: string = '';
  tareaEditadaIndex: number | null = null;
  filtro: string = 'todas';
  prioridad: string = 'Media';
  busqueda: string = '';

  ngOnInit() {
    this.cargarTareas();
  }

  agregarTarea() {
    if (this.nuevaTarea.trim() === '') {
      alert('La tarea no puede estar vacía.');
      return;
    }
    
    const nuevaTarea = { 
      texto: this.nuevaTarea.trim(),
      completada: false,
      fechaCreacion: new Date(),
      prioridad: this.prioridad,
      vencida: false 
    };

    if (this.tareaEditadaIndex === null) {
      //Si no estamos editando
      this.tareas.push(nuevaTarea);
    } else {
      //Si estamos editando
      this.tareas[this.tareaEditadaIndex] = nuevaTarea;
      this.tareaEditadaIndex = null;
    }

    this.nuevaTarea = '';
    this.guardarTareas();
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    this.guardarTareas();
  }

  //Marcar o desmarcar una tarea
  toggleTarea(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
    this.guardarTareas();
  }

  //Editar tarea
  editarTarea(index: number) {
    this.nuevaTarea = this.tareas[index].texto;
    this.prioridad = this.tareas[index].prioridad;
    this.tareaEditadaIndex = index;
  }

  //Marcar todas las tareas como completadas
  marcarTodasCompletadas() {
    this.tareas.forEach(tareas => tareas.completada = true);
    this.guardarTareas();
  }

  //Limpiar todas las tareas
  limpiarTareas() {
    this.tareas = [];
    this.guardarTareas();
  }

  //Filtrar tareas (completadas, pendientes o todas)
  filtrarTareas() {
    return this.tareas.filter(tarea => 
      (this.filtro === 'todas' || 
      (this.filtro === 'completadas' && tarea.completada) ||
      (this.filtro === 'pendientes' && !tarea.completada)) &&
      tarea.texto.toLowerCase().includes(this.busqueda.toLowerCase()) // Filtra por búsqueda
    );
  }

  //Guardar las tareas en Local Storage
  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  //Cargar las tareas desde el localStorgae
  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas)
    }
  }

  //Verificar si la tarea ha vencido (Si pasa un tiempo determinado)
  vertificarVencidas(){
    const fechaLimite = 7;
    this.tareas.forEach(tarea => {
      if(!tarea.completada){
        const diasPasados = (new Date().getTime() - new Date(tarea.fechaCreacion).getTime()) / (1000 * 3600 * 24);
        if(diasPasados > fechaLimite){
          tarea.vencida = true;
        }
      }
    });
    this.guardarTareas();
  }
}
