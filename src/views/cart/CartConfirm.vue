<template>
  <div class="container content">
    <h1 class="text-center">確認訂單</h1>
    <table class="table align-middle">
      <thead>
        <tr>
          <th width="10%">縮圖</th>
          <th width="10%">類別</th>
          <th width="15%">品名</th>
          <th width="5%" class="text-end">數量</th>
          <th width="10%" class="text-end">單價</th>
          <th width="12%" class="text-end">合計</th>
        </tr>
      </thead>
      <tbody>
        <ConfirmCart
          :loading="loadingStatus"
          :cartitem="cart"
          v-if="cart.carts"
        ></ConfirmCart>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總計</td>
          <td v-if="cart?.carts?.length >= 1" class="text-end">
            {{ $filters.currency(this.cart.total) }}
          </td>
          <td v-else class="text-end">尚無商品</td>
        </tr>
      </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
      <Form ref="form" @submit="onSubmit" class="col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            placeholder="請輸入 姓名"
            rules="required"
            :value="form.user.name"
            disabled
          ></Field>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="信箱"
            type="email"
            class="form-control"
            placeholder="請輸入 Email"
            rules="email|required"
            :value="form.user.email"
            disabled
          ></Field>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            placeholder="請輸入 電話"
            :value="form.user.tel"
            disabled
          ></Field>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            placeholder="請輸入 地址"
            rules="required"
            :value="form.user.address"
            disabled
          ></Field>
        </div>

        <div class="mb-3">
          <label for="payment" class="form-label">付款方式</label>
          <Field
            id="payment"
            class="form-control"
            name="付款方式"
            rules="required"
            :value="form.user.payment_method"
            disabled
          >
          </Field>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            :value="form.message"
            disabled
          ></textarea>
        </div>

        <div class="text-end">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="cart.carts <= 1"
          >
            <span
              v-if="loadingStatus.loadingItem === 2"
              class="material-icons animate-spin"
            >
              cached
            </span>
            送出訂單
          </button>
        </div>
      </Form>
    </div>
    <div class="d-flex justify-content-between mb-4">
      <router-link class="btn btn-secondary" to="/cartcheck"
        >返回填寫訂單</router-link
      >
    </div>
  </div>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
import ConfirmCart from "../../components/ConfirmCart.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
      form: {
        user: {
          name: "123",
          email: "koushun777@gmail.com",
          tel: "0912345678",
          address: "12444",
          payment_method: "信用卡",
        },
        message: "",
      },
    };
  },
  components: {
    ConfirmCart,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    check() {
      if (this.cart.carts.length < 1) {
        alert("請先加入商品至購物車");
        this.$router.push("/products");
      }
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
            this.check();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCartOnly() {
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
    onSubmit() {
      this.loadingStatus.loadingItem = 2;
      const orderInfo = {
        data: {
          user: this.form.user,
          message: this.form.message,
        },
      };
      console.log(orderInfo);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, orderInfo)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$refs.form.resetForm();
            this.form.message = "";
            this.showAlert(res);
            this.loadingStatus.loadingItem = "";
            this.getCartOnly();
            this.$router.push("/cartcompleted");
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
