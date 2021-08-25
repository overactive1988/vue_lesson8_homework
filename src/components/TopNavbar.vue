<template>
  <nav
    class="
      nav-top
      navbar navbar-expand-lg
      header-nav
      navbar-dark
      position-fixed
      w-100
    "
    :class="{ 'bg-dark': navbarTop, 'pb-0': navbarTop }"
    style="z-index: 10"
  >
    <div class="container-fluid">
      <p class="w-auto mb-2 h1">
        <router-link class="navbar-brand" to="/">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626951642442.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UP6QtkXC9JnrYjnguN%2FrLpP3eFkq%2Fy84Tpk7MB7OwBY18SbD5rumr4N29ezT%2FyrFH%2FWT97RHlnjGnHN6tbh%2B5QcFTJCcjH%2BjeHKg%2BCK%2BuGi1ICAuqADwFh%2FzyRudSZU9%2BcVe%2B%2BoY6t1JK3I%2BrPpNFd5ruoryyTgfeOT8ekewGXd7HxNJRBIfWzC1kfFn%2BJI%2BF%2F9RshF3veGS80eYqcBoeR6yBe4J0tNWyzun1k4RbxlHhxdIZESTOlX%2F%2BUQp9t76HmMNOG%2BxcU6zZDR3UWaeIwvJiX3wkyrulHBe83YnxGpxdeZK%2BqNBlLAr3rt0dP4aTQQnYeff%2FgdOVX1AxesREQ%3D%3D"
            alt="LITTLE WITCH NOBETA"
            class="d-inline-block align-text-top nav-logo"
            width="120"
          />
        </router-link>
      </p>
      <ul class="navbar-nav ms-auto d-lg-none pe-2 flex-row align-items-center">
        <li v-if="myFavorite.length > 0" class="nav-item me-3">
          <router-link class="nav-link text-decoration-none" to="/favorite"
            ><span class="material-icons position-relative h1">
              star
              <span
                v-if="myFavorite.length"
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
                >{{ myFavorite.length }}
                <span class="visually-hidden">unread messages</span></span
              >
            </span>
          </router-link>
        </li>
        <li class="nav-item me-2">
          <router-link class="nav-link text-decoration-none" to="/cart"
            ><span class="material-icons position-relative h1">
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
        <div class="nav-item">
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
        </div>
      </ul>
      <div
        class="
          collapse
          navbar-collapse
          position-lg-relative
          justify-content-lg-end
          mb-2 mb-lg-0
        "
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
          <li
            v-if="myFavorite.length > 0"
            class="nav-item text-center d-none d-lg-block"
          >
            <router-link class="nav-link text-decoration-none" to="/favorite">
              <span
                class="material-icons position-relative"
                style="font-size: 2.8rem"
              >
                star
                <span
                  v-if="myFavorite.length"
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
                  >{{ myFavorite.length }}
                  <span class="visually-hidden">unread messages</span></span
                >
              </span>
            </router-link>
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
import localStorage from "@/assets/js/mixins/localStorage";
export default {
  data() {
    return {
      cartItems: "",
      navbarTop: false,
      favoriteProduct: [],
      myFavorite: this.getLocalStorage() || [],
    };
  },
  mixins: [localStorage],
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
    },
    getCartItem() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartItems = res.data.data.carts.length;
          }
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    navSwitch() {
      window.addEventListener("scroll", () => {
        const windowY = window.scrollY;
        const main = document.querySelector("#main");

        if (windowY > main.offsetTop) {
          this.navbarTop = true;
        } else {
          this.navbarTop = false;
        }
      });
    },
    getFavorite() {
      this.myFavorite = this.getLocalStorage() || [];
      this.favoriteProduct = [];
      if (this.myFavorite.length > 0) {
        this.myFavorite.forEach((item) => {
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${item}`;
          this.$http
            .get(url)
            .then((res) => {
              if (res.data.success) {
                this.favoriteProduct.push(res.data.product);
              }
            })
            .catch((err) => err);
        });
      }
    },
  },
  mounted() {
    this.navSwitch();
    this.getCartItem();
    this.getFavorite();
    emitter.on("update-cart", () => {
      this.getCartItem();
    });
  },
  unmounted() {
    emitter.off("update-cart", () => {
      this.getCartItem();
    });
  },
};
</script>
