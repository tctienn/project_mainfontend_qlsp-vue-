<template>
  <div v-if="data?.data.length > 0" class="productside">
    <div
      style="
        width: 100%;
        aspect-ratio: 60 / 25;
        display: flex;
        margin: 0 0 20px 0;
      "
      v-for="(e, i) in datas?.data"
      :key="i"
    >
      <div
        style="
          height: 100%;
          width: 34%;
          border: solid 1px black;
          position: relative;
        "
      >
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
          new
        </small>
        <router-link :to="'/product/detail/' + e.id">
          <img style="height: 100%; width: 100%" :src="e.mainImg" />
        </router-link>
      </div>
      <div style="width: 66%; padding: 10px 0 0 20px">
        <h4>{{ e.alias }}</h4>
        <small>{{ e.gia }}</small>
        <br />
        <v-icon
          v-for="(e2, i2) in 5"
          :key="i2"
          size="15px"
          :style="{ color: e.start >= e2 ? 'rgb(255, 170, 0)' : 'gray' }"
          >mdi-star-outline</v-icon
        >
        <p
          style="
            display: -webkit-box;
            -webkit-line-clamp: 4; /* Số dòng tối đa bạn muốn hiển thị */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            height: max-content;
          "
        >
          {{ e.mota }}
        </p>
        <br />
        <div>
          <button
            style="
              padding: 4px;
              background-color: rgb(179, 179, 179);
              border: solid 0.5 blrgb(80, 80, 80) ack;
            "
          >
            Thêm vào giỏ hàng
          </button>
          <v-icon>mdi-heart-outline</v-icon>
        </div>
      </div>
    </div>

    <div style="margin: auto; width: 100%">
      <v-pagination
        :length="datas?.totalPages"
        v-model="page"
        @click="changePage"
      ></v-pagination>
    </div>
  </div>
  <div v-else style="text-align: center">không có sản phẩm nào hiển thị</div>
</template>
    
<script>
import { ref, toRef } from "vue";

export default {
  name: "ProductX2",
  props: ["data"], // data:  products , totalPages
  emits: ["page"],
  setup(props, contex) {
    const datas = toRef(props, "data");
    const page = ref(1);
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
    return { datas, page, changePage, checkDate };
  },
};
</script>
    
<style scoped>
* {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
.productside {
  margin: auto;
  width: 100%;
}
</style>