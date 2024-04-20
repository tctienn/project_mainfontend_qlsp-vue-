<template>
  <div style="width: 100%; aspect-ratio: 13 / 14; border: solid 1px black">
    <MagicZoom :src="img" style="width: 100%" />
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
</style>
