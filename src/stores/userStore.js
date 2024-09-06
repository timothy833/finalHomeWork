import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userName: '',
    todos: [],
    api: 'https://todolist-api.hexschool.io',
  }),
  actions: {
    initTodolist() {
      const token = localStorage.getItem('token');
      const userName = localStorage.getItem('userName');
      if(token && userName){
        this.token = token;
        this.userName = userName;
        this.fetchTodos();
      }
    },

    async fetchTodos() {
      try {
        const res = await axios.get(`${this.api}/todos`, {
          headers: {
            Authorization: this.token,
          },
        });
        this.todos = res.data.data;
        console.log(res.data, '取得待辦事項成功');
      } catch (error) {
        console.error("取得待辦事項失敗", error);
      }
    },

    async addTodo(addTodoItem) {
      try {
        const res = await axios.post(`${this.api}/todos`, {
          content: addTodoItem,
        }, {
          headers: {
            Authorization: this.token,
          },
        });
        console.log(res.data, '新增待辦事項成功');
        addTodoItem = ''; // 清空輸入框
        this.fetchTodos();
      } catch (error) {
        console.error("新增待辦事項失敗", error);
      }
    },

    async deleteTodo(id) {
      try {
        const res = await axios.delete(`${this.api}/todos/${id}`, {
          headers: {
            Authorization: this.token,
          },
        });
        console.log(res.data, '刪除待辦事項成功');
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error("刪除待辦事項失敗", error);
      }
    },

    async update(id, updateItem) {
      try {
        const todo = this.todos.find(todo => todo.id === id);
        const res = await axios.put(`${this.api}/todos/${id}`, {
          content: updateItem,
        }, {
          headers: {
            Authorization: this.token,
          },
        });
        console.log(res.data);
        todo.content = updateItem;
        todo.isEditing = false;
        updateItem = '';
        alert("更新待辦事項成功");
        this.fetchTodos();
      } catch (error) {
        console.error("更新待辦事項失敗", error);
      }
    },

    async toggle(id) {
      try {
        const res = await axios.patch(`${this.api}/todos/${id}/toggle`, {}, {
          headers: {
            Authorization: this.token,
          },
        });
        console.log(res.data);
        const todo = this.todos.find(todo => todo.id === id);
        todo.status = !todo.status;
        console.log(res.data, '切換待辦事項成功');
      } catch (error) {
        console.error("切換待辦事項狀態失敗", error);
      }
    },

    async signOut() {
      try {
        await axios.post(`${this.api}/users/sign_out`, {}, {
          headers: {
            Authorization: this.token,
          },
        });
        console.log("登出成功");
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        alert("登出成功")
      } catch (error) {
        console.error("登出失敗", error);
      }
    },
  },
});
