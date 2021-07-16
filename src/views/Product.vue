<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div class="container content content-user">
    <div class="modal-content border-0 pt-4">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>{{ tempProduct.title }}</span>
        </h5>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <img
              v-if="!tempProduct.imagesUrl"
              class="img-fluid"
              :src="tempProduct.imageUrl"
              alt="{{tempProduct.title}}"
            />
            <template v-if="tempProduct.imagesUrl">
              <swiper
                :style="{
                  '--swiper-navigation-color': '#562a4d',
                  'text-shadow': '1px 1px 4px #562a4d',
                }"
                :spaceBetween="10"
                :navigation="true"
                :thumbs="{ swiper: thumbsSwiper }"
                class="mySwiper2"
              >
                <swiper-slide v-for="item in tempProduct.imagesUrl" :key="item">
                  <img class="img-fluid" :src="item" alt="" />
                </swiper-slide>
              </swiper>
              <swiper
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="4"
                :freeMode="true"
                :watchSlidesVisibility="true"
                :watchSlidesProgress="true"
                class="mySwiper mt-3"
              >
                <swiper-slide v-for="item in tempProduct.imagesUrl" :key="item">
                  <img class="img-fluid" :src="item" alt="" />
                </swiper-slide>
              </swiper>
            </template>
          </div>
          <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{
              tempProduct.category
            }}</span>
            <p>商品描述：{{ tempProduct.description }}</p>
            <p>商品內容：{{ tempProduct.content }}</p>
            <div class="h5" v-if="!tempProduct.price">
              {{ $filters.currency(tempProduct.origin_price) }} 元
            </div>
            <del class="h6" v-if="tempProduct.price"
              >原價 {{ $filters.currency(tempProduct.origin_price) }} 元</del
            >
            <div class="h5" v-if="tempProduct.price">
              現在只要 {{ $filters.currency(tempProduct.price) }} 元
            </div>
            <div>
              <div class="input-group text-center">
                <button
                  type="button"
                  @click="cutUserModalProduct"
                  class="
                    btn-dark btn
                    input-group-text
                    rounded-0
                    fs-8
                    border-end-0
                  "
                  :class="{ disabled: qty <= 1 }"
                >
                  <span>-</span>
                </button>
                <p class="form-control m-0">{{ qty }}</p>
                <button
                  type="button"
                  @click="addUserModalProduct"
                  class="btn-dark btn input-group-text rounded-0 fs-8"
                >
                  <span>+</span>
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addCart(qty)"
                >
                  <span
                    v-if="loadingStatus.loadingItem === 1"
                    class="material-icons animate-spin"
                  >
                    cached
                  </span>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          <!-- col-sm-6 end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import emitter from "../assets/js/methods/emitter";
import { Swiper, SwiperSlide } from "swiper/vue";

SwiperCore.use([Navigation, Thumbs]);
export default {
  data() {
    return {
      thumbsSwiper: null,
      loadingStatus: {
        loadingItem: "",
      },
      qty: 1,
      tempProduct: {},
    };
  },
  components: {
    Navbar,
    Swiper,
    SwiperSlide,
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    showAlert(res) {
      this.$swal(res.data.message);
    },
    getProduct() {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.tempProduct = res.data.product;
          // console.log(this.tempProduct);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cutUserModalProduct() {
      this.qty -= 1;
    },
    addUserModalProduct() {
      this.qty += 1;
    },
    addCart(qty = 1) {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = 1;
      const cartInfo = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http
        .post(url, cartInfo)
        .then((res) => {
          this.loadingStatus.loadingItem = "";
          console.log(res);
          emitter.emit("update-cart");
          this.showAlert(res);
          this.qty = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getProduct();
  },
};
</script>

<style scoped>
.mySwiper .swiper-slide {
  width: 25%;
  opacity: 0.4;
  cursor: pointer;
}
.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
