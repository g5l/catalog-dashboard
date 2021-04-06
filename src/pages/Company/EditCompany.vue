<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form-company
          data-background-color="orange"
          :company="company"
          title="Editar Empresa"
          button-class="md-warning"
          button-title="Editar"
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
      <span>Empresa editada com sucesso!</span>
    </md-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FormCompany } from "@/components";
import { editCompany } from '@/api/company'

export default {
  name: "EditCatalogUser",
  components: {
    FormCompany,
  },
  data() {
    return {
      company: {
        id: 0,
        name: null,
        profile: {
          logo: null,
          primaryColor: null,
          secondColor: null,
          background: null,
        }
      },
      sending: false,
      showSnackbar: false,
    };
  },
  computed: {
    ...mapGetters('company', ['profile', 'companyData'])
  },
  mounted() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.company = this.companyData
      this.company.profile = this.profile
    }, 1000)
  },
  methods: {
    sendRequest() {
      this.sending = true;
      editCompany(this.company).then((data) => {
        this.company = {};
        this.showSnackbar = true;
        this.sending = false;

        setTimeout(() => {
          this.$router.push({ path: "/EditCompany" });
        }, 2000);
      });
    },
  },
};
</script>
