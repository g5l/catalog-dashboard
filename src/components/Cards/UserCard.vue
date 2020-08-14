<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar" v-if="image">
      <img
        id="output"
        class="img"
      >
    </div>

    <md-card-content>
      <h6 class="category text-gray">
        {{ email }}
      </h6>
      <h4 class="card-title">
        {{ name }} {{ lastname }}
      </h4>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    image: {
      type: Event,
      default: () => {}
    },
    email: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  watch: {
    image () {
      this.setImagePreview()
    }
  },
  methods: {
    setImagePreview() {
      const reader = new FileReader();
      reader.onload = function(){
        const output = document.getElementById('output');
        output.src = reader.result;
      };
      reader.readAsDataURL(this.image.target.files[0]);
    }
  }
};
</script>
<style lang="scss" scoped>
.md-card-profile {
  .category {
    text-transform: lowercase;
    font-size: 14px;
  }
}
</style>
