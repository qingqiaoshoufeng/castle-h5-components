/**
 * 快速生成组件
 */
import path from 'path'
import chalk from 'chalk'
import { Plop, run } from 'plop'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const argv = require('minimist')(process.argv.slice(2))

console.log(chalk.green('start generate a component'))

if (argv.name === true) {
  console.log(chalk.red('please input component\'s name'))
} else {
  Plop.launch(
    {
      configPath: path.join(__dirname, 'plopfile.ts'),
    },
    env => run(env, undefined, true),
  )
}
