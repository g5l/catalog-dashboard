<template>
  <div id="order" class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <div class="md-title">{{ user.name }}</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-50 md-size-33">
                <div>
                  <strong>Email:</strong> {{ user.email }}
                </div>
              </div>
              <div class="md-layout-item md-medium-size-50 md-size-33">
                <div>
                  <strong>Telefone:</strong> {{ user.phone }}
                </div>
              </div>
              <div class="md-layout-item md-medium-size-50 md-size-33">
                <div>
                  <strong>Status:</strong> {{ orderStatus }}
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-header data-background-color="orange">
            <div class="md-title">Produtos</div>
          </md-card-header>

          <md-card-content>
            <md-table v-model="products" table-header-color="orange">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Referência">
                  {{ item.Product.reference }}
                </md-table-cell>
                <md-table-cell md-label="Foto">
                  <img :src="mainImage(item.Product.image)" class="product-image">
                </md-table-cell>
                <md-table-cell md-label="Nome">
                  {{ item.Product.name }}
                </md-table-cell>
                <md-table-cell md-label="Quantidade">
                  {{ item.amount }}
                </md-table-cell>
                <md-table-cell md-label="Observação">
                  {{ item.note }}
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchOrder } from '@/api/order'

export default {
  name: 'CreateProduct',
  data() {
    return {
      order: {
        CatalogUser: {
          name: '',
          email: '',
          phone: '',
        }
      }
    }
  },
  computed: {
    user () {
      return this.order.CatalogUser
    },
    products () {
      return this.order.OrderItems
    },
    orderStatus () {
      switch (this.order.status) {
        case 'received':
          return 'Recebido'
        case 'production':
          return 'Em produção'
        case 'done':
          return 'Concluído'
        case 'canceled':
          return 'Cancelado'
        default:
          return ''
      }
    }
  },
  mounted () {
    window.scrollTo(0, 0)

    const orderId = this.$route.params.id

    fetchOrder(orderId).then(({ data }) => {
      this.order = data
    }).catch((e) => {
      alert(e)
    })
  },
  methods: {
    mainImage (image) {
      return image[0].url
    }
  }
}
</script>
<style lang="scss">
  #order {
    .product-image {
      width: 80px;
    }
  }
</style>
