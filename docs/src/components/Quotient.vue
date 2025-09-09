<template>
  <el-card style="max-width: 720px">
    <template #header>
      <div class="card-header">
        <span>余数计算器</span>
      </div>
    </template>
    <el-form :inline="true" :model="quotient" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="quotient.dividend" clearable />
      </el-form-item>
      <el-form-item label="÷">
        <el-input v-model="quotient.divisor" clearable />
      </el-form-item>
    </el-form>

    <el-form class="demo-form-inline">
      <el-form-item>
        <el-button @click="clear">Clear</el-button>
      </el-form-item>
    </el-form>

    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="商" width="100px">{{ quotient.quotient }}</el-descriptions-item>
      <el-descriptions-item label="余数" width="100px">{{
        quotient.remainder
      }}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-card style="max-width: 720px">
    <template #header>
      <div class="card-header">
        <span>全国图鉴</span>
      </div>
    </template>
    <el-input v-model="pokedex.searchText" placeholder="搜索(支持ID/中/日/英文名)" />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>中文名</th>
          <th>日文名</th>
          <th>英文名</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in pokedex.filtered"
          :key="data.id"
          class="table-item"
          @click="quotient.dividend = data.id"
        >
          <td>{{ data.id }}</td>
          <td>{{ data.chinese }}</td>
          <td>{{ data.japanese }}</td>
          <td>{{ data.english }}</td>
        </tr>
      </tbody>
    </table></el-card
  >
</template>

<script lang="ts" setup>
import { easeInOutCubic } from 'element-plus/es/utils/easings.mjs'
import { quotientStore } from '../stores/jsonToolStore'
import { usePokedexStore } from '../stores/jsonToolStore'
const quotient = quotientStore()
const pokedex = usePokedexStore()

const clear = () => {
  quotient.clear()
}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.table-item:hover {
  background-color: gray;
  cursor: pointer;
  /* transition: transform 0.2s; */
}
</style>
