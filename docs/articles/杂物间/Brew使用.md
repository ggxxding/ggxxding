---
title: Brew使用
createDate: 2025-8-19 15:29:00
---

# {{ $frontmatter.title}}

::: info
[Brew](https://brew.sh/)是macOS下比较好用的一个包管理器，相当于ubuntu的apt。

网上教程其实很多，但是换源方式也很多，时间久了会忘，主要还是记录一下自己换源的文件配置。
:::

## 安装

一行代码即可：

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完的提示：

```zsh
==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations

==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /Users/ggxxding/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/ggxxding/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
- Run brew help to get started
- Further documentation:
    https://docs.brew.sh
```

不照着做好像也没啥影响，新开一个终端输入brew回车，有输出就行，没的话可以尝试按上面写的做一下。

## 换源

国内直接用brew可能速度较慢，所以推荐换一下源，方式有很多，由于mac主要用zsh，zsh在用户登录时会加载~/.zprofile，因此我选择在该文件下配置源：

```zsh
**~/.zprofle**

# Set PATH, MANPATH, etc., for Homebrew.
eval "$(/opt/homebrew/bin/brew shellenv)"
# Set PATH, MANPATH, etc., for Homebrew.
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
```

然后重启终端，在命令行输入brew config应该就能看到以上变量正确配置了。

## 常用命令

```zsh
brew install <软件包名称>
brew uninstall <软件包名称>
brew update                 # 更新brew
brew outdated   # 检查可更新软件包
brew upgrade    # 更新所有软件包
brew upgrade <软件包名称> # 更新指定软件包

brew list   # 查看已安装软件包
brew info <软件包名称>  # 查看详情
```
