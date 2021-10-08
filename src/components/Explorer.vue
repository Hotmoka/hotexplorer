<template>
  <div v-if="explorer.addresses && explorer.addresses.length > 0">

    <div class="row">
      <div class="col-md-11 col-sm-12">

        <b-breadcrumb>
          <b-breadcrumb-item
              v-for="(address,index) in explorer.addresses"
              :key="index"
              :active="address.active"
              :class="address.active ? 'h-breadcrumb-active' : 'h-breadcrumb-not-active'"
              @click="onBreadcrumbClick(address)"
              href="#">
            {{ address.text }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>

      <div class="col-md-1 col-sm-12">
        <b-badge class="h-badge" variant="secondary" @click="onClearClick">Clear</b-badge>
      </div>
    </div>

    <State :hotmokaObject="explorer.hotmokaObject" @onAddressSearch="searchAddress"></State>

  </div>
</template>

<script>
import {StateModel} from "hotweb3";
import State from "@/components/State";
export default {
  name: "Explorer",
  components: { State },
  props: {
    explorer: {
      hotmokaObject: {
        state: StateModel,
        rootObject: Object
      },
      addresses: []
    }
  },
  methods: {
    searchAddress(address) {
      this.$emit('onAddressSearch', address)
    },
    onBreadcrumbClick(address) {
      if (address.type === 'address') {
        this.$emit('onAddressSearch', address.id)
      } else {
        this.$emit('onTransactionSearch', address.id)
      }
    },
    onClearClick() {
      this.$emit('onClearAddresses')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>