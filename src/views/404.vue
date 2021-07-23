<template>
  <header class="nav-header">
    <Navbar></Navbar>
  </header>
  
  <main id="main" class="container-fulid text-center bg-primary">
    <div class="container pt-8 pb-4 content position-relative">
      <div class="col position-relative">
        <figure class="ms-4 mb-0">
          <img src="../assets/images/404.png" alt="塔尼亞" class="img-fluid" />
        </figure>
      </div>
      <h2 class="fs-xl text-light">404</h2>
      <p class="fs-4 text-light">對不起，找不到您想前往的頁面…</p>
    </div>
  </main>
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
