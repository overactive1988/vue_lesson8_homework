<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div id="main" class="container-lg content content-user">
    <h2 class="text-center pt-4">單一文章</h2>
    <div class="w-100 w-md-50 mx-auto">
      <img :src="article.image" alt="article.title" class="img-fluid" />
    </div>
  </div>
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
            console.log(this.article);
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
