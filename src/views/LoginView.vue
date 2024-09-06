<template>
<div id="loginPage" class="bg-yellow">
    <div class="container loginPage vhContainer">
    <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="Logo"></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="Work Image">
    </div>
    <div>
        <form class="formControls" @submit.prevent="handleSignIn">
        <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
        <label class="formControls_label" for="loginEmail">Email</label>
        <input v-model="signInEmail" class="formControls_input" type="email" id="loginEmail" name="email" placeholder="請輸入 email" required>
        <span v-if="loginError">請輸入正確Email內容</span>
        
        <label class="formControls_label" for="loginPwd">密碼</label>
        <input v-model="signInPassword" class="formControls_input" type="password" name="pwd" id="loginPwd" placeholder="請輸入密碼" required>
        
        <input class="formControls_btnSubmit" type="submit" value="登入">
        <router-link class="formControls_btnLink" to="/signup">註冊帳號</router-link>
        </form>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import axios from 'axios';
const store = useUserStore();
const router = useRouter();

  
  
// 登入部分
const signInEmail = ref('');
const signInPassword = ref('');
const loginError = ref(false);
const signIn = async (email, password, loginError) => {
  try {
        const res = await axios.post(`${store.api}/users/sign_in`, {
          email: email,
          password: password,
        });
        store.token = res.data.token;
        console.log(store.token, '有加入token');
        localStorage.setItem('token', store.token); // 儲存 token
        await checkout(); 
      } catch (error) {
        console.error("登入失敗", error);
        loginError.value = true;
        alert("登入失敗","Email或密碼錯誤");
      }
}


const checkout = async () => {
        try {
          const res = await axios.get(`${store.api}/users/checkout`, {
            headers: {
              Authorization: store.token
            },
          });
          console.log(res.data);
          // console.log(res.data.)
          store.userName = res.data.nickname;
          localStorage.setItem('userName',  store.userName);
          if(res.data.status === true) {
            alert("登入驗證成功");
            router.push('/todolist')
            store.fetchTodos();
          }
        } catch (error) {
          console.error("驗證失敗", error);
        }
      }; 
  
const handleSignIn = async () => {
    await signIn(signInEmail.value, signInPassword.value, loginError);
}
  
  
 
</script>


<style scoped>
.bg-yellow {
  background-color: #FFD370;
}

.container {
  margin: 0 auto;
  padding: 87px 32px;
  /* padding: 40px 20px;  */
}

@media (max-width: 576px) {
  .container {
    padding: 18px 32px;
    max-width: 100%;
  }

  .loginPage {
    flex-direction: column; /* 修正：在小螢幕設備上堆疊內容 */
    justify-content: start; 
    height: 100vh; /* 讓頁面內容在螢幕上居中並充滿視窗 */
  }

}


.loginPage {
  /* display: -webkit-box;
  display: -ms-flexbox; */
  display: flex;
  /* -webkit-box-pack: justify;
      -ms-flex-pack: justify; */
          /* justify-content: space-between; */
  /* -webkit-box-align: center;
      -ms-flex-align: center; */
  align-items: center;
  justify-content: center;
}

.vhContainer {
  height: 100vh;
}

.side {
  width: 386px;
  /* display: flex; */
  /* -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column; */
          /* flex-direction: column; */
  /* -webkit-box-pack: center;
      -ms-flex-pack: center; */
          /* justify-content: center; */
  /* -webkit-box-align: center;
      -ms-flex-align: center; */
          /* align-items: center; */
}

.logoImg {
  margin-bottom: 16px;
}



@media (max-width: 576px) {
  .d-m-n {
    display: none;
  }
}

.formControls {
  margin-left: 100px;
  /* display: -webkit-box;
  display: -ms-flexbox; */
  display: flex;
  /* -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column; */
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

.formControls .formControls_input::placeholder {
  color: #9F9A91;
}

.formControls .formControls_btnSubmit {
  width: 128px;
  /* width: 80%; */
  height: 48px;
  border: none;
  border-radius: 10px;
  background: #333333;
  color: #fff;
  /* -ms-flex-item-align: center;
      -ms-grid-row-align: center; */
      align-self: center;
  margin: 24px 0;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}


.formControls .formControls_btnLink {
  display: block;
  color: #333333;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
}


.formControls span {
  margin: 4px 0 16px 0;
  color: #d87355;
  font-size: 0.875rem;
}

</style>
