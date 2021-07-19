import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //404
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
    meta: { title: "找不到頁面", desc: "" },
  },
  {
    //登入介面
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "後台登入介面", desc: "" },
  },
  {
    //前台介面
    path: "/",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Top.vue"),
        meta: {
          title: "",
          desc: "諾貝塔為了瞭解自己的身世之謎而來到古堡探險，並在那邊挑戰了許多生魂，學習到各類的魔法與能力，同時也遇上了充滿謎團的小黑貓，如今已能在古堡裡獨當一面的諾貝塔，開始販賣起不知從何處入手的奇怪商品與物資…",
        },
      },
      {
        path: "articles",
        component: () => import("@/views/Articles.vue"),
        meta: {
          title: "最新消息",
          desc: "來自官方的諾貝塔相關創作與新聞的所有最新消息，統統集結於此",
        },
      },
      {
        path: "article/:id",
        component: () => import("@/views/Article.vue"),
      },
      {
        path: "products",
        component: () => import("@/views/Products.vue"),
        meta: {
          title: "商品列表",
          desc: "專門販賣諾貝塔不知從何處入手的奇怪商品與物資…",
        },
      },
      {
        path: "product/:id",
        component: () => import("@/views/Product.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/cart/Cart.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/cart/CartTop.vue"),
            meta: {
              title: "確認購物車",
              desc: "距離獲得諾貝塔的稀有寶物與商品只差臨門一腳了",
            },
          },
          {
            path: "/cartcheck",
            component: () => import("@/views/cart/CartCheck.vue"),
            meta: {
              title: "填寫訂單",
              desc: "距離獲得諾貝塔的稀有寶物與商品只差臨門一腳了",
            },
          },
          {
            path: "/cartconfirm",
            component: () => import("@/views/cart/CartConfirm.vue"),
            meta: {
              title: "確認訂單",
              desc: "距離獲得諾貝塔的稀有寶物與商品只差臨門一腳了",
            },
          },
          {
            path: "/cartpayment",
            component: () => import("@/views/cart/CartPayment.vue"),
            meta: {
              title: "完成下訂",
            },
            children: [
              {
                path: "/cartpayment/:id",
                component: () => import("@/views/cart/CartOrder.vue"),
              },
            ],
          },
          {
            path: "/cartcompleted",
            component: () => import("@/views/cart/CartCompleted.vue"),
            meta: {
              title: "完成付款",
            },
            children: [
              {
                path: "/cartcompleted/:id",
                component: () => import("@/views/cart/CartFinished.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "about",
        component: () => import("@/views/About.vue"),
        meta: { title: "關於諾貝塔", desc: "關於諾貝塔為何踏上探險旅途的故事" },
      },
    ],
  },
  {
    //後台介面
    path: "/admin",
    component: () => import("@/views/admin/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/AdminTop.vue"),
        meta: { title: "後台管理介面", desc: "" },
      },
      {
        path: "products",
        component: () => import("@/views/admin/AdminProducts.vue"),
        meta: { title: "商品列表", desc: "" },
      },
      {
        path: "orders",
        component: () => import("@/views/admin/AdminOrders.vue"),
        meta: { title: "訂單列表", desc: "" },
      },
      {
        path: "coupon",
        component: () => import("@/views/admin/AdminCoupons.vue"),
        meta: { title: "優惠券設定", desc: "" },
      },
      {
        path: "articles",
        component: () => import("@/views/admin/AdminArticles.vue"),
        meta: { title: "文章列表", desc: "" },
      },
      {
        path: "article/:id",
        component: () => import("@/views/admin/AdminArticle.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
