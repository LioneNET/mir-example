<template>
  <div>
    <div
        v-for="task in tasks"
        :key="task.id"
        :draggable="true"
        :data-task-id="task.id"
        :data-status-id="task.status_id"
    >
      <edit-block
          v-if="is_edit === task.id"
          edit-mode
          :item-data="task"
          @onApply="onApply"
          @onClose="onClose"
      />

      <div class="task" v-else>
        <div class="task-menu" @click.stop="e => showContextMenu(e, task.id)">
          <MenuIcon/>
        </div>
        <div class="task-body">{{ task.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuIcon from "@/components/icons/MenuIcon";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import {mapActions, mapGetters} from "vuex";
import {FN_DIALOGS, FN_STATUSES, FN_TASKS} from "@/store/consts";
import EditBlock from "@/components/EditBlock";

export default {
  name: "TaskItem",

  components: {EditBlock, DeleteIcon, EditIcon, MenuIcon},

  props: {
    tasks: {
      type: Array
    }
  },

  data() {
    return {
      is_edit: null
    }
  },

  computed: {
    ...mapGetters({
      taskData: FN_TASKS.GET_TASK_DATA
    })
  },

  methods: {
    ...mapActions({
      openDialog: FN_DIALOGS.ACTIONS_DIALOGS_OPEN,
      dialogsClose: FN_DIALOGS.ACTIONS_DIALOGS_CLOSE,
      updateTask: FN_TASKS.UPDATE_TASKS_DATA,
      fetchTask: FN_TASKS.FETCH_TASK_DATA,
      deleteTask: FN_TASKS.DELETE_TASKS_DATA,
      fetchStatuses: FN_STATUSES.FETCH_STATUSES_DATA,
    }),

    async onApply(data) {
      this.is_edit = null
      await this.updateTask({id: data.id, data: {text: data.text}})
      this.fetchStatuses()
    },

    onClose() {
      this.is_edit = null
    },

    async confirmDelete(id) {
      await this.fetchTask(id)
      this.openDialog({
        DeleteTaskDialog: {
          task: this.taskData.data,
          callback: async () => {
            await this.deleteTask(id)
            this.fetchStatuses()
          }
        }
      })
    },

    showContextMenu(e, id) {
      // если есть текущее, закрыть
      this.dialogsClose('EditContextMenuDialog')

      // открыть новое на следующем обновлении
      this.$nextTick(() => {
        this.openDialog({
          EditContextMenuDialog: {
            e,
            id,
            callback: (type) => {
              if (type === 'edit') {
                this.is_edit = id
              } else if (type === 'delete') {
                this.confirmDelete(id)
              }
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="sass">
.task
  position: relative
  -webkit-user-select: none
  -ms-user-select: none
  user-select: none
  cursor: grab

  &-menu
    position: absolute
    width: 20px
    height: 20px
    cursor: pointer
    top: 4px
    right: 4px
    stroke: #86949E

    &:hover
      stroke: #3D86F4

  &-body
    width: 100%
    padding: 8px
    border: 1px solid #C4CAD4
    border-radius: 4px
    font-size: 12px
    background-color: white
    margin-bottom: 3px
</style>