<template>
  <router-view :props-category="topCategory" />
  <Footer></Footer>
</template>
<script>
import emitter from "../assets/js/methods/emitter";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      topCategory: "",
    };
  },
  components: {
    Footer,
  },
  provide() {
    return {
      emitter,
    };
  },
  mounted() {
    emitter.on("categoryTop", (c) => {
      this.topCategory = c;
    });
    emitter.on("clearProps", () => {
      this.topCategory = "";
    });
  },
  unmounted() {
    emitter.off("categoryTop", (c) => {
      this.topCategory = c;
    });
    emitter.off("clearProps", () => {
      this.topCategory = "";
    });
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";
</style>
