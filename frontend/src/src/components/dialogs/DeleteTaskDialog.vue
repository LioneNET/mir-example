<template>
  <div class="md">
    <div class="md-placeholder" @click="close">
      <div class="md-window" @click.stop>

        <div class="md-btn md-close-button" @click="close">
          <CloseGreyIcon/>
        </div>

        <h2>Удалить задачу?</h2>

        <div class="md-text">{{ settings.task.text }}</div>

        <div class="md-buttons">
          <div class="md-btn" @click="onDelete">Удалить</div>
          <div class="md-btn" @click="close">Отменить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseGreyIcon from "@/components/icons/CloseGreyIcon";

export default {
  name: "DeleteTaskDialog",

  components: {CloseGreyIcon},

  props: {
    settings: {
      type: Object
    },
    close: {
      type: Function
    }
  },

  methods: {
    onDelete() {
      this.settings.callback()
      this.close()
    }
  }
}
</script>

<style lang="sass">
.md
  &-placeholder
    left: 0
    top: 0
    right: 0
    bottom: 0
    position: absolute
    background-color: rgba(0, 0, 0, 0.6)
    display: flex
    align-items: center
    justify-content: center
    z-index: 999

  &-window
    position: relative
    max-width: 500px
    padding: 24px 40px
    border-radius: 8px
    background-color: white

  &-btn
    cursor: pointer
    user-select: none

    &:hover
      opacity: 0.7

  &-close-button
    position: absolute
    right: 24px
    top: 24px

  &-buttons
    display: flex
    justify-content: space-between

    .md-btn
      border: 1px solid #C4CAD4
      border-radius: 4px
      min-width: 202px
      padding: 9px 0
      text-align: center
      font-size: 14px

  &-text
    margin: 24px 0
    min-width: 420px
    font-size: 14px

</style>