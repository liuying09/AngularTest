import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessageComponent} from './message/message.component'
import { TodolistComponent } from './todolist/todolist.component';

import { LoginComponent } from './login/login.component';

import { LayoutComponent } from './layout/layout.component';
import { Page404Component } from './page404/page404.component';

/* 路由具有順序性，會從頭一個一個比對 */

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', 
    component: LayoutComponent,
    children:[
      { path: 'message', component: MessageComponent }, // 定義路徑
      { path: 'todolist', component: TodolistComponent },
      {
        path: '',
        redirectTo: 'message',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'page404',
    component: Page404Component   // 404頁面
  },
  { path: '', 
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'page404', // 無符合的路徑皆到404頁面
    pathMatch: 'full'
  }

  // { path: '', component: MessageComponent }, // 預設路由第一頁都會到這
  // { path: 'login', component: LoginComponent },
  // { path: 'message', component: MessageComponent }, // 定義路徑
  // { path: 'todolist', component: TodolistComponent },
  // {
  //   path: '**',       // 萬用路由 or 轉向路由, 表示路徑可為任意值，如設定中的路由path都不符合時，就會跑萬用路由將位置導至(redirectTo)所指定的路徑
  //   redirectTo: '',   // 重新導向到 '' 路徑
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
