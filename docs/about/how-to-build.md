---
title: How to build
createDate: 2025-8-18 10:47:00
layout: doc
aside: false
---

# {{ $frontmatter.title}}

1. 初始化
   :::info
   具体可见项目最早的几个commit
   :::

```zsh
# 新建git仓库
git init
add README
add gitignore and push
# 初始化VitePress并更新gitignore
npx vitepress init & update gitignore
npm add -D vitepress
# 安装element，引入请看element官网
npm install element-plus --save
# 启用element黑暗模式，在项目入口文件额外增加以下样式即可
import 'element-plus/theme-chalk/dark/css-vars.css'
```

2. 命名规范

- 文件夹、Markdown、资源文件：kebab-case
- Vue 组件文件：PascalCase
- 变量、函数：camelCase
- 常量：UPPER_CASE
- Git 分支：type/kebab-case

3. 美化

```zsh
# 安装字体

```
