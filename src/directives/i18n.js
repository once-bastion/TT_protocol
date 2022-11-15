import Vue from 'vue'
import { i18n } from '../utils/helper'

Vue.directive('t', {
  bind: function (el, binding) {
    el.innerText = i18n.t(binding.expression)
  }
})
