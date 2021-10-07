<template>
  <div v-if="showSpinner" id="loader" class="loader">Loading...</div>
</template>

<script>
import {EventBus} from "@/internal/utils";

export default {
  name: "Loader",
  data() {
    return {
      showSpinner: false
    }
  },
  created() {
    EventBus.$on('showSpinner', showSpinner => this.showSpinner = showSpinner)
  }
}
</script>

<style scoped lang="scss">

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