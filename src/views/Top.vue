<template>
  <header>
    <TopNavbar></TopNavbar>
  </header>
  <main>
    <section class="top position-relative">
      <div class="top__inner">
        <h2 class="top__title text-light">小魔女諾貝塔<br />雜貨工坊</h2>
        <p class="top__subtitle text-light h6 fw-normal mb-4">
          所有小魔女諾貝塔相關的商品，只有在這裡獨家販售
        </p>
        <button type="button" class="top__button btn btn-outline-light w-100">
          商品列表<span class="material-icons"> navigate_next </span>
        </button>
      </div>
      <div class="top-scrolldown">
        SCROLL DOWN<span class="top-scrolldown__line"></span>
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
