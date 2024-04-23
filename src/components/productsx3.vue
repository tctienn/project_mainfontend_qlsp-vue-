<template>
  <div v-if="data?.data.length > 0" style="width: 100%; height: 100%">
    <div class="product">
      <div class="productitem" v-for="(e, i) in data.data" :key="i">
        <div class="imgItem">
          <router-link :to="'/product/detail/' + e.id">
            <img
              :src="e.mainImg"
              alt="imgproduct"
              style="width: 100%; height: 100%"
          /></router-link>
          <small
            v-if="checkDate(e.createAt) == 'new'"
            style="
              background-color: rgb(255, 35, 204);
              border-radius: 5px;
              position: absolute;
              right: 5px;
              top: 5px;
              color: white;
              padding: 0 4px;
            "
          >
            New
          </small>
          <div class="hoverBox">
            <div class="itemHide">
              <v-icon>mdi-heart-outline</v-icon>
            </div>
            <button class="itemHide" style="width: 70%" @click="addCart(e)">
              Mua ngay
            </button>

            <router-link
              :to="'/product/detail/' + e.id"
              style="border-right: none; border-left: solid 2px white"
              class="itemHide"
            >
              <v-icon>mdi-eye</v-icon>
            </router-link>
          </div>
        </div>
        <div class="textItem">
          {{ e.name }}
          <div style="display: flex; width: max-content; margin: auto">
            <v-icon
              v-for="(e2, i2) in 5"
              :key="i2"
              size="15px"
              :style="{ color: e.start >= e2 ? 'yellow' : 'gray' }"
              >mdi-star-outline</v-icon
            >
          </div>
          <div>{{ formatVND(e.gia) }}</div>
        </div>
      </div>
    </div>
    <!-- page -->
    <br />
    <div style="margin: auto">
      <v-pagination
        :length="data.totalPages"
        v-model="page"
        @click="changePage"
      ></v-pagination>
    </div>
  </div>
  <h2 v-else>không có sản phẩm nào để hiển thị</h2>
</template>
        
    <script >
import { userStore } from "@/stores/counter";
import { ref, toRef, watch } from "vue";

export default {
  name: "ProducX3",
  props: ["datas"],
  emits: ["page"],
  setup(props, contex) {
    const data = toRef(props, "datas");
    const page = ref(0);
    const user = userStore();
    const checkDate = (createAt) => {
      let now = new Date();
      let createdAtDate = new Date(createAt);
      let differenceInTime = now.getTime() - createdAtDate.getTime();
      let differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays > 2) {
        // console.log("Cũ" + differenceInDays);
        return "old";
      } else {
        // console.log("Mới" + differenceInDays);

        return "new";
      }
    };
    const changePage = () => {
      contex.emit("page", page.value);
    };
    const formatVND = (number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    };

    // add cart
    var timeoutID = null;
    var sl = 0;
    const addCart = (product) => {
      sl++;
      if (timeoutID) {
        // Nếu đã có timeoutID tồn tại, hủy bỏ timeout hiện tại
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        user.addCartItem(product, sl);
        sl = 0;
      }, 1000);
    };

    watch;
    return {
      data,
      checkDate,
      page,
      changePage,
      formatVND,
      addCart,
    };
  },
};
</script>
       
    <style scoped>
.product {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 4px;
}
.productitem {
  width: 30%;
  aspect-ratio: 11 / 15;
  border: solid 1px black;
  margin-bottom: 20px;
}
.imgItem {
  width: 100%;
  height: 75%;
  position: relative;
  overflow: hidden;
  /* border: solid 1px black; */
}
.textItem {
  width: 100%;
  height: 25%;
  /* border: solid 1px blue; */
  padding: 4px;
  text-align: center;
}

.hoverBox {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 12%;
  /* border: solid 1px aqua; */
  transition: 500ms;
  opacity: 0;
  animation: img_dow2 0.5s;
  display: flex;
  color: white;
}
@keyframes img_dow2 {
  0% {
    opacity: 1;

    background-color: rgb(237, 35, 163);
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;

    transform: translateY(2rem);
  }
}
.imgItem:hover .hoverBox {
  bottom: 0;
  opacity: 1;
  animation: img_dow22 0.5s;
  background-color: rgb(237, 35, 163);
}
@keyframes img_dow22 {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    animation: coloranimation 2s;
    opacity: 1;
    background-color: rgb(237, 35, 163);
    transform: translateY(0);
  }
}

.itemHide {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 15%;
  height: 100%;
  border-right: solid 2px white;
  text-decoration: none !important;
}
.itemHide:hover {
  background-color: black;
  color: white;
}
</style>