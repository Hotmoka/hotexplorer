<template>

  <b-card
      v-if="transaction && transaction.request && transaction.response"
      class="shadow-sm hot-card-header"
      header-bg-variant="primary"
      header-tag="header">

    <template #header>
      <h6 class="mb-0"><b-badge variant="secondary" style="margin-right: 6px">0</b-badge>Transaction</h6>
    </template>

    <b-card-body>

<!--      <p v-if="hotmokaObject.state.updates.length === 0">Try with other object address</p>-->

<!--      <div v-if="hotmokaObject.rootObject">
        <div v-if="getAddressOfRootObject" class="text-left">
          <b-card-text class="header-updates no-margin-t-b">Object address</b-card-text>
          <p style="margin-bottom: 16px">{{getAddressOfRootObject}}</p>
        </div>

        <div v-if="hotmokaObject.rootObject.jar" class="text-left">
          <b-card-text class="header-updates no-margin-t-b">Jar address </b-card-text>
          <p style="margin-bottom: 0">{{ hotmokaObject.rootObject.jar.hash }}</p>
        </div>
      </div>-->


      <div class="accordion" role="tablist">

        <!-- value fields -->
        <b-card-text class="header-updates">Request</b-card-text>

<!--        <div
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
        </div>-->
        <!-- end value fields-->

        <!-- reference fields -->
        <b-card-text class="header-updates">Response</b-card-text>
<!--
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
        </div>-->
        <!-- end reference fields -->

      </div>
    </b-card-body>
  </b-card>

</template>

<script>
export default {
  name: "Transaction",
  props: {
    transaction: {
      request: Object,
      response: Object
    }
  }
}
</script>

<style scoped>

</style>