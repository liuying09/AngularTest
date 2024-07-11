import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessageComponent} from './message/message.component'
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
  { path: 'message', component: MessageComponent }, // 定義路徑
  { path: 'todolist', component: TodolistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
