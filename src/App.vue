<template>
  <div id="app">
    <Loader></Loader>

    <b-navbar toggleable="lg" type="dark" variant="info" style="background-color: #fff !important;">
      <div class="container" style="height: 48px">
        <img id="hotmoka-logo" alt="Vue logo" src="./assets/big_logo_hotmoka.png" height="48" @click="goHome">

        <b-button v-if="!connectedNode.isConnected && !connectedNode.connecting" variant="outline-primary" @click="onConnectToNodeClick">Connect to node</b-button>
        <div style="display: flex; align-items: center" v-if="connectedNode.isConnected">
          <div class="d-none d-sm-block connected-badge badge badge-success">
            <b-icon icon="globe"></b-icon> <span class="highlighted">{{ getRemoteNodeUrl }}</span>
          </div>
          <b-icon class="exit-icon" variant="danger" icon="power" @click="onDisconnectNodeClick"></b-icon>
        </div>
      </div>
    </b-navbar>

    <div class="container-fluid">

      <div class="d-sm-none connected-badge badge badge-success mobile-node-url" v-if="connectedNode.isConnected">
        <b-icon icon="globe"></b-icon> <span class="highlighted">{{ getRemoteNodeUrl }}</span>
      </div>

      <NodeConnection @onConnectToNode="connectToToNode" ref="nodeConnectionModal"></NodeConnection>
      <Search @onSearch="onSearchFromRoot"></Search>
      <div class="row">
        <div class="col-sm-12 col-md-3">
          <Info id="hot-info" @onSearch="onSearch" :nodeInfo="nodeInfo" :node-url="connectedNode.url"></Info>
        </div>
        <div class="col-sm-12 col-md-9">
          <Explorer id="hot-explorer" @onSearch="onSearch" @onClearAddresses="clearAddresses" :explorer="explorer"></Explorer>
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
import NodeConnection from "@/components/NodeConnection";
import {RemoteNode, StorageReferenceModel} from "hotweb3";
import {buildBreadcrumbAddress, showSuccessToast, WrapPromiseTask} from "@/internal/utils";

let remoteNode = null

export default {
  name: 'App',
  components: {
    NodeConnection,
    Info,
    Search,
    Explorer,
    Loader
  },
  data() {
   return {
     connectedNode: {
       connecting: false,
       isConnected: false,
       url: null
     },
     explorer: {
       state: null,
       addresses: [],
       rootObject: null
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
    showErrorAlert(message) {
      this.errorAlert = {
        message: message,
        show: true
      }
    },
    dismissErrorAlert() {
      this.errorAlert = {
        show: false,
        message: ''
      }
    },
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.replace({ path: '/' });
      }
      this.$router.go()
    },
    getRootObjectFrom(state) {
      const rootObject = state.updates.filter(update => update.className !== undefined && update.className !== null)
      return rootObject.length > 0 ? rootObject[0] : null
    },
    breadcrumbIndexOf(breadcrumb) {
      return this.explorer.addresses.findIndex(address => address.id === breadcrumb.id)
    },
    setInactiveBreadcrumbs() {
      this.explorer.addresses.forEach(address => address.active = false)
    },
    clearAddresses() {
      this.explorer.addresses = this.explorer.addresses.filter(address => address.active)
    },
    onSearchFromRoot(objectAddress) {
      this.explorer.state = null
      this.explorer.addresses = [...this.explorer.addresses]
      this.explorer.rootObject = null
      this.onSearch(objectAddress)
    },
    /**
     * It retrieves the state of an object.
     * @param objectAddress the address of the object
     */
    onSearch(objectAddress) {
      if (remoteNode === null) {
        this.errorAlert = {
          message: 'Not connected to remote node',
          show: true
        }
        return
      }
      if (!objectAddress) {
        this.errorAlert = {
          message: 'Invalid Object address',
          show: true
        }
        return
      }
      const hash = objectAddress.indexOf('#') > -1 ? objectAddress.split('#')[0] : objectAddress

      this.dismissErrorAlert()
      WrapPromiseTask(() => remoteNode.getState(StorageReferenceModel.newStorageReference(hash)))
        .then(state => {
          this.explorer.rootObject = this.getRootObjectFrom(state)
          const breadcrumbAddress = buildBreadcrumbAddress(this.explorer.rootObject)
          if (breadcrumbAddress) {
            this.setInactiveBreadcrumbs()
            const index = this.breadcrumbIndexOf(breadcrumbAddress)
            if (index === -1) {
              this.explorer.addresses.push(breadcrumbAddress)
            } else {
              this.explorer.addresses[index].active = true
            }
          }
          this.explorer.state = state
        })
        .catch(err => this.showErrorAlert(err.message ?? 'Error while fetching object\'s state'))
    },
    /**
     * Retrieves the info of the remote node.
     * @callback an optional callback to be invoked after a successful response
     */
    getRemoteNodeInfo(callback) {
      this.dismissErrorAlert()
      WrapPromiseTask(() => remoteNode.info())
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
          this.showErrorAlert('Cannot get node information')
        })
    },
    onConnectToNodeClick() {
      this.$refs.nodeConnectionModal.showModal()
    },
    /**
     * It disconnects from the remote node.
     */
    onDisconnectNodeClick() {
      localStorage.removeItem('node-url')
      this.connectedNode = {
        url: null,
        isConnected: false,
        connecting: false
      }
      this.explorer = {
        state: null,
        addresses: [],
        rootObject: null
      }
      this.nodeInfo = null
      this.dismissErrorAlert()
      remoteNode = null

      showSuccessToast(this, 'Remote node', 'Disconnected successfully from remote node')
    },
    /**
     * Connects to a remote node and retrieves the info of the node.
     * @param url the url
     * @param callback an optional callback to be invoked
     */
    connectToToNode(url, callback) {
      localStorage.setItem('node-url', url)
      remoteNode = new RemoteNode(url)
      this.connectedNode.connecting = true
      this.connectedNode.url = url
      this.getRemoteNodeInfo(callback)
    }
  },
  created() {

    if (location.host.indexOf("localhost") !== -1) {
      this.isDev = true
    }

    let searchAddressCallback = undefined

    // check for address in url
    if (this.$route && this.$route.query && this.$route.query.address) {
      const objectAddress = this.$route.query.address
      searchAddressCallback = () => this.onSearchFromRoot(objectAddress)
    }

    // connect to remote node
    const nodeUrl = localStorage.getItem('node-url')
    if (nodeUrl !== null) {
      this.connectToToNode(nodeUrl, searchAddressCallback)
    } else if (searchAddressCallback) {
      // by default we connect to panarea.hotmoka.io
      this.connectToToNode('http://panarea.hotmoka.io', searchAddressCallback)
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

#hotmoka-logo {
  cursor: pointer;
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

.mobile-node-url {
  width: 100%;
  margin-bottom: -3rem;
}

.exit-icon {
  width: 32px; height: 32px;
  margin-left: 12px;
  cursor: pointer;
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


</style>
