<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Không tìm thấy trang</h2>
    <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
    <router-link to="/" class="home-btn">Quay về trang chủ</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
  color: #333;
}

.not-found h1 {
  font-size: 80px;
  margin: 0;
  color: #ff4c4c;
}

.not-found h2 {
  font-size: 24px;
  margin: 10px 0;
}

.not-found p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.home-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.home-btn:hover {
  background-color: #0056b3;
}
</style>
