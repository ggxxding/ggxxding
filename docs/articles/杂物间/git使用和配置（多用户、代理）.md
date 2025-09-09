---
title: git使用和配置（多用户、代理）
createDate: 2025-8-12 09:47:00
---

# {{ $frontmatter.title}}

::: info
本人小白，从github desktop转到命令行并学习git add & git commit & git push三件套耗尽了力气，有时遇到版本回退、commit未push代码的处理等问题搞不来很头疼。

好在现在这些问题直接问大模型就ok了，不过也还是通过本文记录一下常用的指令。

另外，最近一段时间都在本地git commit，没push过，机器上也没动过什么网络方面的配置，但前两天git push发现突然不行了（提示Connection closed by 127.0.0.1 port 7890）。

排错了半天，最终在~/.ssh/config文件中设置了一个走443端口的地址才解决问题。

本文主要记录排错过程和config设置。另外工作中也遇到过服务器上多用户使用同一个git仓库的情况，也需要在config中进行一些设置，在这里一并记录一下。
:::

## 📖 基础

### - 设置

```zsh
git config --global user.name "你的名字"       # 设置全局用户名
git config --global user.email "你的邮箱"     # 设置全局邮箱
git config --global core.editor "vim"         # 设置默认编辑器（可选）
git config --list                             # 查看当前配置
git config --global core.quotepath false    # 关闭自动转义，可直接显示UTF-8中文文件名
```

### - 获取/创建仓库

```zsh
git init                                      # 在当前目录初始化本地仓库
git clone <仓库地址>                           # 克隆远程仓库到本地
```

### - 日常工作流

```zsh
git status                                    # 查看当前状态
git add <文件>                                # 添加单个文件到暂存区
git add .                                     # 添加所有改动到暂存区
git commit -m "提交说明"                       # 提交暂存区到本地仓库
git commit -am "提交说明"                      # 跳过 add，直接提交已跟踪文件
```

### - 分支

```zsh
git branch                                    # 查看本地分支
git branch <分支名>                           # 创建新分支
git checkout <分支名>                          # 切换分支
git checkout -b <分支名>                       # 创建并切换到新分支
git merge <分支名>                             # 合并指定分支到当前分支
git branch -d <分支名>                         # 删除本地分支
```

### - 查看历史

```zsh
git log                                       # 查看提交历史
git log --oneline --graph --all               # 简洁图形化提交历史
git log origin/main..HEAD                     # 查看main分支哪些commit还未push
git log --diff-filter=D --summary -- '*.png'  # 查看所有被删除的png文件
git diff                                      # 查看工作区与暂存区的差异
git diff HEAD                                   # 查看工作区+暂存区与最新commit的差异
git diff origin/main..HEAD                    # 查看main分支与HEAD的差异
git diff --cached                             # 查看暂存区与最近一次提交的差异
git show <commid id>                          # 查看commit内容,id即git log中的哈希值
```

### - 远程

```zsh
git remote -v                                 # 查看远程仓库
git remote add <远程仓库名> <仓库地址>           # 添加远程仓库，默认仓库名一般是origin
git remote set-url <远程仓库名> <仓库地址>      #  修改仓库名指向的地址
git push -u <远程仓库名> <分支名>                 # 推送本地分支到远程（-u绑定远程仓库和分支，以后只需git push）
git push --set-upstream <远程仓库名> <分支名>   # 和上面等价
git push                                      # 推送当前分支
git pull                                      # 拉取并合并远程更新
git fetch                                     # 拉取远程更新但不合并
```

## 🧩 复杂些的操作

### - 恢复到上一次push状态

::: tip
git restore是Git 2.23 版本引入的新命令,旨在替代git checkout用于恢复文件和撤销工作区的更改。它将原本由git checkout执行的文件恢复功能进行独立化,使得 Git 的命令更加清晰和易用。

如果提示restore命令不存在，请更新一下git。
:::
三种情况：

- 未add

```zsh
git restore .   # 撤销所有unstaged的更改
git clean -fd   # 如果创建了新文件也想一同删除
```

- 已add，未commit

```zsh
git restore --staged .
git restore .
```

- 已commit，未push

```zsh
git reset --hard origin/main[或其他分支名]
# 或
git reset --hard <commit_id>
```

---

### - 清理某文件的commit历史

慎用！可能导致commit的hash变化！

```zsh
# 从历史中彻底删除某个文件
git filter-repo --path *file_path* --invert-paths
# 清理未引用的对象
git reflog expire --expire=now --all
git gc --prune=now --aggressive
# 清理后commit hash改变，需要强制推送
git push origin --force --all
```

## 🛠️ 配置(~/.ssh/config)

### - 关于~/.ssh/config

