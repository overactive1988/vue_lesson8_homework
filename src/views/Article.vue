<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main id="main" class="container-lg content content-user">
    <h2 class="text-center pt-4">{{ article.title }}</h2>
    <div class="row my-4">
      <div class="col-6">
        <div class="mx-auto">
          <img
            :src="article.image"
            alt="article.title"
            class="img-fluid d-block ms-auto"
          />
        </div>
      </div>
      <div class="col-6">
        <article class="article mt-3">
          <h3 class="text-start">{{ article.description }}</h3>
          <p class="text-muted">
            <time :datetime="$filters.datetime(article.create_at)">{{
              $filters.date(article.create_at)
            }}</time>
            <span class="badge bg-primary ms-2 fs-7">{{ article.tag }}</span>
          </p>
          <p><span v-html="article.content"></span></p>
        </article>
      </div>
    </div>
    <div class="d-flex my-4">
      <router-link class="btn btn-primary" to="/articles">返回</router-link>
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data() {
    return {
      article: {},
    };
  },
  components: {
    Navbar,
  },
  methods: {
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
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getArticle();
  },
};
</script>
