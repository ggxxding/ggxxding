---
title: VSCode配置prettier
createDate: 2025-8-11 23:17:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
prettier是一个前端代码格式化工具，偶然一次安装一个项目后发现它强大的功能，但是从另一台电脑git clone后缺又不生效了，所以也查了下其配置用法，在这里记录一下。

另外prettier和ESLint可能有冲突，解决冲突方法也是有的，我没装ESLint，所以这部分就不涉及了！
:::

## 安装

1. 前往项目根目录，执行：

```zsh
npm install --save-dev prettier
```

2. VScode插件市场搜索Prettier，安装Prettier - Code formatter：
   ![plugin](/src/images/prettier/plugin.png)

## 配置

1. 项目根目录新建一个.prettierrc.json文件，内容如下，更多配置项可以自行搜索

```json
// ./.prettierrc.json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

2. 打开VSCode设置，Text Editor -> Formatting -> Format On Save勾选一下：
   ![auto_save](/src/images/prettier/auto_save.png)

3. 也是在设置内，Commonly Used -> Default Formatter选择Prettier - Code formatter：
   ![default](/src/images/prettier/default.png)

## 使用

至此应该完成了，其实很简单，之前我clone项目后失效的原因可能就是新电脑没有安装Prettier插件。

随便打开一个项目代码文件，ctrl+s试试吧。
