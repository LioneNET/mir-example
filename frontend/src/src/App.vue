<template>
  <div id="app">
    <TaskManager />
    <DialogRegister />
  </div>
</template>

<script>
import TaskManager from "@/components/TaskManager";
import DialogRegister from "@/components/dialogs/DialogRegister";
export default {
  name: 'App',
  components: {DialogRegister, TaskManager},

  methods: {
    onClickOutside() {
      this.$root.$emit('onClickOutside')
    }
  },

  mounted() {
    document.body.addEventListener('click', () => this.onClickOutside())
  }
}
</script>

<style>

</style>
