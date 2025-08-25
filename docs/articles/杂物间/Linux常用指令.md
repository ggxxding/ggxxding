---
title: Linux常用指令
createDate: 2025-8-21 22:28:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
本文记录一些Linux系统自带的指令使用方法和常用参数，包括ps、vim等。

虽然现在有大模型助力，记不起的指令、不会用的指令全部问大模型就ok了，但还是写一篇备忘录性质的文章来记录一下常用指令，方便自己查询，ctrl + f 还是要比大模型生成内容速度快的！
:::

## 文件操作

### pwd/cp/mv/rm/cat...

```bash
pwd # 当前目录
cp file1 file2       # 复制文件
cp file1 /tmp/       # 复制到目录
cp -r dir1 dir2      # 递归复制整个目录
mv old.txt new.txt   # 重命名
mv file1 /tmp/       # 移动文件
rm file1         # 删除文件
rm -r dir1       # 删除目录（递归）
rm -rf dir1      # 强制删除（危险⚠️）
cat file.txt    # 查看文件内容
less file.txt    # 上下翻页，更灵活
more file.txt    # 只能向下翻页
head -n 20 file.txt   # 前 20 行
tail -n 20 file.txt   # 后 20 行
tail -f log.txt       # 实时追踪文件更新（常用于日志）

```

### ls

::: info
很基础的指令，但是参数比较多有时候也会忘记。
:::

```bash
ls            # 列出当前目录文件
ls -l         # 详细列表（权限、所有者、大小、修改时间等）
ls -a         # 显示隐藏文件（以.开头的文件）
ls -lh        # 人类可读的大小（KB、MB）
ls /etc       # 列出指定目录
```

## 系统与磁盘

### df/du/free

```bash
df -h    # 查看磁盘空间 -h人类可读（MB/GB）
du -sh /var/log   # 查看目录大小
du -sh *          # 查看当前目录下每个文件/文件夹大小
free -h
```

## 权限管理

### chmod

::: tip
权限有三类：所有者 (u)、所属组 (g)、其他人 (o)。
权限符：r(读)、w(写)、x(执行)。
:::

```bash
chmod 755 file.sh   # -rwxr-xr-x
chmod u+x file.sh   # 给所有者增加执行权限
chmod g-w file.sh   # 去掉组写权限
```

数字权限说明：

- r=4, w=2, x=1
- 755 → rwxr-xr-x
- 644 → rw-r--r--

## 用户进程

### whoami/top

```bash
whoami # 当前登录用户
top        # CPU、内存状态
htop       # 更美观的交互界面（需要安装）

```

### ps/kill

```bash
ps             # 查看当前用户的进程
ps -ef         # 查看所有进程（完整格式）
ps aux         # 查看更详细的进程信息
ps aux | grep ssh   # 查找包含 ssh 的进程
kill 1234        # 结束进程号为 1234 的进程
kill -9 1234     # 强制结束
```

## 网络

### ssh/scp/sftp

```bash
# -p 端口（可省略，默认22）
ssh user@hostname -p 2222
# 上传到远程
scp test.txt root@123.45.67.89:/home/user/
# 下载到本地
scp root@123.45.67.89:/home/user/test.txt .
# 目录要加-r
scp -r 本地目录 用户名@远程主机IP:远程目录
# 如果ssh端口不是22，用-P指定
scp -P 2345 test.txt user@123.45.67.89:/home/user/
# 交互式传输
sftp 用户名@远程主机IP # 连接远程主机
put 本地文件 # 上传
get 远程文件 # 下载
put -r 本地目录 # 上传目录
get -r 远程目录 # 下载目录
```

### ping/curl/wget/ifconfig

```bash
ping baidu.com # 测试联通性
curl https://example.com    #  访问网页内容
wget https://example.com/file.zip   # 下载
ifconfig      # 查看网络接口信息（老命令）
ip addr       # 查看 IP 地址
```

## 实用工具

### vim

::: info
我平时用vim都是做一些简单的文档编辑，翻页、搜索等指令都不太熟悉，真的遇到复杂操作还是选择把文件传到本地，改完了再传回服务器，其实也挺麻烦的，写本文的最主要目的也是记录一下vim的常用操作，以后尽量在终端内干完所有活。

