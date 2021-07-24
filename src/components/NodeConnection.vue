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

      <button @click="onPanareaHotmokaClick" type="button" class="mb-3 btn btn-info" style="width: 100%">Connect to <span class="highlighted">panarea.hotmoka.io</span></button>
      <p class="text-center">or to a custom node</p>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            invalid-feedback="Url must not be empty"
            :state="urlState"
        >
          <b-form-input
              id="url-input"
              placeholder="Node url"
              v-model="url"
              :state="urlState"
              required
          ></b-form-input>
        </b-form-group>
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
      submittedNames: []
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
      this.closeModal()
      this.$emit('connectToToNode', this.url)
    },
    onPanareaHotmokaClick() {
      this.closeModal()
      this.$emit('connectToToNode', 'http://panarea.hotmoka.io')
    }
  }
}
</script>

<style scoped>

</style>