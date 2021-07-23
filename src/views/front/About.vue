<template>
  <div class="bg-cover--04">
    <header class="nav-header">
      <Navbar></Navbar>
    </header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-light" :to="`/`">首頁</router-link>
        </li>
        <li class="breadcrumb-item text-light active" aria-current="page">
          關於諾貝塔
        </li>
      </ol>
    </nav>
    <div class="container-fluid pb-5 bg-01">
      <div class="container content">
        <h2 class="pt-4 text-light">關於諾貝塔</h2>
        <section class="section mt-4">
          <h3 class="section-title__text text-light">
            熱銷全球的台灣原創遊戲<br /><span class="fs-5 fs-sm-5"
              >-又被玩家俗稱為 蘿莉黑暗靈魂</span
            >
          </h3>
          <q class="text-light fs-7"
            >黑暗靈魂被認為是第七世代遊戲機中最傑出的電子遊戲之一，由於黑暗靈魂的成功，諸多遊戲都受魂系列的影響，如《天命》、《異化》、《墮落之王》、《鹽與避難所》、《鏟子騎士》、《泰坦之魂》、《挺進地牢》、《巫師3：狂獵》、《仁王》等。
            <br /><a
              href="https://zh.wikipedia.org/wiki/%E9%BB%91%E6%9A%97%E9%9D%88%E9%AD%82"
              target="_blank"
              class="text-link-light text-decoration-none"
              >資料來源：維基百科wiki</a
            ></q
          >
          <h3 class="section-title__text text-light mt-4">
            全球發行銷售量超過 15 萬份！
          </h3>
          <p class="text-light fs-6 fs-sm-5">
            本作於 2020 年 6月 24 日於 Steam 遊戲平台推出先行體驗版，截止同年 8
            月中旬，全球銷量已達到 150,000 份，其中有超過一半的使用者來自日本。
          </p>
        </section>
        <div class="section mt-4">
          <div class="row align-items-center">
            <div class="col-12 col-md-5">
              <h3 class="section-title__text text-light">知名 Vtuber 直播</h3>
              <p class="text-light fs-6 fs-sm-5">
                本作發售約 1 星期左右，便收到許多海外知名 Vtuber
                直播主聯繫，表示希望能夠實況直播遊玩這款遊戲，以下列舉幾位。
              </p>
              <ul class="text-light">
                <li>
                  <a
                    class="text-link-light text-decoration-none"
                    href="https://youtu.be/J-qsc-0_aUQ"
                    target="_blank"
                    >湊あくあ - hololive</a
                  >
                </li>
                <li>
                  <a
                    class="text-link-light text-decoration-none"
                    href="https://youtu.be/cVBoFyzOuhg"
                    target="_blank"
                    >白銀ノエル - hololive</a
                  >
                </li>
                <li>
                  <a
                    class="text-link-light text-decoration-none"
                    href="https://youtu.be/tN5B_k48aNA"
                    target="_blank"
                    >不知火フレア - hololive</a
                  >
                </li>
                <li>
                  <a
                    class="text-link-light text-decoration-none"
                    href="https://youtu.be/LpgVFhtpO_A"
                    target="_blank"
                    >ロボ子 - hololive</a
                  >
                </li>
                <li>
                  <a
                    class="text-link-light text-decoration-none"
                    href="https://youtu.be/BXKRNT1GMU8"
                    target="_blank"
                    >A.I.Games - Kizuna AI 株式会社</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-7">
              <figure class="mb-0">
                <img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1627071304843.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BROsKIESGOIOwDNgzOcamrannT%2FJ50pKiQ02Rll%2Fbyul%2FNYaxtYmAYJWEKyEzliv%2BAiRSrbS6UnU1%2FKNpnXF5C7qq2HV4AAqLymI2VxhNdCRN3%2Fq4KWmMCxJGFSd8LO9QpNvb2G4DmpRyepbfrZkDoxkNl45pvAGb9WY5SbWTRPb89kEE%2B%2BxjCSfdAghamwQnF%2FPZVWcPySz6O0WWceq%2BaWUJPxs%2B%2F38gqy5p5t70zvqAoVnTTeUhP5M3l9wzzEajVBhIMZYOkNFnrJQ28q0k9G3nbAo49SwvmVbcrOh5%2BiJGBT%2BsHomilYvkGuIugmF84OrvL%2BuwoXv7kQfLFOaDg%3D%3D"
                  alt=""
                  class="img-fluid"
                />
                <figcaption class="text-light mt-2">
                  海外知名實況主直播
                </figcaption>
              </figure>
            </div>
            <div class="col mt-4">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/J-qsc-0_aUQ?rel=0"
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
                <div class="col-12 col-md-6 mt-3 mt-md-0">
                  <div class="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/cVBoFyzOuhg?rel=0"
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section mt-4">
          <div class="row align-items-center">
            <div class="col-12 col-md-8 order-1 order-md-0">
              <figure class="mb-0">
                <img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1627068595030.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JrjZKIVtaLczzfgavYHmtieOqdm%2BFDuuZMCnifr%2Bs4qZogXfWX5aw4A6TynwSC5%2Byx2%2FEIM%2FCrRAk%2F45KnxFbHFxTTEmxt0a9SZGMpJrWdwOTkGq4XuxcMkwqqat6zZJryEEn7GCOywCH%2FqorhWYEp8KRv7WBIiW%2Fz8JNhN1GeBWX%2BJy8r8GJCpV1Aw9wElqUkwnTNGowXgTDvU1CGNJ7GLhFJEj4do0QlXZrCnSKR7esAe9Waw5OQj0yPZ%2FZa65cgz1SpOORvzBYXHrWN5Fxp1f1Cfnbgh1URLuDsPw1ikR1i7BxZWC6S6l%2BtY9QVABfpIIAXXxZv6e%2FqRUHfVjTw%3D%3D"
                  alt=""
                  class="img-fluid"
                />
                <figcaption class="text-light">
                  小魔女諾貝塔 遊戲畫面
                </figcaption>
              </figure>
            </div>
            <div class="col-12 col-md-4 order-0 order-md-1">
              <h3 class="section-title__text text-light">遊戲介紹</h3>
              <p class="text-light fs-6 fs-sm-5">
                小魔女諾貝塔是一款動作冒險遊戲<br />為了解開自己的身世之謎少女獨自來到古堡，<br />不斷的挑戰強大的生魂，<br />也學習到各式各樣的魔法與能力，<br />並邂逅了神祕的小黑貓，<br />古堡深處究竟隱藏了什麼樣的秘密呢?
              </p>
            </div>
          </div>
        </div>
        <div class="section mt-4">
          <figure class="w-25 w-md-75 mb-0 mx-auto">
            <figcaption class="text-light mb-2">剩下還在做qq</figcaption>
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626976385985.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dDK0BwVGekCxyUGJ34wQzV3yW8YoDEMyVp0KpMA2HuOLTiJOnDa0eou3SAWQNWNt5U63FLLUdooAAUqrT7v2A0PfPAjZ7rDmIEdVLovpl%2BGbtwwDZ8yM48u9yCp3Od1hRSjaVx4t268AOgBbFXNvYTwo%2BccXaoOHFCEEBTAd2sRuSiorjuU0c7w8lIMHlkQSA8bzkAZR05OUb7h%2Fy65T7UltXP%2BjzvjK7ejwhOj6gPsn%2Fl5Hc6hd90x8j4QJ9NCPIdaxiwzCRLR5V0CZ8x43TvS8fIh96Bf%2FmUHyxMbyDhJrkVqKkfVK%2F3J01uq9hi27GpiacZzLY4et22xeV9K27g%3D%3D"
              alt=""
              class="img-fluid"
            />
          </figure>
        </div>
      </div>
    </div>
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
