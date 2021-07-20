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
            <h1 class="top__title text-light">小魔女諾貝塔<br />雜貨工坊</h1>
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
    <section id="main" class="section pt-6 bg-dark">
      <div class="container-fluid px-0">
        <h2 class="text-center text-light mb-4">關於小魔女諾貝塔</h2>
        <div class="row gx-0">
          <div class="col-md-6 col-lg-5">
            <div
              class="
                text-light
                d-flex
                justify-content-center
                flex-column
                px-4 px-md-5 px-lg-7
                h-100
              "
            >
              <h3 class="section-title__text h2 mb-3">簡介概述</h3>
              <p class="fs-5">
                小魔女諾貝塔是一款於 2017 年 6
                月開始製作，台灣獨立開發的動作冒險遊戲，前期主要由
                <a
                  href="https://twitter.com/lsw001231"
                  target="_blank"
                  class="text-link-light text-decoration-none"
                  >Pupuya</a
                >
                一人獨力開發。
              </p>
              <p class="fs-5">
                之後開始與
                <a
                  href="http://simon.moe/"
                  target="_blank"
                  class="text-link-light text-decoration-none"
                  >希萌創意</a
                > 進行合作，並於 2020 年 6 月 24
                日，遊戲以搶先體驗形式在Steam平台推出，遊戲內容尚未完全製作完成，預定日後更新補完。遊戲推出第一周銷量便超過
                5 萬份，其中超過一半的銷量來自日本地區。
              </p>
              <hr class="mb-4" />
              <h3 class="section-title__text h2 mb-3">得獎紀錄</h3>
              <ul class="fs-5 list-unstyled">
                <li class="mb-3">
                  榮獲 第十三屆 巴哈姆特 遊戲動漫大賞 年度人氣國產遊戲 金賞
                </li>
                <li class="mb-3">
                  榮獲 巴哈姆特 2019 ACG 創作大賽 &lt; Unity 特別獎 &gt;
                </li>
                <li>榮獲 巴哈姆特 2019 ACG 創作大賽 &lt; 人氣賞 &gt;</li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-lg-7 pt-3 pt-md-0">
            <figure class="mb-0">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626797489591.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KN7bl3n%2Fy%2FgkCgGzbnUJBisq4XINHS9vhF43sHm8OSxMk0dHThDfK9u2fx2jhgbXQuBl8H2YAFyflxeh9FDohBsuGoqCq2LPf4g8Bg7dYPOi%2FWrdcnB2hnhghjiq37bqIgXbVLumcatnHSdIOVfic8kJFT2iZdLDOUR%2BE8dRNETzY8UCv250qhslIaXa1fwhLNsB3Az5YleWhpwQkBytTQpILKl%2B%2BfdwVWusB6qvqnM%2F9oWEm3f5RjcsC9lNpwH%2Fl1D7Tf2egcTkLjeEkM9cxQP%2Bol01mVvQBXMBIHL%2F%2BwoDkEIQWgXihT%2Ft%2FChdtEwJpq6u9baSLJEOdiFcKouvEQ%3D%3D"
                alt=""
                class="img-top-about img-fluid"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section class="top-products section py-6">
      <div class="container px-4 px-sm-0">
        <h3 class="section-title mb-5">
          <p class="section-title__text h2">
            <!-- <span class="material-icons section-icon"> flare </span> -->
            選購商品
          </p>
          <p class="section-title__text fw-normal fs-5">
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
            <div class="d-flex" v-if="newArticles">
              <a href="#" class="me-3"
                ><img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626681936945.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qtWyghLUdNHaBdAGfAZXLIqojS8p3TfSeBfX1YpPfOYfLWL%2BqwRomHpSYbf0MDT3DrVejkTiR7XqI%2Bp6ik6%2FGq3T1hklxhlAw9ocMveQUTyqnmgOKRE4wX%2F%2Bw08nD4Obur1R10d5cPY%2BWJI8SELvpxK4avKmGgWn4JgAlh8VI7Z5yuB2%2Frjq2tUMeLU%2FhCstnJMLk%2B3up4IW8xJnq8bUdWnT%2BOglkq6sx9xyE4crg6c7NfR7spyqTMSwfEkA2n3AZnU99Ju78KpVNrYIBRv0TNuK9pbPZFBk%2BO1qaEMWNcEA841zN7uJ7%2Bk6yfEB7VSDxwlp48D63oOKkD2uIh6f%2Fw%3D%3D"
                  alt=""
                  @click.prevent="getNewArticles"
              /></a>
              <router-link to="/articles">最新消息</router-link>
              <a href="#" class="ms-3"
                ><img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626681959597.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dKMqb5sq5bjeXHWfegMqPgbTjHY%2FN94z0fxKNk62pmWXBD2YdfCSVckIrk0C6rPsCG8JBMzL4FZGh3ORwpwytqTSH66CkBMfDV6ltZI9upYrvdxT7hejl5608DaZ1iBfmCWEAYEz2SKmaprYUt3eRQzqTcD5J%2BTujdF1iGWg2l%2B9TxOWC8Ve%2BPx8cuz33cgeB19zgWTEgM1gM9su5wxVzPJx7JXvs%2B5qeGz1ZPpiNDnB3NbKjZtnzQCae5dnkeLX5HK3W4%2FoQJU4Lx21qm3mxVRrtaqi8zHFA7nDxJ1Ak8R5w7JTl%2FrOYCWx%2BrfxnnljWGeD3pjWFFHnHfLKavXWWQ%3D%3D"
                  @click.prevent="nextNewArticles"
                  alt=""
              /></a>
            </div>
          </dt>
          <dd class="top-news__item">
            <ul class="top-news__lists">
              <li
                v-for="item in newArticles"
                :key="item"
                class="top-news__list"
              >
                <router-link
                  class="top-news__link text-light"
                  :to="`/article/${item.id}`"
                >
                  <span class="top-news__date">
                    <time :datetime="$filters.datetime(item.create_at)">
                      {{ $filters.date(item.create_at) }}
                    </time>
                  </span>
                  <span class="top-news__description">{{ item.title }}</span>
                </router-link>
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
      articles: {},
      newArticles: [],
      pagination: {},
    };
  },
  components: {
    TopNavbar,
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
            this.getNewArticles();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickCategory(category) {
      emitter.emit("categoryTop", category);
      this.$router.push(`/products/`);
    },
    getNewArticles() {
      this.newArticles = [];
      const maxSize = 3;
      for (let index = 0; index < maxSize; index++) {
        this.newArticles.push(this.articles[index]);
      }
      console.log(this.newArticles);
    },
    nextNewArticles() {
      this.newArticles = [];
      const maxSize = 6;
      for (let index = 3; index < maxSize; index++) {
        this.newArticles.push(this.articles[index]);
      }
      console.log(this.newArticles);
    },
  },
  mounted() {
    console.clear();
    this.getArticles();
  },
};
</script>

<style scoped></style>
