// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/ApiLogin'
import { deleteCookie, getCookie } from '@/api/CookieFuntion'
import { get_cart_byIdUser, get_check_cartItem, post_add_cartItem } from '@/api/ApiUser'
import { toast } from "vue3-toastify";
// import { getCookie } from '@/api/CookieFuntion'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

// var timeoutID = null;
// var a=0;
// const debout = () => {
//   a++;
//   if (timeoutID) {
//     // Nếu đã có timeoutID tồn tại, hủy bỏ timeout hiện tại
//     clearTimeout(timeoutID);
//   }
//   timeoutID = setTimeout(() => {
//     console.log("data", a);
//   }, 2000);
// };

const notify = (text, type) => { // thông báo
  toast(text, {
    type: type,
    autoClose: 3000,
    dangerouslyHTMLString: true,
  });
};



export const userStore = defineStore("login", {
  state: () => {
    return {
      user: (getCookie('login_token_qlsp') ? getCookie('login_token_qlsp').user : null),
      cart: [],
      ay: 0
    }

  },
  actions: {
    // async fetchCart(idUser) {
    //   if (this.user) {
    //     const cartData = await getCart(idUser);
    //     this.cart = cartData;
    //   }
    // },

    async login(data) {
      const response = await login(data)
      this.user = {
        userName: response.data.user.userName,
        sdt: response.data.user.sdt,
        createTime: response.data.user.createTime,
        gmail: response.data.user.gmail
      };
      // this.cart = await getCart(response.data.user.id)

      // return response.data.user
      // console.log("login",this.cart)

    },

    async reload(data) { // dùng để bắt một số trường hợp lỗi để trả về dữ liệu cũ
      try {

        if (getCookie('login_token_qlsp')) {
          console.log('load lại dữ liệu user')
          this.cart = data;
        }
      } catch (error) {
        console.error('load dữ liệu er', error);
      }
    },
    async pay() {
      if (getCookie('login_token_qlsp') == null) {
        return notify("yêu cầu đăng nhập để có thể trải nghiệp các tính năng", "warning")
      }
      // await pay().then((data) => {
      //   console.log(data)
      //   // window.location.href = data.data.url;
      // })
      // this.cart = await getCart(getCookie('login_token_qlsp').user.id)
    },

    async addCartItem(product, quantity) {

      if (getCookie('login_token_qlsp') == null) {
        return notify("yêu cầu đăng nhập để có thể trải nghiệp các tính năng", "warning")
      }


      try {
        await get_check_cartItem(getCookie('login_token_qlsp').user.id, product.id)
        await post_add_cartItem(getCookie('login_token_qlsp').user.id, product.id, quantity)
      } catch (err) {
        get_cart_byIdUser(getCookie('login_token_qlsp').user.id).then(data => this.cart = data.data)
        return

      }



      // this.cart = await getCart(getCookie('login_token_qlsp').user.id)
      // this.cart = await get_cart_byIdUser(getCookie('login_token_qlsp').user.id).data
      get_cart_byIdUser(getCookie('login_token_qlsp').user.id).then(data => this.cart = data.data)
      // return response.data.user
      notify("Thêm " + quantity + "  " + product.name + " vào giỏ hảng thành công", "success")
      // console.log("addcartitem", this.cart)

    },
    async updateCartItem(product, quantity) {

      if (getCookie('login_token_qlsp') == null) {
        return notify("yêu cầu đăng nhập để có thể trải nghiệp các tính năng", "warning")
      }


      try {
        await post_add_cartItem(getCookie('login_token_qlsp').user.id, product.id, quantity)
      } catch (err) {
        await get_cart_byIdUser(getCookie('login_token_qlsp').user.id).then(data => this.cart = data.data)
        console.log("reduce", userStore().getCartStore);

        return
      }


      // this.cart = await get_cart_byIdUser(getCookie('login_token_qlsp').user.id).data
      // this.cart = await getCart(getCookie('login_token_qlsp').user.id)
      get_cart_byIdUser(getCookie('login_token_qlsp').user.id).then(data => this.cart = data.data)

      // return response.data.user
      notify("cập nhật " + quantity + "  " + product.name + " vào giỏ hảng thành công", "success")
      // console.log("addcartitem", this.cart)

    },

    logout() {
      deleteCookie("login_token_qlsp");
      this.cart = null
      this.user = null
    },

    demo() {
      this.ay = ++this.ay


    }
  },
  getters: {

    getUserStore(state) {
      // var userCokie = getCookie('login_token_qlsp')
      return state.user
    },
    getCartStore(state) {
      return state.cart
    },
    getdemo(state) {
      return state.ay
    }
  }

})

