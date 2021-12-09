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
                Reference <code class="storage-ref-code" @click="onTransactionClick(nodeInfo.takamakaCode.hash)">{{ nodeInfo.takamakaCode.hash }}</code>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end manifest -->

      <!-- manifest -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header" v-if="nodeInfo.manifest">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-manifest'" variant="primary" class="highlighted">
            Manifest
          </b-button>
        </b-card-header>

        <b-collapse :id="'collapsed-reference-manifest'" accordion="accordion-manifest" role="tabpanel">
          <b-card-body class="text-left">

            <div class="row section-info">
              <div class="col-xs-12 section-data" v-if="nodeInfo.manifest.transaction">
                Address <code class="storage-ref-code"
                              @click="onAddressClick(nodeInfo.manifest)">{{nodeInfo.manifest.transaction.hash}}#{{parseInt(nodeInfo.manifest.progressive).toString(16)}}</code>
              </div>

              <div class="col-xs-12 section-data" v-if="nodeInfo.chainId">
                ChainId <code>{{nodeInfo.chainId}}</code>
              </div>

              <div class="col-xs-12 section-data" v-if="nodeInfo.signature">
                Signature <code>{{nodeInfo.signature}}</code>
              </div>

              <div class="col-xs-12">
                Faucet <code>{{nodeInfo.allowsUnsignedFaucet || 'false'}}</code>
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

              <div class="col-xs-12 section-data">
                Balance <code>{{nodeInfo.gameteInfo.balanceOfGamete || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Red balance <code>{{nodeInfo.gameteInfo.redBalance || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Max Faucet <code>{{nodeInfo.gameteInfo.maxFaucet || '0'}}</code>
              </div>

              <div class="col-xs-12">
                Max Red Faucet <code>{{nodeInfo.gameteInfo.maxRedFaucet || '0'}}</code>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end gamete -->

      <!-- gas station -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header" v-if="nodeInfo.gasStation">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-gasStation'" variant="primary" class="highlighted">
            Gas station
          </b-button>
        </b-card-header>
        <b-collapse :id="'collapsed-reference-gasStation'" accordion="accordion-gasStation" role="tabpanel">
          <b-card-body class="text-left">
            <div class="row section-info">
              <div class="col-xs-12 section-data" v-if="nodeInfo.gasStation.gasStation">
                Address <code class="storage-ref-code"
                              @click="onAddressClick(nodeInfo.gasStation.gasStation)">{{nodeInfo.gasStation.gasStation.transaction.hash}}#{{parseInt(nodeInfo.gasStation.gasStation.progressive).toString(16)}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Gas price <code>{{nodeInfo.gasStation.gasPrice || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
               Max gas per transaction <code>{{nodeInfo.gasStation.maxGasPerTransaction || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Target gas at reward <code>{{nodeInfo.gasStation.targetGasAtReward || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Inflation <code>{{nodeInfo.gasStation.inflation || '0'}} (ie. {{ nodeInfo.gasStation.inflationInfo || '0%' }}) </code>
              </div>

              <div class="col-xs-12">
                Oblivion <code>{{nodeInfo.gasStation.oblivion || '0'}} (ie. {{ nodeInfo.gasStation.oblivionInfo || '0%' }})</code>
              </div>

            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end gas station -->

      <!-- validators -->
      <b-card no-body class="mb-1 shadow-sm hot-card-header" v-if="nodeInfo.validators">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle="'collapsed-reference-validators'" variant="primary" class="highlighted">
            Validators
          </b-button>
        </b-card-header>
        <b-collapse :id="'collapsed-reference-validators'" accordion="accordion-gasStation" role="tabpanel">
          <b-card-body class="text-left">
            <div class="row section-info">
              <div class="col-xs-12 section-data" v-if="nodeInfo.validators.validatorsReference">
                Address <code class="storage-ref-code"
                              @click="onAddressClick(nodeInfo.validators.validatorsReference)">{{nodeInfo.validators.validatorsReference.transaction.hash}}#{{parseInt(nodeInfo.validators.validatorsReference.progressive).toString(16)}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Number of validators <code>{{nodeInfo.validators.numOfValidators}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Total supply <code>{{nodeInfo.validators.totalSupply}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Total supply red <code>{{nodeInfo.validators.totalSupplyRed || '0'}}</code>
              </div>

              <div class="col-xs-12 section-data">
                Height <code>{{nodeInfo.validators.height}}</code>
              </div>

              <div class="col-xs-12">
                Number of transactions <code>{{nodeInfo.validators.numberOfTransactions}}</code>
              </div>

            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <!--end validators -->

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
      const address = objectAddress.transaction.hash + '#' + parseInt(objectAddress.progressive).toString(16)
      this.$emit('onAddressSearch', address)
    },
    onTransactionClick(transaction) {
      this.$emit('onTransactionSearch', transaction)
    },
  }
}
</script>

<style scoped>

.section-info {
  padding: 0 0.75rem 0 0.75rem;
}

.section-data {
  width: 100%;
  margin-bottom: 6px;
}
</style>