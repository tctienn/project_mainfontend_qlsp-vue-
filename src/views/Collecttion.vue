<template>
  <HeaderVue />
  <div
    style="
      width: 100%;
      padding: 20px 0;
      text-align: center;
      background-color: rgb(239, 239, 239);
      color: rgb(128, 128, 128);
      font-size: 20px;
      margin-bottom: 40px;
    "
  >
    <div>
      <router-link to="/" style="text-decoration: none">HOME</router-link
      >/COLLECTTION
    </div>
  </div>
  <div
    style="
      width: 80%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    "
  >
    <div class="left">
      <h4>Search</h4>
      <div
        style="
          width: max-content;
          height: max-content;

          background-color: white;
          border: solid 0.7px rgb(148, 148, 148);
          border-radius: 2px;
        "
      >
        <input
          style="
            width: 100px;
            height: 30px;
            font-size: 10px;
            margin-right: 10px;
            padding-left: 8px;
          "
          v-model="searchText"
          type="text"
          placeholder="tìm tên sản phẩm"
        />
        <v-btn class="ml-auto" style="width: max-content" variant="text">
          <v-icon
            id="activator-target"
            class="icon"
            style="border-left: solid 0.7px rgb(148, 148, 148); height: 100%"
            size="20px"
            v-on:click="$emit('ay', searchText)"
            >mdi-magnify</v-icon
          >
        </v-btn>
      </div>
      <div style="width: 100%">
        <div @click="select = { type: 'all', id: '', name: '' }" class="item">
          <v-icon
            size="15px"
            class="iconcheck"
            color="rgb(184, 19, 170)"
            style="margin-right: 4px"
            v-show="select.type == 'all'"
            >mdi-checkbox-marked</v-icon
          >
          <v-icon
            size="15px"
            class="icon"
            style="margin-right: 4px"
            v-show="!(select.type == 'all')"
            >mdi-checkbox-blank-outline</v-icon
          >

          <label> all product</label>
        </div>
      </div>
      <h4>Catergorys</h4>
      <div style="width: 100%">
        <div
          v-for="(e, i) in catergorys"
          :key="i"
          @click="select = { type: 'catergory', id: e.id, name: e.name }"
          class="item"
        >
          <v-icon
            size="15px"
            class="iconcheck"
            color="rgb(184, 19, 170)"
            style="margin-right: 4px"
            v-show="select.type == 'catergory' && select.id == e.id"
            >mdi-checkbox-marked</v-icon
          >
          <v-icon
            size="15px"
            class="icon"
            style="margin-right: 4px"
            v-show="!(select.type == 'catergory' && select.id == e.id)"
            >mdi-checkbox-blank-outline</v-icon
          >

          <label :for="e.name"> {{ e.name }} </label>
        </div>
      </div>
      <h4>Sizes</h4>
      <div style="width: 100%">
        <div
          v-for="(e, i) in sizes"
          :key="i"
          @click="select = { type: 'size', id: e.id, name: e.name }"
          class="item"
        >
          <v-icon
            size="15px"
            class="iconcheck"
            color="rgb(184, 19, 170)"
            style="margin-right: 4px"
            v-show="select.type == 'size' && select.id == e.id"
            >mdi-checkbox-marked</v-icon
          >
          <v-icon
            size="15px"
            class="icon"
            style="margin-right: 4px"
            v-show="!(select.type == 'size' && select.id == e.id)"
            >mdi-checkbox-blank-outline</v-icon
          >

          <label :for="e.name"> {{ e.name }} </label>
        </div>
      </div>
      <h4>Brand</h4>
      <div style="width: 100%">
        <div
          v-for="(e, i) in brands"
          :key="i"
          @click="select = { type: 'brand', id: e.id, name: e.name }"
          class="item"
        >
          <v-icon
            size="15px"
            class="iconcheck"
            color="rgb(184, 19, 170)"
            style="margin-right: 4px"
            v-show="select.type == 'brand' && select.id == e.id"
            >mdi-checkbox-marked</v-icon
          >
          <v-icon
            size="15px"
            class="icon"
            style="margin-right: 4px"
            v-show="!(select.type == 'brand' && select.id == e.id)"
            >mdi-checkbox-blank-outline</v-icon
          >

          <label :for="e.name"> {{ e.name }} </label>
        </div>
      </div>
      <h4>Tags</h4>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        "
      >
        <button
          v-for="(e, i) in tags"
          :key="i"
          class="buttontag"
          @click="select = { type: 'tag', id: e.id, name: e.name }"
          :style="{
            backgroundColor:
              select.type == 'tag' && select.id == e.id
                ? 'rgb(140, 8, 147)'
                : 'white',
            color:
              select.type == 'tag' && select.id == e.id ? 'white' : 'black',
          }"
        >
          {{ e.name }}
        </button>
      </div>
    </div>
    <div class="products">
      <div style="text-align: end">
        <Icon
          icon="svg-spinners:blocks-scale"
          width="1.2em"
          height="1.2em"
          class="iconform"
          @click="
            {
              form = 1;
            }
          "
        />
        <Icon
          icon="line-md:menu"
          width="1.2em"
          height="1.2em"
          class="iconform"
          @click="
            {
              form = 2;
            }
          "
        />
      </div>
      <Productx2 v-if="form == 2" :data="data" @page="changepage" />
      <productsx3Vue v-if="form == 1" :datas="data" @page="changepage" />
    </div>
  </div>
  <Footer1Vue />
</template>
    
