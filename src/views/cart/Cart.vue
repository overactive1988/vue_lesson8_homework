<template>
  <header>
    <Navbar></Navbar>
  </header>
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
  },
  mounted() {
    console.clear();
  },
};
</script>
