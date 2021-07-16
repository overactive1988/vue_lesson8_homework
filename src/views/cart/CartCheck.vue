<template>
  <div class="container-lg content content-user">
    <h1 class="text-center pt-4">填寫訂單</h1>
    <figure class="my-5 text-center mx-auto">
      <img
        class="img-fluid"
        src="../../assets/images/cart_step02.png"
        alt="step2 填寫訂單"
      />
    </figure>
    <div class="my-5 row justify-content-center">
      <Form ref="form" v-slot="{ errors }" @submit="onSubmit" class="col-md-7">
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
          <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
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
            class="btn btn-primary"
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
    </div>
  </div>
</template>

<script>
import emitter from "../../assets/js/methods/emitter";
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
    console.clear();
    this.getCart();
  },
};
</script>
