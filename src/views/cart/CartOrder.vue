<template>
  <h2 class="pt-4 text-light">完成下訂</h2>
  <div class="bg-light my-3 my-sm-5 p-4">
    <figure class="mt-0 mb-3 my-sm-5 text-center mx-auto">
      <img
        class="img-fluid"
        src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638315773.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=NAzscr3NADSvZ5T%2FO1PKZsVwLaMgiErpdNX2PjCqeKouBzWLfyZvcvGPgqyAE%2FP2Kh0TVGbHsgb9oIY6mWd9qk8hB09lQrfHozajWcUm6JZqz%2F0GrOlyR7sR2YTLPj6v2X9A660jp3Xs2qVkfMEGBHSYWUpG2BUzc9%2BE2BiagVh7iV3xrZeZOtmSHQJLjJLZDDQoD7JdFOXQH4Gp3WQjIoOIQ0fkWF1oSo1MVLlCuubgLpTDdGXf3CYTHgnWaJkXKyKgh%2F2Kjd6wa9q7gabCxHQBud6hQ31yf5V%2BYXDrF2xNLAbcM6BwSPHJi8lt%2F0p19uXvyIOhdDU4M6bKw3d59g%3D%3D"
        alt="step4 完成下訂"
      />
    </figure>

    <h3 class="text-center mb-3">購買品項</h3>
    <table class="p-table table align-middle w-md-50 mx-auto mb-5">
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
                <span class="badge bg-nobeta">{{ item.product.category }}</span>
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

    <h3 class="text-center mb-3">客戶資訊</h3>
    <div class="row justify-content-center">
      <div class="col-md-6" v-if="order.user">
        <dl class="goods-detail-description">
          <dt>姓名</dt>
          <dd>{{ order.user.name }}</dd>
        </dl>
        <dl class="goods-detail-description">
          <dt>寄送地址</dt>
          <dd>{{ order.user.address }}</dd>
        </dl>
        <dl class="goods-detail-description">
          <dt>E-mail信箱</dt>
          <dd class="text-break">{{ order.user.email }}</dd>
        </dl>
        <dl class="goods-detail-description">
          <dt>付款方式</dt>
          <dd>{{ order.user.payment_method }}</dd>
        </dl>
      </div>
    </div>

    <div class="d-flex justify-content-center my-4">
      <button type="button" class="btn btn-nobeta" @click="payment()">
        <span
          v-if="loadingStatus.loadingItem === 3"
          class="material-icons animate-spin"
        >
          cached
        </span>
        結帳付款
      </button>
    </div>
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
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
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
          this.showErrorAlert(error);
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
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    // console.clear();
    this.getOrder();
  },
};
</script>
