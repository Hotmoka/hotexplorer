<template>
  <div id="app">
    <Loader></Loader>

    <Header
        :isDev="isDev"
        :connected-node="connectedNode"
        @onConnectToNode="openConnectionModal"
        @onDisconnectFromNode="disconnectFromNode">
    </Header>

    <div class="container-fluid">

      <div class="d-sm-none connected-badge badge badge-success mobile-node-url" v-if="connectedNode.isConnected">
        <b-icon icon="globe"></b-icon> <span class="highlighted">{{ getRemoteNodeUrl }}</span>
      </div>

      <NodeConnection :isDev="isDev" @onConnectToNode="connectToToNode" ref="nodeConnectionModal"></NodeConnection>
      <Search @onSearch="search"></Search>

      <div class="row">
        <div class="col-sm-12 col-md-3">
          <Info
              id="hot-info"
              @onAddressSearch="searchByAddress"
              @onTransactionSearch="searchByTransaction"
              :nodeInfo="nodeInfo"
              :node-url="connectedNode.url">
          </Info>
        </div>
        <div class="col-sm-12 col-md-9">
          <Explorer
              id="hot-explorer"
              @onAddressSearch="searchByAddress"
              @onTransactionSearch="searchByTransaction"
              @onClearAddresses="clearAddresses"
              :explorer="explorer">
          </Explorer>
        </div>
      </div>

    </div>

    <b-alert v-model="errorAlert.show" variant="danger" dismissible class="position-fixed error-alert ">
      {{errorAlert.message}}
    </b-alert>
  </div>
</template>

<script>


import Search from "@/components/Search";
import Explorer from "@/components/Explorer";
import Info from "@/components/Info";
import Loader from "@/components/Loader"
import Header from "@/components/Header";
import NodeConnection from "@/components/NodeConnection";
import {
  buildBreadcrumbAddress, buildBreadcrumbTransactionAddress,
  dismissErrorAlert,
  EventBus, getRootObjectFrom,
  showErrorAlert,
  showSuccessToast
} from "@/internal/utils";
import {Service} from "@/internal/Service";

