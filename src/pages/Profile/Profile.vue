<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">
              Perfil
            </h4>
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
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profile',
}
</script>
<style>
</style>