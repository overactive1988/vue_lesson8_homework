<template>
  <div class="bg-cover--01">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-light" :to="`/`">首頁</router-link>
        </li>
        <li class="breadcrumb-item text-light active" aria-current="page">
          收藏清單
        </li>
      </ol>
    </nav>
    <div class="container-fluid pb-5 bg-01">
      <main id="main" class="container-lg content">
        <h2 class="pt-4 text-light">收藏清單</h2>
        <template v-if="this.favoriteProduct.length > 0">
          <p class="mt-4 text-end text-light">
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
                    <img
                      :src="item.imageUrl"
                      class="card-img-top"
                      alt="item.title"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{{ item.title }}</h5>
                      <p class="card-text">{{ item.price }}NTD</p>
                    </div>
                  </router-link>
                  <div class="row gx-2" style="z-index: 8">
                    <div class="col-6">
                      <button
                        @click="addCart(item.id)"
                        type="button"
                        :disabled="loadingStatus.loadingItem === item.id + 1"
                        class="btn btn-nobeta btn-sm card-lick__button w-100"
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
                    <div class="col-6">
                      <button
                        @click.prevent="addMyFavorite(item.id)"
                        @click="getFavorite()"
                        type="button"
                        :disabled="loadingStatus.loadingItem === item.id + 2"
                        class="btn btn-secondary btn-sm card-lick__button w-100"
                      >
                        取消收藏
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <div v-else>
          <h3 class="h4 text-center text-light">
            您目前沒有收藏任何商品，趕快去商品頁面逛逛吧～
          </h3>
          <nav class="nav-products mt-5">
            <ul
              class="nav-products__lists article-list w-100 w-md-50 mx-auto"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="600"
            >
              <li class="nav-products__list">
                <a href="#" aria-current="true" @click.prevent="clickCategory()"
                  ><span>所有商品</span></a
                >
              </li>
              <li
                v-for="item in this.category"
                :key="item.name"
                class="nav-products__list"
              >
                <a
                  href="#"
                  aria-current="true"
                  @click.prevent="clickCategory(item.name)"
                  ><span>{{ item.name }}</span></a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="d-flex my-4">
          <router-link class="btn btn-nobeta" to="/products">返回</router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import localStorage from "@/assets/js/mixins/localStorage";
import emitter from "../../assets/js/methods/emitter";
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
      category: [
        {
          name: "諾貝塔",
        },
        {
          name: "塔妮亞",
        },
        {
          name: "莫妮卡",
        },
        {
          name: "其他周邊",
        },
      ],
    };
  },
  components: {
    Navbar,
  },
  mixins: [localStorage],
  inject: ["emitter"],
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
      this.addMyFavorite(id);
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
          this.emitter.emit("update-cart");
          this.showAlert(res);
        })
        .catch((error) => {
          console.log(error);
        });
      this.getFavorite();
    },
    clickCategory(category = "") {
      emitter.emit("categoryTop", category);
      this.$router.push(`/products/`);
    },
  },
  computed: {
    filterProducts() {
      return this.products.filter((item) =>
        item.category.match(this.selectCategory)
      );
    },
  },
  mounted() {
    // console.clear();
    this.getFavorite();
  },
};
</script>
