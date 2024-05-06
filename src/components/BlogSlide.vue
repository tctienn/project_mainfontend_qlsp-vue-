<template>
  <v-sheet class="mx-auto" elevation="0" max-width="100%">
    <v-slide-group class="pa-o" show-arrows>
      <v-slide-group-item v-for="(e, i) in data" :key="i">
        <div
          class="ma-2"
          style="width: 300px; height: 300px; cursor: pointer"
          @click="router.push(`/blog/detail/${e.blog.id}`)"
        >
          <img :src="e.blog.imgBackGround" style="width: 100%; height: 60%" />

          <div
            style="
              width: 100%;
              text-align: center;
              padding: 20px;
              background-color: rgb(207, 207, 207);
            "
          >
            <h4>{{ e.blog.title }}</h4>
            <small>by: {{ e.blog.nameCreateUser }}</small>
          </div>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
    
<script>
import { ref } from "vue";
import { get_blog_byrender_by_type } from "@/api/ApiRequest";
import router from "@/router";

export default {
  name: "BlogSl",
  components: {},
  setup() {
    const data = ref([]);
    const getBlogRender = async () => {
      const result = await get_blog_byrender_by_type(3, 5);
      //   console.log("result", result.data.content);
      data.value = result.data.content;
    };
    getBlogRender();
    return {
      data,
      router,
    };
  },
};
</script>
    
<style>
</style>