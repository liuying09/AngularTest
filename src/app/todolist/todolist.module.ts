import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist.component';



@NgModule({
  declarations: [TodolistComponent],
  imports: [
    CommonModule
  ],
  exports:[TodolistComponent] // 需要讓TodolistComponent被其他module使用，所以也要放進exports
})
export class TodolistModule { }
