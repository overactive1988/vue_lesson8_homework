<template>
  <header>
    <Navbar></Navbar>
  </header>
  <router-view :props-form="tempform" />
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
};
</script>
