<template>
  <main id="main" class="container-lg content">
    <h2 class="pt-4 text-light">填寫訂單</h2>
    <div class="w-100 w-lg-75 mx-auto">
      <div class="bg-light p-3 pb-1 my-3">
        <figure class="text-center mx-auto">
          <img
            class="img-fluid"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638262066.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=NfdAEOCee8c1DktKIangjnAP2g1jIMG3H05q4kQGNqzb98VCcv%2FKXolI3t4JA2gIaWZkQ0D1AfKLG41aAqt6m9eCFVINJBi9MTzqVxzwFe6DWq55IQKgZxbvFGOiSRkcaRXIxVuMJrX%2BFFtRqXGgxy2BLFU6I7EV9MSr3uUVYpyiQgdxLLmhDi8ws1TQdsz2nLgsxcmdT6k4PgpYaSbnahWJoQgcLONzYJ4ClFzQ6rjUveFIZ7vJSJd4LtkV7vsrT3xkL9KIEE%2FtxXoK6aW8Zph2X%2BfJvpwbc2yaUQfQCZcbX77chGTXSjuT7QN7Ooxig6tYUctLj6P0rYWPYgNd1A%3D%3D"
            alt="step2 填寫訂單"
          />
        </figure>
      </div>

      <div class="bg-opacity mt-3 mt-md-5 p-3">
        <div class="my-2 row justify-content-center">
          <template v-if="cart.total > 0">
            <Form
              ref="form"
              v-slot="{ errors }"
              @submit="onSubmit"
              class="col-md-8 order-1 order-lg-0"
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
                <ErrorMessage
                  name="姓名"
                  class="invalid-feedback"
                ></ErrorMessage>
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
                <ErrorMessage
                  name="信箱"
                  class="invalid-feedback"
                ></ErrorMessage>
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
                <ErrorMessage
                  name="電話"
                  class="invalid-feedback"
                ></ErrorMessage>
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
                <ErrorMessage
                  name="地址"
                  class="invalid-feedback"
                ></ErrorMessage>
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
                  確認訂單<span class="fs-5 material-icons mb-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </Form>
          </template>
          <p v-else class="text-center mb-0">請先將商品加入購物車</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import emitter from "@/assets/js/methods/emitter";
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
