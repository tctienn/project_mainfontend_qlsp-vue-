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
    "
  >
    <div>
      <router-link to="/" style="text-decoration: none">Home</router-link>/Blog
    </div>
  </div>
  <div style="width: 90%; margin: auto; display: flex; margin-top: 10px">
    <div style="width: 70%; position: relative">
      <img :src="data.imgMain" style="width: 100%; aspect-ratio: 24 / 14" />

      <small>
        <b> {{ data.nameCreateUser }} / {{ data.createTime }}</b>
      </small>
      <h2>{{ data.title }}</h2>
      <p>{{ data?.conten }}</p>
      <br />
      <br />
      <div style="position: absolute; bottom: 0; right: 0">
        <v-icon>mdi-facebook</v-icon>
        <v-icon>mdi-pinterest</v-icon>
        <v-icon>mdi-twitter</v-icon>
      </div>
    </div>
    <div style="width: 30%; padding: 50px">
      <h4>ABOUT ME</h4>
      <br />
      <img
        style="width: 100%; aspect-ratio: 2/2"
        src="https://byanca.qodeinteractive.com/wp-content/uploads/2018/09/user-blog-img-1.jpg"
      />
      <p style="color: rgb(115, 115, 115)">
        Putent salutar sea no, ex animal imped nonu mea. Is de nie et une, seam
        et quemi ludus rectorem etete.
      </p>
      <br />
      <br />
      <img
        style="width: 100%; aspect-ratio: 2/2"
        src="https://byanca.qodeinteractive.com/wp-content/uploads/2018/08/blog-baner-img-1.jpg"
      />
      <br />
      <h4>RELATED POSTS</h4>
      <br />
      <div>
        <div
          v-for="(e, i) in listBlog"
          :key="i"
          style="
            display: flex;
            margin-bottom: 10px;
            box-shadow: 3px 4px 8px -2px black;
            border-radius: 7px;
            padding: 7px 0 0 7px;
          "
        >
          <div style="width: 50px; aspect-ratio: 2/2; margin-right: 10px">
            <img style="width: 100%; height: 100%" :src="e.blog.imgMain" />
          </div>
          <div style="font-size: 14px">{{ e.blog.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <Footer1 />
</template>
    
<script >
import { get_blog_by_id, get_blog_byrender_by_type } from "@/api/ApiRequest";
import HeaderVue from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";
import { onMounted, ref } from "vue";
// import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default {
  name: "DeTailblog",
  components: { HeaderVue, Footer1 },
  setup() {
    const data = ref({});
    const listBlog = ref([]);
    const route = useRouter().currentRoute.value.params.id;
    const getBlogById = async (id) => {
      // console.log("result", route.currentRoute.value.params.id);
      const result = await get_blog_by_id(id);
      data.value = result.data;
      data.value.createTime = convertDateFormat(data.value.createTime);
      // alert("ayyyy");
    };

    const getBlogByType = async () => {
      // console.log("result", route.currentRoute.value.params.id);
      const result = await get_blog_byrender_by_type(3, 4);
      listBlog.value = result.data.content;
      console.log(listBlog.value[0].blog.title);
    };

    const convertDateFormat = (inputDate) => {
      let splitDate = inputDate.split("-");
      return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    };
    onMounted(() => {
      getBlogById(route);
      getBlogByType();
    });
    return { data, convertDateFormat, listBlog };
  },
};
</script>
    
<style>
</style>