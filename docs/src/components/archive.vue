<script setup>
import { data as posts } from '../../.vitepress/utils/posts.data.mjs'
import { withBase } from 'vitepress'
const yearMap = {}
posts.forEach((item) => {
    const year = new Date(item.frontmatter.createDate).getFullYear()
    if (!yearMap[year]) {
        yearMap[year] = []
    }
    yearMap[year].push(item);
})
console.log(yearMap)
</script>

<template>
    <el-card  shadow="hover" v-for="year in Object.keys(yearMap)" :key="year">
        <template #header>
        <div class="card-header">
        <span>{{year}}</span>
        </div>
        </template>
        <a v-for="item in yearMap[year]" :key="item" class="text item" :href="withBase(item.url)">
            <div>
                <span>
                {{ item.frontmatter.title }}
                </span>
                <!-- <span>
                 {{ item.frontmatter.createDate }}
                 </span> -->
            </div>
        </a>
        <!-- <template #footer>Footer content</template> -->
    </el-card>
</template>