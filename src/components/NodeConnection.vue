<template >
  <div v-if="show">
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        v-model="show"
        title="Connection to Hotmoka node"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >

      <button @click="onPanareaHotmokaClick" type="button" class="mb-3 btn btn-info" style="width: 100%">Connect to <span class="highlighted">http://panarea.hotmoka.io</span></button>

      <p class="text-center">or to a custom node</p>

      <b-form-group
          :invalid-feedback="invalidFeedbackUrl"
          :state="stateUrl"
      >
        <b-form-input
            id="url-input"
            placeholder="Node url (with protocol)"
            v-model="url"
            :state="stateUrl"
            trim
        ></b-form-input>
      </b-form-group>

      <div v-if="isDev">
        <b-icon variant="secondary" icon="exclamation-circle-fill"></b-icon>
        <span style="font-size: 14px"> Pass "local" to connect to a local node (the url of the local node must be configured in vue.config.js as a proxy)</span>
      </div>

    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NodeConnection",
  props: {
    isDev: Boolean
  },
  data() {
    return {
      show: false,
      url: null,
      submittedNames: []
    }
  },
  computed: {
    stateUrl() {
      return this.url === null ? null : this.url.length > 0
    },
    invalidFeedbackUrl() {
      if (this.url === null) {
        return null
      }
      return 'Please enter a valid URL'
    }
  },
  methods: {
    showModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    },
    resetModal() {
      this.url = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      if (!this.stateUrl) {
        this.url = ''
        return
      }

      const remoteNodeUrl = this.isDev && this.url === 'local' ? '' : this.url
      this.closeModal()
      this.$emit('onConnectToNode', remoteNodeUrl)
    },
    onPanareaHotmokaClick() {
      this.closeModal()
      this.$emit('onConnectToNode', 'http://panarea.hotmoka.io')
    }
  }
}
</script>

<style scoped>

</style>