<script>
import HeaderVue from "@/components/Header.vue";
import { Icon } from "@iconify/vue";
import Footer1Vue from "@/components/Footer1.vue";
import { ref, watch } from "vue";

import Productx2 from "@/components/Productx2.vue";
import productsx3Vue from "@/components/productsx3.vue";
import {
  get_brands,
  get_catergorys,
  get_products,
  get_products_by_idCatergory,
  get_products_by_idbrand,
  get_products_by_idsize,
  get_products_by_idtag,
  get_sizes,
  get_tags,
} from "@/api/ApiRequest";
import { useRoute } from "vue-router";

export default {
  name: "ColleCttion",
  components: {
    HeaderVue,
    Productx2,
    Footer1Vue,
    productsx3Vue,
    Icon,
  },
  setup() {
    // const respon = ref();
    const select = ref({ type: "all", id: 1, name: "" }); // cái này dùng để chọn form hiển thị
    const data = ref({ data: [], totalPages: 0 });
    const tags = ref([]);
    const catergorys = ref([]);
    const brands = ref([]);
    const sizes = ref([]);
    const searchText = ref("");

    try {
      if (useRoute().query.type != null) {
        select.value = {
          type: useRoute().query.type,
          id: +useRoute().query.id + 1,
          name: useRoute().query.name,
        };
      }
    } catch (err) {
      console.log("loi param", err);
    }
    var param = ref({
      // pram nạp cho các funtion request filter
      id: select.value.id,
      page: 0,
      size: 12,
    });

    //////////// requset
    const getCatergorys = async () => {
      const result = await get_catergorys();
      catergorys.value = result.data;
      return catergorys;
    };
    const getTags = async () => {
      const result = await get_tags();
      tags.value = result.data;
      return tags;
    };
    const getSizes = async () => {
      const result = await get_sizes();
      sizes.value = result.data;
      return sizes;
    };
    const getBrands = async () => {
      const result = await get_brands();
      brands.value = result.data;
      return brands;
    };

    //filter
    const getProductSByCaTergory = async (paramProduct) => {
      const result = await get_products_by_idCatergory(paramProduct);
      const products = result.data.content.map?.((e) => {
        return e.product;
      });
      data.value = {
        data: products,
        totalPages: result.data.content.totalPages,
      };
    };
    const getProductSByBrand = async (paramProduct) => {
      const result = await get_products_by_idbrand(paramProduct);
      const products = result.data.content.map?.((e) => {
        return e;
      });
      data.value = {
        data: products,
        totalPages: result.data.totalPages,
      };
    };
    const getProductSByTag = async (paramProduct) => {
      const result = await get_products_by_idtag(paramProduct);
      const products = result.data.content.map?.((e) => {
        return e;
      });
      data.value = {
        data: products,
        totalPages: result.data.totalPages,
      };
    };
    const getProductSBySize = async (paramProduct) => {
      const result = await get_products_by_idsize(paramProduct);
      const products = result.data.content.map?.((e) => {
        return e.product;
      });
      data.value = {
        data: products,
        totalPages: result.data.content.totalPages,
      };
    };
    const getproducts = async (paramProduct) => {
      const result = await get_products(paramProduct);
      data.value = {
        data: result.data.content,
        totalPages: result.data.totalPages,
      };
    };
    // const getProductByNmae = async (param) => {
    //   const result = await get_products_by_name_containing(param);
    //   data.value = result.data.content;
    //   totalPages.value = result.data.totalPages;
    // };

    //controll
    const typeRender = (selects) => {
      if (selects.value.type == "all") {
        getproducts(param.value);
        return;
      }
      if (selects.value.type == "catergory") {
        getProductSByCaTergory(param.value);
        return;
      }
      if (selects.value.type == "size") {
        getProductSBySize(param.value);
        return;
      }
      if (selects.value.type == "tag") {
        getProductSByTag(param.value);
        return;
      }
      if (selects.value.type == "brand") {
        getProductSByBrand(param.value);
        return;
      }
    };
    typeRender(select);
    var form = ref(1);

    // switch (ct.value) {
    //   case 1: {
    //     typeRender(select);
    //     break;
    //   }
    //   case 2: {
    //     typeRender();
    //     break;
    //   }
    //   default:
    //     break;
    // }
    getCatergorys();
    getTags();
    getSizes();
    getBrands();

    const changepage = (pag) => {
      param.value = {
        id: select.value.id,
        page: pag - 1,
        size: 12,
      };
      typeRender(select);
    };

    watch(select, (n, o) => {
      if (n != o) {
        // console.log("ui");
      }
      param.value = {
        id: select.value.id,
        page: 0,
        size: 12,
      };
      typeRender(select);
    });
    return {
      data,
      tags,
      catergorys,
      sizes,
      brands,
      select,
      searchText,
      changepage,
      form,
    };
  },
};
</script>
    
<style scoped>
* {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
.left {
  width: 30%;
}
.products {
  width: 60%;
}
.buttontag {
  border: solid 0.7px rgb(150, 150, 150) !important;
  width: max-width !important;
  border-radius: 20px !important;
  background-color: rgb(140, 8, 147);
  color: white;
  padding: 0 10px;
  margin-bottom: 10px;
}
.buttontag:hover {
  background-color: rgb(140, 8, 147) !important;
  color: white !important;
}

.item:hover .icon {
  color: rgb(159, 14, 140);
  display: block;
  display: inline;
}
.iconform {
  cursor: pointer;
  margin: 0 5px 10px 0;
}
.iconform:hover {
  color: rgb(165, 23, 108);
}
</style>