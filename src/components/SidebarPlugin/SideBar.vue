<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <div class="logo__avatar simple-text logo-mini logo-img">
        <img
          :src="imgLogo"
          alt="Logo"
        >
      </div>
      <div class="logo__title simple-text logo-normal">
        {{ title }}
      </div>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content" />
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          />
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  props: {
    title: {
      type: String,
      default: "Catalog"
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg")
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/logo.png")
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`
      };
    }
  },
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
  .sidebar {
    .logo {
      .logo__avatar {
        float: inherit;
        display: block;
        margin-left: auto;
        margin-right: auto;

        img {
          border-radius: 20px;
         
        }
      }
      .logo__title {
        text-align: center;
      }
      /* display: flex; */
    }
  }
</style>