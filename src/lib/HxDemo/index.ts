import type { App } from 'vue'
import HxDemo from './index.vue'

// @ts-ignore
HxDemo.install = (app: App) => {
  // @ts-ignore
  app.component(HxDemo.name, HxDemo)
}

export { HxDemo }
export default HxDemo
