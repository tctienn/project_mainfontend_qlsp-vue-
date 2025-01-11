<template>
  <simple-header />
  <div class="order-history">
    <h2>Lịch sử đơn hàng</h2>

    <!-- Hiển thị danh sách đơn hàng -->
    <div v-if="data.length > 0" class="order-list">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã giao dịch</th>
            <th>Số hóa đơn</th>
            <th>Tổng tiền</th>
            <th>Trạng thái thanh toán</th>
            <th>Sản phẩm</th>
            <th>Trạng thái giao</th>
            <th>Nơi nhận</th>
            <th>Thời gian tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.magd }}</td>
            <td>{{ value.sohd }}</td>
            <td>{{ formatVND(value.tongtien) }}</td>
            <td>
              {{
                value.trangthai == "succes"
                  ? "Đã thanh toán"
                  : value.trangthai == "wait"
                  ? "Đang thanh toán"
                  : "Bị hủy"
              }}
            </td>
            <td>{{ value.sp }}</td>
            <td>
              {{
                value.giaohang == "wait"
                  ? "Đang chờ nhận đơn"
                  : value.giaohang == "received"
                  ? "Đang giao"
                  : "Bị hủy"
              }}
            </td>
            <td>{{ value.diachi }}</td>
            <td>{{ formatDate(value.ngaytao) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Hiển thị nếu không có đơn hàng -->
    <div v-else>
      <p>Không có đơn hàng nào trong lịch sử.</p>
    </div>
  </div>

  <!-- Phân trang -->
  <v-pagination :length="totalPages" v-model="page"></v-pagination>
</template>
  
  <script>
import { ref, watch } from "vue";
import SimpleHeader from "@/components/SimpleHeader.vue";
import { get_invoices_user } from "@/api/ApiUser";
import { userStore } from "@/stores/counter";

export default {
  components: { SimpleHeader },
  name: "OrderHistory",
  setup() {
    const user = userStore();
    const totalPages = ref(0);
    const page = ref(1);

    // Định dạng ngày
    const formatDate = (dateString) => {
      if (!dateString || dateString.length !== 14) return "N/A";

      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      const hour = dateString.slice(8, 10);
      const minute = dateString.slice(10, 12);
      const second = dateString.slice(12, 14);

      return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    };

    // Định dạng tiền tệ VND
    const formatVND = (number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    };

    // Dữ liệu đơn hàng
    const data = ref([]);

    // Lấy danh sách đơn hàng
    const getInvoice = async () => {
      if (!user.user) {
        alert("Bạn chưa đăng nhập để dùng chức năng này!");
        return;
      }
      const response = await get_invoices_user(
        user.user.gmail,
        user.user.userName,
        page.value - 1
      );
      data.value = response.data.content;
      totalPages.value = response.data.totalPages;
    };

    getInvoice();

    watch(page, (newData, oldData) => {
      // console.log("watch data", newData, oldData, props.searchEvem.text);
      if (newData !== oldData) {
        console.log("chuyển trang trong history user");
        getInvoice();
      }
    });

    return { formatDate, formatVND, data, page, totalPages };
  },
};
</script>
  
  <style scoped>
/* Giao diện lịch sử đơn hàng */
.order-history {
  max-width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-history h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Thêm scroll ngang cho bảng nếu dài quá */

.order-list {
  overflow-x: auto;
  border-radius: 8px;
  background-color: #d7d7d7;
}

.order-list table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
}

.order-list th,
.order-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.order-list th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.order-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Thiết lập màu sắc cho các hàng trong bảng */
.order-item td {
  color: #333;
}

.order-item td:nth-child(1) {
  text-align: center;
}

.order-item td:nth-child(4),
.order-item td:nth-child(5) {
  text-align: right;
}

.order-history p {
  text-align: center;
  font-size: 16px;
  color: #666;
}

/* Nút xem chi tiết */
.view-btn {
  display: inline-block;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.view-btn:hover {
  background-color: #0056b3;
}
</style>
  