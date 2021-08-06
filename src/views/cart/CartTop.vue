<template>
  <main id="main" class="container-lg content">
    <h2 class="pt-4 text-light">確認購物車</h2>
    <div class="bg-light my-3 my-sm-5 p-4">
      <template v-if="cart.total > 0">
        <figure class="mt-0 mb-3 my-sm-5 text-center mx-auto">
          <img
            class="img-fluid"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638211897.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cE9cq%2FuejGmjfshmJWikytVxp1UR98rJprDbTcN9R7qyaqv9AGb4Nxrt5eNf9naqv1a7MIc9wQmEUGPppvJv%2BjhHz9do1NAk5xS6EyIDOG1ZOY7E5JXOECmeXUgnDZy2W1hbBAyB0lIsASpoSW8H2AywjxzMYFE%2FHboUtkzswdjy5tDy07DBmpnAM9udZ6KRX8DxpBwZqhYNE9u18aFpNC5O3TXoafvGsgvOx7d%2B10siwv%2FlWYYPe925Q3eR67yfRHol3RSioPgSiIPE9t9l%2BQHRiKdzszK15bDfahZlDlDbnDyTf7gv0S0L7QhM5rj14j8ELLYCuy3%2FjFAhsAXPNA%3D%3D"
            alt="step1 確認購物車"
          />
        </figure>
        <div class="text-end mb-2">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deleteCartAll"
            :disabled="cart.carts <= 1"
          >
            <span
              v-if="loadingStatus.loadingItem === 1"
              class="material-icons animate-spin"
            >
              cached
            </span>
            清空購物車
          </button>
        </div>
        <!-- 購物車列表 -->
        <table class="p-table table align-middle">
          <thead class="p-table__head">
            <tr class="text-light">
              <th width="30%" class="text-center fs-7 fs-sm-6">商品</th>
              <th class="p-table__th--num text-center fs-7 fs-sm-6">數量</th>
              <th width="20%" class="text-end fs-7 fs-sm-6">小計</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody class="p-table__body">
            <UserCart
              :loading="loadingStatus"
              :cartitem="cart"
              @delete-cart="deleteCart"
              @add-product-num="addProductNum"
              @cut-product-num="cutProductNum"
              v-if="cart.carts"
            ></UserCart>
            <tr>
              <td>
                <span v-if="this.message" class="text-danger">{{
                  this.message
                }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot class="p-table__foot">
            <tr class="text-light">
              <td colspan="2">
                <div
                  v-if="cart.final_total == cart.total"
                  class="input-group mb-3 input-group-sm"
                >
                  <input
                    type="text"
                    class="form-control"
                    v-model="coupon_code"
                    placeholder="請輸入優惠碼"
                    :disabled="cart.final_total !== cart.total"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-sm btn-outline-light ms-2"
                      type="button"
                      @click="addCouponCode()"
                      :disabled="cart.final_total !== cart.total"
                    >
                      <span
                        v-if="loadingStatus.loadingItem === 3"
                        class="material-icons animate-spin"
                      >
                        cached
                      </span>
                      套用優惠碼
                    </button>
                  </div>
                </div>
              </td>
              <td colspan="2" v-if="cart?.carts?.length >= 1" class="text-end">
                <del v-if="cart.final_total !== cart.total">
                  總計： {{ $filters.currency(this.cart.total) }} NTD</del
                >
                <template v-else
                  >總計： {{ $filters.currency(this.cart.total) }} NTD</template
                >
              </td>
              <td v-else class="text-end">尚無商品</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="4" class="text-end text-light">
                折扣價： {{ $filters.currency(cart.final_total) }} NTD
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex justify-content-between mb-4">
          <router-link class="btn btn-secondary" to="/products"
            >繼續購物</router-link
          >
          <router-link
            class="btn btn-nobeta"
            :aria-disabled="cart.carts <= 1"
            :class="{ disabled: cart.carts <= 1 }"
            to="/cartcheck"
            >下一步</router-link
          >
        </div>
      </template>
      <div v-else class="row">
        <div class="col-12 col-md-6">
          <p class="mx-auto position-relative">
            <router-link class="stretched-link" to="/products"
              ><img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1627713231125.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KA109n1zVjPEbxfGqLQLXvS8BDx%2By653lSnylXeUDyf7%2BI8SboUVFMz4GWYfvMuXWIBqyR2h3r2MkO3D2a1ZYFFi9Woqep1VI4t2hovPJLG0yHpFat0zzZfYZLC%2B5N%2B89AuTqMlPFsqBpy80GBkcOP0DNyjxmNz1lGaFYwMd3IhQk8kncQdDyHWKveZgd67HT4kyk3YyhaCoA9LWHmUyWfQzUHqYnLxknpm%2FSdyqeLFO6itKEhTVJgIGoAzRwrNtKnnSNKBD%2BbLgBVKQdpp15SukuChXCRdUyev0%2BmutlX%2FN5sSYPM1StGheiypaEa2HyjyvB6qL7wYoY6%2FMLqkNAQ%3D%3D"
                alt="請先將商品加入購物車"
                class="img-fluid"
            /></router-link>
          </p>
        </div>
        <div class="col-12 col-md-6 d-flex flex-wrap">
          <nav class="nav-products w-100">
            <p class="h3">選擇商品類別</p>
            <ul
              class="nav-products__lists cart-list mt-3"
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
          <div class="mt-auto d-flex mb-4 w-100">
            <router-link class="btn btn-nobeta" to="/products"
              >繼續購物</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
import UserCart from "../../components/cart/UserCart.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
      coupon_code: "",
      message: "",
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
    UserCart,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    deleteCartAll() {
      this.loadingStatus.loadingItem = 1;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.showAlert(res);
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            emitter.emit("update-cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCart(item) {
      this.loadingStatus.loadingItem = item.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.showAlert(res);
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cutProductNum(item) {
      this.loadingStatus.loadingItem = item.id;
      const cartInfo = {
        data: {
          product_id: item.product.id,
          qty: (item.qty -= 1),
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, cartInfo)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addProductNum(item) {
      this.loadingStatus.loadingItem = item.id;
      const cartInfo = {
        data: {
          product_id: item.product.id,
          qty: (item.qty += 1),
        },
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, cartInfo)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.getCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCouponCode() {
      this.loadingStatus.loadingItem = 3;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.$http
        .post(url, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.showAlert(res);
            this.coupon_code = "";
            this.message = "";
            this.getCart();
          } else {
            this.coupon_code = "";
            this.loadingStatus.loadingItem = "";
            this.message = res.data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickCategory(category = "") {
      emitter.emit("categoryTop", category);
      this.$router.push(`/products/`);
    },
  },
  mounted() {
    console.clear();
    this.getCart();
  },
};
</script>
