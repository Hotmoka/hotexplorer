<template>
  <div class="margin-top-page">
    <b-card
        title="Hotexplorer"
    >
      <b-card-text>
        Navigate through blockchain objects
      </b-card-text>

      <b-card-body>

        <b-form @submit.prevent="onSearchClick" inline style="display: block !important;">
          <b-form-input
              id="input-object-address"
              type="text"
              v-model="objectAddress"
              placeholder="Enter object's address"
              :state="isFormValid"
              style="width: 60%"
              required
          ></b-form-input>

          <b-button variant="primary" type="submit">Search</b-button>
        </b-form>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      objectAddress: null,
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearch', this.objectAddress)
    }
  },
  computed: {
    isFormValid() {
      return this.objectAddress !== null && this.objectAddress === '' ? false : null
    }
  }
}
</script>

<style scoped>

</style>