---
title: FFmpeg使用
createDate: 2025-8-13 15:52:00
outline: deep
---

# {{ $frontmatter.title}}

::: info
FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。很多视频处理软件都是基于FFmpeg。

有时候直接安装使用ffmpeg效率要比安装一堆软件来的高，因此新建一个文档专门记录有用的ffmpeg指令。
:::

## 基础操作

### 格式转化、裁剪等

```zsh
# 转换视频格式 (也可转为gif)
ffmpeg -i input.mp4 output.mkv

# 指定编码器（H.264）
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium output.mp4

# 无损转码（仅封装格式变化）
ffmpeg -i input.mp4 -c copy output.mkv

# 缩放到 1280x720
ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4

# 按比例缩放（宽 1280，高自适应）
ffmpeg -i input.mp4 -vf "scale=1280:-1" output.mp4

# 修改帧率为 30fps
ffmpeg -i input.mp4 -r 30 output.mp4
```

### 图片视频互转

```zsh
# 视频转图片（每秒 1 张）
ffmpeg -i input.mp4 -vf fps=1 img_%03d.png

# 图片序列合成视频
ffmpeg -framerate 25 -i img_%03d.png -c:v libx264 -pix_fmt yuv420p output.mp4

# 视频转 GIF（优化调色板）
ffmpeg -i input.mp4 -vf "fps=10,scale=480:-1:flags=lanczos,palettegen" palette.png
ffmpeg -i input.mp4 -i palette.png -filter_complex "fps=10,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif
```

### 字幕水印

```zsh
# 添加字幕（硬字幕）
ffmpeg -i input.mp4 -vf subtitles=subtitles.srt output.mp4

# 添加图片水印
ffmpeg -i input.mp4 -i logo.png -filter_complex "overlay=10:10" output.mp4
```

### 合并与拼接

```zsh
# 同编码文件直接拼接
echo "file 'part1.mp4'" > list.txt
echo "file 'part2.mp4'" >> list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4

# 不同编码需转码拼接
ffmpeg -i "concat:part1.mp4|part2.mp4" -c:v libx264 -crf 23 output.mp4
```

## 应用场景

### 视频转gif

```zsh
# 直接转，可能体积巨大
ffmpeg -i input.mp4 output.gif

# 截取片段：-ss 是起始时间，-t 是持续时间（秒）
# 裁剪：crop=宽:高:起始x:起始y
# 生成调色板palettegen（保证 GIF 色彩效果好）：
ffmpeg -ss 00:00:03 -t 8 -i input.mp4 -vf "crop=1080:960:0:150,fps=10,scale=480:-1:flags=lanczos,palettegen" palette.png
# 用调色板生成 GIF：
ffmpeg -ss 00:00:03 -t 8 -i input.mp4  -i palette.png -filter_complex "crop=1080:960:0:150,fps=10,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif
```
