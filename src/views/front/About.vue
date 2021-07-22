<template>
  <header>
    <Navbar></Navbar>
  </header>
  <div class="container content content-user">
    <h2 class="text-center pt-4">關於諾貝塔</h2>
    <figure class="text-center">
      <img
        class="img-fluid"
        src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626976385985.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dDK0BwVGekCxyUGJ34wQzV3yW8YoDEMyVp0KpMA2HuOLTiJOnDa0eou3SAWQNWNt5U63FLLUdooAAUqrT7v2A0PfPAjZ7rDmIEdVLovpl%2BGbtwwDZ8yM48u9yCp3Od1hRSjaVx4t268AOgBbFXNvYTwo%2BccXaoOHFCEEBTAd2sRuSiorjuU0c7w8lIMHlkQSA8bzkAZR05OUb7h%2Fy65T7UltXP%2BjzvjK7ejwhOj6gPsn%2Fl5Hc6hd90x8j4QJ9NCPIdaxiwzCRLR5V0CZ8x43TvS8fIh96Bf%2FmUHyxMbyDhJrkVqKkfVK%2F3J01uq9hi27GpiacZzLY4et22xeV9K27g%3D%3D"
        alt
      />
    </figure>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
