<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div class="container-fulid text-center bg-primary">
    <div class="container content position-relative">
      <div class="position-absolute top-50 start-50 translate-middle p-3 w-100">
        <div class="row flex-wrap flex-column align-middle">
          <div class="col position-relative">
            <figure class="ms-4 mb-0">
              <img
                src="../assets/images/404.png"
                alt="塔尼亞"
                class="img-fluid"
              />
            </figure>
          </div>
          <div class="col">
            <h1 class="fs-xl text-light">404</h1>
            <p class="fs-4 text-light">對不起，找不太到您想前往的頁面…</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
