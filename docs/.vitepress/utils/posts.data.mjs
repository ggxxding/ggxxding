// 自动生成归档
import { createContentLoader } from 'vitepress'

export default createContentLoader('/**/*.md', {
  // includeSrc: true,   // 包含原始 markdown 源?
  // render: true,   // 包含渲染的整页 HTML?
  // excerpt:true,   // 包含摘录?
  transform(rawData) {
    const blockedTitles = ['HOME', 'TODO list', '归档', '本站历史', '关于我', 'How to build']
    rawData = rawData.filter((item) => !blockedTitles.includes(item.frontmatter.title))
    rawData.sort((a, b) => {
      return +new Date(b.frontmatter.createDate) - +new Date(a.frontmatter.createDate)
    })
    return rawData
  },
})
