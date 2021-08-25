<template>
  <main id="main" class="container-lg content">
    <h2 class="pt-4 text-light">填寫訂單</h2>
    <div class="bg-light my-3 my-sm-5 p-4">
      <figure class="mt-0 mb-3 my-sm-5 text-center mx-auto">
        <img
          class="img-fluid"
          src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638262066.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=NfdAEOCee8c1DktKIangjnAP2g1jIMG3H05q4kQGNqzb98VCcv%2FKXolI3t4JA2gIaWZkQ0D1AfKLG41aAqt6m9eCFVINJBi9MTzqVxzwFe6DWq55IQKgZxbvFGOiSRkcaRXIxVuMJrX%2BFFtRqXGgxy2BLFU6I7EV9MSr3uUVYpyiQgdxLLmhDi8ws1TQdsz2nLgsxcmdT6k4PgpYaSbnahWJoQgcLONzYJ4ClFzQ6rjUveFIZ7vJSJd4LtkV7vsrT3xkL9KIEE%2FtxXoK6aW8Zph2X%2BfJvpwbc2yaUQfQCZcbX77chGTXSjuT7QN7Ooxig6tYUctLj6P0rYWPYgNd1A%3D%3D"
          alt="step2 填寫訂單"
        />
      </figure>
      <div class="my-5 row justify-content-center">
        <template v-if="cart.total > 0">
          <Form
            ref="form"
            v-slot="{ errors }"
            @submit="onSubmit"
            class="mt-4 mt-lg-0 col-lg-6 order-1 order-lg-0"
          >
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
              <Field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入 姓名"
                rules="required"
                v-model="form.user.name"
              ></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
              <Field
                id="email"
                name="信箱"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['信箱'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></Field>
              <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
              <Field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入 電話"
                :rules="isPhone"
                v-model="form.user.tel"
              ></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
              <Field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入 地址"
                rules="required"
                v-model="form.user.address"
              ></Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="payment" class="form-label">付款方式</label>
              <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
              <Field
                id="payment"
                class="d-block w-50 p-1"
                name="付款方式"
                as="select"
                rules="required"
                v-model="form.user.payment_method"
                :class="{ 'is-invalid': errors['付款方式'] }"
              >
                <option value="">請選擇付款方式</option>
                <option value="ATM轉帳">ATM轉帳</option>
                <option value="信用卡">信用卡</option>
                <option value="面交">面交</option>
              </Field>
              <ErrorMessage
                name="付款方式"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                name=""
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>

            <div class="d-flex justify-content-between">
              <router-link class="btn btn-secondary" to="/cart"
                >返回購物車</router-link
              >

              <button
                type="submit"
                class="btn btn-nobeta"
                :disabled="cart.carts <= 1"
              >
                <span
                  v-if="loadingStatus.loadingItem === 2"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                確認訂單
              </button>
            </div>
          </Form>
          <div class="col-lg-6 order-0 order-lg-1">
            <h3 class="mb-3">購買品項</h3>
            <table class="p-table table align-middle">
              <thead class="p-table__head">
                <tr class="text-light">
                  <th class="p-table__th--name text-center fs-7 fs-sm-6">
                    商品
                  </th>
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
        </template>
        <p v-else class="text-center">請先將商品加入購物車</p>
      </div>
    </div>
  </main>
</template>

<script>
import emitter from "@/assets/js/methods/emitter";
import ConfirmCart from "@/components/cart/ConfirmCart.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      cart: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          payment_method: "",
        },
        message: "",
      },
    };
  },
  components: {
    ConfirmCart,
  },
  methods: {
    showAlert() {
      this.$swal({
        title: "請先加入商品至購物車",
        icon: "error",
      });
    },
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
    },
    check() {
      if (this.cart.carts.length < 1) {
        this.showAlert();
        this.$router.push("/products");
      }
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            emitter.emit("update-cart");
            this.check();
          }
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需為正確的 手機號碼";
    },
    onSubmit() {
      this.loadingStatus.loadingItem = 2;
      emitter.emit("sendForm", this.form);
      this.$router.push("/cartconfirm");
    },
  },
  mounted() {
    // console.clear();
    this.getCart();
  },
};
</script>
