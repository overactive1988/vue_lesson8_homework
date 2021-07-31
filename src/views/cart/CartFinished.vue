<template>
  <h2 class="pt-4 text-light">完成付款</h2>
  <div class="bg-light my-3 my-sm-5 p-4">
    <figure class="mt-0 mb-3 my-sm-5 text-center mx-auto">
      <img
        class="img-fluid"
        src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638328976.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=AEobiA3PaimJxUH05FoodErufJ6jRC%2FB4onnCbutqk6Bfz%2Fx44GFznWSgS9VkIcCfxnSjyTwZrLzlt381TiyA0y6Y4xWcpG1X7A6TugycKo5A8Fr1JvDqKuVN%2BdZ4RxfUuISY3XNv1IeHR0m5NQ7%2Fvhz40kLaWOqGTpsmWf3auj6A8XW%2Bu%2Ff0yysBIjh0Jrp8k1Vkm6tsd8D%2FCGNsjNyRWJiLnXIeeEhPYC0Sg4KQMsZFQZ%2FP2GXqqzWVSunhoUCzOU9YTTXl1FrBL1Ox%2BLr01VAy9rOgbcuVewi3bD%2FfO1Y9sqwjyJ%2FPRzS1Wue7HM2fuEayy0PkgEa9cU4mbSuow%3D%3D"
        alt="step5 完成付款"
      />
    </figure>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-8">
        <figure class="text-center mb-0">
          <img
            class="img-fluid"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626638342417.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Maw1O1uTdEaQxIy4SGx94PD9%2BpFPIyMp9KQz4aoFLDegnoZjY5N2oXJQhiDXL8Gil%2Bv9lwHuolwLB1YtDz%2FvXUh7F%2BLDdGKFoGErOkiQt7MC752YmiSIusbtSo9RH6Lg5RJtBWuMAatNExBb1yvn3GeOi2auBkAZ5wAcB%2BXSdpw%2BudYxsLl8wEETMpuRQXn3Qnr%2FlMWABHZV0wantAA3OXeLZms1I0Nb%2BuNLqgZzCDjxWqO8uxeFzuOOYm5ttlIBubi1KJwwYzxGbot7GDJkew%2Fm9XCoXhhhFSbAR6LA658s520sZ96jVb2fsF%2F5ILLXh6zwPdb0S%2FNwUDwXUYZ36g%3D%3D"
            alt="謝謝您的購買"
          />
        </figure>
      </div>
      <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap">
        <div class="w-100">
          <h3 class="mb-4 text-center">
            您的訂單編號為：<br /><span
              class="fs-6 fs-sm-4 text-danger fw-bold"
              >{{ this.order.id }}</span
            >
          </h3>
          <hr />
          <h3 class="text-center mb-4">購買品項</h3>
          <table class="p-table table align-middle mx-auto mb-5">
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
                      <span class="badge bg-primary">{{
                        item.product.category
                      }}</span>
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
                <td class="text-center">
                  {{ $filters.currency(order.total) }} NTD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="mt-auto d-flex justify-content-between w-100">
          <router-link class="btn btn-primary" to="/products"
            >繼續購物</router-link
          >
          <router-link class="btn btn-primary" to="/">回首頁</router-link>
        </div>
      </div>
    </div>
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
