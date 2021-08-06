<template>
  <tr v-for="item in cartitem.carts" :key="item.id">
    <td>
      <router-link
        class="p-table__link text-decoration-none"
        :to="`/product/${item.product.id}`"
      >
        <figure class="d-sm-flex align-items-center">
          <img
            class="product-img d-none d-sm-block"
            :src="item.product.imageUrl"
            :alt="item.product.title"
          />
          <figcaption class="ps-sm-2">
            <span class="badge bg-nobeta">{{ item.product.category }}</span>
            <p class="fs-7 fs-sm-6 mb-1">{{ item.product.title }}</p>
            <div class="badge bg-success fs-8 fs-sm-7" v-if="item.coupon">
              已套用優惠券
            </div>
          </figcaption>
        </figure>
      </router-link>
    </td>
    <td>
      <div class="input-group">
        <div class="input-group input-group-sm text-center mb-3 w-75 mx-auto">
          <button
            type="button"
            @click="$emit('cut-product-num', item)"
            class="btn-dark btn input-group-text rounded-0 fs-8 border-end-0"
            :class="{ disabled: item.qty <= 1 }"
            :disabled="item.id === loading.loadingItem"
          >
            <span>-</span>
          </button>
          <p class="form-control m-0 fs-7 fs-sm-6">{{ item.qty }}</p>
          <button
            type="button"
            @click="$emit('add-product-num', item)"
            class="btn-dark btn input-group-text rounded-0 fs-8"
            :disabled="item.id === loading.loadingItem"
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </td>
    <td class="text-end fs-7 fs-sm-6">
      <small v-if="item.final_total !== item.total" class="text-success"
        >折扣價：{{ $filters.currency(item.final_total) }} NTD<br /><del
          class="text-dark"
          >{{ $filters.currency(item.total) }} NTD</del
        ></small
      ><template v-else>{{ $filters.currency(item.total) }} NTD</template>
    </td>
    <td class="text-end">
      <button
        @click="$emit('delete-cart', item)"
        type="button"
        class="btn btn-outline-danger btn-sm fs-7 fs-sm-6"
      >
        <span
          v-if="loading.loadingItem === item.id"
          class="material-icons animate-spin"
        >
          cached
        </span>
        刪除
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  emits: ["delete-cart", "add-product-num", "cut-product-num"],
  props: {
    cartitem: {
      type: Object,
      default() {
        return {};
      },
    },
    loading: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
