<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

/**
 * LatexSymbolPicker.vue
 * - 可搜索/分类/收藏/最近使用
 * - 点击即可复制 LaTeX 代码，并通过 `emit('insert', code)` 通知父组件
 * - 本组件不渲染 LaTeX，仅提供代码选择与复制；如需预览可在父级使用 KaTeX/MathJax
 */

// =============== Props / Emits ===============
const props = withDefaults(
  defineProps<{
    /** 分类tabs 顺序 */
    order?: string[]
    /** 本地存储 key（用于收藏/最近） */
    storageKey?: string
    /** 占位符样板中使用的光标标记，复制后便于查找替换 */
    cursorToken?: string
  }>(),
  {
    storageKey: 'latex-symbol-picker',
    cursorToken: '▮',
    order: [
      '常用',
      '希腊字母',
      '关系与运算',
      '集合与逻辑',
      '箭头',
      '定界符',
      '微积分',
      '格式与修饰',
      '模板',
    ],
  },
)

const emit = defineEmits<{
  /** 选择或复制某条目时触发 */
  (e: 'insert', code: string): void
}>()

// =============== 数据：符号库 ===============
// 说明：preview 仅用于按钮上可视化（若可直接使用 Unicode），code 是复制到剪贴板的 LaTeX 片段
// 对于“模板”类，code 内包含光标占位符 token（默认为 ▮），便于粘贴后快速定位

interface Entry {
  name: string
  code: string
  preview?: string
  aliases?: string[]
}
interface Catalog {
  [category: string]: Entry[]
}

