<template>
  <div>
    <input
      type="hidden"
      v-model="query"
      @input="debouncedFetchSuggestions"
      placeholder="Nhập địa chỉ..."
    />
    <ul v-if="suggestions.length">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.place_id"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
    <div id="map"></div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { debounce } from "vue-debounce";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: ["querys"],
  data() {
    return {
      query: this.querys,
      suggestions: [],
      map: null,
      marker: null,
      address: this.querys,
    };
  },
  mounted() {
    this.initializeMap();
  },

  methods: {
    fetchSuggestions() {
      if (this.querys.length < 3) {
        this.suggestions = [];
        return;
      }
      axios
        .get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: this.querys,
            format: "json",
            addressdetails: 1,
            countrycodes: "VN",
          },
        })
        .then((response) => {
          this.suggestions = response.data;
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    },
    debouncedFetchSuggestions: debounce(function () {
      this.fetchSuggestions();
    }, 300),
    initializeMap() {
      this.map = L.map("map").setView([21.0285, 105.8542], 13); // Hà Nội, Việt Nam
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      this.map.on("click", this.onMapClick); // Lấy tọa độ khi click vào bản đồ
    },
    selectSuggestion(suggestion) {
      const { lat, lon, display_name } = suggestion;
      this.addMarker(lat, lon, display_name);
    },
    onMapClick(e) {
      const { lat, lng } = e.latlng;
      axios
        .get("https://nominatim.openstreetmap.org/reverse", {
          params: { lat, lon: lng, format: "json" },
        })
        .then((response) => {
          const address = response.data.display_name;
          this.addMarker(lat, lng, address);
        })
        .catch((error) => console.error("Error fetching address:", error));
    },
    addMarker(lat, lon, popupText) {
      this.address = popupText;
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lon])
        .addTo(this.map)
        .bindPopup(popupText)
        .openPopup();
      this.map.setView([lat, lon], this.map.getZoom()); // Cập nhật vị trí trên bản đồ với mức phóng to hiện tại
      this.updatePoint(lat, lon); // Gọi hàm updatePoint khi vị trí thay đổi
    },
    updatePoint(lat, lon) {
      var ads = this.address;
      // Hàm rỗng sẽ được chạy mỗi khi vị trí con trỏ được cập nhật
      this.$emit("pointLALON", { lat, lon, ads });
      console.log(`vị trí con trỏ: ${this.querys}, ${lat}, ${lon}`);
    },
  },
  watch: {
    querys(newQuery) {
      this.query = newQuery; // Cập nhật query khi querys thay đổi
      this.debouncedFetchSuggestions();
    },
  },
};
</script>
  
  <style>
#map {
  height: 400px;
  width: 80vw;
}
</style>
  