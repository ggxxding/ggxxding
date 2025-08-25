---
title: Minecraft服务器部署（Java版）
createDate: 2025-8-21 16:38:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
记录一下Minecraft服务器部署过程，对有linux或cmd操作基础的人来说没什么难度，否则还是有点复杂的，我会尽量写的简单点！

另外本文服务端都在Linux(Debian)操作，windows、mac以及其他Linux发行版等教程请看[这里](https://zh.minecraft.wiki/w/Tutorial:%E6%9E%B6%E8%AE%BEJava%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8#%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83)，重点看一下*Java安装*的章节就好了，服务器的启动指令基本都是一样的。
:::
::: warning
服务端和客户端版本要*保持一致*，本文教程都以*1.21.8*作为示范，你需要其他版本的话只要确保服务端客户端版本一致就没问题！
:::

| 本文教程范围      | 服务端 | 客户端 |
| ----------------- | ------ | ------ |
| Linux(Debian为主) | ✅     | ❌     |
| Mac OS            | ❌     | ✅     |
| Windows           | ❌     | ✅     |

Windows教程网上挺多的，图形化界面也没什么操作，所以暂时不写了，未来可能会加上。

## 0. 🛠️准备工作

::: info

- 正式开始安装前的一些文件下载、开放端口等操作。
- 建议用Windows/Mac/Ubuntu/其他任意有图形界面的Linux电脑操作
- 如果以上你都没有，那你应该也不太依赖教程安装，所以就不考虑这种情况了

:::

::: warning

- 服务器端的操作千万不要用root用户，否则后果自负
- 不懂的话，看一下[服务器配置](/articles/杂物间/服务器配置#_2-1-配置用户)的2.1.配置用户，3行命令即可
- 然后每次登录服务器从root用户用 su <用户名> 命令来切换到该用户

:::

### 0.1. 🎮正版游戏

- 即使是Forge启动器，也需要你有正版才能安装的，如果没正版的话请另想办法，本文不涉及
- 官方纯净版的服务端和客户端安装包是分离的，所以单独放在后面讲

---

### 0.2. 🌐打开服务器25565端口

我们先去把服务器的minecraft端口（25565）打开。

a. 前往[阿里云主页](https://ecs.console.aliyun.com/home#/)（其他云也差不多操作，可以参考下）

b. 点左侧“安全组”，页面应该会显示你当前的安全组

c. 点安全组右侧“管理规则”

d. 点“入方向”下的“手动添加”，“端口范围/目的”输入25565，“授权对象/源”输入0.0.0.0/0，“描述”随便，可以输Minecraft，点保存

---

### 0.3. 🔧Forge下载

::: tip

- Forge是一个老牌MC mod加载器，很多经典大模组（工业等）都依赖Forge。
- 如果你只玩纯净版不加mod就不用下载Forge，不用看这部分
- Forge服务端和客户端共用一个安装包，所以把这一节放在准备工作里了

:::

用一台Windows/Mac/Ubuntu/其他任意有图形界面的Linux电脑打开浏览器访问[Forge官网](https://files.minecraftforge.net/net/minecraftforge/forge/)，左侧选择自己需要的版本，这里我们选择目前（2025-08-22）最新的1.21.8。

网页中央会有Latest（最新版）和Recommended（推荐版），建议优先选Recommended，没的话再选Latest。点击所选版本下面的Installer，跳转到下载页。

可以看到页面顶部有类似下面的提示，意思是页面下方是一些广告，等倒计时（在右上角）结束后，点Skip按钮来开始下载。

```
The content below is an advertisement. After the count-down, click Skip to begin your Forge download..
```

在倒计时结束后，点击右上角的Skip就会下载了。

::: details 以上步骤可能要科学上网，如果你没的话展开这里
在[Forge官网](https://files.minecraftforge.net/net/minecraftforge/forge/)选好版本后，不要左键点Installer，而是右键点击，选择“复制链接地址”。

打开记事本或者word，或者直接黏贴到浏览器地址栏看看，应该是这样的：

```bash
https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.21.8-58.0.9/forge-1.21.8-58.0.9-installer.jar

```

我们要复制第二个"https"开始的全部内容，也就是：

```bash
https://maven.minecraftforge.net/net/minecraftforge/forge/1.21.8-58.0.9/forge-1.21.8-58.0.9-installer.jar
```

把以上地址黏贴到浏览器地址栏按回车，同样会开始下载了。

:::

下载好的forge-1.21.8-58.0.9-installer.jar先放放，稍后再来处理。

---

### 0.4. ☕安装Java

不管服务端还是客户端都要装Java！
::: tip
Java版Minecraft服务器版本会要求最低Java版本：

- 从1.12（17w13a）开始，运行Minecraft服务器的最低要求是Java 8。
- 从1.17（21w19a）开始，运行Minecraft服务器的最低要求是Java 16。
- 从1.18（1.18-pre2）开始，运行Minecraft服务器的最低要求是Java 17。
- 从1.20.5（24w14a）开始，运行Minecraft服务器的最低要求是Java 21，且操作系统要求为64位。

旧版Minecraft可以在较新的Java上运行，装最新的Java一般都没错的，除非你遇到奇怪的报错，可以尝试装服务器要求的最低Java版本试试。
:::

#### 0.4.1.🐧Debian(Linux)

由于Debian的软件较老，目前其软件仓库中不包含OpenJDK 21，不能直接用apt install来安装，按以下步骤来：

```bash
cd ~ # 前往你的Home目录（~等价于/home/<你的用户名>），一般都不会遇到权限问题
wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.deb # 下载deb包。
sudo dpkg -i jdk-21_linux-x64_bin.deb # 安装
rm jdk-21_linux-x64_bin.deb # 删除安装包
java -version # 输出version信息就安装成功了
```

---

#### 0.4.2. 🪟Windows

打开命令提示符（任务栏搜索框搜索cmd并打开），输入java -version回车，输出版本号则说明已安装了，如果大于等于服务器所要求的版本（本文1.21.8对应21）则可跳过本节，否则继续。

下载[Adoptium OpenJDK Temurin](https://adoptium.net/zh-CN/temurin/releases/)或[微软OpenJDK](https://learn.microsoft.com/zh-cn/java/openjdk/download)并安装，一路next就行。

安装好了再打开cmd输入java -version，应该就会弹出版本了。
::: info
以[微软OpenJDK](https://learn.microsoft.com/zh-cn/java/openjdk/download)为例，往下拉到OpenJDK 21，然后根据你操作系统来选择，90%的情况下你选择“Windows操作系统-X64-msi”的下载链接然后打开安装就行了。

如果你是arm的windows（例如arm芯片的macbook安装的win11虚拟机），可以选“Windows操作系统-AArch64/ARM64-msi”的下载链接，性能更好。
:::

---

#### 0.4.3. 🍎Mac OS

::: tip
不知道怎么打开Mac终端？按住Command + 空格，在跳出的搜索框中输入terminal，按回车！
:::
假设你装好了[brew](/articles/杂物间/Brew使用#安装)，终端中执行：

```zsh
brew update #
brew search openjdk # 应该能搜到openjdk@21
brew install openjdk@21 # 安装
# 装好后终端会提示你建立软链接
# 例如sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.
# 请以你终端中提示的为准，复制黏贴执行一下
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
java -version # 验证一下是否安装成功
```

::: details install后的提示（不用看）
For the system Java wrappers to find this JDK, symlink it with
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk

openjdk@21 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have openjdk@21 first in your PATH, run:
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc

For compilers to find openjdk@21 you may need to set:
export CPPFLAGS="-I/opt/homebrew/opt/openjdk@21/include"
:::

---

到这里，你已经完成了全部准备工作，接下去分别安装服务端和客户端！

## 1. 🖥️服务端

### 1.1. 📦官方纯净版

非常简单，可以先部署纯净版练练手。
::: tip
如果你准备装一些mod，可以跳过纯净版直接看Forge安装。
:::

#### 1.1.1. 🐧Debian(Linux)服务端

下面指令下载的是1.21.8版本，你的客户端也需要是相同版本，如果链接失效，可能官网有更新，请去官网[下载页](https://www.minecraft.net/zh-hans/download/server)看看最新地址，手动下载后上传到服务器也一样的。

```bash
cd ~ # 前往你的Home目录（~等价于/home/<你的用户名>），一般都不会遇到权限问题
wget https://piston-data.mojang.com/v1/objects/6bce4ef400e4efaa63a13d5e6f6b500be969ef81/server.jar # 下载服务端
mkdir minecraft_server # 新建文件夹，后面服务端所有文件都放在这里面
mv server.jar minecraft_server/ # 把下载的.jar移动到新建的文件夹
cd minecraft_server
java -Xmx1024M -Xms1024M -jar server.jar nogui # -Xmx -Xms分别是给服务端分配的最大最小内存，根据服务器配置来决定，纯净版5人以内1024M够了
```

执行以上命令后，初次启动服务器需要你同意EULA(End-User License Agreement)条款，会输出类似下面的信息：

```bash{6-7}
...
Starting net.minecraft.server.Main
[16:20:15] [ServerMain/ERROR]: Failed to load properties from file: server.properties
java.nio.file.NoSuchFileException: server.properties
...
[16:20:15] [ServerMain/WARN]: Failed to load eula.txt
[16:20:15] [ServerMain/INFO]: You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
```

按Ctrl + C中断服务，然后输入：

```bash
vim eula.txt
```

---

进入eula.txt的编辑界面，如果你不熟悉vim的话，别乱按，跟以下步骤来：

1. 通过方向键将光标定位到"eula=false"的"f"这里
2. 按i，进入编辑模式（屏幕底部会显示-- INSERT --）
3. 按delete把false删掉，再输入true
4. 按一下esc退出编辑模式（底部-- INSERT --消失），键盘输入 :wq! 保存并退出（输入的是 冒号 w q 感叹号，不要忽略标点符号）
   ::: tip
   嫌麻烦也可以把eula.txt下载到本地，改完再上传到服务器覆盖原文件。
   :::

---

然后再次执行：

```bash
java -Xmx1024M -Xms1024M -jar server.jar nogui
```

等看到“Done! For help, type "help"”等字样就说明启动成功了，默认端口是25565。

---

### 1.2. 🔧Forge

#### 1.2.1. 🐧Debian(Linux)服务端

去服务器终端：

```bash
cd ~ # 前往你的Home目录（~等价于/home/<你的用户名>），一般都不会遇到权限问题
mkdir minecraft_forge_server # 服务器数据文件夹，名字你可以起简单一些，后面也对应改一下
cd minecraft_forge_server # 前往刚才新建的文件夹
```

然后你有两个选择：

a. （推荐，简单）把前面 [0.3. 🔧Forge下载](#_0-3-🔧forge下载) 中下载的forge-1.21.8-58.0.9-installer.jar上传到服务器/home/你的用户名/minecraft_forge_server/文件夹下

b. 在服务器用命令行下载也可以

::: details 服务器命令行下载方法（点击展开）
看一下 [0.3. 🔧Forge下载](#_0-3-🔧forge下载) 中，“以上步骤可能要科学上网”那一部分，即复制forge下载地址，复制一下，然后在服务器终端操作：

```bash
# wget之后别忘记加空格，然后黏贴你复制的地址
wget https://maven.minecraftforge.net/net/minecraftforge/forge/1.21.8-58.0.9/forge-1.21.8-58.0.9-installer.jar
```

:::

---

然后继续在终端操作：

```bash

java -jar forge-1.21.8-58.0.9-installer.jar nogui --installServer
# 可能要安装十几分钟，请耐心等待
bash ./run.sh
```

第一次运行的话同样需要同意一下EULA，你会看到类似“Failed to load eula.txt”的字样，和官方纯净版一样false改true就行，如果上面你没看的话，点击展开下面的标签看看步骤。

::: details 同意EULA过程（点击展开）
按Ctrl + C中断服务，然后输入：

```bash
vim eula.txt
```

进入eula.txt的编辑界面，如果你不熟悉vim的话，别乱按，跟以下步骤来：

1. 通过方向键将光标定位到"eula=false"的"f"这里
2. 按i，进入编辑模式（屏幕底部会显示-- INSERT --）
3. 按delete把false删掉，再输入true
4. 按一下esc退出编辑模式（底部-- INSERT --消失），键盘输入 :wq! 保存并退出（输入的是 冒号 w q 感叹号，不要忽略标点符号）

嫌麻烦也可以把eula.txt下载到本地，改完再上传到服务器覆盖原文件。
:::

然后再次：

```bash
bash /run.sh
```

同样是等看到“Done! For help, type "help"”等字样就说明启动成功了。

## 2. 💻客户端

### 2.0. HMCL/PCL

::: info 关于HMCL/PCL

- 如果你懒得折腾，可直接看本节下载启动HMCL/PCL，后边[2.1. 📦官方纯净版](#_2-1-📦官方纯净版)以及[2.2. 🔧Forge](#_2-2-🔧forge)就不用看了，但是服务端配置Forge的工作还是不能省的！
- HMCL 和 PCL 都是 Minecraft 的第三方启动器，安装方式很简单，一般都是下载即用的免安装程序
- 可帮你自动下载所需游戏版本和Forge、Fabric等工具，也可直接导入他人制作的整合包直接开玩
- HMCL支持Windows/Linux/Mac，PCL只支持Windows
- 启动器中可登录微软账号，享受正版游戏权益（例如进入需要验证正版的服务器）

:::

- 这些启动器都有中文，使用很简单，就不展开说了，放一下下载地址：

- [HMCL](https://hmcl.huangyuhui.net/) [HMCL Github releases](https://github.com/HMCL-dev/HMCL/releases)

- [PCL2](https://afdian.com/a/LTCat)

::: tip
HMCL如果下载Mac或Linux版.jar文件可能无法直接双击打开，可以在终端中通过如下指令启动：

```bash
# 用cd指令先前往HMCL-3.6.16.jar所在文件夹，以你实际路径为准
cd /Users/ggxxding/Documents/minrcraft
# .jar文件名也以你下载的为准
java -jar HMCL-3.6.16.jar
```

HMCL支持直接安装Curse、Modrinth、MultiMC、MCBBS整合包：
[![HMCL1](https://origin.picgo.net/2025/08/25/HMCL1f6f8c4ed2daa9e94.webp)](https://www.picgo.net/image/HMCL1.0Goh7G)
[![HMCL2](https://origin.picgo.net/2025/08/25/HMCL3804f77c5eed14406.webp)](https://www.picgo.net/image/HMCL3.0GoPRh)
[![HMCL3](https://origin.picgo.net/2025/08/25/HMCL29e9b7de21a006799.webp)](https://www.picgo.net/image/HMCL2.0GoOL6)

:::

### 2.1. 📦官方纯净版

::: warning
如果你用HMCL/PCL等第三方启动器的话，可以自动下载游戏文件并配置Forge等（比较省事，推荐）。

但是如果不用HMCL/PCL而是通过 2.2. 🔧Forge 的教程来安装forge的话，你需要通过Minecraft官方启动器或其他途径下载你选择的forge版本所需要的游戏文件。

:::
下载[官方客户端](https://www.minecraft.net/zh-hans/download)，游戏版本得和服务端一样，如果你按上面教程来的话，就是1.21.8。

官方客户端安装应该没什么好说的，双击安装即可，也不需要终端了。

然后进入游戏，选多人游戏-直接加入，地址输入服务器的公网ip:25565，就能进入游戏了！

---

### 2.2. 🔧Forge

- 在 [0.3. 🔧Forge下载](#_0-3-🔧forge下载) 中，我们已经下载好了forge-1.21.8-58.0.9-installer.jar，记住它的路径
- 我们要至少从[官方纯净版启动器](#_2-1-📦官方纯净版-通用-必须)启动过一次与服务器相同的版本（1.21.8），然后退出启动器，再根据你的操作系统选择下面的章节阅读

#### 2.2.1. 🪟Windows

一般来说双击forge-1.21.8-58.0.9-installer.jar，选择客户端（Client）安装就行了，然后再去官方启动器里就能找到forge-1.21.8版本了，我在m2的macbook上的win11虚拟机中双击并没有反应，查了一下其对OpenGL支持不足，所以大概只能在Intel的windows上能运行！

#### 2.2.2. 🍎Mac OS

打开终端，按顺序执行：
::: warning
下面第三行“java -jar”之后跟着的目录以你实际forge安装包下载路径为准，如果是默认情况，只要把路径中的\<username\>替换为你mac的用户名就好了。

还有一种方法是在输入“java -jar ”（不要漏了最后的空格）后，从访达中把你下载的.jar安装包拖到终端中，也会自动输入路径，然后再输入接下去的内容。
:::

```zsh{3}
ls ~/Library/'Application Support'/minecraft # 目录是否正常，只要没提示No such file...即可
cd ~/Library/'Application Support'/minecraft # 前往这个目录
java -jar /Users/<username>/Downloads/forge-1.21.8-58.0.9-installer.jar nogui --installClient
# 等安装完成，比服务端快很多
ls ~/Library/'Application Support'/minecraft/versions
# 检查一下，输出中应该会有类似“1.21.8-forge-58.0.9”的，证明安装好了。

```

然后再打开启动器，不出意外的话会有Forge选项了，选上后启动游戏，然后在多人游戏-直接加入中输入服务器公网ip:25565，就能愉快的游戏了。

[![forge_client](https://origin.picgo.net/2025/08/25/forge_clientfb3efe60fe728ee1.webp)](https://www.picgo.net/image/forge-client.0Gogsq)
