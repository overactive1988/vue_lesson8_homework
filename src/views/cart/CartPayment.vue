<template>
  <div id="main" class="container content content-user">
    <template class="text-center pt-4" v-if="!this.$route.params.id"> 很抱歉，您並未依照正常流程操作 </template>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    check() {
      if (!this.$route.params.id) {
        alert("很抱歉，請依照正常流程進行操作");
        this.$router.push("/");
      }
    },
  },
  mounted() {
    console.clear();
    this.check();
  },
};
</script>
