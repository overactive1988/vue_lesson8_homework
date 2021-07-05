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
          <h5 id="articleModalLabel" class="modal-title">
            <span v-if="propsArticle.title">編輯文章</span>
            <span v-else>新增文章</span>
          </h5>
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
              <label for="description">文章敘述</label>
              <input
                id="description"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章敘述"
                v-model.trim="newArticle.description"
              />
            </div>
          </div>

          <div class="row mt-3">
            <div class="form-group col-md-8">
              <label for="content">文章內容</label>
              <textarea
                id="content"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章內容"
                rows="4"
                v-model.trim="newArticle.content"
              >
              </textarea>
            </div>
            <div class="form-group col-md-4"></div>
          </div>

          <div class="form-group mt-3">
            <div class="form-check">
              <input
                id="isPublic"
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
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
  emits: ["update-article"],
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
