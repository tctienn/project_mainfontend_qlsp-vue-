<template>
  <div style="width: 100%; aspect-ratio: 13 / 14; border: solid 1px black">
    <MagicZoom :src="img" :zoomScale="2" :lensSize="200" style="width: 100%" />
  </div>
</template>

<script>
import { MagicZoom } from "vue-magic-zoom";
export default {
  name: "ZoomImage",
  props: ["img"],
  components: {
    MagicZoom,
  },
  setup() {
    const a =
      "https://d2jq2hx2dbkw6t.cloudfront.net/610/vue-image-zoom-smooth.jpg";
    return { a };
  },
};
</script>

<style scoped>
.magic-zoom {
  width: 200px; /* Điều chỉnh chiều rộng */
  height: 400px; /* Điều chỉnh chiều cao */
}
</style>
