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
                Informe o Nome do Usuário
              </span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field> 
              <label for="logo">Logo</label>
              <md-file
                id="logo"
                name="logo"
                accept="image/*"
                @change="onFileUpload($event)"
              />
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field> 
              <label for="logo">Logo</label>
              <sketch-picker
                :value="colors"
                @input="updateValue"
              />
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
import { validationMixin } from 'vuelidate'
import {
  required,
} from 'vuelidate/lib/validators'
import { Sketch } from 'vue-color'

import { SpinnerButton } from "@/components";

export default {
  name: "FormCompany",
  components: {
    SpinnerButton,
    'sketch-picker': Sketch
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
      },
      logo: {
        required,
      },
      primaryColor: {
        required,
      },
      secondColor: {
        required,
      },
      background: {
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
    company: {
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
      form: this.company,
      colors: '#194d33'
    };
  },
  computed: {
    listButtonClass () {
      return `${this.buttonClass} md-raised`
    }
  },
  watch: {
    company (data) {
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
      this.form.logo = event
    }
  }
};
</script>
<style></style>
