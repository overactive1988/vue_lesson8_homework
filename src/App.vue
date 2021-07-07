<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    createTitleDesc: function (routeInstance) {
      // title設定
      if (routeInstance.meta.title) {
        var setTitle = routeInstance.meta.title + " | 小魔女諾貝塔雜貨工坊";
        document.title = setTitle;
      } else {
        document.title = "小魔女諾貝塔雜貨工坊";
      }

      // meta description設定
      if (routeInstance.meta.desc) {
        var setDesc = routeInstance.meta.desc + " | 小魔女諾貝塔雜貨工坊";
        document
          .querySelector("meta[name='description']")
          .setAttribute("content", setDesc);
      } else {
        document
          .querySelector("meta[name='description']")
          .setAttribute("content", "小魔女諾貝塔雜貨工坊，在古堡探險的旅途中，為您提供所需的道具與物資。");
      }
    },
  },
  mounted: function () {
    var routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
  },
  watch: {
    $route(routeInstance) {
      this.createTitleDesc(routeInstance);
    },
  },
};
</script>
