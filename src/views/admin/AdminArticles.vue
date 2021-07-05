<template>
  <div class="container content">
    <h1 class="text-center">文章列表</h1>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        新增文章
      </button>
    </div>
    <div class="row mt-3">
      <div
        v-for="item in articles"
        :key="item"
        class="col-12 col-md-6 col-lg-3 mb-4"
      >
        <div class="card">
          <h5 class="card-header">{{ item.title }}</h5>
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1624116647492.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A9owtWGMztQvMIN7xsS%2BroI2hMulnjCPCUoJgP%2BGZ6HlS5gektIqNRpny3qzqcLnXD50K1UIKcrGoXY%2FamdNhZZ2h7fJ73HLq8%2BMJQwSqULoRXxlMbi9zliOmJRS87Nub76GpW7jcQ8MfBcf526wcqN7tixYgXonD8w3%2Bp9LzstRSda8vgCIuLI%2FlT%2FDnY%2Fw%2FjXCc%2Bj8tGARUP0oFtklLS3NNlRVrfBCGZts0Hp5a%2FzWc2U%2FWeDTWVZD%2FjOUI438UJH2bdSMTjVwnAVwV8m1hnzJ8ER%2F8wzc95zvMU%2FROQKI%2FtXsuFiJCySISitWRCNw8LtyEj%2FV9pC2NvBkmatstQ%3D%3D"
            alt
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.description }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ item.content }}</h6>
            <p class="card-text">作者：{{ item.author }}</p>
            <small class="mb-2 text-muted">
              貼文日期：{{ $filters.date(item.create_at) }}
            </small>
            <div class="btn-group w-100 mt-3">
              <router-link
                class="btn btn-outline-primary btn-sm"
                :to="`/article/${item.id}`"
                >編輯</router-link
              >
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-4">
      <Pagination :page="pagination" @get-page="getArticles"></Pagination>
    </div>

    <!-- Modal -->
    <AdminArticleModal
      ref="adminModal"
      :props-article="tempArticle"
      @update-article="updateArticle"
    ></AdminArticleModal>
    <DelArticleModal
      ref="adminDelModal"
      :props-article="tempArticle"
      @delete-article="deleteArticle"
    ></DelArticleModal>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import AdminArticleModal from "@/components/AdminArticleModal.vue";
import DelArticleModal from "@/components/DelArticleModal.vue";
export default {
  data() {
    return {
      isNew: true,
      articles: {},
      pagination: {},
      tempArticle: {},
    };
  },
  components: {
    Pagination,
    AdminArticleModal,
    DelArticleModal,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    getArticles(num = this.pagination.current_page || 1) {
      // 參數預設值
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { articles, pagination } = res.data;
            this.articles = articles;
            this.pagination = pagination;
            console.log(this.articles);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteArticle() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$refs.adminDelModal.closeModal(); // 關掉 modal
          this.showAlert(res);
          console.log(res.data);
          this.getArticles();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateArticle(propsArticle) {
      // 預設為 新增
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/`;
      let httpMethod = "post";
      // 根據 isNew 來判斷要串接 post 或是 put API
      if (!this.isNew) {
        // 進入編輯狀態
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${propsArticle.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](url, { data: propsArticle }) // post 或 put
        .then((res) => {
          if (res.data.success) {
            this.$refs.adminModal.closeModal(); // 關掉 modal
            this.getArticles(); // 重整畫面
          } else {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(isNew, item) {
      // console.log(isNew, item)
      switch (isNew) {
        case "new":
          this.tempArticle = {
            create_at: Math.floor(Date.now() / 1000),
            tag: [],
            isPublic: 0,
          };
          this.isNew = true;
          this.$refs.adminModal.openModal();
          break;
        case "delete":
          // 因為傳參考特性會連動到資料，因此將資料進行淺層複製
          this.tempArticle = { ...item };
          // Modal需要拿到 title 和刪除按鈕時需要獲得 id
          this.$refs.adminDelModal.openModal();
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    console.clear();
    this.getArticles();
  },
};
</script>
