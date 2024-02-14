<template>
  <div class="edit">
    <template v-if="showIsEdit">
      <div class="btn-place">
        <div class="icon-btn" @click="editClose">
          <CloseIcon />
        </div>
        <div class="icon-btn" @click="editApply">
          <CheckIcon />
        </div>
      </div>
      <textarea v-model="text" rows="2" @input="editProcess"></textarea>
    </template>

    <div v-if="showAddBtn" class="task-add-btn" @click="show_is_edit = true">+ Добавить</div>
  </div>
</template>

<script>
import CloseIcon from "@/components/icons/CloseIcon";
import CheckIcon from "@/components/icons/CheckIcon";
export default {
  name: "EditBlock",

  props: {
    statusId: {
      type: Number
    },
    itemData: {
      type: Object
    }
  },

  components: {CheckIcon, CloseIcon},

  data() {
    return {
      show_is_edit: false,
      text: ''
    }
  },

  mounted() {
    if (this.itemData) {
      this.text = this.itemData.text
      this.show_is_edit = true
    }
  },

  computed: {
    showIsEdit() {
      if (this.itemData) {
        return true
      }

      return this.show_is_edit
    },

    showAddBtn() {
      if (this.itemData) {
        return false
      }

      return !this.show_is_edit
    }
  },

  methods: {
    editProcess(event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 5 + 'px';
    },

    editClose() {
      this.show_is_edit = false
      this.$emit('onClose')
    },

    editApply() {
      this.$emit('onApply', {
        ...this.itemData && {id: this.itemData.id},
        status_id: this.statusId,
        text: this.text
      })
      this.show_is_edit = false
    }
  }
}
</script>

<style lang="sass">
.edit
  position: relative

  .btn-place
    position: absolute
    top: 4px
    right: 4px
    width: 20px

    .icon-btn
      width: 20px
      height: 20px
      margin-bottom: 2px
      cursor: pointer
      &:hover
        opacity: 0.8


  textarea
    width: 100%
    padding: 8px
    padding-right: 22px
    box-sizing: border-box
    border: 2px solid #C4CAD4
    border-radius: 4px
    font-size: 14px
    resize: none
    overflow: hidden

    &:focus
      outline: none !important
      border-color: #3D86F4

.task-add-btn
  font-size: 14px
  font-weight: 500
  color: #3D86F4
  cursor: pointer
  width: max-content

</style>