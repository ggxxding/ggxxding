// usage: node compress-image.js
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = path.resolve('./img_to_compress')
const backupDir = path.resolve('./img_backup')
const quality = 70 // 压缩质量
const maxWidth = 1600 // 最大宽度
const rotate = 0 //旋转角度

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file)
}

// 递归遍历文件夹
function getAllFiles(dir) {
  let results = []
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath))
    } else {
      results.push(filePath)
    }
  }
  return results
}

async function processImage(filePath) {
  const relativePath = path.relative(inputDir, filePath)
  const backupPath = path.join(backupDir, relativePath)
  const dirName = path.dirname(filePath)

  // 创建备份目录
  fs.mkdirSync(path.dirname(backupPath), { recursive: true })

  // 备份原图
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath)
  }

  // 压缩为 JPEG
  await sharp(backupPath)
    .rotate(rotate, { withoutEnlargement: true })
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality })
    .toFile(filePath)

  // 生成 WebP
  await sharp(backupPath)
    .rotate(rotate, { withoutEnlargement: true })
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(filePath.replace(/\.(jpe?g|png)$/i, '.webp'))

  console.log(`✅ 压缩完成: ${relativePath}`)
}

;(async () => {
  console.log('开始压缩图片...')
  const files = getAllFiles(inputDir).filter(isImage)

  for (const file of files) {
    await processImage(file)
  }

  console.log(`🎉 全部完成！共处理 ${files.length} 张图片`)
})()