const db: Catalog = reactive({
  常用: [
    { name: '分数', code: `\\frac{${props.cursorToken}}{}`, preview: 'a/b', aliases: ['fraction'] },
    { name: '开方', code: `\\sqrt{${props.cursorToken}}`, preview: '√', aliases: ['sqrt'] },
    { name: '求和', code: `\\sum_{i=1}^{n} ${props.cursorToken}`, preview: '∑' },
    { name: '积分', code: `\\int ${props.cursorToken}\\,dx`, preview: '∫' },
    { name: '向量', code: `\\vec{${props.cursorToken}}`, preview: '→' },
    { name: '粗体', code: `\\mathbf{${props.cursorToken}}` },
    { name: '集合空集', code: `\\varnothing`, preview: '∅', aliases: ['empty set', 'emptyset'] },
    { name: '实数集', code: `\\mathbb{R}`, preview: 'ℝ' },
  ],
  希腊字母: [
    { name: 'alpha', code: `\\alpha`, preview: 'α' },
    { name: 'beta', code: `\\beta`, preview: 'β' },
    { name: 'gamma', code: `\\gamma`, preview: 'γ' },
    { name: 'Gamma', code: `\\Gamma`, preview: 'Γ' },
    { name: 'delta', code: `\\delta`, preview: 'δ' },
    { name: 'Delta', code: `\\Delta`, preview: 'Δ' },
    { name: 'theta', code: `\\theta`, preview: 'θ' },
    { name: 'Theta', code: `\\Theta`, preview: 'Θ' },
    { name: 'lambda', code: `\\lambda`, preview: 'λ' },
    { name: 'Lambda', code: `\\Lambda`, preview: 'Λ' },
    { name: 'mu', code: `\\mu`, preview: 'μ' },
    { name: 'pi', code: `\\pi`, preview: 'π' },
    { name: 'Pi', code: `\\Pi`, preview: 'Π' },
    { name: 'sigma', code: `\\sigma`, preview: 'σ' },
    { name: 'Sigma', code: `\\Sigma`, preview: 'Σ' },
    { name: 'phi', code: `\\varphi`, preview: 'φ', aliases: ['phi', 'varphi'] },
    { name: 'omega', code: `\\omega`, preview: 'ω' },
    { name: 'Omega', code: `\\Omega`, preview: 'Ω' },
  ],
  关系与运算: [
    { name: '等于', code: `=`, preview: '=' },
    { name: '不等于', code: `\\neq`, preview: '≠' },
    { name: '约等于', code: `\\approx`, preview: '≈' },
    { name: '恒等', code: `\\equiv`, preview: '≡' },
    { name: '小于等于', code: `\\leq`, preview: '≤' },
    { name: '大于等于', code: `\\geq`, preview: '≥' },
    { name: '正负号', code: `\\pm`, preview: '±' },
    { name: '乘号', code: `\\times`, preview: '×' },
    { name: '除号', code: `\\div`, preview: '÷' },
    { name: '点乘', code: `\\cdot`, preview: '⋅' },
    { name: '比例', code: `\\propto`, preview: '∝' },
  ],
  集合与逻辑: [
    { name: '属于', code: `\\in`, preview: '∈' },
    { name: '不属于', code: `\\notin`, preview: '∉' },
    { name: '子集', code: `\\subset`, preview: '⊂' },
    { name: '子集等于', code: `\\subseteq`, preview: '⊆' },
    { name: '并集', code: `\\cup`, preview: '∪' },
    { name: '交集', code: `\\cap`, preview: '∩' },
    { name: '存在', code: `\\exists`, preview: '∃' },
    { name: '任意', code: `\\forall`, preview: '∀' },
    { name: '无穷', code: `\\infty`, preview: '∞' },
    { name: '空心 N', code: `\\mathbb{N}`, preview: 'ℕ' },
    { name: '空心 Z', code: `\\mathbb{Z}`, preview: 'ℤ' },
  ],
  箭头: [
    { name: '右箭头', code: `\\to`, preview: '→', aliases: ['rightarrow'] },
    { name: '双向', code: `\\leftrightarrow`, preview: '↔' },
    { name: '蕴含', code: `\\Rightarrow`, preview: '⇒' },
    { name: '等价', code: `\\Leftrightarrow`, preview: '⇔' },
    { name: '映射到', code: `\\mapsto`, preview: '↦' },
    { name: '上箭头', code: `\\uparrow`, preview: '↑' },
    { name: '下箭头', code: `\\downarrow`, preview: '↓' },
  ],
  定界符: [
    { name: '花括号', code: `\\{ ${props.cursorToken} \\}`, preview: '{ }', aliases: ['brace'] },
    { name: '方括号', code: `\\left[ ${props.cursorToken} \\right]`, preview: '[ ]' },
    { name: '尖括号', code: `\\langle ${props.cursorToken} \\rangle`, preview: '⟨ ⟩' },
    { name: '竖线', code: `\\lvert ${props.cursorToken} \\rvert`, preview: '| |' },
    { name: '范数', code: `\\lVert ${props.cursorToken} \\rVert`, preview: '‖ ‖' },
    {
      name: '地板/天花',
      code: `\\lfloor ${props.cursorToken} \\rfloor`,
      preview: '⌊ ⌋',
      aliases: ['floor'],
    },
  ],
  微积分: [
    { name: '极限', code: `\\lim_{${props.cursorToken} \\to 0}`, preview: 'lim' },
    { name: '偏导', code: `\\frac{\\partial ${props.cursorToken}}{\\partial x}`, preview: '∂' },
    { name: '梯度', code: `\\nabla ${props.cursorToken}`, preview: '∇' },
    { name: '连乘', code: `\\prod ${props.cursorToken}`, preview: '∏' },
    { name: '连和', code: `\\sum ${props.cursorToken}`, preview: '∑' },
    { name: '二重积分', code: `\\iint ${props.cursorToken}\\,dx\\,dy`, preview: '∬' },
  ],
  格式与修饰: [
    { name: '上帽', code: `\\hat{${props.cursorToken}}` },
    { name: '上横', code: `\\overline{${props.cursorToken}}` },
    { name: '下划线', code: `\\underline{${props.cursorToken}}` },
    { name: '花体', code: `\\mathcal{${props.cursorToken}}` },
    { name: '黑板体', code: `\\mathbb{${props.cursorToken}}` },
    { name: '粗体向量', code: `\\boldsymbol{${props.cursorToken}}` },
  ],
  模板: [
    {
      name: '矩阵(2x2)',
      code: `\\begin{bmatrix} a & b \\ \\ c & d \\end{bmatrix}`,
      preview: '[ ]',
    },
    {
      name: '行向量',
      code: `\\begin{bmatrix} ${props.cursorToken}_1 & ${props.cursorToken}_2 & \\cdots & ${props.cursorToken}_n \\end{bmatrix}`,
    },
    {
      name: '分段函数',
      code: `\\begin{cases} ${props.cursorToken}, & x>0 \\ \\ 0, & x=0 \\end{cases}`,
    },
    { name: '带上下标', code: `${props.cursorToken}_{i}^{j}` },
    { name: '括号自动扩展', code: `\\left( ${props.cursorToken} \\right)` },
  ],
})

