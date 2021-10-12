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

    <State :hotmokaObject="explorer.hotmokaObject" @onAddressSearch="searchAddress" @onTransactionSearch="searchTransaction"></State>
    <Transaction :transaction="explorer.transaction" @onAddressSearch="searchAddress" @onTransactionSearch="searchTransaction"></Transaction>

  </div>
</template>

<script>
import {StateModel} from "hotweb3";
import State from "@/components/State";
import Transaction from "@/components/Transaction";
export default {
  name: "Explorer",
  components: { State, Transaction },
  props: {
    explorer: {
      hotmokaObject: {
        state: StateModel,
        rootObject: Object
      },
      transaction: {
        request: Object,
        response: Object
      },
      addresses: []
    }
  },
  methods: {
    searchAddress(address) {
      this.$emit('onAddressSearch', address)
    },
    searchTransaction(transaction) {
      this.$emit('onTransactionSearch', transaction)
    },
    onBreadcrumbClick(address) {
      if (address.active) {
        return
      }

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

.h-badge {
  padding: 6px;
  cursor: pointer;
}


@media only screen and (max-width: 768px) {
  .h-badge {
    margin-bottom: 12px !important;
  }
}

</style>