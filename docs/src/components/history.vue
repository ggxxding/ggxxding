<template>
  <el-timeline style="max-width: 600px" >
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
      :hollow= "true"
      :size= "activity.size"
      style="list-style: none;"
    >
      <ul>
        <li v-for="item in activity.content" :key="item">
          {{ item }}
        </li>
      </ul>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: [
      '完善历史页，用时间轴组件美化',
    ],
    timestamp: '2025-07-22',
    size: 'large'

  },
  {
    content: [
      '完善了归档页，按年份排序',
      '修复bug：发现safari访问归档页时如果createDate只设置到日期，会将其归为NaN，解决方法为将时间精确到秒',    
    ],
    timestamp: '2025-07-21',
    size: 'large'
  },
  {
    content: [
      '建站动机：从Pokemon GO传送宝可梦到Pokemon Home并在home整理盒子时，计划按图鉴顺序从1号盒子开始排序，实际操作时经常需要先从神百查询图鉴序号，再用余数计算器来确定应该放在第几个盒子的第几个位置，在线的余数计算器大多需要输入数字后再点击“计算”，于是~~懒癌发作~~，想做一个自用的跨平台小工具集合。起初计划用Electron写一个本地应用，奈何Mac系统无论怎么替换源都无法下载electron，后索性改用VitePress并部署到GitHub Page，VitePress主要用来做技术博客，也能在markdown文件直接导入vue组件，非常方便。',
      '建立VitePress项目并部署到github',
      '确立基本结构',
      '增加实时余数计算器工具'
    ],
    timestamp: '2025-07-18',
    size: 'large'
  },
]
</script>
