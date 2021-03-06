<template>

  <b-card
      v-if="hotmokaObject.state"
      class="shadow-sm hot-card-header"
      header-bg-variant="primary"
      header-tag="header">

    <template #header>
      <h6 class="mb-0" v-if="hotmokaObject.state.updates.length > 0">
        <b-badge variant="secondary" style="margin-right: 6px">
          {{ hotmokaObject.state.updates.length - 1 }}
        </b-badge>
        <span class="highlighted">Storage fields of</span> <span class="highlighted root-address-name">{{
          hotmokaObject.rootObject.className
        }}</span>
      </h6>
      <h6 class="mb-0" v-if="hotmokaObject.state.updates.length === 0"><b-badge variant="secondary" style="margin-right: 6px">0</b-badge>Updates</h6>
    </template>

    <b-card-body>

      <p v-if="hotmokaObject.state.updates.length === 0">Try with other object address</p>

      <div v-if="hotmokaObject.rootObject">
        <div v-if="getAddressOfRootObject" class="text-left">
          <b-card-text class="header-updates no-margin-t-b">Object address</b-card-text>
          <p style="margin-bottom: 16px">{{getAddressOfRootObject}}</p>
        </div>

        <div v-if="hotmokaObject.rootObject.jar" class="text-left">
          <b-card-text class="header-updates no-margin-t-b">Jar reference </b-card-text>
          <p style="margin-bottom: 0"><code class="storage-ref-code" @click="onTransactionClick(hotmokaObject.rootObject.jar.hash)">{{ hotmokaObject.rootObject.jar.hash }}</code></p>
        </div>
      </div>


      <div class="accordion" role="tablist" v-if="hotmokaObject.state.updates.length > 0">

        <!-- value fields -->
        <b-card-text class="header-updates" v-if="getStorageValues.length > 0">Value fields</b-card-text>
        <div
            v-for="(update, index) in getStorageValues"
            :key="index"
        >
          <b-card no-body class="mb-1" v-if="update.field && update.field.name">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block v-b-toggle="'collapsed-value-' + index" variant="light" class="highlighted">
                {{update.field.name}}:<code>{{update.field.type}} = {{update.value.value}}</code>
              </b-button>
            </b-card-header>

            <b-collapse :id="'collapsed-value-' + index" accordion="accordion-values" role="tabpanel" v-if="update.field && update.field.type">
              <b-card-body class="text-center">

                <div class="row">
                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Name <code>{{update.field.name}}</code>
                    </div>

                    <div class="d-block text-left">
                      Type <code>{{update.field.type}}</code>
                    </div>

                    <div class="d-block text-left">
                      {{
                        hotmokaObject.rootObject.className === update.field.definingClass ? 'Defining class' : 'Inherited from'
                      }}
                      <code>{{update.field.definingClass}}</code>
                    </div>
                  </div>

                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Value <code>{{update.value.value}}</code>
                    </div>

                    <div class="d-block text-left">
                      Type <code>{{update.value.type}}</code>
                    </div>
                  </div>
                </div>


              </b-card-body>
            </b-collapse>

          </b-card>
        </div>
        <!-- end value fields-->

        <!-- reference fields -->
        <b-card-text class="header-updates" v-if="getStorageReferences.length > 0">Reference fields</b-card-text>
        <div
            v-for="(update, index) in getStorageReferences"
            :key="index + getStorageValues.length"
        >
          <b-card no-body class="mb-1" v-if="update.field && update.field.name">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block v-b-toggle="'collapsed-reference-' + index + getStorageValues.length" variant="light" class="highlighted">
                {{update.field.name}}:<code>{{update.field.type}}</code>
              </b-button>
            </b-card-header>

            <b-collapse :id="'collapsed-reference-' + index + getStorageValues.length" accordion="accordion-references" role="tabpanel" v-if="update.field && update.field.type">
              <b-card-body class="text-center">

                <div class="row">
                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Name <code>{{update.field.name}}</code>
                    </div>

                    <div class="d-block text-left">
                      Type <code>{{update.field.type}}</code>
                    </div>

                    <div class="d-block text-left">
                      {{
                        hotmokaObject.rootObject.className === update.field.definingClass ? 'Defining class' : 'Inherited from'
                      }}
                      <code>{{update.field.definingClass}}</code>
                    </div>
                  </div>

                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left" v-if="update.value.reference">
                      Address <code class="storage-ref-code" @click="onAddressClick(update.value.reference)">{{update.value.reference.transaction.hash}}#{{parseInt(update.value.reference.progressive).toString(16)}}</code>
                    </div>

                    <div class="d-block text-left">
                      Type <code>{{update.value.type}}</code>
                    </div>
                  </div>
                </div>


              </b-card-body>
            </b-collapse>

          </b-card>
        </div>
        <!-- end reference fields -->

      </div>
    </b-card-body>
  </b-card>

</template>

<script>
import {StateModel} from "hotweb3";

export default {
  name: "State",
  props: {
    hotmokaObject: {
      state: StateModel,
      rootObject: Object
    }
  },
  computed: {
    getStorageValues() {
      return this.hotmokaObject.state.updates.filter(update => update.value && update.value.type && update.value.type !== 'reference')
    },
    getStorageReferences() {
      return this.hotmokaObject.state.updates.filter(update => update.value && update.value.type && update.value.type === 'reference')
    },
    getAddressOfRootObject() {
      if (this.hotmokaObject.rootObject && this.hotmokaObject.rootObject.object && this.hotmokaObject.rootObject.object.transaction && this.hotmokaObject.rootObject.object.transaction.hash) {
        return this.hotmokaObject.rootObject.object.transaction.hash + '#' + parseInt(this.hotmokaObject.rootObject.object.progressive).toString(16)
      }
      return null
    }
  },
  methods: {
    onAddressClick(objectAddress) {
      const address = objectAddress.transaction.hash + '#' + parseInt(objectAddress.progressive).toString(16)
      this.$emit('onAddressSearch', address)
    },
    onTransactionClick(transaction) {
      this.$emit('onTransactionSearch', transaction)
    }
  }
}
</script>

<style scoped>

.root-address-name {
  color: #311b92  !important;
}

.card-body {
  padding: 0.75rem !important;
}

</style>