// =============== 状态 ===============
const search = ref('')
const activeTab = ref<string>(props.order[0])
const toast = reactive({ show: false, text: '' })
const store = reactive({ favorites: new Set<string>(), recents: [] as string[] })

// =============== 本地存储 ===============
function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(props.storageKey) || '{}')
    store.favorites = new Set<string>(raw.favorites || [])
    store.recents = Array.isArray(raw.recents) ? raw.recents.slice(0, 40) : []
  } catch {}
}
function saveStore() {
  const raw = { favorites: Array.from(store.favorites), recents: store.recents.slice(0, 40) }
  localStorage.setItem(props.storageKey, JSON.stringify(raw))
}

onMounted(loadStore)
watch(() => [store.favorites.size, store.recents.join('|')], saveStore, { deep: true })

// =============== 工具 ===============
function includesI(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase())
}

function flatEntries(cat?: string) {
  const cats = cat ? [cat] : Object.keys(db)
  const out: (Entry & { category: string; key: string })[] = []
  for (const c of cats) {
    for (const e of db[c]) out.push({ ...e, category: c, key: `${c}::${e.name}::${e.code}` })
  }
  return out
}

const allEntries = computed(() => flatEntries())

const filtered = computed(() => {
  const term = search.value.trim()
  let base: (Entry & { category: string; key: string })[]

  if (activeTab.value === '常用') {
    // 常用=收藏在前 + 最近 组合
    const fav = allEntries.value.filter((e) => store.favorites.has(e.key))
    const rec = allEntries.value
      .filter((e) => store.recents.includes(e.key))
      .sort((a, b) => store.recents.indexOf(a.key) - store.recents.indexOf(b.key))
    base = [...fav, ...rec]
    // 去重：按 key 保留首次出现
    const seen = new Set<string>()
    base = base.filter((e) => (seen.has(e.key) ? false : (seen.add(e.key), true)))
  } else {
    base = flatEntries(activeTab.value)
  }

  if (!term) return base

  return base.filter(
    (e) =>
      includesI(e.name, term) ||
      includesI(e.code, term) ||
      (e.aliases || []).some((a) => includesI(a, term)),
  )
})

async function copy(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    showToast('已复制')
  } catch {
    fallbackCopy(code)
  }
}

function fallbackCopy(code: string) {
  const ta = document.createElement('textarea')
  ta.value = code
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
  showToast('已复制')
}

function showToast(text: string) {
  toast.text = text
  toast.show = true
  window.setTimeout(() => (toast.show = false), 1200)
}

function onPick(e: Entry & { key: string }) {
  copy(e.code)
  emit('insert', e.code)
  // 记录最近
  store.recents = [e.key, ...store.recents.filter((k) => k !== e.key)].slice(0, 40)
}

function toggleFavorite(e: Entry & { key: string }) {
  if (store.favorites.has(e.key)) store.favorites.delete(e.key)
  else store.favorites.add(e.key)
}

// 键盘导航（左右切换 tab，回车复制）
function onKeydownTabs(ev: KeyboardEvent, idx: number) {
  if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
    ev.preventDefault()
    const dir = ev.key === 'ArrowRight' ? 1 : -1
    const order = props.order
    const next = (idx + dir + order.length) % order.length
    activeTab.value = order[next]
  }
}
</script>

