<template>
  <header>
    <TopNavbar></TopNavbar>
  </header>
  <main>
    <section class="top">
      <div class="container-fluid position-relative">
        <div class="top-scrolldown">
          SCROLL DOWN<span class="top-scrolldown__line"></span>
        </div>
        <div class="container position-relative vh-100">
          <div class="top__inner">
            <h2 class="top__title text-light">小魔女諾貝塔<br />雜貨工坊</h2>
            <p class="top__subtitle text-light h6 fw-normal mb-2 mb-md-4">
              所有小魔女諾貝塔相關的商品，只有在這裡獨家販售
            </p>
            <router-link
              class="top__button btn btn-outline-light w-100"
              to="/products"
              >商品列表<span class="material-icons">
                navigate_next
              </span></router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section id="main" class="top-products section py-6">
      <div class="container">
        <h3 class="section-title mb-5">
          <p class="section-title__text h2">
            <span class="material-icons section-icon"> flare </span>選購商品
          </p>
          <p class="section-title__text fw-normal h5">
            請選擇您有興趣的商品類別
          </p>
        </h3>
        <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
          <div v-for="item in this.category" :key="item.name" class="col">
            <div class="top-products-card">
              <a
                href="#"
                class="top-products-card__link"
                @click.prevent="clickCategory(item.name)"
              >
                <div class="top-products-card__inner">
                  <figure class="top-products-card__media">
                    <img class="img-fluid" :src="item.imgUrl" alt="item.name" />
                    <figcaption>{{ item.name }} 相關商品</figcaption>
                  </figure>
                  <span class="top-products-card__text">{{ item.enName }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="top-news section pt-4 pb-2">
      <div class="container">
        <dl class="top-news__inner">
          <dt class="top-news__title">
            <a class="" href="#">最新消息</a>
          </dt>
          <dd class="top-news__item">
            <ul class="top-news__lists">
              <li class="top-news__list">
                <a class="top-news__link text-light" href="#">
                  <span class="top-news__date">2021/6/15</span>
                  <span class="top-news__description"
                    >實體化GK雕像製作決定!</span
                  >
                </a>
              </li>
              <li class="top-news__list">
                <a class="top-news__link text-light" href="#">
                  <span class="top-news__date">2021/6/1</span>
                  <span class="top-news__description">6/1 是諾貝塔的生日</span>
                </a>
              </li>
              <li class="top-news__list">
                <a class="top-news__link text-light" href="#">
                  <span class="top-news__date">2020/10/18</span>
                  <span class="top-news__description"
                    >小魔女諾貝塔的連載漫畫-第五話</span
                  >
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </section>
  </main>
</template>

<script>
import emitter from "../assets/js/methods/emitter";
import TopNavbar from "@/components/TopNavbar.vue";
export default {
  data() {
    return {
      category: [
        {
          name: "莫妮卡",
          enName: "MONIKA",
          imgUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626635552700.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IP%2FvhJdnrcPkeFapG%2BJn4kp7YxaiabEwL3PICenfF13bqm3dSWh6IvzV72KCALv5118J8LOzDS6v8tB98inJbagsWNiKBBebBNI185Uy5iaoog%2BSkZnH8%2FN4dg0hP3%2Bn9huq1TSF1aC2DBJZJFM7hjSmxjHsCA9KwzyJY8HALvSQIAok%2Ft5N5jBR72sUnlzWTx720kHmcZWv8DZHGbnp8gSaOPiEHjWwsC28txg5pSiFqvV7qa%2FFjXmWo1MwunZV6j3ROB8ksWEbnfK6gNJlCtItfe5mUP0UK59u8pRia8FIN8n%2B%2BDsmUzsQmQXhyagQEHMuYbA%2FI56XXJf8WXo8pQ%3D%3D",
        },
        {
          name: "塔妮亞",
          enName: "TANIA",
          imgUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626635572548.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Q0DkBrldqMT9p8Eb0o1n3DiPGkY5P1WQ48KMSURTqEa17c8HGCQRfYuI6Cdx1%2Bs42J7LK9x44XxBVqFenbCZdx9QJkK5bNnaBxKDd7J%2FSLnseQ0S6qXX5U34H77nHJHJoxlzkX8dH5IpNZAhiBRKuywgCqoLPq7WyzqOyoHLrxhM1OaWWNOmHstkscQSNJt%2FtkgHDcFT9QbmTYwH2JDReHQhVtc7CWTyQHV6tgTwNAB%2BNWkPybiGtdMEiimuTIqwsZ6RCV8o5hb8CBUTDfcahsvDl0d6tjQN2VBXoev9Q%2FXvTQexSrQPcVrJxPVfNjXIePlMt9fa1Y4YsxB%2FKa610A%3D%3D",
        },
        {
          name: "諾貝塔",
          enName: "NOBETA",
          imgUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626635590142.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qgwOswjyhkKQMh5OqDQLgQZyJj0fcmbPac%2BasWQrZjGv3zu3XdpbISetULwqMQ0wbKqnGEBorflz2dSWoSFiYfQw%2FJHLoNLBqCjAAhQrYkkFAqzRZESSuafr4IMIW0D%2FG29u36AJYfweS%2BlJJyu9OF8emhFTeZ66qhA%2Fu5n%2Foiv%2BDnK9SimYY%2F314tsH6jCRd1sBKdZBMRgXd8WQEM7ViFNKvMU7XZls1GxbUDwk1WniK4oXgtd9yJ3ZpEYfPtk99OwRie9ySTwV%2FISZfdkKqMBgQPzOAgKLIzYAwkt9Agv56V99PDEiowxdeefo04bFxPfVQOjI4sQJ8JgXFLjZlw%3D%3D",
        },
      ],
    };
  },
  components: {
    TopNavbar,
  },
  methods: {
    clickCategory(category) {
      emitter.emit("categoryTop",category);
      this.$router.push(`/products/`);
    },
  },
  mounted() {
    console.clear();
  },
};
</script>

<style scoped></style>
