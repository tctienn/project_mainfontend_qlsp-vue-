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
              <!-- <td style="width: max-content; font-size: 90%">
                <div class="listMenu">Của Hàng</div>
              </td> -->
              <td style="width: max-content; font-size: 90%">
                <router-link
                  :to="'/collecttion/'"
                  style="text-decoration: none"
                >
                  <div class="listMenu">Bộ sưu tập</div>
                </router-link>
              </td>
              <!-- <td style="width: max-content; font-size: 90%">
                <div class="listMenu">Trang</div>
              </td> -->
              <!-- <td style="width: max-content; font-size: 90%">
                <div class="listMenu">Blog</div>
              </td> -->
              <!-- <td style="width: max-content; font-size: 90%">
                <div class="listMenu">Liên hệ</div>
              </td> -->
            </tr>
          </table>
        </td>
        <td style="position: relative">
          <div class="boxicon">
            <v-icon id="activator-target" class="icon" size="20px"
              >mdi-magnify</v-icon
            >
            <!-- search dialog -->
            <v-dialog
              activator="#activator-target"
              max-width="340"
              v-model="dialog"
            >
              <template v-slot:default="{ isActive }">
                <div
                  style="
                    width: max-content;
                    margin: auto;
                    background-color: white;
                    border-radius: 40px;
                    padding: 10px 15px;
                  "
                >
                  <input
                    style="
                      width: 300px;
                      height: 30px;
                      border-radius: 20px;
                      margin-right: 10px;
                      padding-left: 8px;
                    "
                    v-model="searchText"
                    type="text"
                    placeholder="tìm tên sản phẩm"
                  />
                  <v-btn
                    class="ml-auto"
                    @click="
                      {
                        dialog = !dialog;
                      }
                    "
                    v-model="isActive.value"
                    style="width: max-content"
                    variant="text"
                  >
                    <v-icon
                      id="activator-target"
                      class="icon"
                      size="20px"
                      v-on:click="$emit('ay', searchText)"
                      >mdi-magnify</v-icon
                    >
                  </v-btn>
                </div>
              </template>
            </v-dialog>
            <div class="icon" style="position: relative">
              <router-link to="/login" v-if="user?.getUserStore == null">
                <Icon icon="et:profile-female" width="20px"></Icon>
              </router-link>
              <router-link v-else to="/profile">
                <img
                  src="/proflie.gif"
                  style="width: 25px; aspect-ratio: 2/2; border-radius: 5px"
                  :title="user?.getUserStore.userName"
              /></router-link>

              <small
                style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  font-size: 10px;
                  width: max-content;
                "
              >
              </small>
            </div>

            <div style="position: relative">
              <router-link to="/history" title="Lịch sử mua hàng">
                <v-icon class="icon" size="20px">mdi-history</v-icon>
              </router-link>
              <!-- <div
                x
                style="
                  position: absolute;
                  top: -10px;
                  left: 2px;
                  background-color: red;
                  opacity: 0.4;
                  border-radius: 80%;
                  color: white;
                  width: 22px;
                  text-align: center;
                  aspect-ratio: 2/2;
                "
              ></div> -->
            </div>
            <div style="position: relative">
              <router-link to="/cart-user" title="Giỏ hàng">
                <v-icon class="icon" size="20px">mdi-cart-arrow-down</v-icon>
              </router-link>
              <div
                v-if="!(user?.getUserStore == null)"
                style="
                  position: absolute;
                  top: -10px;
                  left: 2px;
                  background-color: red;
                  opacity: 0.4;
                  border-radius: 80%;
                  color: white;
                  width: 22px;
                  text-align: center;
                  aspect-ratio: 2/2;
                "
              >
                {{ user?.getCartStore?.length }}
              </div>
            </div>
            <!-- <div style="position: relative">
              <v-icon class="icon" size="20px">mdi-cart-arrow-down</v-icon>
            </div> -->
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
    
<script>
// import { getCookie } from "@/api/CookieFuntion";
import { get_cart_byIdUser } from "@/api/ApiUser";
import { getCookie } from "@/api/CookieFuntion";
import { userStore } from "@/stores/counter";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
export default {
  name: "HeaDer",
  components: { Icon },
  emits: ["ay"],
  setup() {
    const searchText = ref("");
    const dialog = ref(false);
    const user = userStore();
    // console.log("load", getCookie("login_token_qlsp"));
    // console.log("load store", user.getCartStore?.length);
    console.log("chạy header");
    const getCart = async (id) => {
      console.log("chạy get cart");
      const response = await get_cart_byIdUser(id);
      user.reload(response.data);
      return response.data;
    };
    const load = async () => {
      console.log("header tokenlogin", getCookie("login_token_qlsp"));

      if (getCookie("login_token_qlsp")) {
        getCart(getCookie("login_token_qlsp").user.id);
      }
      // if (getCookie("login_token_qlsp")) user.reload();
    };
    load();
    const ay = () => {
      // dialog.value = !dialog.value;
      // emit("as");
    };
    return { searchText, dialog, ay, user };
  },
};
</script>
    
<style scoped>
td {
  /* border: solid 1px black; */
  width: 30%;
  height: 100px;
}
.tr {
  color: rgb(39, 39, 39);
  /* transition: box-shadow 0.3s ease; */
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
  /* box-shadow: 0px 0 80px 20px rgb(0 236 236 / 45%); */
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
  /* color: rgb(240, 224, 255); */
  /* box-shadow: 0 0 10px rgba(240, 224, 255, 0.5); */
  left: 0;
}
th {
  text-align: center;
}

.boxicon {
  width: 150px;
  padding: 5px 0;
  /* text-align: center; */
  position: absolute;
  border-radius: 10px;
  top: 40px;
  right: 50px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.205);
  /* box-shadow: 0px 0 40px 10px rgba(240, 224, 255, 0.861); */
}

.icon:hover {
  color: white;
  background: rgba(240, 224, 255, 0.874);
  box-shadow: 0px 0 40px 20px rgba(240, 224, 255, 1);
}
.icon {
  cursor: pointer;
}
router-link {
  text-decoration: none;
}
</style>