export default {
  name: 'App',
  components: {
    NodeConnection,
    Info,
    Search,
    Explorer,
    Loader,
    Header
  },
  data() {
   return {
     connectedNode: {
       connecting: false,
       isConnected: false,
       url: null
     },
     explorer: {
       hotmokaObject: {
         rootObject: null,
         state: null
       },
       transaction: {
         request: null,
         response: null,
         reference: null
       },
       addresses: []
     },
     nodeInfo: null,
     errorAlert: {
       message: '',
       show: false
     },
     isDev: false
   }
  },
  computed: {
    getRemoteNodeUrl() {
      return this.isDev && this.connectedNode.url === '' ? 'localhost' : this.connectedNode.url
    }
  },
  methods: {
    resetExplorer(addresses) {
      this.explorer = {
        hotmokaObject: {
          state: null,
          rootObject: null
        },
        transaction: {
          request: null,
          response: null,
          reference: null
        },
        addresses: addresses || []
      }
    },
    setTransaction(transaction) {
      this.explorer = {
        hotmokaObject: {
          state: null,
          rootObject: null
        },
        transaction: transaction,
        addresses: this.explorer.addresses
      }
    },
    setHotmokaObjectState(hotmokaObjectState) {
      this.explorer = {
        hotmokaObject: hotmokaObjectState,
        transaction: {
          request: null,
          response: null,
          reference: null
        },
        addresses: this.explorer.addresses
      }
    },
    breadcrumbIndexOf(breadcrumb) {
      return this.explorer.addresses.findIndex(address => address.id === breadcrumb.id)
    },
    setInactiveBreadcrumbs() {
      this.explorer.addresses.forEach(address => address.active = false)
    },
    clearAddresses() {
      if (this.explorer.addresses.length === 1) {
         this.resetExplorer()
      } else {
        this.explorer.addresses = this.explorer.addresses.filter(address => address.active)
      }
    },
    addBreadcrumbAddress(breadcrumbAddress) {
      if (breadcrumbAddress) {
        this.setInactiveBreadcrumbs()
        const index = this.breadcrumbIndexOf(breadcrumbAddress)
        if (index === -1) {
          this.explorer.addresses.push(breadcrumbAddress)
        } else {
          this.explorer.addresses[index].active = true
        }
      }
    },
    search(props) {
      if (props.searchType === 'address') {
        this.searchByAddress(props.address)
      } else if (props.searchType === 'transaction') {
        this.searchByTransaction(props.address)
      } else {
        showErrorAlert('Unknown operation')
      }
    },
    /**
     * It searches the transaction request and response.
     * @param transactionHash the transaction hash
     */
    searchByTransaction(transactionHash) {
      new Service()
          .searchByTransaction(transactionHash)
          .then(result => {
            this.setTransaction({
              request: result.request,
              response: result.response,
              reference: transactionHash
            })
            const breadcrumbAddress = buildBreadcrumbTransactionAddress(transactionHash)
            this.addBreadcrumbAddress(breadcrumbAddress)
          }).catch(err => showErrorAlert(err.message ?? 'Error while fetching object\'s state'))
    },
    /**
     * It retrieves the state of a hotmoka object by performing a search based on its address.
     * @param address the address of the object
     */
    searchByAddress(address) {
      new Service()
          .searchByAddress(address)
          .then(state => {
            this.setHotmokaObjectState({
              rootObject: getRootObjectFrom(state),
              state: state
            })
            const breadcrumbAddress = buildBreadcrumbAddress(this.explorer.hotmokaObject.rootObject)
            this.addBreadcrumbAddress(breadcrumbAddress)
          }).catch(err => showErrorAlert(err.message ?? 'Error while fetching object\'s state'))
    },
    /**
     * Retrieves the info of the remote node.
     * @callback an optional callback to be invoked after a successful response
     */
    getRemoteNodeInfo(callback) {
      new Service()
          .getRemoteNodeInfo()
          .then(info => {
            this.connectedNode.connecting = false
            this.connectedNode.isConnected = true
            this.nodeInfo = info

            if (callback) {
              callback()
            }
          })
          .catch(() => {
            this.connectedNode.connecting = false
            showErrorAlert('Cannot get node information')
          })
    },
    openConnectionModal() {
      this.$refs.nodeConnectionModal.showModal()
    },
    /**
     * It disconnects from the remote node.
     */
    disconnectFromNode() {
      localStorage.removeItem('node-url')
      this.$network.set(null)
      this.connectedNode = {
        url: null,
        isConnected: false,
        connecting: false
      }
      this.nodeInfo = null
      this.resetExplorer()

      dismissErrorAlert()
      showSuccessToast(this, 'Remote node', 'Disconnected successfully from the remote node')
    },
    /**
     * Connects to a remote node and retrieves the info of the node.
     * @param url the url
     * @param callback an optional callback to be invoked
     */
    connectToToNode(url, callback) {
      localStorage.setItem('node-url', url)
      this.$network.set(url)
      this.connectedNode.connecting = true
      this.connectedNode.url = url
      this.getRemoteNodeInfo(callback)
    }
  },
  created() {
    EventBus.$on('onErrorAlert', errorAlert => this.errorAlert = errorAlert)
  },
  mounted() {
    if (location.host.indexOf("localhost") !== -1) {
      this.isDev = true
    }

    let searchCallback = undefined

    // check for address or transaction in url
    if (this.$route && this.$route.query) {
      if (this.$route.query.address) {
        const address = this.$route.query.address + (this.$route.hash ? this.$route.hash : '')
        searchCallback = () => this.searchByAddress(address)
      } else if (this.$route.query.transaction) {
        searchCallback = () => this.searchByTransaction(this.$route.query.transaction)
      }
    }

    // connect to remote node
    const nodeUrl = localStorage.getItem('node-url')
    if (nodeUrl !== null) {
      this.connectToToNode(nodeUrl, searchCallback)
    } else if (searchCallback) {
      // by default we connect to panarea.hotmoka.io
      this.connectToToNode('http://panarea.hotmoka.io', searchCallback)
    }
  }
}
</script>

<style lang="scss">
$theme-colors: (
    "primary": #00BEBA
);
@import "~bootstrap/scss/bootstrap.scss";
@import '~bootstrap-vue/dist/bootstrap-vue.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f4f4;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  padding-bottom: 1.5rem;
}

code, .breadcrumb span, .breadcrumb a {
  word-break: break-word !important;
}

.breadcrumb {
  background-color: unset !important;
}

.h-breadcrumb-active {
  color: theme-color('primary') !important;
}

.h-breadcrumb-not-active a {
  color: #6c757d !important;
}

#hot-info {
  margin-top: 2rem;
}

#hot-explorer {
  margin-top: 2rem;
}

.mobile-node-url {
  width: 100%;
  margin-bottom: -3rem;
}

.margin-top-page {
  margin-top: 3.5rem !important;
}

.highlighted {
  font-weight: bold
}

.storage-ref-code {
  cursor: pointer !important;
  color: #0031ca !important;
}

.error-alert {
  bottom: 0;
  width: 100%;
  margin-bottom: 0!important;
}

.hot-card-header .card-header {
  color: #fff !important;
  font-weight: bolder;
}
.connected-badge {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.header-updates {
  text-align: left !important;
  color: rgba(0,0,0,.65) !important;
  font-weight: bold;
  margin-top: 1rem !important;
}

.no-margin-t-b {
  margin-top: 0!important;
  margin-bottom: 0!important;
}

</style>
