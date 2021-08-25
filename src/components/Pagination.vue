<template>
  <nav aria-label="Page navigation example">
    <ul class="c-pagination">
      <li class="c-page-item" :class="{ disabled: !page.has_pre }">
        <a
          class="c-page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('get-page', page.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="c-page-item"
        :class="{ active: item === page.current_page }"
        v-for="(item, index) in page.total_pages"
        :key="'pagination' + index"
      >
        <a
          class="c-page-link"
          href="#"
          @click.prevent="$emit('get-page', item)"
          >{{ item }}</a
        >
      </li>

      <li class="c-page-item" :class="{ disabled: !page.has_next }">
        <a
          class="c-page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('get-page', page.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ["get-page"],
  props: {
    page: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
