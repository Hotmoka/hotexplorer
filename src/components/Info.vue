<template>
  <div v-if="nodeInfo">

    <b-breadcrumb v-if="nodeUrl">
      <b-breadcrumb-item
          :active="true"
          href="#"
      >
        Node {{ nodeUrl }}
      </b-breadcrumb-item>
    </b-breadcrumb>


    <div class="accordion" role="tablist">

      <!-- takamakacode -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header" v-if="nodeInfo.takamakaCode">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-takamakacode'" variant="primary" class="highlighted">
            TakamakaCode
          </b-button>
        </b-card-header>
        <b-collapse :id="'collapsed-reference-takamakacode'" accordion="accordion-takamakacode" role="tabpanel">
          <b-card-body class="text-left">
            <div class="row section-info">
              <div class="col-xs-12">
                Address <code>{{ nodeInfo.takamakaCode.hash }}</code>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end manifest -->

      <!-- manifest -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-manifest'" variant="primary" class="highlighted">
            Manifest
          </b-button>
        </b-card-header>

        <b-collapse :id="'collapsed-reference-manifest'" accordion="accordion-manifest" role="tabpanel">
          <b-card-body class="text-left">

            <div class="row section-info">
              <div class="col-xs-12 section-data" v-if="nodeInfo.manifest && nodeInfo.manifest.transaction">
                Address <code class="storage-ref-code"
                              @click="onAddressClick(nodeInfo.manifest)">{{nodeInfo.manifest.transaction.hash}}#{{parseInt(nodeInfo.manifest.progressive).toString(16)}}</code>
              </div>

              <div class="col-xs-12 section-data" v-if="nodeInfo.chainId">
                ChainId <code>{{nodeInfo.chainId}}</code>
              </div>

              <div class="col-xs-12" v-if="nodeInfo.signature">
                Signature <code>{{nodeInfo.signature}}</code>
              </div>
            </div>
          </b-card-body>
        </b-collapse>

      </b-card>
      <!--end manifest -->

      <!-- gamete -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header" v-if="nodeInfo.gameteInfo">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-gamete'" variant="primary" class="highlighted">
            Gamete
          </b-button>
        </b-card-header>
        <b-collapse :id="'collapsed-reference-gamete'" accordion="accordion-gamete" role="tabpanel">
          <b-card-body class="text-left">
            <div class="row section-info">
              <div class="col-xs-12 section-data" v-if="nodeInfo.gameteInfo.gamete">
                Address <code class="storage-ref-code"
                              @click="onAddressClick(nodeInfo.gameteInfo.gamete)">{{nodeInfo.gameteInfo.gamete.transaction.hash}}#{{parseInt(nodeInfo.gameteInfo.gamete.progressive).toString(16)}}</code>
              </div>

              <div class="col-xs-12 section-data" v-if="nodeInfo.gameteInfo.balanceOfGamete">
                Balance <code>{{nodeInfo.gameteInfo.balanceOfGamete}}</code>
              </div>

              <div class="col-xs-12 section-data" v-if="nodeInfo.gameteInfo.redBalance">
                Red balance <code>{{nodeInfo.gameteInfo.redBalance}}</code>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end gamete -->

    </div>
  </div>
</template>

<script>
import {InfoModel} from "hotweb3";

export default {
  name: "Info",
  props: {
    nodeInfo: InfoModel,
    nodeUrl: null
  },
  methods: {
    onAddressClick(objectAddress) {
      const stringObjectAddress = objectAddress.transaction.hash + '#' + parseInt(objectAddress.progressive).toString(16)
      this.$emit('onSearch', stringObjectAddress)
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  background-color: unset !important;
}

.section-info {
  padding: 0 0.75rem 0 0.75rem;
}

.section-data {
  width: 100%;
  margin-bottom: 6px;
}
</style>