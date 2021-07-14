<template>
  <h1 class="text-center">完成付款</h1>
  <figure class="my-5 text-center mx-auto">
    <img
      class="img-fluid"
      src="../../assets/images/cart_step05.png"
      alt="step5 完成付款"
    />
  </figure>

  <figure class="my-6 text-center">
    <img
      class="img-fluid"
      src="../../assets/images/thanks.jpg"
      alt="謝謝您的購買"
    />
  </figure>

  <h2 class="text-center">
    您的訂單編號為：<br class="d-block d-sm-none" /><span
      class="fs-4 text-danger fw-bold"
      >{{ this.order.id }}</span
    >
  </h2>
  <hr />
  <h2 class="text-center">購買品項</h2>
  <table class="p-table table align-middle w-md-50 mx-auto mb-6">
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
  <div class="d-flex justify-content-between mb-5">
    <router-link class="btn btn-primary" to="/products">繼續購物</router-link>
    <router-link class="btn btn-primary" to="/">回首頁</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    };
  },
  methods: {
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
  },
  mounted() {
    console.clear();
    this.getOrder();
  },
};
</script>
