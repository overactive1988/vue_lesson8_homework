<template>
  <div class="bg-cover--02">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <div class="container-fluid pb-5 bg-01">
      <main id="main" class="container-lg content">
        <h2 class="pt-4 text-light">最新消息</h2>
        <div class="mt-4">
          <ul
            class="list-unstyled row"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="300"
          >
            <li
              v-for="item in articles"
              :key="item"
              class="col-12 col-md-9 col-lg-6 mx-auto mx-lg-0 mb-4"
            >
              <div class="card h-100 card-articles">
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
                    <div class="col-md-4 position-relative">
                      <img :src="item.image" alt class="img-cover" />
                      <div class="position-absolute top-0 start-0">
                        <span class="badge bg-nobeta rounded-0 fs-7">{{
                          item.tag
                        }}</span>
                      </div>
                    </div>
                    <div class="col-md-8 position-relative">
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-4">
                          {{ item.title }}
                        </h5>
                        <p class="card-text text-inner">
                          {{ item.description }}
                        </p>
                        <small class="card-text mt-2 text-muted">
                          <time :datetime="$filters.datetime(item.create_at)">{{
                            $filters.date(item.create_at)
                          }}</time>
                        </small>
                      </div>
                      <div class="position-absolute bottom-0 end-0">
                        <p class="text-nobeta text-inner mb-0">
                          觀看詳細<span class="material-icons mb-1">
                            arrow_forward
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center mt-2 mb-4">
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
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
    },
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
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    // console.clear();
    this.getArticles();
  },
};
</script>
