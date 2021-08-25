<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="articleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h3 id="articleModalLabel" class="modal-title">
            <span>新增文章</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mt-3">
            <div class="form-group col-md-4">
              <label for="author">作者名稱</label>
              <input
                id="author"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入作者名稱"
                v-model="newArticle.author"
              />
            </div>

            <div class="form-group col-md-4">
              <label for="tag">分類標籤</label>
              <input
                id="tag"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入分類標籤"
                v-model="newArticle.tag"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="create_at">建立時間</label>
              <input
                id="create_at"
                type="date"
                class="form-control mt-1"
                placeholder="請輸入建立時間"
                v-model="create_at"
              />
            </div>
          </div>

          <hr />

          <div class="row mt-3">
            <div class="form-group col-md-3">
              <label for="title">文章標題</label>
              <input
                id="title"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章標題"
                v-model="newArticle.title"
              />
            </div>
            <div class="form-group col-9">
              <label for="description">文章簡述</label>
              <input
                id="description"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章簡述"
                v-model.trim="newArticle.description"
              />
            </div>
          </div>

          <div class="row mt-3">
            <div class="form-group col-md-4">
              <div class="form-group">
                <label
                  class="text-light bg-secondary mb-2 py-1 px-2"
                  for="mainImageUrl"
                  >請輸入文章圖片網址</label
                >
                <input
                  id="mainImageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model.trim="newArticle.image"
                />
                <img
                  class="img-fluid my-3 form-img"
                  :src="newArticle.image"
                  :alt="newArticle.title"
                />
              </div>

              <label class="btn btn-outline-success btn-sm d-block w-100 mt-3">
                <input
                  id="upload_img"
                  style="display: none"
                  type="file"
                  @change="uploadMainImgage"
                />
                上傳圖片
              </label>
            </div>
            <div class="form-group col-md-8">
              <label for="content">文章內容</label>
              <textarea
                id="content"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章內容"
                rows="12"
                v-model.trim="newArticle.content"
              >
              </textarea>
            </div>
          </div>

          <div class="form-group mt-3">
            <div class="form-check">
              <input
                id="isPublic"
                class="form-check-input"
                type="checkbox"
                :true-value="true"
                :false-value="false"
                v-model="newArticle.isPublic"
              />
              <label class="form-check-label" for="isPublic">是否啟用</label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', propsArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/assets/js/mixins/modalMixin";
export default {
  emits: ["update-article"],
  props: {
    propsArticle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: "",
      create_at: "",
      newArticle: [],
    };
  },
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: "error",
      });
    },
    uploadMainImgage(e) {
      console.dir(e);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.$http
        .post(url, formData)
        .then((res) => {
          this.newArticle.image = res.data.imageUrl;
        })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  watch: {
    propsArticle() {
      this.newArticle = this.propsArticle;
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.newArticle.create_at * 1000)
        .toISOString()
        .split("T");
      [this.create_at] = dateAndTime;
    },
    create_at() {
      this.newArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
