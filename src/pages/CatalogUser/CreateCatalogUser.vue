<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <form-catalog-user
          data-background-color="green"
          :catalog-user="catalogUser"
          title="Cadastrar Usuário do Catálogo"
          description="asdas asdas"
          button-title="Cadastrar"
          :loading="sending"
          @send-form="createUser"
        />
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card
          v-if="catalogUser.name"
          :image="catalogUser.image"
          :lastname="catalogUser.lastname"
          :name="catalogUser.name"
          :email="catalogUser.email"
        />
      </div>
    </div>
    <md-snackbar
      md-position="left"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Usuário criado!!</span>
    </md-snackbar>
  </div>
</template>
<script>
  import { createCatalogUser } from "@/api/catalogUser"
  import { FormCatalogUser, UserCard } from "@/components";
  export default {
    components: {
      FormCatalogUser,
      UserCard
    },
    data () {
      return {
        sending: false,
        catalogUser: {
          name: null,
          lastname: null,
          email: null,
          image: null,
          password: null,
        }
      }
    },
    methods: {
      createUser () {
        this.sending = true
        createCatalogUser(this.catalogUser).then(
          (data) => {
            this.sending = false
            this.showSnackbar = true

            setTimeout(() => {
              this.$router.push({ path: '/CatalogUsers' })
            }, 2000);
          },
          (error) => {
            this.sending = false
          },
        )
      }
    }
  }
</script>
<style>
</style>