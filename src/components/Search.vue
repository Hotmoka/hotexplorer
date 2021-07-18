<template>
  <div class="margin-top-page">
    <b-card
        class="shadow-sm hot-card-header"
        header-bg-variant="primary"
        header="Hotexplorer"
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

          <b-button id="btn-search" variant="primary" type="submit">Search</b-button>
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
      this.$emit('onSearch', this.objectAddress.trim())
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

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  #input-object-address {
    width: 100% !important;
  }

  #btn-search {
    margin-top: 12px !important;
  }
}

@media only screen and (min-width: 769px) {

  #btn-search {
    margin-left: 6px !important;
  }
}

</style>