<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form-company
          data-background-color="orange"
          :company="company"
          title="Cadastrar Empresa"
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
import { FormCompany } from "@/components";
import { fetchMyCompany } from "@/api/company";

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
        logo: null,
        primaryColor: null,
        secondColor: null,
        background: null,
      },
      sending: false,
      showSnackbar: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);

    fetchMyCompany()
      .then(({ data }) => {
        console.log({ data });
        this.company = data;
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    sendRequest() {
      this.sending = true;
      editCatalogUser(this.catalogUser).then((data) => {
        this.company = {};
        this.showSnackbar = true;
        this.sending = false;

        setTimeout(() => {
          this.$router.push({ path: "/CatalogUsers" });
        }, 2000);
      });
    },
  },
};
</script>