<template>
  <div class="lsp-wrapper" role="group" aria-label="LaTeX 符号选择器">
    <div class="lsp-top">
      <input
        v-model="search"
        type="search"
        class="lsp-search"
        placeholder="搜索：名称 / 代码 / 别名… (例如: alpha, sum, subseteq)"
        aria-label="搜索符号"
      />
    </div>

    <div class="lsp-tabs" role="tablist" aria-label="分类">
      <button
        v-for="(t, i) in props.order"
        :key="t"
        role="tab"
        :aria-selected="activeTab === t"
        :class="['lsp-tab', { active: activeTab === t }]"
        @click="activeTab = t"
        @keydown="onKeydownTabs($event, i)"
      >
        {{ t }}
      </button>
    </div>

    <div class="lsp-grid" role="listbox" aria-label="符号列表">
      <button
        v-for="e in filtered"
        :key="e.key"
        class="lsp-item"
        role="option"
        :aria-label="`${e.name} (${e.code})`"
        @click="onPick(e)"
      >
        <div class="lsp-item-top">
          <span class="lsp-preview" :title="e.code">{{ e.preview ?? e.name }}</span>
          <button
            type="button"
            class="lsp-fav"
            :aria-pressed="store.favorites.has(e.key)"
            :title="store.favorites.has(e.key) ? '取消收藏' : '收藏'"
            @click.stop="toggleFavorite(e)"
          >
            <svg
              v-if="store.favorites.has(e.key)"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zm-10 6.11l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 3.99 4.38.38-3.32 2.88 1 4.28L12 15.35z"
              />
            </svg>
          </button>
        </div>
        <div class="lsp-name">{{ e.name }}</div>
        <code class="lsp-code">{{ e.code }}</code>
      </button>

      <div v-if="filtered.length === 0" class="lsp-empty">无匹配结果</div>
    </div>

    <transition name="fade">
      <div v-if="toast.show" class="lsp-toast" role="status" aria-live="polite">
        {{ toast.text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lsp-wrapper {
  --b: #e5e7eb;
  --t: #111827;
  --mut: #6b7280;
  --bg: #ffffff;
  --bg2: #f9fafb;
  --pri: #2563eb;
  --ring: 0 0 0 3px rgba(37, 99, 235, 0.2);
  color: var(--t);
  background: var(--bg);
  border: 1px solid var(--b);
  border-radius: 16px;
  padding: 12px;
  max-width: 960px;
}
.lsp-top {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.lsp-search {
  flex: 1;
  border: 1px solid var(--b);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
}
.lsp-search:focus {
  outline: none;
  box-shadow: var(--ring);
  border-color: var(--pri);
}

.lsp-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 4px 2px;
  margin-bottom: 8px;
}
.lsp-tab {
  padding: 6px 10px;
  border: 1px solid var(--b);
  background: var(--bg2);
  color: var(--t);
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
}
.lsp-tab.active {
  background: var(--pri);
  border-color: var(--pri);
  color: #fff;
}

.lsp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
  align-items: stretch;
}
.lsp-item {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid var(--b);
  border-radius: 12px;
  padding: 10px;
  background: #fff;
  cursor: pointer;
}
.lsp-item:hover {
  border-color: var(--pri);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.lsp-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.lsp-preview {
  font-size: 20px;
  line-height: 1;
}
.lsp-name {
  font-size: 13px;
  color: var(--t);
}
.lsp-code {
  font-size: 12px;
  color: var(--mut);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lsp-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--mut);
  padding: 16px 0;
}
.lsp-fav {
  background: transparent;
  border: none;
  color: #f59e0b;
  cursor: pointer;
  opacity: 0.8;
}
.lsp-fav:hover {
  opacity: 1;
}

.lsp-toast {
  position: fixed;
  inset-inline: 0;
  top: 12px;
  margin: 0 auto;
  width: max-content;
  background: #111827;
  color: #fff;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<!--
用法：
1) 安装到你的 Vue / VitePress 站点，直接引入组件

  <LatexSymbolPicker @insert="onInsert" />

2) 在父组件监听 insert 事件，把 LaTeX 代码插入到 Markdown 编辑器或文本域：

  const textarea = ref<HTMLTextAreaElement | null>(null)
  function onInsert(code: string) {
    // 示例：插入到光标处
    if (!textarea.value) return
    const el = textarea.value
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    const before = el.value.slice(0, start)
    const after = el.value.slice(end)
    // 尝试将占位符 token 定位到光标
    const token = '▮'
    const idx = code.indexOf(token)
    let final = code
    let cursor = start + code.length
    if (idx >= 0) {
      final = code.replace(token, '')
      cursor = start + idx
    }
    el.value = before + final + after
    // 复位光标
    el.focus()
    el.setSelectionRange(cursor, cursor)
  }

3) 自定义：
   - 传入 `cursorToken` 可更改占位符；
   - 传入 `order` 覆盖分类顺序；
   - 修改 `db` 增减条目或接入外部 JSON。

4) 主题：
   - 可覆盖 .lsp-* 样式变量与类名，或放进你的 Design System。
-->
