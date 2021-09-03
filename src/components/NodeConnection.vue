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
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            invalid-feedback="Url must not be empty"
            :state="urlState"
        >
          <b-form-input
              id="url-input"
              placeholder="Node url (with protocol)"
              v-model="url"
              :state="urlState"
              required
          ></b-form-input>
        </b-form-group>
        <div v-if="isDev"><b-icon variant="secondary" icon="exclamation-circle-fill"></b-icon>
          <span style="font-size: 14px"> Pass local to connect to a local node (the url must be configured in vue.config.js as a proxy)</span></div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NodeConnection",
  data() {
    return {
      show: false,
      url: '',
      urlState: null,
      submittedNames: [],
      isDev: false
    }
  },
  methods: {
    showModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.urlState = valid
      return valid
    },
    resetModal() {
      this.url = ''
      this.urlState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      const remoteNodeUrl = this.isDev && this.url.trim() === 'local' ? '' : this.url.trim()
      this.closeModal()
      this.$emit('onConnectToNode', remoteNodeUrl)
    },
    onPanareaHotmokaClick() {
      this.closeModal()
      this.$emit('onConnectToNode', 'http://panarea.hotmoka.io')
    }
  },
  created() {
    if (location.host.indexOf("localhost") !== -1) {
      this.isDev = true
    }
  }
}
</script>

<style scoped>

</style>