module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-deprecated-slot-attribute": "off",
    "vue/no-deprecated-slot-scope-attribute": "off",
    "vue/no-deprecated-v-bind-sync": "off",
    "vue/max-attributes-per-line": "off",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
