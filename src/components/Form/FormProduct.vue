<template>
  <form>
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
            <md-field :class="getValidationClass('price')"> 
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
              <span
                v-if="!$v.form.price.required"
                class="md-error"
              >
                Informe um Preço
              </span>
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
      price: {
        required,
      }
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
      form: this.product
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
    }
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
    }
  }
}
</script>
<style>
</style>