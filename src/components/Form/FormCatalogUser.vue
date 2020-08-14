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
            <md-field :class="getValidationClass('lastname')"> 
              <label for="lastname">Sobrenome</label>
              <md-input
                id="lastname"
                v-model="form.lastname"
                required
                type="text"
                name="lastname"
                :disabled="loading"
              />
              <span
                v-if="!$v.form.lastname.required"
                class="md-error"
              >
                Informe o Sobrenome do Usuário
              </span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('email')"> 
              <label for="email">Email</label>
              <md-input
                id="email"
                v-model="form.email"
                required
                type="text"
                name="email"
                :disabled="loading"
              />
              <span
                v-if="!$v.form.email.required"
                class="md-error"
              >
                Informe o Email do Usuário
              </span>
              <span
                v-if="!$v.form.email.email"
                class="md-error"
              >
                Informe um Email correto
              </span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field> 
              <label for="password">Senha</label>
              <md-input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                :disabled="loading"
              />
              <!-- <span
                v-if="!$v.form.password.required"
                class="md-error"
              >
                Informe uma Senha
              </span> -->
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field> 
              <label for="image">Foto do usuário</label>
              <md-file
                id="image"
                name="image"
                accept="image/*"
                @change="onFileUpload($event)"
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
  email,
} from 'vuelidate/lib/validators'

import { SpinnerButton } from "@/components";

export default {
  name: "FormCatalogUser",
  components: {
    SpinnerButton
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
      },
      lastname: {
        required,
      },
      email: {
        required,
        email,
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
    catalogUser: {
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
      form: this.catalogUser
    };
  },
  computed: {
    listButtonClass () {
      return `${this.buttonClass} md-raised`
    }
  },
  watch: {
    catalogUser (data) {
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
      this.form.image = event
    }
  }
};
</script>
<style></style>
