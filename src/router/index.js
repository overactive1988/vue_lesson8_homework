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
        meta: { title: "", desc: "諾貝塔為了瞭解自己的身世之謎而來到古堡探險，並在那邊挑戰了許多生魂，學習到各類的魔法與能力，同時也遇上了充滿謎團的小黑貓，如今已能在古堡裡獨當一面的諾貝塔，開始販賣起不知從何處入手的奇怪商品與物資…" },
      },
      {
        path: "products",
        component: () => import("@/views/Products.vue"),
        meta: { title: "商品列表", desc: "專門販賣諾貝塔不知從何處入手的奇怪商品與物資…" },
      },
      {
        path: "product/:id",
        component: () => import("@/views/Product.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/Cart.vue"),
        meta: { title: "購物車列表", desc: "距離獲得諾貝塔的稀有寶物與商品只差臨門一腳了" },
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
        component: () => import("@/views/admin/AdminCoupon.vue"),
        meta: { title: "優惠券設定", desc: "" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
