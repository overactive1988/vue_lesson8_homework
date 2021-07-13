<template>
  <div class="container content mt-4">
    <h1 class="text-center">購物車</h1>
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
    <table class="table align-middle">
      <thead>
        <tr>
          <th width="5%"></th>
          <th width="10%">縮圖</th>
          <th width="10%">類別</th>
          <th width="15%">品名</th>
          <th width="15%">數量</th>
          <th width="10%" class="text-end">單價</th>
          <th width="12%" class="text-end">合計</th>
        </tr>
      </thead>
      <tbody>
        <UserCart
          :loading="loadingStatus"
          :cartitem="cart"
          @delete-cart="deleteCart"
          @add-product-num="addProductNum"
          @cut-product-num="cutProductNum"
          v-if="cart.carts"
        ></UserCart>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="6" class="text-end">總計</td>
          <td v-if="cart?.carts?.length >= 1" class="text-end">
            {{ $filters.currency(this.cart.total) }}
          </td>
          <td v-else class="text-end">尚無商品</td>
        </tr>
      </tfoot>
    </table>
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
