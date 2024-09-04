<template>
<div id="signUpPage" class="bg-yellow">
    <div class="container signUpPage vhContainer">
    <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="Logo"></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="Work Image">
    </div>
    <div>
        <form class="formControls" @submit.prevent="submitForm">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="signUpEmail">Email</label>
        <input v-model="signUpEmail" class="formControls_input" type="email" id="signUpEmail" name="email" placeholder="請輸入 email" required>
        <span v-if="emailError">此帳號已被註冊</span>
        
        <label class="formControls_label" for="signUpNickname">您的暱稱</label>
        <input v-model="signUpNickname" class="formControls_input" type="text" id="signUpNickname" name="name" placeholder="請輸入您的暱稱">
        
        <label class="formControls_label" for="signUpPassword">密碼</label>
        <input v-model="signUpPassword" class="formControls_input" type="password" name="pwd" id="signUpPassword" placeholder="請輸入密碼" required>
        
        <label class="formControls_label" for="confirmPassword">再次輸入密碼</label>
        <input v-model="confirmPassword" class="formControls_input" type="password" name="confirm_pwd" id="confirmPassword" placeholder="請再次輸入密碼" required>
        
        <input class="formControls_btnSubmit" type="submit" value="註冊帳號">
        <router-link class="formControls_btnLink" to="/">登入</router-link>
        </form>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
const store = useUserStore();
const router = useRouter();

// 存放 API
const api = store.api;

// 註冊部分
const signUpEmail = ref('');
const signUpPassword = ref('');
const confirmPassword = ref('');
const signUpNickname = ref('');
const emailError = ref(false);

const submitForm = () => {
if (signUpPassword.value !== confirmPassword.value) {
    alert("密碼輸入不一致");
    return;
}
signUp();
};

// 註冊操作
const signUp = async () => {
try {
    const res = await axios.post(`${api}/users/sign_up`, {
    email: signUpEmail.value,
    password: signUpPassword.value,
    nickname: signUpNickname.value,
    });
    console.log(res.data);
    alert("註冊成功");
    router.push('/');
} catch (error) {
    console.error("註冊失敗", error.message);
    emailError.value = true;
    alert('此帳號已被註冊過')
}
};
</script>


<style scoped>
.bg-yellow {
  background-color: #FFD370;
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
  height: 100vh;
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


@media (max-width: 576px) {
  .formControls .formControls_txt {
    font-size: 1.25rem;
    text-align: center;
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

</style>
