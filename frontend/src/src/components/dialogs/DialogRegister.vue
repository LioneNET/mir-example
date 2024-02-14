<template>
  <div>
    <template v-for="componentName in getComponents">
      <component
          :key="componentName"
          :is="componentName"
          v-if="dialogData[componentName]"
          :settings="dialogData[componentName]"
          :close="() => dialogsClose(componentName)"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FN_DIALOGS } from "@/store/consts";
import EditContextMenuDialog from "@/components/dialogs/EditContextMenuDialog";
import DeleteTaskDialog from "@/components/dialogs/DeleteTaskDialog";

export default {
  name: "DialogRegister",

  components: {
    EditContextMenuDialog,
    DeleteTaskDialog
  },

  computed: {
    ...mapGetters({
      dialogData: FN_DIALOGS.GET_DIALOGS,
    }),

    getComponents() {
      return Object.keys(this.$options.components)
          .filter(i => i !== this.$options.name)
          .filter(i => i.toLowerCase().includes('dialog'))
          .map(i => this.$options.components[i].name)
    }
  },

  methods: {
    ...mapActions({
      dialogsClose: FN_DIALOGS.ACTIONS_DIALOGS_CLOSE,
    }),
  },
};
</script>