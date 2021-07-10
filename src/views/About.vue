<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div class="container content">
    <h1 class="text-center">關於諾貝塔</h1>
    <figure class="text-center">
      <img class="img-fluid" src="../assets/images/about_bg.jpg" alt />
    </figure>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
