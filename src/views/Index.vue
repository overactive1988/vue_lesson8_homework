<template>
  <header>
    <Navbar></Navbar>
  </header>
  <router-view />
  <Footer></Footer>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";
</style>
