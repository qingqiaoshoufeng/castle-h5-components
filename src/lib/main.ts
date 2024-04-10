import { version } from '../../package.json'
import HxDemo from './HxDemo/index'
import HxDemo1 from './HxDemo1/index'

const components = [
  HxDemo,
  HxDemo1,
]

const install = function (Vue: any) {
  components.forEach((component: any) => {
    if (component.install) {
      Vue.use(component)
    }
    else if (component.name) {
      Vue.component(component.name, component)
    }
  })
}

// 使用标签的方式引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,

  version,
  HxDemo,
  HxDemo1,
}
export default { install, version }
