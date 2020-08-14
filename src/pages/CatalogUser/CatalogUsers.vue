<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button
          class="md-success"
          @click="handleCreate()"
        >
          Cadastrar
        </md-button>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">
              Usuários do catálogo
            </h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="catalogUsers" table-header-color="orange">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Id">
                  {{ item.id }}
                </md-table-cell>
                <md-table-cell md-label="Nome">
                  {{ item.name }} {{ item.lastname }}
                </md-table-cell>
                <md-table-cell md-label="Email">
                  <a :href="`mailto:${item.email}`">
                    {{ item.email }}
                  </a>
                </md-table-cell>
                <md-table-cell md-label="Data de inclusão">
                  {{ formatDate(item.createdAt) }}
                </md-table-cell>
                <md-table-cell md-label="Editar">
                  <md-button
                    class="md-warning"
                    style="margin: auto;"
                    @click="handleUpdate(item.id)"
                  >
                    Editar
                  </md-button>
                </md-table-cell>
                <md-table-cell md-label="Excluir Usuário">
                  <md-button
                    class="md-error"
                    style="margin: auto;"
                    @click="handleDelete(item.id)"
                  >
                    Excluir
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <md-dialog-confirm
      :md-active.sync="confirmModalOpen"
      md-title="Quer mesmo excluir?"
      md-cancel-text="Não"
      md-confirm-text="Sim"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <md-snackbar
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Usuário excluido com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { dateFormated } from '@/utils'
import { fetchCatalogUsers, deleteCatalogUser } from '@/api/catalogUser'

export default {
  data () {
    return {
      catalogUsers: [],
      confirmModalOpen: false,
      id: -1,
      showSnackbar: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    fetchCatalogUsers().then(({ data }) => {
      this.catalogUsers = data
    })
  },
  methods: {
    handleCreate () {
      this.$router.push({ path: 'CreateCatalogUser' })
    },
    handleUpdate (id) {
      this.$router.push({ path: `EditCatalogUser/${id}` })
    },
    handleDelete (id) {
      this.confirmModalOpen = true
      this.id = id
    },
    delete (id) {
      deleteCatalogUser(id)
      this.showSnackbar = true
    },
    onCancel () {
      this.confirmModalOpen = false
    },
    onConfirm () {
      this.confirmModalOpen = false
      this.delete(this.id)
    },
    removeFromList () {
      this.catalogUsers.splice(this.catalogUsers.findIndex(v => v.id === this.id), 1)
    },
    formatDate (date) {
      return dateFormated(date)
    },
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: inherit !important;
    text-decoration: underline !important;

    &:hover {
      color: inherit !important;
      text-decoration: underline !important;
    }

    &:focus {
      color: inherit !important;
      text-decoration: underline !important;
    }
  }
</style>