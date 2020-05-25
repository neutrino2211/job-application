import '../../scss/night-owl.scss'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import Layout from './LiveEditor.vue'

/**
 * Live Code Editor
 */
const LiveEditor = {
  name: 'LiveEditor',
  render (h) {
    const children = this.$slots.default[0]
    const innerText = children.text.trim()
    return h('VueLive', {
      props: {
        code: innerText,
        layout: Layout
      }
    })
  }
}

export default LiveEditor