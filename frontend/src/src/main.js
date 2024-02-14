import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false

Vue.directive('click-outside', {
  priority: 700,
  bind (el, binding) {

    const event = function (event) {
      console.log(event)
      //binding.value(binding.expression)
      //self.vm.$emit(self.expression,event)
    }
    el.addEventListener('click', (e) => e.stopPropagation())
    document.body.addEventListener('click', () => event())
  },

  unbind(el) {
    console.log('unbind')
    el.removeEventListener('click', (event) => event.stopPropagation())
    document.body.removeEventListener('click',this.event)
  },
  stopProp(event) {event.stopPropagation() }
})

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
