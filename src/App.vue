<template>
  <div id="app">
    <div v-if="showSpinner" id="loader" class="loader">Loading...</div>

    <b-navbar toggleable="lg" type="dark" variant="info" style="background-color: #fff !important;">
      <div class="container" style="height: 48px">
        <img alt="Vue logo" src="./assets/big_logo_hotmoka.png" height="48">

        <b-button v-if="!connectedNode.isConnected" variant="outline-primary" @click="onConnectToNodeClick">Connect to node</b-button>
        <span class="connected-badge badge badge-primary" v-if="connectedNode.isConnected">Connected to <span class="highlighted">{{ connectedNode.url }}</span></span>
      </div>
    </b-navbar>

    <div class="container-fluid">
      <NodeConnection @connectToToNode="connectToToNode" ref="nodeConnectionModal"></NodeConnection>
      <Search @onSearch="onSearchFromRoot"></Search>
      <div class="row">
        <div class="col-sm-12 col-md-3">
          <Info id="hot-info" @onSearch="onSearch" :nodeInfo="nodeInfo" :node-url="connectedNode.url"></Info>
        </div>
        <div class="col-sm-12 col-md-9">
          <Explorer id="hot-explorer" @onSearch="onSearch" :explorer="explorer"></Explorer>
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
import NodeConnection from "@/components/NodeConnection";
import {RemoteNode, StorageReferenceModel, TransactionReferenceModel} from "hotweb3";

let remoteNode = null

