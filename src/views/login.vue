<template>
  <div class="container">
    <div class="lefts" style="background-image: url('./ay.jpg')">
      <div class="contenleft">
        <h1 style="font-family: Lucida Calligraphy; color: white">
          Nếu bạn chưa đăng ký
        </h1>
        <p style="color: white">
          Hãy tạo một tài khoản để có thể sử dụng các tính năng của dịch vụ
        </p>
        <br />
        <br />
        <button
          v-if="form"
          class="button"
          style="width: max-content"
          @click="form = !form"
        >
          TẠO TÀI KHOẢN
        </button>
        <router-link v-else to="/">
          <button class="button" style="width: max-content">Trang Chủ</button>
        </router-link>
      </div>
    </div>
    <div style="width: 0; position: relative">
      <div class="mid"></div>
    </div>
    <div class="rights">
      <div
        v-if="form"
        style="
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        "
      >
        <h2>Chào mừng tới giao diện cho khách hàng của shop</h2>
        <br />
        <p style="width: 80%; text-align: center">
          Bằng cách nhập với người dùng của bạn, bạn có thể mua hàng nhanh hơn
          và kiểm soát đơn hàng của mình tốt hơn
        </p>
        <input
          class="input"
          type="text"
          placeholder="User name"
          v-model="input.username"
        />
        <br />
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="input.password"
        />
        <br />
        <br />
        <button class="button" @click="login">Đăng nhập</button>
        or
        <br />
        <router-link to="/">
          <button class="button" style="width: max-content">Trang Chủ</button>
        </router-link>
        <router-link to="/changePassword">
          <small>Quên mật khẩu ?</small>
        </router-link>
      </div>
      <div
        v-else
        style="
          width: 90%;
          margin: auto;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        "
      >
        <h2>Chào mừng tới giao diện cho khách hàng của shop</h2>
        <br />
        <p style="width: 80%; text-align: center">
          Bằng cách nhập với người dùng của bạn, bạn có thể mua hàng nhanh hơn
          và kiểm soát đơn hàng của mình tốt hơn
        </p>
        <input
          class="input"
          type="text"
          placeholder="User name"
          v-model="input.username"
        />
        <br />
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="input.password"
        />
        <br />
        <input
          class="input"
          type="text"
          placeholder="SDT"
          v-model="input.sdt"
        />
        <br />
        <input
          class="input"
          type="gmail"
          placeholder="Gmail"
          v-model="input.gmail"
        />
        <br />
        <button class="button" @click="createAccount">Tạo tài khoản</button>
        <small> Bạn đã có tài khoản ? </small>
        <button class="button" @click="form = !form">Đăng nhập</button>
      </div>
    </div>
  </div>
</template>
    
<script>
// import { getCookie } from "@/api/CookieFuntion";
import { signup } from "@/api/ApiLogin";
import router from "@/router";
import { userStore } from "@/stores/counter";
import { ref } from "vue";

export default {
  name: "LogIn",
  setup() {
    const user = userStore();
    const form = ref(true);
    const input = ref({
      username: "",
      password: "",
      sdt: "",
      gmail: "",
    });

    const login = () => {
      user
        .login({
          userName: input.value.username,
          passWord: input.value.password,
        })
        .then(() => {
          // console.log("user", user.getCartStore);
          // console.log("user", userStore().getCartUser);
          router.push("/");
        });
    };
    const createAccount = () => {
      const regexusername = /^[a-z0-9]{3,16}$/;
      if (!regexusername.test(input.value.username)) {
        alert(
          "tên người dùng yêu cầu không có ký tự đặc biệt và độ dài từ 3-16 ký tự"
        );
        return;
      }
      const regexsdt = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!regexsdt.test(input.value.sdt)) {
        alert("Số điện thoại không hợp lệ yêu cầu nhập lại");
        return;
      }
      const regexGmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regexGmail.test(input.value.gmail)) {
        alert("định dạng gmail không hợp lệ yêu cầu nhập lại");
        return;
      }
      signup({
        userName: input.value.username,
        passWord: input.value.password,
        sdt: input.value.sdt,
        gmail: input.value.gmail,
      }).then(
        () =>
          alert(
            "vui lòng truy cập gmail đã đăng ký để xác nhận tài khoản sau đó quay lại đây đăng nhập"
          ),
        (form.value = !form.value)
      );
    };
    return { form, user, login, input, createAccount };
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
</style>
