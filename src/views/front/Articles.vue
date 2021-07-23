<template>
  <header class="nav-header">
    <Navbar></Navbar>
  </header>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link class="text-light" :to="`/`">首頁</router-link></li>
      <li class="breadcrumb-item text-light active" aria-current="page">最新消息</li>
    </ol>
  </nav>
  <div id="main" class="container-lg content">
    <h2 class="text-center pt-4">最新消息</h2>
    <div class="row mt-4">
      <div
        v-for="item in articles"
        :key="item"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div class="card h-100">
          <router-link
            :to="`/article/${item.id}`"
            class="d-flex flex-column text-decoration-none stretched-link h-100"
          >
            <img :src="item.image" alt class="card-img-top img-cover" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title my-auto">
                {{ item.title }}
              </h5>
              <small class="card-text mb-2 text-muted">
                <time :datetime="$filters.datetime(item.create_at)">{{
                  $filters.date(item.create_at)
                }}</time>
              </small>
              <span class="badge bg-primary mb-1 w-25 w-md-50 mx-auto">{{
                item.tag
              }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-4">
      <Pagination :page="pagination" @get-page="getArticles"></Pagination>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      articles: {},
      pagination: {},
    };
  },
  components: {
    Navbar,
    Pagination,
  },
  methods: {
    getArticles(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { articles, pagination } = res.data;
            this.articles = articles;
            this.pagination = pagination;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getArticles();
  },
};
</script>
