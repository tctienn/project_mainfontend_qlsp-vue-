// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/ApiLogin'
import { getCookie } from '@/api/CookieFuntion'
import { get_cart_byIdUser, post_add_cartItem } from '@/api/ApiUser'
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



const getCart = async (id) => {

  const response = await get_cart_byIdUser(id)
  return response.data

}
const cart = (getCookie('login_token_qlsp') ? (await getCart(getCookie('login_token_qlsp').user.id)) : null)
export const userStore = defineStore("login", {
  state: () => {
    return {
      user: (getCookie('login_token_qlsp') ? getCookie('login_token_qlsp').user : null),
      cart: cart,
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
      this.cart = await getCart(response.data.user.id)

      // return response.data.user
      // console.log("login",this.cart)

    },

    async addCartItem(product, quantity) {
      await post_add_cartItem(getCookie('login_token_qlsp').user.id, product.id, quantity)
      this.cart = await getCart(getCookie('login_token_qlsp').user.id)

      // return response.data.user
      console.log("addcartitem", this.cart)

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

