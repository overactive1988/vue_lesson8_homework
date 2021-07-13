<template>
  <tr v-for="item in cartitem.carts" :key="item.id">
    <td>
      <img
        class="product-img"
        :src="item.product.imageUrl"
        :alt="item.product.title"
      />
    </td>
    <td>
      {{ item.product.category }}
    </td>
    <td>
      {{ item.product.title }}
    </td>
    <td class="text-end">
      {{ item.qty }}
    </td>
    <td class="text-end">
      {{ $filters.currency(item.product.price) }}
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
