<template>
  <div v-if="explorer.state" class="mg-t p-b">

    <b-breadcrumb>
      <b-breadcrumb-item
          v-for="(address,index) in explorer.addresses"
          :key="index"
          :active="address.active"
          @click="onBreadcrumbclick(address)"
          href="#">
        {{address.text}}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <b-card
        class="shadow-sm hot-card-header"
        header-bg-variant="primary"
        header-tag="header">

      <template #header>
        <h6 class="mb-0" v-if="explorer.state.updates.length > 0">
          <b-badge variant="secondary" style="margin-right: 6px">
          {{explorer.state.updates.length - 1}}
          </b-badge>
          <span class="highlighted">Fields of</span> <span class="highlighted root-address-name">{{explorer.rootObject.className}}</span>
        </h6>
        <h6 class="mb-0" v-if="explorer.state.updates.length === 0"><b-badge variant="secondary" style="margin-right: 6px">0</b-badge>Updates</h6>
      </template>

      <b-card-body>

        <p v-if="explorer.state.updates.length === 0">Try with other object address</p>

        <div v-if="explorer.rootObject && explorer.rootObject.jar">
          <p>from jar installed at <span class="highlighted">{{explorer.rootObject.jar.hash}}</span></p>
        </div>

        <div class="accordion" role="tablist" v-if="explorer.state.updates.length > 0">

          <b-card-text class="header-updates" v-if="getStorageValues.length > 0">Value fields</b-card-text>
          <div
              v-for="(update, index) in getStorageValues"
              :key="index"
          >
            <b-card no-body class="mb-1" v-if="update.field && update.field.name">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'collapsed-value-' + index" variant="light" class="highlighted">
                  {{update.field.name}}:<code>{{update.field.type}} = {{update.value.value}}</code>
                </b-button>
              </b-card-header>

              <b-collapse :id="'collapsed-value-' + index" accordion="my-accordion" role="tabpanel" v-if="update.field && update.field.type">
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
                        Defining class <code>{{update.field.definingClass}}</code>
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

          <b-card-text class="header-updates" v-if="getStorageReferences.length > 0">Storage reference fields</b-card-text>
          <div
              v-for="(update, index) in getStorageReferences"
              :key="index + getStorageValues.length"
          >
            <b-card no-body class="mb-1" v-if="update.field && update.field.name">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'collapsed-reference-' + index + getStorageValues.length" variant="light" class="highlighted">
                  {{update.field.name}}:<code>{{update.field.type}}</code>
                </b-button>
              </b-card-header>

              <b-collapse :id="'collapsed-reference-' + index + getStorageValues.length" accordion="my-accordion" role="tabpanel" v-if="update.field && update.field.type">
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
                        Defining class <code>{{update.field.definingClass}}</code>
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

        </div>
      </b-card-body>
    </b-card>


  </div>
</template>

<script>
import {StateModel} from "hotweb3";

export default {
  name: "Explorer",
  props: {
    explorer: {
      state: StateModel,
      addresses: [],
      rootObject: null
    }
  },
  methods: {
    onAddressClick(objectAddress) {
      const stringObjectAddress = objectAddress.transaction.hash + '#' + parseInt(objectAddress.progressive).toString(16)
      this.$emit('onSearch', stringObjectAddress)
    },
    onBreadcrumbclick(address) {
      console.log(address)
      this.$emit('onSearch', address.id)
    }
  },
  computed: {
    getStorageValues() {
      return this.explorer.state.updates.filter(update => update.value && update.value.type && update.value.type !== 'reference')
    },
    getStorageReferences() {
      return this.explorer.state.updates.filter(update => update.value && update.value.type && update.value.type === 'reference')
    }
  }
}
</script>

<style scoped>
.mg-t {
  margin-top: 2rem;
}

.p-b {
  padding-bottom: 2rem;
}

.highlighted {
  font-weight: bold
}

.header-updates {
  text-align: left !important;
  color: rgba(0,0,0,.65) !important;
  font-weight: bold;
  margin-top: 1rem !important;
}

.storage-ref-code {
  cursor: pointer !important;
  color: #0031ca !important;
}
.breadcrumb {
  background-color: unset !important;
}

.root-address-name {
  color: #0031ca !important;
}
</style>