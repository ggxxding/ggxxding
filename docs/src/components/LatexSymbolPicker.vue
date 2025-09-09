<template>
  <el-input
    :prefix-icon="Search"
    v-model="latexSymbolPicker.search"
    clearable
    placeholder="搜索：名称 / 代码 / 别名... (例如: alpha, sum, 大于等于)"
  />
  <el-tabs
    v-model="latexSymbolPicker.activateName"
    class="demo-tabs"
    type="border-card"
    @tab-click="handleClick"
  >
    <el-tab-pane v-for="tab in latexSymbolPicker.order" :key="tab" :label="tab" :name="tab">
      <el-scrollbar height="55vh">
        <div v-if="!latexSymbolPicker.filtered.length">
          <el-empty description="没有符合条件的latex符号！" />
        </div>
        <el-space v-else wrap :size="size" :direction="direction" style="width: 100%">
          <el-card
            class="latex-item"
            v-for="e in latexSymbolPicker.filtered"
            :key="e.key"
            shadow="hover"
            @click="onPick(e)"
          >
            <div class="latex-item-top">
              <span class="latex-preview">{{ e.preview }}</span>
            </div>
            <div>{{ e.name }}</div>
            <div class="latex-code">{{ e.code }}</div>
          </el-card>
        </el-space>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useLatexSymbolPickerStore } from '../stores/jsonToolStore'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const latexSymbolPicker = useLatexSymbolPickerStore()

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const direction = ref('horizontal')
const size = ref('small')
const fillRatio = ref(15)

async function copy(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('已复制:' + code)
  } catch {
    fallbackCopy(code) // 适用于旧浏览器
  }
}
function fallbackCopy(code) {
  const ta = document.createElement('textarea')
  ta.value = code
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
  ElMessage.success('已复制')
}
function onPick(e) {
  copy(e.code)
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.latex-preview {
  font-size: 24px;
  /* line-height: 1; */
}
.latex-code {
  font-family: monospace;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.latex-item {
  cursor: pointer;
  /* transition: transform 0.2s; */
}
.latex-item-top {
  display: flex;
  justify-content: space-between;
  /* align-items: center;
  margin-bottom: 8px; */
}
</style>
