<template>
  <div class="content">
    <div class="md-layout-item md-medium-size-100 md-size-100">
      <form-product
        data-background-color="green"
        :product="product"
        title="Cadastrar Produto"
        description="Cadastre seus produtos"
        button-title="Cadastrar"
        :loading="sending"
        @send-form="createProduct"
      />
    </div>
    <md-snackbar
      md-position="left"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Produto criado!!</span>
    </md-snackbar>
  </div>
</template>
<script>
import { FormProduct } from "@/components";
import { createProduct } from "@/api/product"

export default {
  components: {
    FormProduct
  },
  data () {
    return {
      sending: false,
      showSnackbar: false,
      product: {
        reference: null,
        price: null,
        name: null,
        image: null,
        companyId: this.$store.state.company.company.id,
      }
    }
  },
  methods: {
    createProduct () {
      this.sending = true
      createProduct(this.product)
        .then(() => {
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