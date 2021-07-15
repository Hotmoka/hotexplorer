<template>
  <div v-if="this.state" class="mg-t p-b">
    <b-card title="Updates">
      <b-card-body>

        <b-list-group>
          <div
              v-for="(update, index) in this.state.updates"
              :key="index"
              >
            <b-list-group-item
                v-if="update.field && update.field.name">
              {{update.field.name}}
            </b-list-group-item>

          </div>

        </b-list-group>

      </b-card-body>
    </b-card>


  </div>
</template>

<script>
import {StateModel} from "hotweb3";

export default {
  name: "Explorer",
  props: {
    state: StateModel
  }
}
</script>

<style scoped>
.mg-t {
  margin-top: 2rem;
}

.p-b {
  padding-bottom: 2rem;
}
</style>