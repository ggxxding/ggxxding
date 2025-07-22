<template>
  <el-card style="max-width: 720px">
  <el-form :inline="true" :model="quotient" class="demo-form-inline">
    <el-form-item label="">
      <el-input v-model="quotient.dividend"  clearable />
    </el-form-item>
    <el-form-item label="÷">
      <el-input v-model="quotient.divisor" clearable />
    </el-form-item>
  </el-form>

  <el-form  class="demo-form-inline">
    <el-form-item>
      <el-button  @click="clear">Clear</el-button>
    </el-form-item>
  </el-form>

  <el-descriptions title="" :column="2" border>
    <el-descriptions-item label="商" width="100px">{{quotient.quotient}}</el-descriptions-item>
    <el-descriptions-item label="余数" width="100px">{{quotient.remainder}}</el-descriptions-item>
  </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { quotientStore } from '../stores/jsonTools'
const quotient = quotientStore()

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
</style>