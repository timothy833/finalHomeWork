<template>
<div id="todoListPage" class="bg-half">
    <nav>
      <ul>
          <li><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="Logo"></li>
          <li class="todo_sm"><span>{{ store.userName }}</span></li>
          <li><a @click.prevent="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
    <div class="todoList_Content">
        <!-- 新增待辦事項 -->
        <div class="inputBox">
        <input v-model="addTodoItem" type="text" placeholder="請輸入待辦事項">
        <a @click.prevent="addTodo">
            <i class="fa fa-plus">+</i>
        </a>
        </div>
        <div class="todoList_list">
        <ul class="todoList_tab">
            <li><a  @click.prevent="change = 'all'" :class="{ active: change === 'all' }">全部</a></li>
            <li><a  @click.prevent="change = 'pending'" :class="{ active: change === 'pending' }">待完成</a></li>
            <li><a  @click.prevent="change = 'completed'" :class="{ active: change === 'completed' }">已完成</a></li>
        </ul>

        <div v-if="store.todos.length === 0" class="empty-message">
            目前尚無待辦事項
        </div>
        <div v-else class="todoList_items">
            <ul class="todoList_item">
            <!-- 待辦事項列表 -->
            <li v-for="todo in changeTodo" :key="todo.id">
                <label class="todoList_label">
                <!-- 狀態事項狀態切換 -->
                <input  v-if="change === 'all'" class="todoList_input" type="checkbox" :checked="todo.status" @change="toggle(todo.id)">
                <span>{{ todo.content }}</span>
                <!-- 刪除待辦事項 -->
                <a  v-if="change === 'all'" @click.prevent="deleteTodo(todo.id)">
                    刪除
                </a>
                </label>
                <div class="editBox">
                <button v-if="change === 'all'" @click="toggleEditing(todo)">
                    編輯
                </button>
                <input v-if="todo.isEditing" v-model="todo.updateContent" type="text" placeholder="編輯待辦事項">
                <button v-if="todo.isEditing" @click="update(todo.id,todo.updateContent)">確認</button>
                </div>
            </li>
            </ul>
            <div v-if="change === 'all'" class="todoList_statistics">
            <p>{{ pendingCount }} 個待完成項目</p>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>
<script setup>
import { ref, computed, onMounted} from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const store = useUserStore();

onMounted(() => {
 store.initTodolist();
});

const router = useRouter();

// 待辦事項相關
const addTodoItem = ref('');
const change = ref("all"); // 'all', 'pending', 'completed'

// 新增待辦事項函數
const addTodo = async () => {
  await store.addTodo(addTodoItem.value);
  addTodoItem.value = '';
};

// 刪除待辦事項函數
const deleteTodo = async (id) => {
  await store.deleteTodo(id);
};



// 更新待辦事項
const update = async (id,updateItem) => {
  await store.update(id,updateItem);
};

// 切換待辦事項狀態
const toggle = async (id) => {
  await store.toggle(id);
};

// 切換頁面顯示的待辦事項
const changeTodo = computed(() => {
  if (change.value === 'pending') {
    return store.todos.filter(todo => !todo.status);
  } else if (change.value === 'completed') {
    return store.todos.filter(todo => todo.status);
  }
  return store.todos;
});

// 計算待完成項目數量
const pendingCount = computed(() => {
  return store.todos.filter(todo => !todo.status).length;
});

// 登出功能
const signOut = async () => {
  await store.signOut();
  await router.push('/');
};

const toggleEditing = (todo) => {
    todo.isEditing = !todo.isEditing;
};

</script>

