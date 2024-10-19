<template>
  <Headerr @ay="search" />
  <div>
    <v-carousel
      v-if="isDataLoaded"
      show-arrows="hover"
      style="width: 100%; height: 72vh"
    >
      <v-carousel-item cover v-for="(item, i) in items" :key="i">
        <div id="caroselitem">
          <div
            style="
              margin: auto;
              width: 60%;
              height: 100%;
              display: flex;
              position: relative;
            "
          >
            <div style="width: 50%; padding-left: 10px; margin-top: 100px">
              <b>
                <small>{{ item.blog.title }}</small>
              </b>
              <h1>{{ item.blog.conten }}</h1>
              <br />

              <router-link to="collecttion" style="color: rgb(0, 0, 0)">
                <button class="button">Mua ngay</button>
              </router-link>
            </div>
            <!-- <div class="imgslide"></div> -->
            <img class="imgslide" :src="item.blog.imgBackGround" />
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
  <div class="body">
    <br />
    <!-- <table style="width: 100%">
      <tr>
        <td>
          <div class="iconbody">
            <div style="width: 50px; overflow: hidden; aspect-ratio: 2/2">
              <v-icon size="50px">mdi-truck-cargo-container</v-icon>
            </div>
            <div>
              <b>Miễn phí giao hàng</b>
              <br />
              <small>Miễn phí giao hàng trên mọi hóa đơn</small>
            </div>
          </div>
        </td>
        <td>
          <div class="iconbody">
            <div style="width: 50px; overflow: hidden; aspect-ratio: 2/2">
              <v-icon size="50px">mdi-truck-cargo-container</v-icon>
            </div>
            <div>
              <b>Miễn phí giao hàng</b>
              <br />
              <small>Miễn phí giao hàng trên mọi hóa đơn</small>
            </div>
          </div>
        </td>
        <td>
          <div class="iconbody">
            <div style="width: 50px; overflow: hidden; aspect-ratio: 2/2">
              <v-icon size="50px">mdi-truck-cargo-container</v-icon>
            </div>
            <div>
              <b>Miễn phí giao hàng</b>
              <br />
              <small>Miễn phí giao hàng trên mọi hóa đơn</small>
            </div>
          </div>
        </td>
        <td>
          <div class="iconbody">
            <div style="width: 50px; overflow: hidden; aspect-ratio: 2/2">
              <v-icon size="50px">mdi-truck-cargo-container</v-icon>
            </div>
            <div>
              <b>Miễn phí giao hàng</b>
              <br />
              <small>Miễn phí giao hàng trên mọi hóa đơn</small>
            </div>
          </div>
        </td>
      </tr>
    </table> -->
    <div style="width: max-content; margin: auto">
      —————————— Sản phẩm ——————————
    </div>
    <br />
    <product4x3Vue :searchEvem="searchProp" />
    <br />
    <div style="width: max-content; margin: auto">
      —————————— Quản bá ——————————
    </div>
    <br />
    <div style="width: 100%; display: flex; justify-content: space-between">
      <div v-for="(e, i) in datablog" :key="i" class="itemBlog">
        <div style="width: 100%; height: 80%; z-index: -1; overflow: hidden">
          <img :src="e.blog.imgBackGround" class="imgBlog" />
        </div>
        <router-link
          :to="`/blog/detail/${e.blog.id}`"
          style="text-decoration: none; color: black"
        >
          <div
            style="
              width: 80%;
              height: 30%;
              margin: auto;
              margin-top: -20%;
              background-color: white;
              z-index: 1;
              position: relative;
              text-align: center;
              padding-top: 4px;
            "
          >
            <h4>{{ e.blog.title }}</h4>
            <small style="color: gray; font-style: italic">
              Được tạo bởi: {{ e.blog.nameCreateUser }}
            </small>
            <br />
            <small
              style="
                color: gray;
                font-style: italic;
                opacity: 0.9;
                font-size: 8px;
              "
            >
              ngày tạo: {{ e.blog.createTime }}
            </small>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <br />
  <!-- footer -->
  <Footer1 />
</template>
    
<script>
import { get_blog_byrender, get_blog_byrender_by_type } from "@/api/ApiRequest";
import Headerr from "../components/Header.vue";
import Product4x3Vue from "../components/Product4x3s.vue";
import { ref } from "vue";
// import { nextTick } from "vue";

import Footer1 from "../components/Footer1.vue";
// import { toast } from "vue3-toastify";

export default {
  name: "HomE",
  components: { Headerr, Product4x3Vue, Footer1 },
  setup() {
    const items = ref();
    const isDataLoaded = ref(false);
    const getSlide = async () => {
      const respon = await get_blog_byrender_by_type(2, 7);

      items.value = respon.data.content;
      // await nextTick();
      isDataLoaded.value = true;
      // items.value = { ...items.value };
      console.log("item", items.value[0].blog.title);
    };
    getSlide();

    const datablog = ref([]);
    const paramBlog = {
      page: 0,
      size: 3,
    };
    const getBlog = async (paramblog) => {
      const result = await get_blog_byrender(paramblog);
      // console.log("result", result);
      // data.value = await getcanbo();
      datablog.value = result.data.content;
      // checkDate(data.value[0].createAt);
      // console.log("result", datablog.value[0].blog.imgBackGround);

      // alert("ayyyy");
    };
    getBlog(paramBlog);

    const searchProp = ref({ check: false, text: "" });

    const search = (e) => {
      // alert("ayy");
      if (!e || e.trim().length === 0) {
        searchProp.value = {
          check: false,
          text: "",
        };
      } else {
        searchProp.value = {
          check: true,
          text: e,
        };
      }
    };
    return {
      items,
      Product4x3Vue,
      datablog,
      search,
      searchProp,
      isDataLoaded,
    };
  },
};
</script>
    
<style scoped>
#caroselitem {
  /* text-align: center; */
  /* border: solid 1px black; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 224, 255);
  /* display: flex; */
}
.imgslide {
  width: 60%;
  height: 100%;
  position: relative;
  animation: img_dow 2s;
}
.imgslide:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-hm1-2.png");
  background-size: cover;
}

@keyframes img_dow {
  0% {
    opacity: 0;
    transform: translateY(10rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.button {
  padding: 10px 20px;
  border: solid 1px black;
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  background-color: plum;
  width: 0%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  transition: 800ms;
}

.button:hover::before {
  width: 100%;
  left: 0;
}
.button:hover {
  color: rgb(244, 219, 236);
}
.body {
  /* border: solid 1px black; */
  width: 70%;
  margin: auto;
  margin-top: 40px;
}
.iconbody {
  display: flex;
}

.itemBlog {
  margin: auto;
  width: 30%;
  aspect-ratio: 2/2;
}

.imgBlog {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.imgBlog:hover {
  transform: scale(1.2);
}
router-link {
  text-decoration: none;
}
</style>