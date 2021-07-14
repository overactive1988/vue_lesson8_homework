<template>
  <tr v-for="item in cartitem.carts" :key="item.id">
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
      {{ $filters.currency(item.product.price) }}
    </td>
    <td class="text-center">
      {{ item.qty }}
    </td>
    <td class="text-end">
      <small class="text-success"
        >價格：{{ $filters.currency(item.total) }}</small
      >
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
