import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

import { TodolistModule } from './todolist/todolist.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    LayoutComponent,
    Page404Component
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TodolistModule //將TodolistModule 引入進來使用
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
