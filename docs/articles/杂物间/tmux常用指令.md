---
title: tmux常用指令
createDate: 2025-08-22 14:27:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
tmux是一个终端复用器（terminal multiplexer）。比screen更新，功能更多，更好用。

通俗说：它能在一个 SSH 连接或终端里，同时开多个窗口 / 分屏面板，并且断开连接后还能保持运行。

适合用来跑长时间运行、随时可以切入监控或发出控制指令的任务。
:::

## 基本概念

tmux具有层级化的概念：session → window → pane。

- Session（会话）：tmux 的最顶层容器，相当于一组终端窗口的集合。
- Window（窗口）：一个会话里的单个终端窗口，可以包含多个 Pane（分屏）。
- Pane（面板）：窗口里的分屏，可以水平或垂直拆分。

## 📌 会话管理

```bash
tmux new -s <name>	# 新建一个名为 <name> 的会话
tmux ls	            # 列出所有会话
tmux attach -t <name>	# 连接到名为 <name> 的会话
tmux detach （或 Ctrl+b d）	# 从当前会话分离（会话继续运行）
tmux kill-session -t <name>	# 关闭某个会话，也可以在会话内输入exit
tmux kill-server	        # 关闭所有 tmux 会话
```

## 📌 窗口（window）管理

```bash
Ctrl+b c	# 新建窗口
Ctrl+b n	# 切换到下一个窗口
Ctrl+b p	# 切换到上一个窗口
Ctrl+b <数字>	# 切换到指定编号的窗口
Ctrl+b ,	# 重命名当前窗口
Ctrl+b w	# 窗口列表选择切换
Ctrl+b &	# 关闭当前窗口
tmux select-window -t 2 # 选择第2个窗口
```

## 📌 面板（pane）管理

```bash
Ctrl+b %	# 垂直分割（左右分屏）
Ctrl+b "  	# 水平分割（上下分屏）
Ctrl+b <方向键>	# 在分屏之间切换
Ctrl+b z	# 当前 pane 放大/还原
Ctrl+b x	# 关闭当前 pane
Ctrl+b {	# 将 pane 左移
Ctrl+b }	# 将 pane 右移
Ctrl+b o	# 在所有 pane 之间切换
Ctrl+b q	# 显示 pane 编号（方便跳转）
tmux select-pane -t 2 # 选择第2个面板
```

## 📌 复制 & 滚动

```bash
Ctrl+b [	# 进入复制/滚动模式（上下翻屏）
在复制模式下，方向键 / PageUp / PageDown	# 向上/下翻滚
选中文本后 Enter	# 复制
Ctrl+b ]	    # 粘贴
```

## 📌 其他

```bash
Ctrl+b ?	# 显示所有快捷键
Ctrl+b t	# 显示时钟
Ctrl+b d	# 分离会话（detach）
Ctrl+b :	# 命令模式（输入 tmux 命令）
```
