<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">
              Pedidos
            </h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="orders" table-header-color="green">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                class="order-item"
                @click="sendToOrder(item.id)"
              >
                <md-table-cell md-label="Id">
                  {{ item.id }}
                </md-table-cell>
                <md-table-cell md-label="Representante">
                  {{ item.CatalogUser.name }}
                </md-table-cell>
                <md-table-cell md-label="Status">
                  <span class="item__status" :style="orderStatus(item.status)">
                    {{ orderStatus(item.status).name }}
                  </span>
                </md-table-cell>
                <md-table-cell md-label="Data">
                  {{ dateFormated(item.createdAt) }}
                </md-table-cell>
                <md-table-cell md-label="Alterar Status">
                  <md-button
                    class="md-warning"
                    style="margin: auto;"
                    @click.stop="openChangeStatus(item)"
                  >
                    Alterar
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <md-dialog :md-active.sync="statusMondalIsOpen">
      <md-dialog-title>Alterar Status</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label for="status">Status</label>
          <md-select id="status" v-model="order.status" name="status">
            <md-option
              v-for="(status, index) in defaultStatus"
              :key="index"
              :value="status"
            >
              {{ orderStatus(status).name }}
            </md-option>
          </md-select>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeChangeStatus">
          Fechar
        </md-button>
        <md-button class="md-primary" @click="handdleChange">
          Alterar
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { fetchOrders, changeStatus } from '@/api/order'

export default {
  data () {
    return {
      orders: [],
      order: {
        id: '',
        status: ''
      },
      statusMondalIsOpen: false,
      defaultStatus: ['received', 'production', 'done', 'canceled']
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    fetchOrders().then(({ data }) => {
      this.orders = data
    }).catch((e) => {
      alert(e)
    })
  },
  methods: {
    sendToOrder (id) {
      this.$router.push({ path: `Order/${id}` })
    },
    dateFormated (date) {
      const d = new Date(date)
      const da = new Intl.DateTimeFormat('pt-br', { day: '2-digit' }).format(d)
      const mo = new Intl.DateTimeFormat('pt-br', { month: '2-digit' }).format(d)
      const ye = new Intl.DateTimeFormat('pt-br', { year: 'numeric' }).format(d)
      return `${da}-${mo}-${ye}`
    },
    openChangeStatus (order) {
      this.statusMondalIsOpen = true
      this.order.status = order.status
      this.order.id = order.id
    },
    closeChangeStatus () {
      this.statusMondalIsOpen = false
    },
    handdleChange (id) {
      changeStatus(this.order)

      this.closeChangeStatus()
    },
    orderStatus (status) {
      switch (status) {
        case 'received':
          return {
            name: 'Recebido',
            background: '#6b6b6b'
          }
        case 'production':
          return {
            name: 'Em produção',
            background: '#ffd700'
          }
        case 'done':
          return {
            name: 'Concluído',
            background: '#148629'
          }
        case 'canceled':
          return {
            name: 'Cancelado',
            background: '#cc0000'
          }
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-item {
    cursor: pointer;

    .item__status {
      color: #ffffff;
      border-radius: 3px;
      font-weight: 800;
      padding: 5px 15px;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    }
  }
</style>
