<template>
  <h1 class="text-center">完成下訂</h1>
  <figure class="my-5 text-center mx-auto">
    <img
      class="img-fluid"
      src="../../assets/images/cart_step04.png"
      alt="step4 完成下訂"
    />
  </figure>

  <h2 class="text-center">購買品項</h2>
  <table class="p-table table align-middle w-md-50 mx-auto">
    <thead class="p-table__foot">
      <tr class="text-light">
        <th width="40%" class="text-center fs-7 fs-sm-6">商品</th>
        <th class="p-table__th--num text-center fs-7 fs-sm-6">數量</th>
      </tr>
    </thead>
    <tbody class="p-table__body">
      <tr v-for="item in order.products" :key="item">
        <td>
          <figure class="d-sm-flex align-items-center">
            <img
              class="product-img"
              :src="item.product.imageUrl"
              :alt="item.product.title"
            />
            <figcaption class="ps-2">
              <span class="badge bg-primary">{{ item.product.category }}</span>
              <p class="fs-7 fs-sm-6">{{ item.product.title }}</p>
            </figcaption>
          </figure>
        </td>
        <td class="text-center">
          {{ item.qty }}
        </td>
      </tr>
    </tbody>
    <tfoot class="p-table__head">
      <tr class="text-light">
        <td class="text-end">總計</td>
        <td class="text-center">{{ $filters.currency(order.total) }} NTD</td>
      </tr>
    </tfoot>
  </table>

  <h2 class="text-center">客戶資訊</h2>
  <div class="row justify-content-center">
    <dl class="col-md-6" v-if="order.user">
      <dt>姓名：</dt>
      <dd>{{ order.user.name }}</dd>
      <dt>寄送地址：</dt>
      <dd>{{ order.user.address }}</dd>
      <dt>E-mail信箱：</dt>
      <dd>{{ order.user.email }}</dd>
      <dt>付款方式：</dt>
      <dd>{{ order.user.payment_method }}</dd>
    </dl>
  </div>

  <div class="d-flex justify-content-center mb-4">
    <button type="button" class="btn btn-primary" @click="payment()">
      <span
        v-if="loadingStatus.loadingItem === 3"
        class="material-icons animate-spin"
      >
        cached
      </span>
      結帳付款
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      order: {},
    };
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    getOrder() {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    payment() {
      this.loadingStatus.loadingItem = 3;
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = "";
            this.showAlert(res);
            this.$router.push(`/cartcompleted/${id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getOrder();
  },
};
</script>
