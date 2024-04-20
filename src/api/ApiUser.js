import axios from "axios";
import { getCookie } from "./CookieFuntion";

const url = 'http://localhost:8080/user'



const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

apiUser.interceptors.request.use(function (config) {
    const token = getCookie('login_token_qlsp').stringToken
    if (config.method === 'get') {

        config.data = null // xác nhận phương thức get không gửi dữ liệu 
        config.headers = {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
            'Content-Type': 'application/json'
        };
        return config

    }

    if (config.method === 'post') {


        config.headers = {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
            'Content-Type': 'application/json'
        };
        return config

    }

}, function (error) {
    // Xử lý lỗi

    console.log('lỗi ở intercepter.requset user')

    return Promise.reject(error);
});
apiUser.interceptors.response.use(function (response) {
    // Trả về dữ liệu phản hồi
    // localStorage.setItem('token', response.data.access_token)

    // console.log(localStorage.getItem('token'))
    return response;
}, function (error) {
    // Xử lý lỗi
    console.log('lỗi')
    return Promise.reject(error);
});

export const get_cart_byIdUser = (idUser) => {
    return apiUser.get(`cart/get-cart-by-user/${idUser}`)
}
export const post_add_cartItem = (idUser, idProduct, quantity) => {
    return apiUser.post(`cart/add-cartitem?idUser=${idUser}&idProduct=${idProduct}&quantity=${quantity}`)
}