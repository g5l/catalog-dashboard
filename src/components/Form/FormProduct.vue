<template>
  <form>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">
              {{ title }}
            </h4>
            <p class="category">
              {{ description }}
            </p>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field :class="getValidationClass('reference')"> 
                  <label for="reference">Referência</label>
                  <md-input
                    id="reference"
                    v-model="form.reference"
                    required
                    type="text"
                    name="reference"
                    :disabled="loading"
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field :class="getValidationClass('name')"> 
                  <label for="name">Nome</label>
                  <md-input
                    id="name"
                    v-model="form.name"
                    required
                    type="text"
                    name="name"
                    :disabled="loading"
                  />
                  <span
                    v-if="!$v.form.name.required"
                    class="md-error"
                  >
                    Informe o Nome do Produto
                  </span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field> 
                  <label for="price">Preço</label>
                  <md-input
                    id="price"
                    v-model="form.price"
                    v-mask="'money'"
                    required
                    type="text"
                    name="price"
                    :disabled="loading"
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field :class="getValidationClass('image')"> 
                  <label for="name">Image</label>
                  <md-file
                    id="image"
                    name="image"
                    accept="image/*"
                    @md-change="onFileUpload($event)"
                    @change="previewImage"
                  />
                  <!-- <span
                    v-if="!$v.form.image.required"
                    class="md-error"
                  >
                    Seleciona pelo menos uma Imagem
                  </span> -->
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <spinner-button
                  type="submit"
                  :button-class="listButtonClass"
                  :disabled="sendButtonDisabled"
                  :is-sending="loading"
                  @submit-form="validateForm"
                >
                  {{ buttonTitle }}
                </spinner-button>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-44">
        <md-card v-if="form.reference && form.name" class="product-card">
          <md-card-media v-if="imagePreviewData">
            <img :src="imagePreviewData" class="product-card__image" alt="Imagem do produto">
          </md-card-media>

          <md-card-header class="product-card__header">
            <div class="md-title">
              {{ form.reference }} - {{ form.name }}
            </div>
            <div v-if="form.price" class="md-subhead">
              R$ {{ form.price }}
            </div>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </form>
</template>
<script>
import AwesomeMask from 'awesome-mask'
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
} from 'vuelidate/lib/validators';

import { SpinnerButton } from "@/components";

export default {
  name: "FormProduct",
  components: {
    SpinnerButton
  },
  directives: {
    mask: AwesomeMask
  },
  mixins: [validationMixin],
  validations: {
    form: {
      reference: {
        required,
      },
      name: {
        required,
      },
    }
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    buttonTitle: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: 'md-success'
    },
    product: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sendButtonDisabled: false,
      form: this.product,
      imagePreviewData: ''
    };
  },
  computed: {
    listButtonClass () {
      return `${this.buttonClass} md-raised`
    },
  },
  watch: {
    product (data) {
      this.form = data
      this.loadProductImage()
    }
  },
  mounted () {
    this.loadProductImage()
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateForm () {
      this.sendButtonDisabled = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.sendForm()
      } else {
        this.sendButtonDisabled = false
      }
    },
    sendForm () {
      this.$emit('send-form')
    },
    onFileUpload (event) {
      this.form.image = event[0]
    },
    previewImage: function(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
            this.imagePreviewData = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    loadProductImage() {
      if (this.product.image) {
        this.imagePreviewData = this.product.image[0].url
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.product-card {
  padding: 20px;

  .product-card__image {
    height: 250px;
    object-fit: contain;
  }

  .product-card__header {
    background: #ffffff;
    margin: 0;
    box-shadow: none;
  }
}
</style>