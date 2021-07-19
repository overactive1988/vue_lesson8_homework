<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      bg-dark
      position-fixed
      header-nav
      w-100
    "
    style="z-index: 10"
  >
    <div class="container-fluid">
      <h1 class="w-50 w-sm-auto">
        <router-link class="navbar-brand" to="/">
          <img
            src="../assets/images/logo.png"
            alt="LITTLE WITCH NOBETA"
            width="180"
            class="d-inline-block align-text-top"
          />
        </router-link>
      </h1>
      <ul class="navbar-nav ms-auto d-block d-lg-none pe-2" style="">
        <li class="nav-item" style="">
          <router-link class="nav-link text-decoration-none" to="/cart"
            ><span
              class="material-icons position-relative"
              style="font-size: 2.8rem"
            >
              shopping_cart
              <span
                v-if="cartItems"
                class="
                  position-absolute
                  top-0
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-secondary
                  font-monospace
                  lh-xs
                "
                >{{ cartItems }}
                <span class="visually-hidden">unread messages</span></span
              >
            </span>
          </router-link>
        </li>
      </ul>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/"
              >首頁<span class="text-uppercase">top</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/products"
              >商品列表<span class="text-uppercase">lineup</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/articles"
              >最新消息<span class="text-uppercase">news</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/about"
              >關於諾貝塔<span class="text-uppercase">about</span></router-link
            >
          </li>
          <li class="nav-item text-center d-none d-lg-block">
            <router-link class="nav-link text-decoration-none" to="/cart"
              ><span
                class="material-icons position-relative"
                style="font-size: 2.8rem"
              >
                shopping_cart
                <span
                  v-if="cartItems"
                  class="
                    position-absolute
                    top-0
                    start-100
                    translate-middle
                    badge
                    rounded-pill
                    bg-secondary
                    font-monospace
                    lh-xs
                  "
                  >{{ cartItems }}
                  <span class="visually-hidden">unread messages</span></span
                >
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "../assets/js/methods/emitter";
export default {
  data() {
    return {
      cartItems: "",
    };
  },
  methods: {
    getCartItem() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            this.cartItems = res.data.data.carts.length;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCartItem();
    emitter.on("update-cart", () => {
      this.getCartItem();
    });
  },
};
</script>
