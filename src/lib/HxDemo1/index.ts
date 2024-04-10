import type { App } from 'vue'
import HxDemo1 from './index.vue'

// @ts-ignore
HxDemo1.install = (app: App) => {
  // @ts-ignore
  app.component(HxDemo1.name, HxDemo1)
}

export { HxDemo1 }
export default HxDemo1
