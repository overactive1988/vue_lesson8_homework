<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div id="main" class="container-lg content content-user">
    <h2 class="text-center pt-4">收藏清單</h2>
    <p class="mt-4 text-end">
      您共有
      <span id="productCount">{{ this.favoriteProduct.length }}</span>
      件收藏商品
    </p>

    <div class="ms-auto">
      <!-- 商品列表 -->
      <ul
        class="
          row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
          g-3
          list-unstyled
        "
      >
        <li v-for="item in favoriteProduct" :key="item" class="col">
          <div class="card h-100">
            <router-link
              :to="`/product/${item.id}`"
              class="text-decoration-none stretched-link h-100"
            >
              <img :src="item.imageUrl" class="card-img-top" alt="item.title" />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">{{ item.price }}NTD</p>
              </div>
            </router-link>

            <div
              class="
                card-footer
                d-flex
                align-items-center
                justify-content-end
                position-relative
              "
              style="z-index: 5"
            >
              <button
                @click="addCart(item.id)"
                type="button"
                :disabled="loadingStatus.loadingItem === item.id + 1"
                class="btn btn-primary btn-sm"
              >
                <span
                  v-if="loadingStatus.loadingItem === item.id + 1"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                加到購物車
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="d-flex my-4">
      <router-link class="btn btn-primary" to="/products">返回</router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import emitter from "../../assets/js/methods/emitter";
import localStorage from "@/assets/js/mixins/localStorage";
export default {
  props: ["propsCategory"],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      product: {},
      cart: {},
      favoriteProduct: [],
      myFavorite: this.getLocalStorage() || [],
      selectCategory: "",
    };
  },
  components: {
    Navbar,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    // 取得收藏列表
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
    addCart(id, qty = 1) {
      this.loadingStatus.loadingItem = id + 1;
      const cartInfo = {
        data: {
          product_id: id,
          qty,
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, cartInfo)
        .then((res) => {
          this.loadingStatus.loadingItem = "";
          emitter.emit("update-cart");
          this.showAlert(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mixins: [localStorage],
  computed: {
    filterProducts() {
      return this.products.filter((item) =>
        item.category.match(this.selectCategory)
      );
    },
  },
  mounted() {
    console.clear();
    this.getFavorite();
  },
};
</script>
