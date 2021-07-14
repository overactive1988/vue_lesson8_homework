<template>
  <div class="container-lg content mt-4">
    <h1 class="text-center">確認購物車</h1>
    <figure class="my-5 text-center mx-auto">
      <img
        class="img-fluid"
        src="../../assets/images/cart_step01.png"
        alt="step1 確認購物車"
      />
    </figure>
    <template v-if="cart.total > 0">
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
        </tbody>
        <tfoot class="p-table__foot">
          <tr class="text-light">
            <td colspan="2" class="text-end">總計</td>
            <td colspan="2" v-if="cart?.carts?.length >= 1" class="text-end">
              {{ $filters.currency(this.cart.total) }} NTD
            </td>
            <td v-else class="text-end">尚無商品</td>
          </tr>
        </tfoot>
      </table>
    </template>
    <p v-else class="text-center">請先將商品加入購物車</p>
    <div class="d-flex justify-content-between mb-4">
      <router-link class="btn btn-secondary" to="/products"
        >繼續購物</router-link
      >
      <router-link
        class="btn btn-primary"
        :aria-disabled="cart.carts <= 1"
        :class="{ disabled: cart.carts <= 1 }"
        to="/cartcheck"
        >下一步</router-link
      >
    </div>
  </div>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
import UserCart from "../../components/UserCart.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
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
          // console.log(res);
          if (res.data.success) {
            this.cart = res.data.data;
            emitter.emit("update-cart");
            console.log(this.cart);
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
          console.log(res);
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
          console.log(res);
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.getCart();
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
