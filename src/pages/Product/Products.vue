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
              Produtos
            </h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="products" table-header-color="orange">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Id">
                  {{ item.id }}
                </md-table-cell>
                <md-table-cell md-label="Referência">
                  {{ item.reference }}
                </md-table-cell>
                <md-table-cell md-label="Nome">
                  {{ item.name }}
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
                <md-table-cell md-label="Excluir Produto">
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
      <span>Produto excluido com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { dateFormated } from '@/utils'
import { fetchProducts, deleteProduct } from '@/api/product'

export default {
  data () {
    return {
      products: [],
      confirmModalOpen: false,
      id: -1,
      showSnackbar: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    fetchProducts().then(({ data }) => {
      this.products = data
    })
  },
  methods: {
    handleCreate () {
      this.$router.push({ path: 'CreateProduct' })
    },
    handleUpdate (id) {
      this.$router.push({ path: `EditProduct/${id}` })
    },
    handleDelete (id) {
      this.confirmModalOpen = true
      this.id = id
    },
    delete (id) {
      deleteProduct(id)
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
      this.products.splice(this.products.findIndex(v => v.id === this.id), 1)
    },
    formatDate (date) {
      return dateFormated(date)
    },
  }
}
</script>
