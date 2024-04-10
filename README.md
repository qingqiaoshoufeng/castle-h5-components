### 安装依赖

```
npm install
```

如果 `yarn install` 未安装 `vant`，请手动安装。

node >= 14.18.0

本工程已经内置 [vant](https://github.com/youzan/vant)，并且构建时候已做了 external 处理

### 新增组件

方法一：

```
npm run generate
```

方法二：

在 /src/lib 目录添加新组件

```
mkdir HxDemo && cd HxDemo
```

```
+  import type { App } from "vue"
+  import HxDemo from "./index.vue"

+  HxDemo.install = (app: App) => {
+    app.component(HxDemo.name, HxDemo)
+  }

+  export { HxDemo }
+  export default HxDemo
```

```
+  <template>
+   <van-button type="primary">Primary Button</van-button>
+  </template>

+  <script lang="ts">
+    import { defineComponent } from "vue"
+    import { Button } from "vant"

+    export default defineComponent({
+      name: "HxDemo",
+      components: { AButton: Button },
+      setup() {},
+    })
+  </script>
```

在 /src/lib/main.ts 文件中修改，导出新组件，例如：

```
+   import HxDemo from "./HxDemo/index"

    const components = [
+     HxDemo
    ]

    const install = function (Vue: any) {
      components.forEach((component) => {
        if (component.install) {
          Vue.use(component)
        } else if (component.name) {
          Vue.component(component.name, component)
        }
      })
    }

    // 使用标签的方式引入
    if (typeof window !== "undefined" && window.Vue) {
      install(window.Vue)
    }

    export {
      install,
+     HxDemo
    }
    export default { install }
```

### 预览新开发组件

```
npm run dev
```

访问 `http://127.0.0.1:5173/#/HxDemo/demo` 即可预览组件 Demo 。

主要基于 Vite 插件 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)，采用约定式路由的方式实现。组件 Demo 放在组件目录下面，例如 `/lib/HxDemo/demo/`

### 组件测试

通过 vue-test-utils 和 vitest 对组件进行相应测试。测试用例在组件下面，例如 `/lib/HxDemo/__test__/index.spec.js`

参考文档：

https://test-utils.vuejs.org/

https://cn.vitest.dev/

[测试用例编写说明](http://10.10.3.188:9090/castle/components-template/wikis/%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B%E7%BC%96%E5%86%99%E8%AF%B4%E6%98%8E)


### 构建

```
npm run build
```

### 发布到公司镜像

请先注册[公司镜像源](http://localhost:8080/dev-env/#npm-%E7%A7%81%E6%9C%8D)账号，然后运行

```
npm publish
```

在运行 `publish` 命令时，`./scripts/release.sh` 脚本会自动切换镜像、执行测试用例、修改版本号、构建项目。

发布前请确保以下配置已完成：

1. 请配置 bash 到电脑环境变量，例如 Windows 把 `D:\git\Git\bin` 加入环境变量。

2. 请悉知 [npm version](https://docs.npmjs.com/cli/v9/commands/npm-version) 命令。

3. 发布前请提交代码。


### 分支管理

项目整体功能还不够完善，增加新功能、bug 修复，都开一个新分支，减少冲突。基于`@castle/components-template`开发可以 `fork` 本仓库。

分支命名规范

```
feat_xx：新功能
fix_xx：bug修复
```

### 关于开发中 `typescript` 配置，可按下面修改配置

如不使用 `typescript`，可修改 `ts`配置文件

```
tsconfig.json

"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "src/**/*.js", "src/**/*.jsx"]

"exclude": ["dist", "node_modules", "src/lib"]
```

修改 `scripts\template\index.ts.hbs` 文件，增加 `// @ts-ignore`

```
import type { App } from 'vue'
import {{properCase name}} from './index.vue'

// @ts-ignore
{{properCase name}}.install = (app: App) => {
  // @ts-ignore
  app.component({{properCase name}}.name, {{properCase name}})
}

export { {{properCase name}} }
export default {{properCase name}}

```

### 生成 CHANGELOG

```
npm run changelog
```


### 使用

确认npm源已经切换到[公司镜像源](http://localhost:8080/dev-env/#npm-%E7%A7%81%E6%9C%8D)

安装

```
npm install @castle/components-template --save

import { HxDemo } from "@castle/components-template";
import "@castle/components-template/dist/style.css";

app.use(HxDemo)
```

或者全量安装

```
npm install @castle/components-template --save

import ComponentsTemplate from "@castle/components-template";
import "@castle/components-template/dist/style.css";

app.use(ComponentsTemplate)
```

如果出现全局注册或单独注册组件未生效，可能是组件 `name` 为空，请检查。
