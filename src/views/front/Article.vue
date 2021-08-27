<template>
  <div class="bg-cover--02">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-light" to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link class="text-light" to="/articles">最新消息</router-link>
        </li>
        <li class="breadcrumb-item text-light active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <div class="container-fluid pb-5 bg-01">
      <main id="main" class="container-lg content">
        <h2 class="pt-4 text-light">{{ article.title }}</h2>
        <div class="row my-4">
          <div class="col-12 col-md-8">
            <div class="article-post">
              <figure class="mb-0">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="img-fluid d-block ms-auto"
                />
              </figure>
              <article class="mt-3">
                <h3 class="text-start">{{ article.description }}</h3>
                <p class="text-muted">
                  <time :datetime="$filters.datetime(article.create_at)">{{
                    $filters.date(article.create_at)
                  }}</time>
                  <span class="badge bg-nobeta ms-2 fs-7">{{
                    article.tag
                  }}</span>
                </p>
                <div class="text-inner" v-html="article.content"></div>
              </article>
              <div class="d-flex my-4">
                <router-link class="btn btn-nobeta" to="/articles"
                  >返回</router-link
                >
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mt-4 mt-md-0">
            <nav class="nav-products">
              <ul
                class="nav-products__lists article-list"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="600"
              >
                <li class="nav-products__list">
                  <a
                    href="#"
                    aria-current="true"
                    @click.prevent="clickCategory()"
                    ><span>所有商品</span></a
                  >
                </li>
                <li
                  v-for="item in this.category"
                  :key="item.name"
                  class="nav-products__list"
                >
                  <a
                    href="#"
                    aria-current="true"
                    @click.prevent="clickCategory(item.name)"
                    ><span>{{ item.name }}</span></a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import emitter from "@/assets/js/methods/emitter";
export default {
  data() {
    return {
      article: {},
      category: [
        {
          name: "諾貝塔",
        },
        {
          name: "塔妮亞",
        },
        {
          name: "莫妮卡",
        },
        {
          name: "其他周邊",
        },
      ],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
    },
    getArticle() {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { article } = res.data;
            this.article = article;
          }
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    clickCategory(category = "") {
      emitter.emit("categoryTop", category);
      this.$router.push(`/products/`);
    },
  },
  mounted() {
    // console.clear();
    this.getArticle();
  },
};
</script>
