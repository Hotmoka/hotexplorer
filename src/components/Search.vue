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

        <b-form @submit.prevent="onSearchClick" inline class="justify-content-center">
          <b-form-select id="input-search-type" v-model="selectedSearchType" :options="searchOptions"></b-form-select>

          <b-form-input
              id="input-object-address"
              type="text"
              v-model="address"
              placeholder="Hotmoka address or transaction reference"
              :state="stateAddress"
              trim
          ></b-form-input>

          <b-button id="btn-search" variant="primary" type="submit" :disabled="!stateAddress">
            <b-icon variant="light" icon="search"></b-icon>
          </b-button>
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
      searchOptions: [{ value: 'address', text: 'Address' }, { value: 'transaction', text: 'Transaction' }],
      selectedSearchType: 'address',
      address: null,
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearch', {
        searchType: this.selectedSearchType,
        address: this.address
      })
    }
  },
  computed: {
    stateAddress() {
      return this.address === null ? null : this.address.length > 0;
    }
  }
}
</script>

<style scoped>


#btn-search {
  margin-right: -1px;
}

@media only screen and (max-width: 575px) {

  #input-object-address {
    margin-top: 8px;
  }

  #btn-search {
    margin-top: 8px;
  }
}

@media only screen and (min-width: 576px) {

  #input-object-address {
    width: 40% !important;
  }
}

</style>