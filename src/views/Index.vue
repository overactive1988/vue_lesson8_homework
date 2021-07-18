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
  mounted() {
    emitter.on("categoryTop", (c) => {
      this.topCategory = c;
      console.log("this.topCategory:", this.topCategory);
    });
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";
</style>
