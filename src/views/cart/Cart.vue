<template>
  <div class="">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <div class="container-fluid pb-5">
      <router-view :props-form="tempform" />
    </div>
  </div>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
import Navbar from "@/components/Navbar.vue";
export default {
  data() {
    return {
      tempform: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          payment_method: "",
        },
        message: "",
      },
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    console.clear();
  },
  created() {
    emitter.on("sendForm", (data) => {
      this.tempform = data;
    });
  },
  unmounted() {
    emitter.off("sendForm", (data) => {
      this.tempform = data;
    });
  },
};
</script>
