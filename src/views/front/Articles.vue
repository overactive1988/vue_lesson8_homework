<template>
  <div class="bg-cover--02">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-light" :to="`/`">首頁</router-link>
        </li>
        <li class="breadcrumb-item text-light active" aria-current="page">
          最新消息
        </li>
      </ol>
    </nav>
    <div class="container-fluid pb-5 bg-01">
      <main id="main" class="container-lg content">
        <h2 class="pt-4 text-light">最新消息</h2>
        <ul
          v-for="item in articles"
          :key="item"
          class="list-unstyled mt-4"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="300"
        >
          <li class="card h-100 card-articles">
            <router-link
              :to="`/article/${item.id}`"
              class="
                d-flex
                flex-column
                text-decoration-none
                stretched-link
                h-100
              "
            >
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="item.image" alt class="img-cover" />
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column">
                    <span class="mb-1 fs-7">{{ item.tag }}</span>

                    <h5 class="card-title mb-4">
                      {{ item.title }}
                    </h5>
                    <p class="card-text">{{ item.description }}</p>
                    <small class="card-text mt-2 text-muted">
                      <time :datetime="$filters.datetime(item.create_at)">{{
                        $filters.date(item.create_at)
                      }}</time>
                    </small>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>

        <div class="d-flex justify-content-center mt-5 mb-4">
          <Pagination :page="pagination" @get-page="getArticles"></Pagination>
        </div>
      </main>
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
    // console.clear();
    this.getArticles();
  },
};
</script>
