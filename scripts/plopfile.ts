import fs from 'fs'
import path from 'path'

/**
 * 校验组件是否已经存在
 * @param {string} componentName
 * @returns
 */
const checkComponentExist = (componentName) => {
  return fs.existsSync(path.resolve(__dirname, `../src/lib/${componentName}`))
}

module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        name: 'name',
        validate(name) {
          if (checkComponentExist(name))
            return `组件库中已存在名为${name}的组件！`

          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../src/lib/{{name}}',
        base: '../scripts/template',
        templateFiles: '../scripts/template/**/**',
      },
    ],
  })
}
