<template>
  <main>
    <section class="top-mv position-relative">
      <h1 class="top-mv__title position-absolute text-light">
        小魔女諾貝塔<br />雜貨工坊
      </h1>

      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :effect="'fade'"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :speed="2500"
        :onlyExternal="true"
        :noSwiping="true"
        :allowTouchMove="false"
        class="mySwiper"
      >
        <swiper-slide
          ><figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/images/mv01.jpg"
              alt
            /></figure
        ></swiper-slide>
        <swiper-slide
          ><figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/images/mv04.jpg"
              alt
            /></figure
        ></swiper-slide>
        <swiper-slide
          ><figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/images/mv03.jpg"
              alt
            /></figure
        ></swiper-slide>
        <swiper-slide
          ><figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/images/mv02.jpg"
              alt
            /></figure
        ></swiper-slide>
      </swiper>
    </section>
  </main>
</template>

//
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.min.css";
import SwiperCore, { EffectFade, Autoplay } from "swiper";

SwiperCore.use([EffectFade, Autoplay]);
export default {
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {},
  mounted() {
    console.clear();
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
