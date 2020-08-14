<template>
  <div
    class="wrapper"
    :class="{ 'nav-open': $sidebar.showSidebar }"
  >
    <notifications />

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content" />
      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link> -->
      <!-- 
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link> -->
      <sidebar-link to="/CatalogUsers">
        <md-icon>people</md-icon>
        <p>Usuários do Catálogo</p>
      </sidebar-link>
      <sidebar-link to="/Products">
        <md-icon>add_business</md-icon>
        <p>Produto</p>
      </sidebar-link>
      <sidebar-link to="/Orders">
        <md-icon>list_alt</md-icon>
        <p>Pedidos</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar />

      <dashboard-content />

      <content-footer v-if="!$route.meta.hideFooter" />
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>
