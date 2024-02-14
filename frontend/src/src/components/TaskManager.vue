<template>
  <div class="status">
    <div
        class="status-block"
        v-for="status in statusesData.data"
        :key="status.id"
        @dragenter="() => dragEnter(status.id)"
        @dragend="dragEnd"
    >
      <div class="status-title" :style="`background-color: ${status.color}`">{{ status.name }}</div>
      <div class="status-body">

        <task-item :tasks="status.tasks" />

        <edit-block :statusId="status.id" @onApply="editApply"/>
      </div>
    </div>
  </div>
</template>

<script>
import {FN_STATUSES, FN_TASKS} from "@/store/consts";
import {mapActions, mapGetters} from "vuex";
import EditBlock from "@/components/EditBlock";
import TaskItem from "@/components/TaskItem";

export default {
  name: "TaskManager",
  components: {TaskItem, EditBlock},
  data() {
    return {
      loading: false,
      target_status_id: null
    }
  },

  computed: {
    ...mapGetters({
      statusesData: FN_STATUSES.GET_STATUSES_DATA,
      tasksData: FN_TASKS.GET_TASKS_DATA,
    })
  },

  methods: {
    ...mapActions({
      fetchStatuses: FN_STATUSES.FETCH_STATUSES_DATA,
      storeTask: FN_TASKS.STORE_TASKS_DATA,
      changeTaskStatus: FN_TASKS.CHANGE_TASK_STATUS,
    }),

    dragEnter(status_id) {
      this.target_status_id = status_id
    },

    async dragEnd(e) {
      const {statusId, taskId} = e.target.dataset
      if (this.target_status_id != statusId) {
        await this.changeTaskStatus({id: taskId, data: {status_id: this.target_status_id}})
        this.fetchStatuses()
      }
    },

    async editApply(data) {
      if (!data.text) {
        return;
      }
      this.loading = true
      await this.storeTask(data)
      await this.fetchStatuses()
      this.loading = false

    },

    async initForm() {
      this.loading = true

      await Promise.all([
        this.fetchStatuses()
      ])

      this.loading = false;
    },
  },

  mounted() {
    this.initForm()
  }
}
</script>

<style lang="sass">
.status
  max-width: 920px
  margin: 0 auto
  height: 95vh
  display: flex
  justify-content: start

  &-block
    width: 177px
    margin-right: 8px
    border: 1px solid #E3E5E8
    background-color: #F7F7F7
    border-radius: 8px
    display: flex
    flex-direction: column


  &-title
    text-align: center
    padding: 7px 0
    color: #1C2530
    font-size: 14px
    font-weight: bold
    border-radius: 8px 8px 0 0

  &-body
    padding: 8px
    overflow: hidden
    overflow-y: auto

</style>