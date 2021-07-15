<template>
  <div id="app">
    <div v-if="showSpinner" id="loader" class="loader">Loading...</div>

    <b-navbar toggleable="lg" type="dark" variant="info" style="background-color: #fafafa !important;">
      <div class="container" style="height: 48px">
        <img alt="Vue logo" src="./assets/big_logo_hotmoka.png" height="48">
      </div>
    </b-navbar>

    <div class="container">
      <Search @onSearch="onSearch"></Search>
      <Explorer :state="state" ></Explorer>
    </div>
  </div>
</template>

<script>


import Search from "@/components/Search";
import Explorer from "@/components/Explorer";
import {RemoteNode, StorageReferenceModel, TransactionReferenceModel} from "hotweb3";

const remoteNode = new RemoteNode('http://panarea.hotmoka.io')

export default {
  name: 'App',
  components: {
    Search,
    Explorer
  },
  data() {
   return {
     state: null,
     showSpinner: false
   }
  },
  methods: {
    onSearch(objectAddress) {
      const hash = objectAddress.indexOf('#') > -1 ? objectAddress.split('#')[0] : objectAddress
      const progressive = objectAddress.indexOf('#') > -1 ? objectAddress.split('#')[1] : '0'

      this.showSpinner = true
      remoteNode.getState(new StorageReferenceModel(new TransactionReferenceModel('local', hash), progressive))
      .then(state => {
        this.showSpinner = false
        this.state = state
      }).catch(err => {
        this.showSpinner = false
        alert(err.message)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.margin-top-page {
  margin-top: 3.5rem !important;
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
  transform: translateZ(0);
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
