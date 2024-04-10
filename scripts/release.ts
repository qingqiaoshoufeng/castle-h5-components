/**
 * 发布项目
 */
import type { SpawnSyncOptions, SpawnSyncReturns } from 'child_process'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import pkg from '../package.json'

const options: SpawnSyncOptions = {
  stdio: 'inherit',
  shell: true,
  encoding: 'utf-8',
}

const spawnWarpper = (args: Array<string>, option?: SpawnSyncReturns<object>) => {
  const result = spawnSync('npm', args, { ...options, ...option })
  if (result.stderr) {
    process.exit()
  }
}

// 校验报名是否修改
if (pkg.name === '@castle/components-template') {
  console.log(chalk.red('包名未修改，请重试！'))
}

// 切换公司镜像源
spawnWarpper(['config', 'set', 'registry', 'http://10.13.4.128:4873/'])

// 判断用户是否已经登录过
const result = spawnSync('npm', ['whoami'], { ...options, stdio: 'pipe' })
if (!result.stdout && result.stderr) {
  console.log(chalk.green('请先登录 npm 帐号！'))
  spawnWarpper(['login'])
}

// 格式化代码
// spawnWarpper(["run", "format"]);

// 开始执行单元测试
spawnWarpper(['run', 'test:once'])

// 修改版本号
const versions = [
  {
    key: 'major',
    name: 'npm version major',
    value: 'major',
  },
  {
    key: 'minor',
    name: 'npm version minor',
    value: 'minor',
  },
  {
    key: 'patch',
    name: 'npm version patch',
    value: 'patch',
  },
  {
    key: 'premajor',
    name: 'npm version premajor',
    value: 'premajor',
  },
  {
    key: 'preminor',
    name: 'npm version preminor',
    value: 'preminor',
  },
  {
    key: 'prepatch',
    name: 'npm version prepatch',
    value: 'prepatch',
  },
  {
    key: 'prerelease',
    name: 'npm version prerelease',
    value: 'prerelease',
  },
]
inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择更新的版本号类型',
      choices: versions,
    },
  ])
  .then((answers) => {
    spawnWarpper(['version', answers.version])

    // 开始构建项目
    spawnWarpper(['run', 'build'])
  })