<style scoped>
.bg-half {
  background-image: linear-gradient(175deg, #FFD370 60%, #fff 40%);
}




.logoImg {
  position: absolute;
  margin: 25px;
  top: 0;
  left: 0;;
  width: 300px;
  height: auto;
}

.container {
  margin: 0 auto;
  padding: 87px 32px;
}

@media (max-width: 576px) {
  .container {
    padding: 18px 32px;
  }
}

.vhContainer {
  min-height: 100vh;
}

nav {
  /* display: flex;
  justify-content:flex-end; */
  padding: 24px 32px 0 32px;
}


@media (max-width: 576px) {
  nav {
    margin-bottom: 16px;
  }
}

nav ul {
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
}

@media (max-width: 576px) {
  nav ul li {
    margin-top: 1px;
  }
}

nav ul a {
  text-decoration: none;
  color: #333333;
  margin-left: 24px;
}

@media (max-width: 576px) {
  nav ul a {
    margin-left: 0;
    position: relative;
    right: -1rem;
  }

  .logoImg {
  margin: 1rem;
  top: 0;
  left: 0;;
  width: 250px;
  height: auto;
}
}

nav ul a:hover {
  color: #d87355;
}

nav ul a span {
  font-weight: bold;
}



@media (max-width: 576px) {
  nav ul .todo_sm {
    display: none;
  }
}

.todoListPage {
  padding: 16px 32px;
}

@media (max-width: 576px) {
  .todoListPage {
    background-image: linear-gradient(175deg, #FFD370 100%, #fff 0%);
  }
}

.todoList_Content {
  width: 500px;
  margin: 1rem auto;
}

@media (max-width: 576px) {
  .todoList_Content {
    width: 100%;
  }

  .editBox input{
    width: 65%;
  }    
}

.inputBox {
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 16px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
}

.inputBox input {
  background: #fff;
  border: none;
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 47px;
  font-size: 1rem;
  padding-left: 16px;
}

.inputBox a {
  display: block;
  width: 40px;
  height: 39px;
  position: absolute;
  background: #333333;
  color: white;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  top: 4px;
  right: 4px;
  padding: 10px;
}

.todoList_list {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 5px;
}

.todoList_list .todoList_tab {
  display: flex;
  justify-content: space-evenly;
}

.todoList_list .todoList_tab li {
  width: 100%;
}

.todoList_list .todoList_tab a {
  display: block;
  color: #9F9A91;
  text-decoration: none;
  line-height: 20px;
  font-weight: bold;
  text-align: center;
  padding: 16px;
  border-bottom: 2px solid #efefef;
}

.todoList_list .todoList_tab .active {
  color: #333333;
  border-bottom: 2px solid #333333;
}

.empty-message {
  text-align: center;
  padding: 20px;
  color: #555;
}


.todoList_list .todoList_items {
  padding-top: 23px;
  padding-left: 24px;
  padding-right: 17px;
  padding-bottom: 32px;
}

.todoList_list .todoList_items .todoList_item {
  margin-bottom: 8px;
}

.todoList_list .todoList_items .todoList_label {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
  color: #333333;
  line-height: 20.27px;
  word-break: break-word; 
  white-space: normal; 
  justify-content: space-between;
}

.todoList_label span {
  flex-grow: 1; /* 讓文字區域自動填充可用空間 */
  margin-left: 10px; 
  margin-right: 10px; 
  text-align: left; 
  word-break: break-word; /* 長文本會自動換行 */
}

.todoList_label a {
  display: inline-block;
  width: 40px; 
  height: 30px; 
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #fff; 
  background-color: #333333; 
  border-radius: 5px;
  margin-left: 10px;
  flex-shrink: 0; 
  flex-grow: 0; 
}
.todoList_list .todoList_items .todoList_input {
  width: 20px;
  height: 20px;
  border: 1px solid #9F9A91;
  border-radius: 5px;
  margin-right: 16px;
  flex-shrink: 0; 
  flex-grow: 0; 
}


.todoList_list .todoList_items .todoList_input:checked ~ span {
  color: #9F9A91;
  text-decoration: line-through;
  transition: all 0.4s ease-in-out;
}

.todoList_list .todoList_items li {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
}



.todoList_list .todoList_statistics {
  display: flex;
  justify-content: space-between;
}

.todoList_list .todoList_statistics p {
  color: #333333;
  font-size: 0.875rem;
}

.todoList_list .todoList_statistics a {
  color: #9F9A91;
  font-size: 0.875rem;
  text-decoration: none;
}

.editBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  gap: 5px; 
  margin-left: 2.1rem; 
  margin-top: 5px;
}

.editBox button{
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 4px 6px;
  cursor: pointer;
  margin-top: 5px;
  white-space: nowrap;

}

.editBox input {

  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.todoList_input {
  width: 20px;
  height: 20px;
  border: 1px solid #9F9A91;
  border-radius: 5px;
 
}

.todoList_item li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  flex-wrap: wrap; /* 允許項目在需要時換行 */
}

</style>