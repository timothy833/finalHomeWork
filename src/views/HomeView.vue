<template>

  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html" @submit.prevent="signIn">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input v-model="signInEmail" class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required>
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input v-model="signInPassword"  class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
          <input class="formControls_btnSubmit" type="submit" onclick="javascript:location.href='#todoListPage'" value="登入">
          <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>
        </form>
      </div>
    </div>
  </div>
  
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html" @submit.prevent="submitForm">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input v-model="signUpEmail" class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input v-model="signUpNickname" class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱">
          <label class="formControls_label" for="pwd">密碼</label>
          <input v-model="signUpPassword" class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input v-model="confirmPassword" class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼" required>
          <input class="formControls_btnSubmit" type="submit" value="註冊帳號">
          <a class="formControls_btnLink" href="#loginPage">登入</a>
        </form>
      </div>
    </div>
  
  </div>
  
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>{{ userName }}</span></a></li>
        <li><a href="#loginPage" @click="signOut" >登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <!-- 新增待辦事項 -->
        <div class="inputBox">
          <input v-model="addTodoItem" type="text" placeholder="請輸入待辦事項">
          <a @click="addTodo">
            <i class="fa fa-plus">+</i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" @click.prevent="change = 'all'">全部</a></li>
            <li><a href="#" @click.prevent="change = 'pending'">待完成</a></li>
            <li><a href="#" @click.prevent="change = 'completed'">已完成</a></li>
          </ul>

          <div v-if="todos.length === 0" class="empty-message">
            尚未新增待辦事項
          </div>
          <div v-else class="todoList_items">
            <ul class="todoList_item">
              <!-- 待辦事項列表 -->
              <li v-for="todo in changeTodo" :key="todo.id">
                <label  class="todoList_label">
                  <!-- 狀態事項狀態切換 -->
                  <input  v-if="change === 'all'"  class="todoList_input" type="checkbox" :checked="todo.status" @change="toggle(todo.id)">
                  <span>{{ todo.content }}</span>
                    <!-- 刪除待辦事項 -->
                  <a href="#"   v-if="change === 'all'"   @click.prevent="deleteTodo(todo.id)">
                    x
                  </a>
                </label>
                <div  v-if="change === 'all'"  class="editBox">
                  <button  @click="todo.isEditing = !todo.isEditing">
                    編輯
                  </button>
                  <input v-if="todo.isEditing" v-model="updateItem" type="text" placeholder="編輯待辦事項">
                  <button v-if="todo.isEditing" @click="update(todo.id)">確認</button>
                </div>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p> {{ todos.filter(todo => todo.status === false).length }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
  
<script setup>
import {ref, computed} from 'vue';
import axios from 'axios';

//存放api
const api = `https://todolist-api.hexschool.io`
  
  //註冊部分
  const signUpEmail = ref('')
  const signUpPassword = ref('')
  const confirmPassword = ref('')
  const signUpNickname = ref('')
  const submitForm = () => {
    if(signUpPassword.value ===  confirmPassword.value) {
      signUp()
    }
    else{
      alert("密碼輸入不一致")
    }
  }

 //註冊操作
 const signUp = async ()=> {
    try {
      const res = await axios.post(`${api}/users/sign_up`, {
        email: signUpEmail.value,
        password: signUpPassword.value,
        nickname: signUpNickname.value
      });
      console.log(res.data);
      alert("註冊成功")
    }
    catch (error) {
      console.error("註冊失敗", error.message)
    }
 }
  
 //登入部分
const signInEmail = ref('');
const signInPassword = ref('');
const token = ref('');

const signIn = async ()=> {
  try {
    const res = await axios.post(`${api}/users/sign_in`, {
      email: signInEmail.value,
      password: signInPassword.value,
    });
    console.log(res.data.token);
    token.value = res.data.token;
    await checkout();
    fetchTodos();
    alert("登入驗證成功");
  } 
  catch (error) {
    console.error("登入失敗",error)
    alert("登入失敗")
  }
}
  
const userName = ref('')
//驗證token
const checkout = async () => {
      try {
        const res = await axios.get(`${api}/users/checkout`, {
          headers: {
            Authorization: token.value
          }
        })
        console.log(res.data);
        userName.value = res.data.nickname
      }
      catch(error) {
        console.error("驗證失敗",error)
      }
}


//登出部分
const signOut = async () => {
      try {
        const res = await axios.post(`${api}/users/sign_out`,{}, {
          headers: {
            Authorization: token.value
          }
        })
        console.log(res.data);
        alert("登出成功")
      }
      catch(error) {
        console.error("登出失敗",error)
      }
}
  
  
  //待辦事項狀態管理
  const todos = ref([]);
  //新增待辦事項
  const addTodoItem = ref('')
  
  
  // // 取得待辦事項函數
  const fetchTodos = async () => {
    try{
      const res = await axios.get(`${api}/todos`,{
          headers:{
            Authorization: token.value
          }
        });
      todos.value = res.data.data
      console.log(res.data)
      alert("取得待辦事項成功")
    }
    catch(error) {
      console.error("取得待辦事項失敗", error)
    };
  }
  
  //新增待辦事項函數
  const addTodo = async () => {
    try{
      const res = await axios.post(`${api}/todos`,
        {
          content: addTodoItem.value
        },{
          headers:{
            Authorization: token.value
          }
        });
      console.log(res.data);
      addTodoItem.value = ''; // 清空輸入框
      alert("新增待辦事項成功");
      fetchTodos();
    }
    catch(error) {
      console.error("新增待辦事項失敗", error)
    };
  }


  // setTimeout(() => {
  //   fetchTodos();
  // }, 1000); // 延遲 1 秒後再抓取
  
  //刪除待辦事項函數
  const deleteTodo = async (id) => {
    try{
      const res = await axios.delete(`${api}/todos/${id}`, {
        headers:{
          Authorization: token.value     
        }
      })
      console.log(res.data);
      todos.value = todos.value.filter(todo => todo.id !== id); // 從列表中移除
      alert("刪除待辦事項成功");

    }
    catch (error) {
      console.error("刪除待辦事項失敗",error)
    }   
  }

//更新待辦事項
const updateItem = ref('')

const update = async (id) => {
    try{
      const todo = todos.value.find(todo => todo.id === id)
      if(todo){
        const res = await axios.put(`${api}/todos/${id}`,
        {
          content: updateItem.value
        },{
          headers:{
            Authorization: token.value
          }
        });
        console.log(res.data);
        todo.content = updateItem.value;
        updateItem.value = '';
        alert("更新待辦事項成功");
        fetchTodos();
      }
     
      
    }
    catch(error) {
      console.error("更新待辦事項失敗", error)
    };
  }


//切換待辦事項狀態

const toggle = async (id) => {
    try{
      const res = await axios.patch(`${api}/todos/${id}/toggle`,{},
      {
          headers:{
            Authorization: token.value
          }
        });
      console.log(res.data);
      const todo = todos.value.find(todo => todo.id === id);
      todo.status = !todo.status;
      alert("切換待辦事項狀態成功");
    }
    catch(error) {
      console.error("切換待辦事項狀態失敗", error)
    };
  }

//切換手動頁面狀態
const change = ref("all") // 'all', 'pending', 'completed'
const changeTodo = computed(() => {
  if(change.value === 'pending') {
    return todos.value.filter(todo => todo.status === false);
  } 
  else if(change.value === 'completed' ){
    return todos.value.filter(todo => todo.status === true)
  }
  return todos.value;
})

//用watch自動監聽狀態變化
// watch(
//   () => todos.value.map(todo => todo.status),
//   (newStatues) => {
//     if(newStatues.includes(true) && newStatues.includes(true)){
//       change.value = 'all';
//     }
//     else if(newStatues.every(status => status === true)){
//       change.value = 'completed';
//     }
//     else if(newStatues.every(status => status === false)){
//       change.value = 'pending';
//     }
//   }
// )

</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

*, *::before, *::after {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

.selector-for-some-widget {
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
}

html {
  height: 100%;
}

body {
  font-family: "Noto Sans TC";
  margin: 0 auto;
  overflow: hidden;
}

img {
  width: 100%;
  vertical-align: middle;
}

.todoList_input {
  width: 20px;
  height: 20px;
  border: 1px solid #9F9A91;
  border-radius: 5px;
  margin-right: 16px; /* 確保與文本之間的間距一致 */
}

.todoList_item li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  flex-wrap: wrap; /* 允許項目在需要時換行 */
}

.todoList_label { 
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: break-word; /* 讓內容在需要時換行 */
  white-space: normal; /* 允許文字換行 */
  margin-bottom: 10px; /* 給按鈕留出空間 */
}

.editBox {
  display: flex;
  align-items: center;
  justify-content:  flex-start;
  margin-left: 10px; /* 适当调整间距 */
  gap: 10px; /* 添加按鈕之間的間距 */
  flex-grow: 0; /* 防止按鈕過度擴展 */
  margin-left: 2.1rem; /* 讓按鈕和清單文字對齊開頭 */
}

.editBox button{
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;

}


.editBox input {
  flex-grow: 1; /* 讓輸入框填滿剩餘空間 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.logoImg {
  margin-bottom: 16px;
}

.vhContainer {
  height: 100vh;
}

.bg-yellow {
  background-color: #FFD370;
}

.bg-half {
  background-image: linear-gradient(175deg, #FFD370 60%, #fff 40%);
}

.conatiner {
  margin: 0 auto;
  padding: 87px 32px;
}

.empty-message {
  text-align: center;
  margin-top: 20px;
  color: #555;
}


@media (max-width: 576px) {
  .conatiner {
    padding: 18px 32px;
  }
}

.side {
  width: 386px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

@media (max-width: 576px) {
  .side {
    width: 100%;
  }
}

nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 24px 32px 0 32px;
}

@media (max-width: 576px) {
  nav {
    margin-bottom: 16px;
  }
}

nav h1 a {
  width: 243px;
  height: 39px;
  background: url(https://upload.cc/i1/2022/03/23/8vTzYG.png) no-repeat;
  display: block;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}

nav ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 1rem;
}

@media (max-width: 576px) {
  nav ul li {
    margin-top: 11px;
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

@media (max-width: 576px) {
  .d-m-n {
    display: none;
  }
}

.formControls {
  margin-left: 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

@media (max-width: 576px) {
  .formControls {
    margin-left: 0;
  }
}

.formControls .formControls_txt {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

@media (max-width: 576px) {
  .formControls .formControls_txt {
    font-size: 1.25rem;
    text-align: center;
  }
}

.formControls .formControls_label {
  font-size: 0.875rem;
  font-weight: bold;
  margin: 16px 0 4px 0;
}

.formControls .formControls_input {
  font-weight: normal;
  border: none;
  border-radius: 10px;
  width: 304px;
  padding: 12px 16px;
  margin: 4px 0;
}

.formControls .formControls_input:focus {
  outline: 3px solid #fff;
}

.formControls .formControls_input::-webkit-input-placeholder {
  color: #9F9A91;
}

.formControls .formControls_input:-ms-input-placeholder {
  color: #9F9A91;
}

.formControls .formControls_input::-ms-input-placeholder {
  color: #9F9A91;
}

.formControls .formControls_input::placeholder {
  color: #9F9A91;
}

.formControls .formControls_btnSubmit {
  width: 128px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: #333333;
  color: #fff;
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  margin: 24px 0;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.formControls a {
  text-decoration: none;
}

.formControls span {
  margin: 4px 0 16px 0;
  color: #d87355;
  font-size: 0.875rem;
}

.formControls .formControls_btnLink {
  display: block;
  color: #333333;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
}

.loginPage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 800px;
}

@media (max-width: 576px) {
  .loginPage {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin: 0 auto;
    padding: 48px 31px;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: start;
  }
}

.signUpPage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 800px;
}

@media (max-width: 576px) {
  .signUpPage {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin: 48px auto 0 auto;
    padding: 48px 31px;
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
  margin: 0 auto;
}

@media (max-width: 576px) {
  .todoList_Content {
    width: 100%;
  }
}

.inputBox {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  margin-bottom: 16px;
  -webkit-box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
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
  -webkit-box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 5px;
}

.todoList_list .todoList_tab {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
      -ms-flex-pack: space-evenly;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
  color: #333333;
  line-height: 20.27px;
}

.todoList_list .todoList_items .todoList_input {
  width: 20px;
  height: 20px;
  border: 1px solid #9F9A91;
  border-radius: 5px;
  margin-right: 16px;
}

.todoList_list .todoList_items .todoList_input:checked ~ span {
  color: #9F9A91;
  text-decoration: line-through;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.todoList_list .todoList_items li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin-bottom: 17px;
}

.todoList_list .todoList_items li a {
  margin-left: 17px;
  display: block;
  font-size: 14px;
  color: #333333;
  opacity: 0;
}

.todoList_list .todoList_items li:hover a {
  opacity: 1;
}

.todoList_list .todoList_statistics {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
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
/*# sourceMappingURL=all.css.map */
</style>
  