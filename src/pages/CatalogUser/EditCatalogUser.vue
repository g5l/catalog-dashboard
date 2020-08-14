<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form-catalog-user
          data-background-color="orange"
          title="Editar Usuário do Catálogo"
          button-title="Editar"
          button-class="md-warning"
          :catalog-user="catalogUser"
          :loading="sending"
          @send-form="sendRequest"
        />
      </div>
    </div>
    <md-snackbar
      md-position="left"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Usuário do catálogo editado com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { FormCatalogUser, UserCard  } from '@/components'
import { editCatalogUser, fetchCatalogUser } from '@/api/catalogUser'

export default {
  name: 'EditCatalogUser',
  components: {
    FormCatalogUser
  },
  data () {
    return {
      catalogUser: {
        id: 0,
        name: null,
        lastname: null,
        email: null,
        image: null,
        password: null,
      },
      sending: false,
      showSnackbar: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)

    const catalogUsertId = this.$route.params.id

    fetchCatalogUser(catalogUsertId)
      .then(({ data }) => {
        this.catalogUser = data
      })
      .catch((e) => {
        alert(e)
      })
  },
  methods: {
    sendRequest () {
      this.sending = true
      editCatalogUser(this.catalogUser)
        .then((data) => {
          this.catalogUser = {}
          this.showSnackbar = true
          this.sending = false

          setTimeout(() => {
            this.$router.push({ path: '/CatalogUsers' })
          }, 2000);
        })
    }
  }
}
</script>
