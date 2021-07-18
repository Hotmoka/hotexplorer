<template>
  <div v-if="state" class="mg-t p-b">
    <b-card
        class="shadow-sm hot-card-header"
        header-bg-variant="primary"
        header-tag="header">

      <template #header>
        <h6 class="mb-0" v-if="state.updates.length > 0">
          <b-badge variant="secondary" style="margin-right: 6px">
          {{state.updates.length}}
          </b-badge>
          <span class="highlighted">Updates of</span> <span class="highlighted">{{getClassName}}</span>
        </h6>
        <h6 class="mb-0" v-if="state.updates.length === 0"><b-badge variant="secondary" style="margin-right: 6px">0</b-badge>Updates</h6>
      </template>

      <b-card-body>

        <p v-if="state.updates.length === 0">Try with other object address</p>

        <div v-if="rootObject = getRootObject">
          <p>from jar installed at <span class="highlighted">{{rootObject.jar.hash}}</span></p>
        </div>

        <div class="accordion" role="tablist">

          <b-card-text class="header-updates">Values fields</b-card-text>
          <div
              v-for="(update, index) in getStorageValues"
              :key="index"
          >
            <b-card no-body class="mb-1" v-if="update.field && update.field.name">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'collapsed-value-' + index" variant="light" class="highlighted">{{update.field.name}}</b-button>
              </b-card-header>

              <b-collapse :id="'collapsed-value-' + index" accordion="my-accordion" role="tabpanel" v-if="update.field && update.field.type">
                <b-card-body class="text-center">

                  <div class="row">
                    <div class="col-sm-6 col-xs-12">

                      <div class="d-block text-left highlighted">
                        Field
                      </div>

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
                      <div class="d-block text-left highlighted">
                        Value
                      </div>

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

          <b-card-text class="header-updates">Storage references fields</b-card-text>
          <div
              v-for="(update, index) in getStorageReferences"
              :key="index + getStorageValues.length"
          >
            <b-card no-body class="mb-1" v-if="update.field && update.field.name">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'collapsed-reference-' + index + getStorageValues.length" variant="light" class="highlighted">{{update.field.name}}</b-button>
              </b-card-header>

              <b-collapse :id="'collapsed-reference-' + index + getStorageValues.length" accordion="my-accordion" role="tabpanel" v-if="update.field && update.field.type">
                <b-card-body class="text-center">

                  <div class="row">
                    <div class="col-sm-6 col-xs-12">

                      <div class="d-block text-left highlighted">
                        Field
                      </div>

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
                      <div class="d-block text-left highlighted">
                        Value
                      </div>

                      <div class="d-block text-left">
                        Address <code>{{update.value.reference.transaction.hash}}#{{parseInt(update.value.reference.progressive).toString(16)}}</code>
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
    state: StateModel
  },
  computed: {
    getClassName() {
      const classNames = this.state.updates.filter(update => update.className !== undefined && update.className !== null)
      return classNames.length > 0 ? classNames[0].className : ''
    },
    getRootObject() {
      const classNames = this.state.updates.filter(update => update.className !== undefined && update.className !== null)
      return classNames.length > 0 ? classNames[0] : null
    },
    getStorageValues() {
      return this.state.updates.filter(update => update.value && update.value.type && update.value.type !== 'reference')
    },
    getStorageReferences() {
      return this.state.updates.filter(update => update.value && update.value.type && update.value.type === 'reference')
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

</style>