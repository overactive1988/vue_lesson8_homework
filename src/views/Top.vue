<template>
  <header>
    <TopNavbar></TopNavbar>
  </header>
  <main>
    <section class="top">
      <div class="container-fluid position-relative">
        <div class="top-scrolldown">
          SCROLL DOWN<span class="top-scrolldown__line"></span>
        </div>
        <div class="container position-relative vh-100">
          <div class="top__inner">
            <h2 class="top__title text-light">小魔女諾貝塔<br />雜貨工坊</h2>
            <p class="top__subtitle text-light h6 fw-normal mb-2 mb-md-4">
              所有小魔女諾貝塔相關的商品，只有在這裡獨家販售
            </p>
            <router-link
              class="top__button btn btn-outline-light w-100"
              to="/products"
              >商品列表<span class="material-icons">
                navigate_next
              </span></router-link
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
export default {
  components: {
    TopNavbar,
  },
};
</script>

<style scoped></style>
