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
    <section class="top-products section py-6">
      <div class="container">
        <h3 class="section-title mb-5">
          <p class="section-title__text h2">
            <span class="material-icons section-icon"> flare </span>選購商品
          </p>
          <p class="section-title__text h5">請選擇您有興趣的商品類別</p>
        </h3>
        <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
          <div class="col">
            <div class="top-products-card">
              <a class="top-products-card__link" href="#">
                <div class="top-products-card__inner">
                  <figure class="top-products-card__media">
                    <img
                      class="img-fluid"
                      src="../assets/images/top_products01.png"
                      alt
                    />
                    <figcaption>莫妮卡 相關商品</figcaption>
                  </figure>
                  <span class="top-products-card__text">MONIKA</span>
                </div>
              </a>
            </div>
          </div>
          <div class="col">
            <div class="top-products-card">
              <a class="top-products-card__link" href="#">
                <div class="top-products-card__inner">
                  <figure class="top-products-card__media">
                    <img
                      class="img-fluid"
                      src="../assets/images/top_products02.png"
                      alt
                    />
                    <figcaption>塔妮亞 相關商品</figcaption>
                  </figure>
                  <span class="top-products-card__text">TANIA</span>
                </div>
              </a>
            </div>
          </div>
          <div class="col">
            <div class="top-products-card">
              <a class="top-products-card__link" href="#">
                <div class="top-products-card__inner">
                  <figure class="top-products-card__media">
                    <img
                      class="img-fluid"
                      src="../assets/images/top_products03.png"
                      alt
                    />
                    <figcaption>諾貝塔 相關商品</figcaption>
                  </figure>
                  <span class="top-products-card__text">NOBETA</span>
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
import TopNavbar from "@/components/TopNavbar.vue";
export default {
  components: {
    TopNavbar,
  },
};
</script>

<style scoped></style>
