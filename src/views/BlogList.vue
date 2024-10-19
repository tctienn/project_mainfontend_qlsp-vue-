<template>
  <div class="blog-list">
    <h1>Danh Sách Blog</h1>
    <div class="blog-item" v-for="item in data.content" :key="item.id">
      <img :src="item.imgMain" alt="Blog Image" class="blog-image" />
      <div class="blog-content">
        <h2>{{ item.title }}</h2>
        <p class="author">{{ item.nameCreateUser }} - {{ item.createTime }}</p>
        <p>{{ item.conten }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";

export default {
  setup() {
    const data = ref({
      content: [
        {
          id: 1,
          title: "Nội dung Blog 1",
          conten: "conten",
          nameCreateUser: "adwwd",
          createTime: "2024-04-27",
          imgMain:
            "https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg",
          imgBackGround:
            "https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg",
        },
        {
          id: 2,
          title: "New shop collection our shop",
          conten:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprhendit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qei officia deser mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\n\nLorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim veniam quis nostrud.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehendrit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          nameCreateUser: "nameuser",
          createTime: "2024-05-02",
          imgMain:
            "https://storage.googleapis.com/staging.testupload-93817.appspot.com/1714651915272_blog-5_(1).webp",
          imgBackGround:
            "https://storage.googleapis.com/staging.testupload-93817.appspot.com/1714651915735_blog-5.webp",
        },
      ],
      // Thông tin phân trang có thể được sử dụng nếu cần thiết
      pageable: {
        totalPages: 5,
        totalElements: 9,
        size: 2,
        number: 0,
      },
    });

    return {
      data,
    };
  },
};
</script>
  
  <style scoped>
.blog-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.blog-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
  display: flex;
}

.blog-image {
  max-width: 150px;
  border-radius: 5px;
  margin-right: 15px;
}

.blog-content {
  flex: 1;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin: 10px 0;
}

.author {
  font-size: 14px;
  color: gray;
}
</style>
  