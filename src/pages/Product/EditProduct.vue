<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form-product
          data-background-color="orange"
          title="Editar Produto"
          button-title="Editar"
          button-class="md-warning"
          :product="product"
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
      <span>Produto editado com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { FormProduct } from '@/components'
import { editProduct, fetchProduct } from '@/api/product'

export default {
  name: 'CreateProduct',
  components: {
    FormProduct
  },
  data () {
    return {
      product: {
        id: 0,
        reference: null,
        price: null,
        name: null,
        image: null,
      },
      sending: false,
      showSnackbar: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)

    const productId = this.$route.params.id

    fetchProduct(productId)
      .then(({ data }) => {
        const product = data
        product.price = parseFloat(product.price).toLocaleString('pt-BR', {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3
        });
        this.product = product
      })
      .catch((e) => {
        alert(e)
      })
  },
  methods: {
    sendRequest () {
      this.sending = true
      editProduct(this.product)
        .then((data) => {
          this.showSnackbar = true
          this.sending = false

          setTimeout(() => {
            this.$router.push({ path: '/Products' })
          }, 2000);
        })
    }
  }
}
</script>
