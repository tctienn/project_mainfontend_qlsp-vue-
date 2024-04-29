<template>
  <div class="container">
    <div class="lefts">
      <div class="contenleft"></div>
    </div>
    <div style="width: 0; position: relative">
      <div class="mid"></div>
    </div>
    <div class="rights">
      <div
        style="
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        "
      >
        <h2>Weocome to fashion web</h2>
        <br />
        <p style="width: 80%; text-align: center">
          Nhập thông tin để có thể đổi lại mật khẩu của bạn
        </p>
        <br />
        <label>gmail người dùng đã đăng ký</label>
        <input
          class="input"
          type="text"
          name="gmal"
          placeholder="gmail"
          v-model="input.gmail"
        />
        <br />
        <label> tên người dùng đã đăng ký </label>
        <input
          class="input"
          type="text"
          namme="username"
          placeholder="User name"
          v-model="input.username"
        />
        <br />
        <label>mật khẩu mới</label>
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="input.password"
        />
        <br />
        <br />
        <button class="button" @click="clickChangePassword">
          gửi yêu cầu đổi
        </button>
        or
        <br />
        <router-link to="/login">
          <button class="button" style="width: max-content">login</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
      
  <script>
// import { getCookie } from "@/api/CookieFuntion";

//   import router from "@/router";
import { userStore } from "@/stores/counter";
import { ref } from "vue";
import { post_changePassword } from "@/api/ApiLogin";

export default {
  name: "ChangPassword",
  setup() {
    const user = userStore();
    const form = ref(true);
    const input = ref({
      username: "",
      password: "",
      gmail: "",
    });

    const clickChangePassword = () => {
      const regexGmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regexGmail.test(input.value.gmail)) {
        alert("định dạng gmail không hợp lệ yêu cầu nhập lại");
        return;
      }
      post_changePassword(
        input.value.username,
        input.value.gmail,
        input.value.password
      ).then(() =>
        alert("yêu cầu người dùng truy cập gmail đã đăng ký để hoàn tất")
      );
    };
    return { form, user, input, clickChangePassword };
  },
};
</script>
      
  <style scoped>
* {
  color: rgb(126, 126, 126);
}
.container {
  display: flex;
  height: 100vh;
}

.lefts {
  width: 60%;
  background-image: url("./ay.jpg");
  background-size: 120% 100%;
  position: relative;
  z-index: 1;
}
.contenleft {
  width: 80%;
  margin: 100px 50px;
}
.contenleft::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000006d;
  z-index: -1;
}

.mid {
  position: absolute;
  right: 0;
  width: 0vw;
  height: 0;
  border-top: 100vh solid transparent;
  border-bottom: 0 solid none;
  border-right: 10vh solid rgb(255, 255, 255);
  z-index: 2;
  /* display: none; */
}
.rights {
  width: 40%;
  background-color: white;
  padding: 100px 20px 0 0px;
}
.button {
  background-image: linear-gradient(to right, #55ebff, #55ffc9);
  width: 200px;
  padding: 5px 20px;
  border-radius: 100px;
  position: relative;
  z-index: 1;
  color: white;
}
.button::before {
  z-index: -1;
  content: "";
  position: absolute;
  background-image: linear-gradient(to right, #ee55ff, #ed81c9);
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  transition: 800ms;
  border-radius: 100px;
  cursor: pointer;
  opacity: 0;
}
.button:hover::before {
  left: 0;
  width: 100%;
  opacity: 0.5;
}
.input {
  border-bottom: solid 0.9px rgb(0, 199, 189);
  padding: 5px;
  width: 80%;
}
::placeholder {
  color: rgb(51, 120, 112);
  font-size: 12px;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: rgb(51, 120, 112);
}

label {
  width: 80%;
}
</style>
  