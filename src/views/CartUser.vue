<template>
  <Header1 />
  <div v-if="user" style="width: 90%; margin: auto">
    <div style="width: 100%; display: flex">
      <div class="cart">
        <h2>Cart</h2>
        THÔNG TIN SẢN PHẨM
        <br />
        <br />
        <hr style="width: 80%; margin: auto; margin-bottom: 10px" />
        <div class="table">
          <table style="width: 100%">
            <tr v-for="(e, i) in CartUserS.getCartStore" :key="i">
              <td>
                <img
                  :src="e.product.mainImg"
                  style="width: 100%; aspect-ratio: 2/2"
                />
              </td>
              <td style="width: 20%">
                <h2>
                  <router-link
                    :to="'/product/detail/' + e.product.id"
                    style="text-decoration: none; color: rgb(138, 15, 95)"
                    >{{ e.product.alias }}</router-link
                  >
                </h2>
                brand: {{ e.product.brand.name }}
                <img
                  :src="e.product.brand.img"
                  style="width: 20px; aspect-ratio: 2/2"
                />
                <br />
                is stock: {{ e.product.inStock }}
              </td>
              <td style="width: 10%">
                <b>Số lượng: </b>
                <br />
                <input
                  type="number"
                  v-model="e.quantity"
                  style="
                    border: solid 1px rgb(75, 75, 75);
                    width: 50px;
                    border-radius: 20px;
                    padding: 0px 0px 0px 10px;
                  "
                  @change="changequantity(e)"
                />
              </td>
              <td style="width: 10%">
                <b>Giá: </b>
                <br />
                {{ formatVND(e.price) }}
              </td>
              <td style="width: 10%">
                <b> Tổng: </b>
                <br />
                {{ formatVND(e.price * e.quantity) }}
              </td>
              <td>
                <button @click="clickDeleteCart(e.product.id)">xóa</button>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <br />
        <hr style="width: 80%; margin: auto" />
        <div style="width: 80%; margin: auto; padding: 20px">
          <b style="float: left">Item: {{ CartUserS.getCartStore?.length }}</b>
          <b style="float: right">Tổng tiền: {{ formatVND(sum) }}</b>
        </div>
        <br />
      </div>
      <div class="pay">
        <table style="width: 100%" cellspacing="0">
          <tr>
            <td style="text-align: start">
              <b> {{ CartUserS.getCartStore?.length }} sản phẩm:</b>
            </td>
            <td style="text-align: end">{{ formatVND(sum) }}</td>
          </tr>
          <tr>
            <td style="text-align: start">
              <b> Giảm Giá: </b>
            </td>
            <td style="text-align: end">- {{ formatVND(0) }}</td>
          </tr>
          <tr>
            <td style="text-align: start; border-top: solid 1px gray">
              <h4>Tổng giá trị đơn hàng:</h4>
            </td>
            <td style="text-align: end; border-top: solid 1px gray">
              {{ formatVND(sum) }}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; padding: 40px 0">
              <button @click="pay">
                <Icon
                  icon="material-symbols:lock-sharp"
                  width="1.2em"
                  height="1.2em"
                />
                Thanh toán
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div v-else>bạn chưa đăng nhập ?</div>
  <Footer1 />
</template>
    
<script >
import { getCookie } from "@/api/CookieFuntion";
import Footer1 from "@/components/Footer1.vue";
import Header1 from "@/components/Header.vue";
import { userStore } from "@/stores/counter";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import router from "@/router";
import { get_cart_byIdUser, post_delete_cart } from "@/api/ApiUser";

export default {
  name: "CartUser",
  components: {
    Header1,
    Footer1,
    Icon,
  },
  setup() {
    const user = getCookie("login_token_qlsp") ? true : false;
    const CartUserS = userStore();

    var timeoutID = null;

    const sum = ref(
      user
        ? CartUserS.getCartStore?.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.quantity * currentValue.price,
            0
          )
        : 0
    );
    const pay = () => {
      CartUserS.pay();
      router.push("/pay");
    };
    const changequantity = (data) => {
      if (timeoutID) {
        // Nếu đã có timeoutID tồn tại, hủy bỏ timeout hiện tại
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        CartUserS.updateCartItem(data.product, data.quantity).then(() => {
          sum.value = userStore().getCartStore.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.quantity * currentValue.price,
            0
          );
          console.log("then", userStore().getCartStore);
        });

        // console.log("data", data);
      }, 800);
      //   console.log("id" + data.id + "quantity" + data.quantity);
    };

    const formatVND = (number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    };

    const clickDeleteCart = async (idProduct) => {
      if (!getCookie("login_token_qlsp")) {
        alert("phiên đăng nhập hết hạn yêu cầu đăng nhập lại");
        return;
      }
      const cartrespon = await get_cart_byIdUser(
        getCookie("login_token_qlsp").user.id
      );
      post_delete_cart(getCookie("login_token_qlsp").user.id, idProduct).then(
        () => userStore().reload(cartrespon.data)
      );
    };
    return {
      user,
      CartUserS,
      changequantity,
      sum,
      formatVND,
      pay,
      clickDeleteCart,
    };
  },
};
</script>
    
<style scoped>
.cart {
  width: 70%;
}
.table {
  width: 100%;
  height: 50vh;
  overflow: scroll;
  /* overflow-y: hidden; */
  overflow-x: hidden;
}

/* width */
.table::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.table::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
.table::-webkit-scrollbar-thumb {
  background: rgb(145, 19, 120);
  border-radius: 10px;
  opacity: 0.5;
}

.pay {
  width: 30%;
  padding: 20px 0px 0 23px;
  padding-top: 3%;
}

.pay table {
  background-color: rgb(235, 235, 235);
  border-radius: 2px;
  padding: 5px;
}

td {
  width: 10%;
  padding: 10px;
}

button {
  padding: 10px;
  background-color: #fbe84f;
  border-radius: 4px;
}
</style>