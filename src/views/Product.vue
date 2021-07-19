<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div id="main" class="container content content-user">
    <div class="modal-content border-0 pt-4">
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
                class="mySwiper mt-2"
              >
                <swiper-slide v-for="item in tempProduct.imagesUrl" :key="item">
                  <img class="img-fluid" :src="item" alt="" />
                </swiper-slide>
              </swiper>
            </template>
          </div>
          <div class="col-sm-6">
            <h2 class="modal-title d-flex" id="exampleModalLabel">
              <span>{{ tempProduct.title }}</span>
              <span class="badge bg-primary align-self-center ms-2">{{
                tempProduct.category
              }}</span>
            </h2>
            <p class="mb-2">{{ tempProduct.description }}</p>
            <div class="h5" v-if="tempProduct.price">
              {{ $filters.currency(tempProduct.price) }} NTD
            </div>
            <div class="input-group text-center w-50 d-inline-flex">
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
            </div>
            <button
              type="button"
              class="btn btn-primary ms-2"
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
            <p class="mt-2">商品內容：{{ tempProduct.content }}</p>
          </div>
          <!-- col-sm-6 end -->
          <h3 class="text-center mt-4 mb-0">
            {{ tempProduct.category }} 相關商品
          </h3>
          <ul
            class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 list-unstyled"
          >
            <li v-for="item in randomProducts" :key="item" class="col">
              <div class="card h-100">
                <a
                  href="#"
                  @click.prevent="cardLink(item)"
                  class="text-decoration-none stretched-link h-100"
                >
                  <img
                    :src="item.imageUrl"
                    class="card-img-top"
                    alt="item.title"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.price }}NTD</p>
                  </div>
                </a>

                <div class="card-footer d-flex position-relative">
                  <button
                    @click="cardAddCart(item, qty)"
                    type="button"
                    :disabled="loadingStatus.loadingItem === item.id + 2"
                    class="btn btn-primary btn-sm ms-auto"
                    style="z-index: 50"
                  >
                    <span
                      v-if="loadingStatus.loadingItem === item.id + 2"
                      class="material-icons animate-spin"
                    >
                      cached
                    </span>
                    加到購物車
                  </button>
                </div>
              </div>
            </li>
          </ul>
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
      products: "",
      randomProducts: [],
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
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.randomProducts = [];
          this.getAsLike();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAsLike() {
      const { category } = this.tempProduct;
      const fliterProducts = this.products.filter(
        (item) => item.category === category
      );
      const arrSet = new Set([]);

      const maxSize = fliterProducts.length < 4 ? fliterProducts.length : 4;
      for (let index = 0; arrSet.size < maxSize; index++) {
        const num = getRandomInt(fliterProducts.length);
        arrSet.add(num);
      }
      arrSet.forEach((i) => {
        this.randomProducts.push(fliterProducts[i]);
      });
      console.log(this.randomProducts);
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
    cardAddCart(item, qty = 1) {
      const id = item.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = item.id + 2;
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
    cardLink(item) {
      this.getNewProduct(item.id);
      this.$router.push(`/product/${item.id}`);
    },
    getNewProduct(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.tempProduct = res.data.product;
          this.getProducts();
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
