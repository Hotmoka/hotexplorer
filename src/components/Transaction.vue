<template>

  <b-card
      v-if="transaction && transaction.request && transaction.response"
      class="shadow-sm hot-card-header"
      header-bg-variant="primary"
      header-tag="header">

    <template #header>
      <h6 class="mb-0">Transaction</h6>
    </template>

    <b-card-body>

      <div class="text-left" v-if="transaction.reference">
        <b-card-text class="header-updates no-margin-t-b">Transaction reference</b-card-text>
        <p style="margin-bottom: 16px">{{transaction.reference}}</p>
      </div>

      <div class="accordion" role="tablist">

        <!-- request -->
        <b-card-text class="header-updates">Request</b-card-text>

        <div>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted">
                Type: <code>{{ transaction.request.type }}</code>
              </b-button>
            </b-card-header>
          </b-card>
        </div>

        <div>
          <b-card no-body class="mb-1" v-if="transaction.request.transactionRequestModel.signature">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted">
                Signature: <code>{{ transaction.request.transactionRequestModel.signature }}</code>
              </b-button>
            </b-card-header>
          </b-card>
        </div>

        <div>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted">
                Gas price: <code>{{ transaction.request.transactionRequestModel.gasPrice || '0' }} Panarea</code>
              </b-button>
            </b-card-header>
          </b-card>
        </div>

        <div>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted">
                Gas limit: <code>{{ transaction.request.transactionRequestModel.gasLimit || '0'}} Panarea</code>
              </b-button>
            </b-card-header>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.classpath">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-classpath'">
                Classpath
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-classpath'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">

                    <div class="d-block text-left">
                      Reference <code class="storage-ref-code"
                                    @click="onTransactionClick(transaction.request.transactionRequestModel.classpath)">{{
                        transaction.request.transactionRequestModel.classpath.hash
                      }}</code>
                    </div>

                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.caller">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-caller'">
                Caller
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-caller'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">

                    <div class="d-block text-left">
                      Address <code class="storage-ref-code"
                                    @click="onAddressClick(transaction.request.transactionRequestModel.caller)">{{
                        transaction.request.transactionRequestModel.caller.transaction.hash
                      }}#{{
                        parseInt(transaction.request.transactionRequestModel.caller.progressive).toString(16)
                      }}</code>
                    </div>

                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.receiver">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-receiver'">
                Receiver
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-receiver'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">

                    <div class="d-block text-left">
                      Address <code class="storage-ref-code"
                                    @click="onAddressClick(transaction.request.transactionRequestModel.receiver)">{{
                        transaction.request.transactionRequestModel.receiver.transaction.hash
                      }}#{{
                        parseInt(transaction.request.transactionRequestModel.receiver.progressive).toString(16)
                      }}</code>
                    </div>

                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.method">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-method'">
                Method
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-method'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">

                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Name <br/><code>{{transaction.request.transactionRequestModel.method.methodName}}</code>
                    </div>

                  </div>

                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Defining class <br/> <code>{{transaction.request.transactionRequestModel.method.definingClass}}</code>
                    </div>

                  </div>

                  <div class="col-12">
                    <div class="d-block text-left">
                      Formals: [
                      <code v-for="(formal, index) in transaction.request.transactionRequestModel.method.formals" :key="index">
                        {{formal}}<span v-if="index < transaction.request.transactionRequestModel.method.formals.length - 1">, </span>
                      </code>
                      ]
                    </div>

                    <div class="d-block text-left">
                      Actuals: [
                      <code v-for="(actual, index) in transaction.request.transactionRequestModel.actuals" :key="index">
                        {{actual.value}}<span v-if="index < transaction.request.transactionRequestModel.actuals.length - 1">, </span>
                      </code>
                      ]
                    </div>

                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.constructorSignature">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-constructor'">
                Constructor
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-constructor'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">
                    <div class="d-block text-left">
                      Defining class <br/> <code>{{transaction.request.transactionRequestModel.constructorSignature.definingClass}}</code>
                    </div>

                    <div class="d-block text-left">
                      Formals: [
                      <code v-for="(formal, index) in transaction.request.transactionRequestModel.constructorSignature.formals" :key="index">
                        {{formal}}<span v-if="index < transaction.request.transactionRequestModel.constructorSignature.formals.length - 1">, </span>
                      </code>
                      ]
                    </div>

                    <div class="d-block text-left">
                      Actuals: [
                      <code v-for="(actual, index) in transaction.request.transactionRequestModel.actuals" :key="index">
                        {{actual.value}}<span v-if="index < transaction.request.transactionRequestModel.actuals.length - 1">, </span>
                      </code>
                      ]
                    </div>

                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.request.transactionRequestModel.dependencies">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-dependencies'">
                Dependencies
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-dependencies'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">

                    <div class="d-block text-left">
                      [
                      <code class="storage-ref-code" @click="onTransactionClick(dependency.hash)" v-for="(dependency, index) in transaction.request.transactionRequestModel.dependencies" :key="index">
                        {{dependency.hash}}<span v-if="index < transaction.request.transactionRequestModel.dependencies.length - 1">, </span>
                      </code>
                      ]
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <!-- end request-->

        <!-- response -->
        <b-card-text class="header-updates">Response</b-card-text>

        <div>
          <b-card no-body class="mb-1">

            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted">
                Type: <code>{{ transaction.response.type }}</code>
              </b-button>
            </b-card-header>

          </b-card>
        </div>

        <div>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block v-b-toggle="'collapsed-gas'" variant="light" class="highlighted">
                Total gas consumed: <code>{{ totalGasConsumed }} Panarea</code>
              </b-button>
            </b-card-header>

            <b-collapse :id="'collapsed-gas'" accordion="accordion-gas" role="tabpanel">
              <b-card-body class="text-center">

                <div class="row">
                  <div class="col-sm-6 col-xs-12">

                    <div class="d-block text-left">
                      Gas consumed for CPU: <code>{{
                        transaction.response.transactionResponseModel.gasConsumedForCPU || '0'
                      }} Panarea</code>
                    </div>

                    <div class="d-block text-left">
                      Gas consumed for RAM: <code>{{
                        transaction.response.transactionResponseModel.gasConsumedForRAM || '0'
                      }} Panarea</code>
                    </div>

                    <div class="d-block text-left">
                      Gas consumed for Storage:
                      <code>{{ transaction.response.transactionResponseModel.gasConsumedForStorage || '0' }}
                        Panarea</code>
                    </div>

                  </div>
                </div>

              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <div v-if="transaction.response.transactionResponseModel.dependencies">
          <b-card no-body class="mb-1" >
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block variant="light" class="highlighted" v-b-toggle="'collapsed-dependencies-response'">
                Dependencies
              </b-button>
            </b-card-header>
            <b-collapse :id="'collapsed-dependencies-response'" accordion="accordion-values" role="tabpanel">
              <b-card-body class="text-center">
                <div class="row">
                  <div class="col-12">

                    <div class="d-block text-left">
                      [
                      <code class="storage-ref-code" @click="onTransactionClick(dependency.hash)" v-for="(dependency, index) in transaction.response.transactionResponseModel.dependencies" :key="index">
                        {{dependency.hash}}<span v-if="index < transaction.response.transactionResponseModel.dependencies.length - 1">, </span>
                      </code>
                      ]
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <!-- end response -->

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
  },
  computed: {
    totalGasConsumed() {
      try {
        const { gasConsumedForStorage, gasConsumedForRAM, gasConsumedForCPU } = this.transaction.response.transactionResponseModel
        return parseInt(gasConsumedForStorage || '0') + parseInt(gasConsumedForRAM || '0') + parseInt(gasConsumedForCPU || '0')
      } catch (e) {
        return 0
      }
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
.card-body {
  padding: 0.75rem !important;
}
</style>