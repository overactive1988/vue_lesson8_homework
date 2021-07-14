<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div class="container content">
    <h1 class="text-center">商品列表</h1>
    <p class="mt-4 text-end">
      總共有 <span id="productCount">{{ allproductsNum.length }}</span> 項商品
    </p>
    <!-- 商品列表 -->
    <table class="table align-middle mt-4">
      <thead>
        <tr>
          <th width="10%">商品縮圖</th>
          <th width="10%">商品名稱</th>
          <th width="27%">商品敘述</th>
          <th width="17%">商品規格</th>
          <th class="text-end" width="9%">價格</th>
          <th class="text-end" width="23%"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in products" :key="item.id">
          <td>
            <img class="product-img" :src="item.imageUrl" :alt="item.title" />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.content }}</td>
          <td class="text-end">
            <div class="h5">{{ $filters.currency(item.price) }} 元</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <router-link
                class="btn btn-outline-primary"
                :to="`/product/${item.id}`"
                >查看更多</router-link
              >
              <button
                @click="addCart(item.id)"
                type="button"
                :disabled="loadingStatus.loadingItem === item.id + 1"
                class="btn btn-outline-danger"
              >
                <span
                  v-if="loadingStatus.loadingItem === item.id + 1"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                加到購物車
              </button>
              <button
                @click="addMyFavorite(item.id)"
                type="button"
                class="btn btn-outline-danger"
                :class="{ active: myFavorite.includes(item.id) }"
              >
                加到我的最愛
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// LocalStorage
// 轉型
const storageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite);
    // Favorite
    localStorage.setItem("Favorite", favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem("Favorite"));
  },
};

import Navbar from "@/components/Navbar.vue";
import emitter from "../assets/js/methods/emitter";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      product: {},
      cart: {},
      allproductsNum: "",
      myFavorite: storageMethods.get() || [],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    addMyFavorite(id) {
      if (this.myFavorite.includes(id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1);
      } else {
        this.myFavorite.push(id);
      }
      console.log(this.myFavorite);
      storageMethods.save(this.myFavorite);
    },
    showAlert(res) {
      this.$swal(res.data.message);
    },
    // 取得商品列表
    getProducts() {
      // 參數預設值
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { products } = res.data;
            this.products = products;
            this.getAllproducts();
            console.log(this.products);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllproducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.allproductsNum = Object.values(res.data.products); // 將回傳的物件轉換為陣列
        })
        .catch((error) => {
          console.log(error);
        });
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
  mounted() {
    console.clear();
    this.getProducts();
  },
};
</script>
