<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div id="main" class="container-fluid content content-user">
    <h2 class="text-center pt-4">商品列表</h2>
    <p class="mt-4 text-end">
      總共有
      <span id="productCount">{{ this.filterProducts.length }}</span> 項商品
    </p>
    <div class="row">
      <div
        class="
          col-12 col-sm-3 col-md-2
          position-relativd position-sm-fixed
          me-auto
        "
      >
        <div class="list-group mb-3 mb-sm-0">
          <a
            href="#"
            class="list-group-item"
            aria-current="true"
            @click.prevent="selectCategory = ''"
            :class="{ active: selectCategory === '' }"
            >所有商品</a
          >
          <a
            href="#"
            v-for="item in categories"
            :key="item"
            class="list-group-item list-group-item-action"
            aria-current="true"
            @click.prevent="selectCategory = item"
            :class="{ active: item === selectCategory }"
          >
            {{ item }}
          </a>

          <!-- <a
            href="#"
            class="list-group-item list-group-item-action active disabled"
            tabindex="-1"
            aria-disabled="true"
            >A disabled link item</a
          > -->
        </div>
      </div>
      <div class="col-12 col-sm-9 col-md-10 ms-auto">
        <!-- 商品列表 -->
        <ul
          class="
            row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
            g-3
            list-unstyled
          "
        >
          <li v-for="item in filterProducts" :key="item" class="col">
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

              <div
                class="
                  card-footer
                  d-flex
                  align-items-center
                  justify-content-between
                  position-relative
                "
                style="z-index: 5"
              >
                <a href="#" @click.prevent="addMyFavorite(item.id)">
                  <span
                    v-if="myFavorite.includes(item.id)"
                    class="material-icons"
                  >
                    star
                  </span>
                  <span v-else class="material-icons"> star_border </span>
                </a>
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
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import localStorage from "@/assets/js/mixins/localStorage";
export default {
  props: ["propsCategory"],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      myFavorite: this.getLocalStorage() || [],
      categories: [],
      selectCategory: "",
    };
  },
  mixins: [localStorage],
  components: {
    Navbar,
  },
  inject: ["emitter"],
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    // 取得商品列表
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { products } = res.data;
            this.products = products;
            this.getCatgories();
          }
        })
        .catch((error) => error);
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
          this.emitter.emit("update-cart");
          this.showAlert(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCatgories() {
      const categories = new Set();
      this.products.forEach((item) => {
        categories.add(item.category);
      });
      this.categories = [...categories];
      this.selectCategory = this.propsCategory;
      this.emitter.emit("clearProps");
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
    this.getProducts();
    this.topCategory = "";
  },
};
</script>
