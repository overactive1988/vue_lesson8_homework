<template>
  <div class="container-lg content">
    <h1 class="text-center">確認訂單</h1>
    <figure class="my-5 text-center mx-auto">
      <img
        class="img-fluid"
        src="../../assets/images/cart_step03.png"
        alt="step3 確認訂單內容"
      />
    </figure>
    <div class="my-5 row justify-content-center">
      <template v-if="cart.total > 0">
        <div class="col-md-8">
          <h2 class="text-center">購買品項</h2>
          <table class="p-table table align-middle">
            <thead class="p-table__head">
              <tr class="text-light">
                <th class="p-table__th--name text-center fs-7 fs-sm-6">商品</th>
                <th width="15%" class="text-center fs-7 fs-sm-6">單價</th>
                <th width="20%" class="text-center fs-7 fs-sm-6">數量</th>
                <th width="30%" class="text-end fs-7 fs-sm-6">小計</th>
              </tr>
            </thead>
            <tbody class="p-table__body">
              <ConfirmCart :cartitem="cart" v-if="cart.carts"></ConfirmCart>
            </tbody>
            <tfoot class="p-table__foot">
              <tr class="text-light">
                <td
                  colspan="4"
                  v-if="cart?.carts?.length >= 1"
                  class="text-end"
                >
                  <del v-if="cart.final_total !== cart.total">
                    總計： {{ $filters.currency(this.cart.total) }} NTD</del
                  >
                  <template v-else
                    >總計：
                    {{ $filters.currency(this.cart.total) }} NTD</template
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
        </div>

        <Form ref="form" @submit="onSubmit" class="col-md-4">
          <div class="mb-3">
            <h2 class="text-center">客戶資訊</h2>
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

          <div class="d-flex justify-content-between">
            <router-link class="btn btn-secondary" to="/cartcheck"
              >返回填寫訂單</router-link
            >
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
      </template>
      <p v-else class="text-center">請先將商品加入購物車</p>
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
        message: "cccccc",
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
            this.$router.push(`/cartcompleted/${res.data.orderId}`);
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