export default {
  name: 'App',
  components: {
    NodeConnection,
    Info,
    Search,
    Explorer
  },
  data() {
   return {
     connectedNode: {
       isConnected: false,
       url: null
     },
     explorer: {
       state: null,
       addresses: [],
       rootObject: null
     },
     nodeInfo: null,
     showSpinner: false,
     errorAlert: {
       message: '',
       show: false
     }
   }
  },
  methods: {
    getRootObjectFrom(state) {
      const rootObject = state.updates.filter(update => update.className !== undefined && update.className !== null)
      return rootObject.length > 0 ? rootObject[0] : null
    },
    buildBreadcrumbAddress(rootAddress) {
      if (rootAddress) {
        let className = ''
        if (rootAddress.className && rootAddress.className.length > 0) {
          if (rootAddress.className.indexOf('.') !== -1) {
            className += ' (' + rootAddress.className.substring(rootAddress.className.lastIndexOf('.') + 1, rootAddress.className.length) + ')'
          } else {
            className += ' (' + rootAddress.className + ')'
          }
        }
        const address = rootAddress.object.transaction.hash + '#' + parseInt(rootAddress.object.progressive).toString(16)
        return {
          text: address + className,
          active: true,
          href: '#',
          id: address
        }
      }
      return null
    },
    breadcrumbIndexOf(breadcrumb) {
      return this.explorer.addresses.findIndex(address => address.id === breadcrumb.id)
    },
    setInactiveBreadcrumbs() {
      this.explorer.addresses.forEach(address => address.active = false)
    },
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
      const progressive = objectAddress.indexOf('#') > -1 ? parseInt(objectAddress.split('#')[1], 16) : '0'

      this.beforeHttpCall()
      remoteNode.getState(new StorageReferenceModel(new TransactionReferenceModel('local', hash), progressive))
      .then(state => {
        this.showSpinner = false
        this.explorer.rootObject = this.getRootObjectFrom(state)
        const breadcrumbAddress = this.buildBreadcrumbAddress(this.explorer.rootObject)
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
      }).catch(this.onErrorHttpCall)
    },
    getRemoteNodeInfo() {
      this.showSpinner = true
      remoteNode.info().then(info => {
        this.showSpinner = false
        this.nodeInfo = info
      }).catch(this.onErrorHttpCall)
    },
    onSearchFromRoot(objectAddress) {
      this.explorer.state = null
      this.explorer.addresses = [...this.explorer.addresses]
      this.explorer.rootObject = null
      this.onSearch(objectAddress)
    },
    beforeHttpCall() {
      this.errorAlert.show = false
      this.showSpinner = true
    },
    onErrorHttpCall(err) {
      this.showSpinner = false
      this.errorAlert.message = err.message ?? 'Error while fetching object\'s state'
      this.errorAlert.show = true
    },
    onConnectToNodeClick() {
      this.$refs.nodeConnectionModal.showModal()
    },
    connectToToNode(url) {
      localStorage.setItem('node-url', url)
      remoteNode = new RemoteNode(url)
      this.afterNodeConnection(url)
    },
    afterNodeConnection(url) {
      this.connectedNode.url = url
      this.connectedNode.isConnected = true
      this.getRemoteNodeInfo()
    }
  },
  mounted() {
    const nodeUrl = localStorage.getItem('node-url')
    if (nodeUrl !== null) {
      remoteNode = new RemoteNode(nodeUrl)
      this.afterNodeConnection(nodeUrl)
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

code  {
  word-break: break-word !important;
}

.breadcrumb span{
  word-break: break-word !important;
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

.loader {
  position: absolute !important;
  top: 40%;
  left: 50%;
  transform: translate(0, -50%);
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  z-index: 10;
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #00ffe1, 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.5), -1.8em -1.8em 0 0em rgba(0,255,225, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.7), 1.8em -1.8em 0 0em #00ffe1, 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.5), 1.8em -1.8em 0 0em rgba(0,255,225, 0.7), 2.5em 0em 0 0em #00ffe1, 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.5), 2.5em 0em 0 0em rgba(0,255,225, 0.7), 1.75em 1.75em 0 0em #00ffe1, 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.5), 1.75em 1.75em 0 0em rgba(0,255,225, 0.7), 0em 2.5em 0 0em #00ffe1, -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.5), 0em 2.5em 0 0em rgba(0,255,225, 0.7), -1.8em 1.8em 0 0em #00ffe1, -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.5), -1.8em 1.8em 0 0em rgba(0,255,225, 0.7), -2.6em 0em 0 0em #00ffe1, -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.5), -2.6em 0em 0 0em rgba(0,255,225, 0.7), -1.8em -1.8em 0 0em #00ffe1;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #00ffe1, 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.5), -1.8em -1.8em 0 0em rgba(0,255,225, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.7), 1.8em -1.8em 0 0em #00ffe1, 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.5), 1.8em -1.8em 0 0em rgba(0,255,225, 0.7), 2.5em 0em 0 0em #00ffe1, 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.5), 2.5em 0em 0 0em rgba(0,255,225, 0.7), 1.75em 1.75em 0 0em #00ffe1, 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.5), 1.75em 1.75em 0 0em rgba(0,255,225, 0.7), 0em 2.5em 0 0em #00ffe1, -1.8em 1.8em 0 0em rgba(0,255,225, 0.2), -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.5), 0em 2.5em 0 0em rgba(0,255,225, 0.7), -1.8em 1.8em 0 0em #00ffe1, -2.6em 0em 0 0em rgba(0,255,225, 0.2), -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.5), -1.8em 1.8em 0 0em rgba(0,255,225, 0.7), -2.6em 0em 0 0em #00ffe1, -1.8em -1.8em 0 0em rgba(0,255,225, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(0,255,225, 0.2), 1.8em -1.8em 0 0em rgba(0,255,225, 0.2), 2.5em 0em 0 0em rgba(0,255,225, 0.2), 1.75em 1.75em 0 0em rgba(0,255,225, 0.2), 0em 2.5em 0 0em rgba(0,255,225, 0.2), -1.8em 1.8em 0 0em rgba(0,255,225, 0.5), -2.6em 0em 0 0em rgba(0,255,225, 0.7), -1.8em -1.8em 0 0em #00ffe1;
  }
}


</style>
