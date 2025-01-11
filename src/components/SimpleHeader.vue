<template>
  <div style="width: 100%">
    <table style="width: 100%">
      <tr>
        <td style="padding-left: 100px">
          <router-link to="/">
            <img style="width: 250px" src="/Logo.png" alt="logo" />
          </router-link>
        </td>
        <td style="width: 40%">
          <table style="width: 40%; margin: auto">
            <tr>
              <td style="width: max-content; font-size: 90%">
                <div class="listMenu">
                  <router-link style="text-decoration: none" to="/">
                    Trang Chủ
                  </router-link>
                </div>
              </td>
              <td style="width: max-content; font-size: 90%">
                <router-link
                  :to="'/collecttion/'"
                  style="text-decoration: none"
                >
                  <div class="listMenu">Bộ sưu tập</div>
                </router-link>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>
  
  <script>
export default {
  name: "HeaDer",
};
</script>
  
  <style scoped>
td {
  width: 30%;
  height: 100px;
}
.tr {
  color: rgb(39, 39, 39);
}
.listMenu {
  position: relative;
  text-align: center;
  width: max-content;
  padding: 4px;
  border-radius: 5px;
}
.listMenu:hover {
  color: rgb(203, 148, 255);
}
.listMenu:before {
  content: "";
  background-color: rgb(240, 224, 255);
  position: absolute;
  width: 0;
  right: 0;
  height: 100%;
  transition: 800ms;
  height: 2px;
  z-index: -1;
  bottom: 0;
}
.listMenu:hover::before {
  width: 100%;
  left: 0;
}
th {
  text-align: center;
}
router-link {
  text-decoration: none;
}
</style>
  