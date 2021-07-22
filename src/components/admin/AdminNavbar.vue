<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary header-nav">
    <div class="container-fluid">
      <h1>
        <router-link class="navbar-brand" to="/">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/leolee/1626951642442.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UP6QtkXC9JnrYjnguN%2FrLpP3eFkq%2Fy84Tpk7MB7OwBY18SbD5rumr4N29ezT%2FyrFH%2FWT97RHlnjGnHN6tbh%2B5QcFTJCcjH%2BjeHKg%2BCK%2BuGi1ICAuqADwFh%2FzyRudSZU9%2BcVe%2B%2BoY6t1JK3I%2BrPpNFd5ruoryyTgfeOT8ekewGXd7HxNJRBIfWzC1kfFn%2BJI%2BF%2F9RshF3veGS80eYqcBoeR6yBe4J0tNWyzun1k4RbxlHhxdIZESTOlX%2F%2BUQp9t76HmMNOG%2BxcU6zZDR3UWaeIwvJiX3wkyrulHBe83YnxGpxdeZK%2BqNBlLAr3rt0dP4aTQQnYeff%2FgdOVX1AxesREQ%3D%3D"
            alt="LITTLE WITCH NOBETA"
            width="120"
            class="d-inline-block align-text-top"
          />
        </router-link>
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin"
              >管理介面首頁<span class="text-uppercase"
                >admin</span
              ></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/coupon"
              >優惠券設定<span class="text-uppercase">coupon</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/products"
              >商品列表<span class="text-uppercase">products</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/orders"
              >訂單列表<span class="text-uppercase">orders</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-decoration-none header-nav-link fs-5"
              to="/admin/articles"
              >文章列表<span class="text-uppercase">articles</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
