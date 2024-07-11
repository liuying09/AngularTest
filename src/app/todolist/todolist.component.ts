import { Component, OnInit } from '@angular/core';

import { TodolistService } from './todolist.service';

import { Todo } from './todo.model';

import { TodoStatusType } from './todo-status-type';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  // 在 constructor 宣告參數的時候， TypeScript 預設會幫我們建立一個同名變數，並把參數指定給那個同名變數
  constructor(private todoListService: TodolistService) {}

  /** 待辦事項狀態的列舉 */
  todoStatusType = TodoStatusType;

  /** 目前狀態 */
  private status = TodoStatusType.All;

  ngOnInit(): void {}

  /** 新增代辦 */
  addTodo(event: KeyboardEvent): void {
    const todoThing = event.target as HTMLInputElement;

    if (!todoThing) {
      return;
    }
    if (event.key === 'Enter') {
      const todo = todoThing.value.trim();
      this.todoListService.add(todo);
      todoThing.value = '';
    }
  }

  /** 取得待辦事項清單 冒號後面是回傳型別 */
  getList(): Todo[] {
    let list: Todo[] = [];

    switch (this.status) {
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;

      default:
        list = this.todoListService.getList();
        break;
    }

    return list;
  }

  /** 移除待辦事項 
  *  @param {number} index - 待辦事項的索引位置
  */
  remove(index: number): void {
    this.todoListService.remove(index);
  }

  /**
   * 開始編輯待辦事項
   * @param {Todo} todo
   */
  edit(todo: Todo): void {
    todo.editable = true;
  }

  /**
   * 更新待辦事項
   * @param {Todo} todo - 原本的待辦事項
   * @param {string} newTitle - 新的事項名稱
   */
  update(todo: Todo, newTitle: string): void {
    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();

    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editable = false;

      // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  /**
   * 取消編輯狀態
   * @param {Todo} todo - 欲取消編輯狀態的待辦事項
   */
  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  /**
   * 取得未完成的待辦事項清單
   * @returns {Todo[]}
   */
  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  /**
   * 取得已完成的待辦事項
   * @returns {Todo[]}
   */
  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  /**  取得目前所在頁籤的事項 */
  getTotalCount(): Todo[] {
    return this.getList();
  }

  /**
   * 設定狀態
   * @param {number} status - 欲設定的狀態
   */
  setStatus(status: number): void {
    this.status = status;
  }


  /**
   * 檢查目前狀態
   * @param {number} status - 欲檢查的狀態
   * @returns {boolean}
   */
  checkStatus(status: number): boolean {
    return this.status === status;
  }

  /** 從清單中移除所有已完成之待辦事項 */
  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }

  /**
   * 取得所有的待辦事項清單（不受狀態影響）
   * @returns {Todo[]}
   */
  getAllList(): Todo[] {
    return this.todoListService.getList();
  }

  /**
   * 所有的代辦事項是否都已完成
   * @returns {boolean}
   */
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }

  /**
   * 設定所有的待辦事項已完成/未完成
   * @param {boolean} completed - 已完成/未完成
   */
  setAllTo(completed: boolean): void {
    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  }
}
