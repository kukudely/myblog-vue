<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
      <div style="flex-grow: 1;" />
      <el-menu-item index="0" 
        link
        @click="$router.push(`/`)">LOGO</el-menu-item>
      <div style="flex-grow: 4;" />
      <div style="line-height: 58px;">
        <el-button :icon="Search" circle @click="$router.push(`/Search`)"/>
      </div>
      <!-- <el-menu-item index="2">Processing Center</el-menu-item>
      <el-menu-item index="3">Processing Center</el-menu-item> -->

    <div style="flex-grow: 1;" />
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Search,
} from '@element-plus/icons-vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>