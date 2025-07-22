---
outline: deep
title: api-examples
createDate: 2025-07-20 01:00:01
---
# Test elementUI
<el-button>Default</el-button>
<el-button type="primary">Primary</el-button>
<el-button type="success">Success</el-button>
<el-button type="info">Info</el-button>
<el-button type="warning">Warning</el-button>
<el-button type="danger">Danger</el-button>
<el-card style="max-width: 720px">

<el-form :inline="true" :model="formInline" class="demo-form-inline">
<el-form-item>
    <el-button  @click="clear">Clear</el-button>
    </el-form-item>
</el-form>

<el-descriptions title="" :column="2" border>
<el-descriptions-item label="商" width="100px">{{1}}</el-descriptions-item>
<el-descriptions-item label="余数" width="100px">{{22}}</el-descriptions-item>
</el-descriptions>
</el-card>

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
