/**
 * 生成入口文件
 */
import path from 'path'
import fs from 'fs'
import { exec } from 'child_process'
import klawSync from 'klaw-sync'

// 读取目录，得到组件名称
const compoentPath = path.resolve(__dirname, '../src/lib')
const components = klawSync(compoentPath, {
  nofile: true,
  depthLimit: 0,
})
const componentsName = components.map((item) => {
  const path = item.path
  return path.slice(path.lastIndexOf('\\') + 1, path.length)
})

// 生成入口文件
let source = ''

componentsName.forEach((item) => {
  source += `import ${item} from './${item}/index'\n`
})

source += 'import { version } from \'../../package.json\'\n'

source += '\nconst components = [\n'
componentsName.forEach((item) => {
  source += `${item},\n`
})

source += `]\n

  const install = function (Vue: any) {
    components.forEach((component: any) => {
      if (component.install) {
        Vue.use(component)
      } else if (component.name) {
        Vue.component(component.name, component)
      }
    })
  }
  
  // 使用标签的方式引入
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }

  export {
    install,\n
    version,\n`

componentsName.forEach((item) => {
  source += `${item},\n`
})

source += `}
  export default { install, version }`

// 文件写入
fs.writeFileSync(path.resolve(__dirname, '../src/lib/main.ts'), source)

// 生成预览路由
const routers = componentsName.map((item, index) => {
  return {
    key: `${index + 1}`,
    label: item,
    path: `/${item}/demo`,
  }
})
fs.writeFileSync(path.resolve(__dirname, '../src/config/router.json'), JSON.stringify(routers))

// eslint 格式化代码
exec('npm run lint:main', (err) => {
  if (err) {
    console.log(err)
  }
  process.exit()
})
