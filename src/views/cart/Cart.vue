<template>
  <header>
    <Navbar></Navbar>
  </header>
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  mounted() {
    console.clear();
  },
};
</script>
