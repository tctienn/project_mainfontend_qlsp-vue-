<template>
  <Headerr />
  <div
    style="
      width: 100%;
      padding: 20px 0;
      text-align: center;
      background-color: rgb(239, 239, 239);
      color: rgb(128, 128, 128);
      font-size: 20px;
    "
  >
    <div>
      Home/<router-link to="/" style="text-decoration: none"
        >Product</router-link
      >
    </div>
  </div>
  <br />
  <br />

  <div class="boderDetail">
    <div style="width: 100%; display: flex">
      <div style="width: 40%; position: relative">
        <!-- zoom -->
        <v-container style="position: absolute; top: 0; right: 0">
          <v-dialog>
            <template v-slot:activator="{ props: activatorProps }">
              <v-icon v-bind="activatorProps">mdi-arrow-expand-all</v-icon>
            </template>

            <template v-slot:default="{ isActive }">
              <div
                title="Dialog"
                style="
                  background-color: black;
                  width: 90%;
                  height: 100%;
                  margin: auto;
                  padding: 10px;
                "
              >
                <div
                  style="
                    width: 50%;
                    aspect-ratio: 13 / 14;
                    height: 70%;
                    margin: auto;
                  "
                >
                  <zoomImageVue :img="data.mainImg" />
                </div>
                <v-icon
                  @click="isActive.value = false"
                  style="color: white; position: absolute; top: 0; right: 0"
                  >mdi-close</v-icon
                >
              </div>
            </template>
          </v-dialog>
        </v-container>
        <!-- end zoom -->
        <div style="width: 100%">
          <div style="width: 100%; aspect-ratio: 13 / 14">
            <img :src="data.mainImg" style="width: 100%; height: 100%" />
          </div>
        </div>
        <!-- slide img -->
        <v-sheet class="mx-auto" elevation="8" max-width="800">
          <v-slide-group
            v-model="imgSelect"
            class="pa-4"
            selected-class="bg-primary"
            mandatory
            show-arrows
          >
            <v-slide-group-item
              v-for="(e, i) in data.images"
              :key="i"
              v-slot="{ isSelected, toggle }"
            >
              <div
                :class="['ma-1']"
                style="width: 80px; height: 100px"
                @click="
                  toggle;
                  changeImg(e);
                "
              >
                <v-img
                  :src="e.url"
                  :style="{
                    width: '100%',
                    height: '100%',
                    opacity: isSelected ? '0.4' : '1',
                  }"
                  aspect-ratio="1"
                ></v-img>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
        <!-- end slide -->
      </div>
      <div style="width: 50%; padding: 10px; margin-left: 10px">
        <h4>{{ data.alias }}</h4>
        <h5>{{ data.name }}</h5>
        <b style="color: red">{{ formatVND(data.gia) }}</b>
        <br />
        <v-icon
          v-for="e in 5"
          :key="e"
          size="15px"
          :style="{ color: data.start >= e ? 'rgb(255, 170, 0)' : 'gray' }"
          >mdi-star-outline</v-icon
        >
        <p>
          {{ data.motaNgan }}
        </p>
        <br />
        <br />
        <hr style="margin: auto; width: 90%; border-top: none" />
        <br />
        <span>
          kho: {{ data.inStock }}
          <button
            :class="['butonDetail', buttonAnimation]"
            @click="addCart(data)"
          >
            Thêm vào giỏ
          </button>
          <v-icon>mdi-heart-outline</v-icon>
        </span>
        <br />
        <br />
        <span>
          <div style="font-size: 17px; width: max-content; display: inline">
            Catergory:
          </div>
          <small v-for="(e, i) in data.catergorys" :key="i">
            <router-link
              :to="`/collecttion?type=catergory&id=${i}&name=${e.name}`"
              >{{ e.name }}</router-link
            >,
          </small>
        </span>
        <br />
        <span>
          <div style="font-size: 17px; width: max-content; display: inline">
            Tag:
          </div>
          <small>{{ data.tag?.name }} </small>
        </span>
        <br />
        <span>
          <div style="font-size: 17px; width: max-content; display: inline">
            Size:
          </div>
          <small v-for="(e, i) in data.sizes" :key="i">
            <router-link :to="`/collecttion?type=size&id=${i}&name=${e.name}`">
              {{ e.name }} </router-link
            >,
          </small>
        </span>
      </div>
    </div>

    <br />
    <hr />
    <br />
    <div style="width: 100%; height: 600px">
      <p>
        {{ data.mota }}
      </p>
    </div>
  </div>

  <div style="width: 80%; margin: auto; text-align: center">
    ———————————————— blogs ————————————————
    <br />
    <br />
    <BlogSlideVue />
  </div>
  <Footer1 />
</template>
    
<script >
import { ref } from "vue";
import { useRouter } from "vue-router";
import { get_product_byId } from "@/api/ApiRequest";
import Headerr from "@/components/Header.vue";

import zoomImageVue from "@/components/zoomImage.vue";
import Footer1 from "@/components/Footer1.vue";
import BlogSlideVue from "@/components/BlogSlide.vue";
import { userStore } from "@/stores/counter";
export default {
  name: "DeTail",
  components: {
    Headerr,
    zoomImageVue,
    Footer1,
    BlogSlideVue,
  },
  setup() {
    const route = useRouter().currentRoute.value.params.id;
    const data = ref([]);
    const imgSelect = ref(null);
    const isActive = ref();
    const user = userStore();
    const formatVND = (number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    };
    const getproductById = async (id) => {
      // console.log("result", route.currentRoute.value.params.id);

      const result = await get_product_byId(id);
      // console.log("result", result);
      // data.value = await getcanbo();

      data.value = result.data;
      // checkDate(data.value[0].createAt);

      // alert("ayyyy");
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
        user.addCartItem(product, sl).then(() => {
          getproductById(route);
        });
        sl = 0;
      }, 1000);
    };
    /////
    const buttonAnimation = ref("");
    // const addCard = () => {
    //   buttonAnimation.value = "ay";
    //   setTimeout(function () {
    //     buttonAnimation.value = "";
    //   }, 800);
    // };
    const changeImg = (e) => {
      data.value.mainImg = e.url;
    };
    getproductById(route);
    return {
      data,
      addCart,
      buttonAnimation,
      imgSelect,
      isActive,
      changeImg,
      formatVND,
    };
  },
};
</script>
    
<style>
.boderDetail {
  width: 60%;

  /* height: 100px; */
  margin: auto;
}
.butonDetail {
  border-radius: 4px;
  background-color: black;
  color: white;
  padding: 2px 5px;
  margin: 0 5px;
  z-index: 1;
  position: relative;
}
.butonDetail::before {
  content: "+1";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  opacity: 0;
  background-color: black;
  width: 30px;
  aspect-ratio: 2/2;
  border-radius: 100%;
}
.ay::before {
  animation: addcard 800ms;
}

@keyframes addcard {
  0% {
    opacity: 0.7;
    transform: translatex(-2rem);
  }

  100% {
    transform: translateY(-4rem) translateX(4rem);
  }
}
</style>