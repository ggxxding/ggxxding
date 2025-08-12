---
title: git常用指令
createDate: 2025-8-12 09:47:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
本人小白，从github desktop转到命令行并学习git add & git commit & git push三件套耗尽了力气，有时遇到版本回退、commit未push代码的处理等问题搞不来很头疼。

好在现在这些问题直接问大模型就ok了，不过也还是记录一下常用的指令。
:::

## 基础

### 配置

```
git config --global user.name "你的名字"       # 设置全局用户名
git config --global user.email "你的邮箱"     # 设置全局邮箱
git config --global core.editor "vim"         # 设置默认编辑器（可选）
git config --list                             # 查看当前配置
```

### 获取/创建仓库

```
git init                                      # 在当前目录初始化本地仓库
git clone <仓库地址>                           # 克隆远程仓库到本地
```

### 日常工作流

```
git status                                    # 查看当前状态
git add <文件>                                # 添加单个文件到暂存区
git add .                                     # 添加所有改动到暂存区
git commit -m "提交说明"                       # 提交暂存区到本地仓库
git commit -am "提交说明"                      # 跳过 add，直接提交已跟踪文件
```

### 分支

```
git branch                                    # 查看本地分支
git branch <分支名>                           # 创建新分支
git checkout <分支名>                          # 切换分支
git checkout -b <分支名>                       # 创建并切换到新分支
git merge <分支名>                             # 合并指定分支到当前分支
git branch -d <分支名>                         # 删除本地分支
```

### 查看历史

```
git log                                       # 查看提交历史
git log --oneline --graph --all               # 简洁图形化提交历史
git diff                                      # 查看工作区与暂存区的差异
git diff --cached                             # 查看暂存区与最近一次提交的差异
```

### 远程

```
git remote -v                                 # 查看远程仓库地址
git remote add origin <仓库地址>              # 添加远程仓库
git push -u origin <分支名>                   # 推送本地分支到远程（首次）
git push                                      # 推送当前分支
git pull                                      # 拉取并合并远程更新
git fetch                                     # 拉取远程更新但不合并
```

## 复杂些的操作

### 恢复到上一次push状态

::: tip
git restore是Git 2.23 版本引入的新命令,旨在替代git checkout用于恢复文件和撤销工作区的更改。它将原本由git checkout执行的文件恢复功能进行独立化,使得 Git 的命令更加清晰和易用。

如果提示restore命令不存在，请更新一下git。
:::
三种情况：

- 未add

```
git restore .   # 撤销所有unstaged的更改
git clean -fd   # 如果创建了新文件也想一同删除
```

- 已add，未commit

```
git restore --staged .
git restore .
```

- 已commit，未push

```
git reset --hard origin/main[或其他分支名]
```