Vim的三个模式就不科普了，主要记录指令。
:::

1. 进入/退出

```bash
vim filename # 打开文件
:w # 保存
:q # 退出
:wq # 保存并退出
:q! # 强制退出（不保存）
:x # 保存并退出（等价于 :wq）
```

2. 模式切换

```bash
i # 插入模式（光标前插入）
I # 插入模式（行首插入）
a # 插入模式（光标后插入）
A # 插入模式（行尾插入）
o # 在下一行新建一行并进入插入模式
O # 在上一行新建一行并进入插入模式
Esc # 返回普通模式
```

3. 光标移动

```bash
h # 左移
l # 右移
j # 上
k # 下
0 # 移动到行首
^ # 移动到行首第一个非空字符
$ # 移动到行尾
gg # 文件开头
G # 文件结尾
:n # 跳到第 n 行
Ctrl + f # 向下翻页
Ctrl + b # 向上翻页
Ctrl + d # 向下翻半页
Ctrl + u # 向上翻半页
```

4. 编辑操作

```bash
x # 删除光标所在字符
dd # 删除当前行
ndd # 删除从当前行开始的 n 行
yy # 复制当前行
nyy # 复制 n 行
p # 粘贴到光标后
P # 粘贴到光标前
u # 撤销（undo）
Ctrl + r # 重做（redo）
```

5. 搜索与替换

```bash
/word # 向下搜索 word
?word # 向上搜索 word
n # 下一个匹配
N # 上一个匹配
:s/old/new/ # 替换当前行第一个 old 为 new
:s/old/new/g # 替换当前行所有 old
:%s/old/new/g # 替换整个文件所有 old
:%s/old/new/gc # 替换整个文件并确认
```

6. 可视模式

```bash
v # 字符可视模式
V # 行可视模式
Ctrl + v # 块可视模式（矩形选择）
在选区后可配合 d（删除）、y（复制）、p（粘贴）
```

7. 分屏

```bash
:sp filename # 水平分屏
:vsp filename # 垂直分屏
Ctrl + w + w # 光标在分屏间切换
Ctrl + w + q # 关闭当前分屏
```

8. 其他常用

```bash
:set nu # 显示行号
:set nonu # 取消行号
:syntax on # 开启语法高亮
:noh # 取消搜索高亮
```

### tar

1. 创建归档文件

```bash
# 创建 tar 包（不压缩）
tar -cf archive.tar 文件或目录
# 创建 tar.gz 压缩包（gzip 压缩）
tar -czf archive.tar.gz 文件或目录
# 创建 tar.bz2 压缩包（bzip2 压缩）
tar -cjf archive.tar.bz2 文件或目录
# 创建 tar.xz 压缩包（xz 压缩）
tar -cJf archive.tar.xz 文件或目录
参数说明：
c → create，创建新归档
f → file，指定归档文件名
z → gzip 压缩
j → bzip2 压缩
J → xz 压缩
```

2. 解压归档文件

```bash
# 解压 tar 包
tar -xf archive.tar
# 解压 tar.gz 包
tar -xzf archive.tar.gz
# 解压 tar.bz2 包
tar -xjf archive.tar.bz2
# 解压 tar.xz 包
tar -xJf archive.tar.xz
参数说明：
x → extract，解压
v - 显示详细过程
```

3. 查看归档内容

```bash
# 查看 tar 包内容（不解压）
tar -tf archive.tar
# 查看压缩包内容
tar -tzf archive.tar.gz
tar -tjf archive.tar.bz2
tar -tJf archive.tar.xz
参数说明：
t → list，列出归档内容
```

4. 追加/更新文件

```bash
# 追加文件到已有 tar 包
tar -rf archive.tar 新文件或目录
# 更新已有文件（如果新文件比原来新）
tar -uf archive.tar 文件
注意：压缩包（如 .tar.gz）通常不能直接追加，需要先解压再重新打包。
```

5. 排除文件

```bash
# 创建 tar 包时排除某些文件
tar -czf archive.tar.gz /path/to/dir --exclude="*.log"
```

6. 其他常用选项

```bash
--strip-components=N → 解压时去掉前 N 级目录
tar -xzf archive.tar.gz --strip-components=1
-C → 切换目录后操作
tar -xzf archive.tar.gz -C /目标目录
```
