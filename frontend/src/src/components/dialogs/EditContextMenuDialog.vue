<template>
  <ul id="context-menu" @click.stop>
    <li class="context-menu-item" @click="editItem">
      <EditIcon />
      <span>Редактировать</span>
    </li>
    <li class="context-menu-item" @click="deleteItem">
      <DeleteIcon />
      <span>Удалить</span>
    </li>
  </ul>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
export default {
  name: "EditContextMenuDialog",

  props: {
    settings: {
      type: Object
    },
    close: {
      type: Function
    }
  },

  components: {DeleteIcon, EditIcon},

  data() {
    return {
      contextMenuWidth: null,
      contextMenuHeight: null
    }
  },

  mounted() {
    this.showContextMenu()
    document.body.addEventListener('click', this.closeContextMenu)
  },

  destroyed() {
    document.body.removeEventListener('click', this.closeContextMenu)
  },

  methods: {

    closeContextMenu() {
      this.close()
    },

    deleteItem() {
      this.settings.callback && this.settings.callback('delete')
      this.close()
    },

    editItem() {
      this.settings.callback && this.settings.callback('edit')
      this.close()
    },

    showContextMenu() {
      const event = this.settings.e
      const menu = document.getElementById("context-menu");
      if(!this.contextMenuWidth || !this.contextMenuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.contextMenuWidth = menu.offsetWidth;
        this.contextMenuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if((this.contextMenuWidth + event.pageX) >= window.innerWidth) {
        menu.style.left = (event.pageX - this.contextMenuWidth) + "px";
      } else {
        menu.style.left = event.pageX + "px";
      }

      if((this.contextMenuHeight + event.pageY) >= window.innerHeight) {
        menu.style.top = (event.pageY - this.contextMenuHeight) + "px";
      } else {
        menu.style.top = event.pageY + "px";
      }

      menu.classList.add('active');
    },

    hideContextMenu() {
      document.getElementById("context-menu").classList.remove('active');
    }
  }
}
</script>

<style scoped>

#context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 8px 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 2147483647;
  background-color: white;
  border: 1px solid #ebebeb;
  border-bottom-width: 0px;
  box-shadow: 2px 2px 8px #d1d1d1;

}

#context-menu.active {
  display: block;
}

.context-menu-item {
  display: flex;
  cursor: pointer;
  padding: 10px 15px;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  font-size: 13px;
}

.context-menu-item span {
  margin-left: 8px;
}

.context-menu-item:hover {
  background-color: #E1F1FF;
}
</style>