默认情况下，~/.ssh/config文件不存在，是需要自己创建的，单机单用户情况下也不太需要用到这个文件。

该文件可以用来配置ssh连接的一些参数，主要用于：

- 多用户配置
- 代理、端口设置

---

### - 多用户配置

如果需要在同一台机器上使用多个ssh密钥，就需要在config文件中进行配置。
::: tip
例如，我在工作中使用公司的账号，在个人项目中使用自己的账号，又或者公用服务器中有多个同事设置了自己的密钥。
:::

使用ssh-keygen命令创建ssh密钥时，默认会在~/.ssh目录下创建私钥和公钥文件（公钥以.pub结尾）。

一路回车的话默认创建的是id_rsa和id_rsa.pub（也可能不是rsa而是ed25519，取决于你的命令和系统是否支持）。

为了方便区分，在ssh-keygen创建密钥时，可以指定不同文件名，例如id_rsa_company和id_rsa_personal。

然后创建~/.ssh/config文件并配置：

```bash
vim ~/.ssh/config # 如果该目录没有config文件，则会自动创建
```

执行以上命令后，会创建或修改~/.ssh/config文件，进入编辑模式，设置文件内容如下：

```txt{1,4,7,10}
Host ggxxding_personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_personal
  IdentitiesOnly yes

Host ggxxding_company
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_company
  IdentitiesOnly yes
```

上面高亮行（Host、IdentityFile）根据你的实际情况来调整，Host可以改成更简短好记的名字。

如果你不熟悉vim，用记事本或者IDE直接修改config也可以。

改完了可以测试下：

```zsh
ssh -T git@ggxxding_company
ssh -T git@ggxxding_personal
# 没问题的话会得到类似如下输出：
# Hi ggxxding! You've successfully authenticated, but GitHub does not provide shell access.
```

然后在使用涉及到远程地址的git命令时，这样写：

```zsh
# git@后边原来是github.com，这里就改成config中设置的Host
git remote set-url origin git@ggxxding_personal:你的用户名/仓库名.git
git remote set-url origin git@ggxxding_company:你的用户名/仓库名.git

# 这样clone仓库也可以，会根据config对应的密钥文件来鉴权
git clone git@ggxxding_personal:你的用户名/仓库名.git
git clone git@ggxxding_company:你的用户名/仓库名.git
```

---

### - 代理配置（ssh切换到443端口）

本节讲一下config中配置代理。

::: details 问题描述（可不看）
回到文首提到的无法push的问题（提示Connection closed by 127.0.0.1 port 7890），不只是push，clone等任何涉及到远程仓库的命令都无法运行，甚至ssh -T git@github.com也是一样的报错。

熟悉的读者看到这个ip和端口，肯定知道是代理出了问题（例如Clash），但我都检查过了，没有启动clash，也用git config --global --unset http.proxy和git config --global --unset https.proxy取消了git的代理，甚至还检查了github网页中ssh配置页面的指纹和本地ssh-key的指纹，完全没发现问题。

询问ChatGPT无果，但给出了一些可能的原因，放在这里待未来探究：

1. 本机代理软件（Clash、Surge、V2rayU 等）接管了 22 端口，然后转发失败。
2. 公司/校园/运营商网络 屏蔽了 22 端口，GitHub 的 SSH 用不了。
3. SSH 配置有误，走了错误的 ProxyCommand。

我目前的解决方案是在config中增加一条，用GitHub的备用域名并改用443端口做ssh。
:::

在~/.ssh/config中增加如下内容（只加前4行就行，后4行是取消ssh代理，我尝试后依然无法连接）：

```txt{1-4}
Host github-443
  HostName ssh.github.com
  Port 443
  User git
Host github.com
  HostName github.com
  User git
  ProxyCommand none
```

::: warning
另外，如果你是多用户环境，别忘了按照[多用户配置](#多用户配置)中写的，还要增加IdentityFile和IdentitiesOnly项。
:::
github-443是我起的别名，你同样可以改成任意好记的，ssh.github.com是GitHub提供的备用走443端口的ssh域名。

测试命令和remote设置命令和上面差不多：

```zsh
ssh -T git@github-443.com
# Hi ggxxding! You've successfully authenticated, but GitHub does not provide shell access.

# 可以add一个origin-443，指向443端口的仓库，而不是用set-url覆写origin
git remote add origin-443 git@github-443:你的用户名/仓库名.git
# 用以下命令来向新增的origin-443指向的远程仓库push，如果直接push则还是向origin推送
git push origin-443 main
# 用git push -u origin-443 main来绑定默认push也可以，以后只要git push就行
git push -u origin-443 main
```

::: info 后记
配置完以上，并且用了几天后，偶然尝试直接git push，居然又正常了……开不开Clash都能连接，只能认为之前连接失败是玄学原因了。
:::
