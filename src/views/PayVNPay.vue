<template>
  <div v-if="user" class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <img
              src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png"
              style="width: 200px"
            />
            <h2 class="card-title">Thanh Toán Đơn Hàng</h2>
            <form :action="submitOder" method="post">
              <div class="form-group" style="display: flex">
                <label for="amount">Số tiền thanh toán: </label>
                <input
                  type="hidden"
                  id="amount"
                  name="amount"
                  v-model="amount"
                  required
                />
                <div style="width: max-content">
                  {{ formatVND(amount) }}
                </div>
              </div>
              <div class="form-group">
                <label for="address">Địa chỉ giao hàng:</label>
                <br />
                <input
                  type="text"
                  class="address"
                  id="address"
                  name="address"
                  v-model="address"
                  required
                  placeholder="Nhập địa chỉ nhận hàng"
                />
              </div>
              <input type="hidden" id="idUser" name="idUser" v-model="idUser" />
              <input
                type="hidden"
                class="form-control"
                id="orderInfo"
                name="orderInfo"
                v-model="orderInfo"
                required
                value="thanh toán hóa đơn shop"
              />
              <input
                type="hidden"
                class="form-control"
                id="timestamp"
                name="timestamp"
                v-model="timestamp"
                required
              />

              <button type="submit" @click="submit" class="btn btn-primary">
                Thanh toán
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// import { submitOrder } from "@/api/ApiUser";
import { pay } from "@/api/ApiUser";
import { getCookie } from "@/api/CookieFuntion";
import { userStore } from "@/stores/counter";
import { ref } from "vue";

export default {
  name: "PaSy",
  setup() {
    /////////////////////
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    let timestamp = ref(year + month + day + hours + minutes + seconds);
    // console.log("time", timestamp);
    //////////////
    const user = getCookie("login_token_qlsp") ? true : false;
    const submitOder = ref();
    pay().then((data) => {
      console.log("data", data);
      submitOder.value = data.data;
    });
    const amount = ref(
      user
        ? userStore().getCartStore.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.quantity * currentValue.price,
            0
          )
        : 0
    );
    const address = ref("");
    const idUser = ref(user ? getCookie("login_token_qlsp").user.id : 0); // Giá trị này cần được cung cấp từ nơi sử dụng component
    const orderInfo = ref("Thanh toan don hang ");
    const submit = () => {
      //   submitOrder(amount, idUser, orderInfo, address).then((data) => {
      //     console.log(data);
      //   });
    };
    const formatVND = (number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    };
    return {
      amount,
      address,
      idUser,
      orderInfo,
      submit,
      user,
      submitOder,
      formatVND,
      timestamp,
    };
  },
};
</script>
  
  <style scoped>
/* Định dạng CSS nếu cần thiết */

.container {
  width: max-content;
  margin: auto;
}
input {
  padding: 5px;
  border: solid 1px black;
}
.form-control {
  border: none !important;
}
.address {
  border: solid 1px rgb(66, 66, 66);
}

button {
  padding: 5px;
  background-color: rgb(75, 82, 202);
  color: white;
  margin: 10px;
}
</style>
  