<template>
  <div class="container content">
    <h1 class="text-center">完成訂單</h1>
  </div>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
export default {
  data() {
    return {
      cart: "",
    };
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            this.cart = res.data.data;
            emitter.emit("update-cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getCart();
  },
};
</script>
