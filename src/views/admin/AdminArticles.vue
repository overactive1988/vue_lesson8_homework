<template>
  <div class="container content">
    <h2 class="text-center">文章列表</h2>
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
        <div class="card h-100">
          <h5 class="card-header min-vh-75 d-flex align-items-center">
            {{ item.title }}
          </h5>
          <img :src="item.image" alt class="card-img-top img-cover" />
          <div class="card-body d-flex flex-column justify-content-end">
            <span class="badge bg-primary mb-1">{{ item.tag }}</span>
            <h5 class="card-title">
              {{ item.description
              }}<span v-if="item.isPublic" class="material-icons">
                verified
              </span>
            </h5>
            <p class="card-subtitle">作者：{{ item.author }}</p>
            <small class="card-text mb-2 text-muted">
              貼文日期：{{ $filters.date(item.create_at) }}
            </small>
            <div class="btn-group w-100 mt-3">
              <router-link
                class="btn btn-outline-primary btn-sm"
                :to="`/admin/article/${item.id}`"
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
import Pagination from "@/components/admin/AdminPagination.vue";
import AdminArticleModal from "@/components/admin/AdminArticleModal.vue";
import DelArticleModal from "@/components/admin/DelArticleModal.vue";
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
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
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
          }
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    deleteArticle() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$refs.adminDelModal.closeModal(); // 關掉 modal
          this.showAlert(res);
          this.getArticles();
        })
        .catch((error) => {
          this.showErrorAlert(error);
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
          }
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case "new":
          this.tempArticle = {
            create_at: Math.floor(Date.now() / 1000),
            image: [],
            tag: [],
            isPublic: false,
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
    // console.clear();
    this.getArticles();
  },
};
</script>
