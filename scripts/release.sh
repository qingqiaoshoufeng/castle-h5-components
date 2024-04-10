#! /bin/bash

# 命令执行结果为非0，则退出运行
set -e

# 切换公司镜像源
npm config set registry http://10.13.4.128:4873/
echo "√已切换公司镜像源"

# 默认已登录过镜像
account=`npm whoami 2>/dev/null`
if test $account
then
  echo '√当前登录用户是:' $account
else
  npm login
fi

# 执行测试用例
npm run test:once
echo "√已执行完毕测试用例"

echo "请选择要发布的版本号类型"
version_type=(
"npm version major"
"npm version minor"
"npm version patch"
"npm version premajor"
"npm version preminor"
"npm version prepatch"
"npm version prerelease"
)
select type in "${version_type[@]}"
do
  case $type in
    ${version_type[0]})  npm version major
      break
    ;;
    ${version_type[1]})  npm version minor
      break
    ;;
    ${version_type[2]})  npm version patch
      break
    ;;
    ${version_type[3]})  npm version premajor
      break
    ;;
    ${version_type[4]})  npm version preminor
      break
    ;;
    ${version_type[5]})  npm version prepatch
      break
    ;;
    ${version_type[6]})  npm version prerelease
      break
    ;;
    *)  echo "请重试！"
    ;;
  esac
done
echo "√已修改版本号"

# 构建项目
npm run build
echo "√已完成项目构建"