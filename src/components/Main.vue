<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content ep-bg-purple" />

            <!-- <Nav></Nav> -->
            <el-card class="box-card box-card-left">
                <el-avatar :size="100" :src="circleUrl" />
                <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
            </el-card>
            <el-card class="box-card box-card-left">
                <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>

        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12"><div class="grid-content ep-bg-purple" />

            <el-card class="box-card">
                <div v-for="o in 50" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>

        </el-col>
        <el-col :xs="24" :sm="1" :md="6" :lg="6" :xl="6" id="col-right" v-show="screenWidth >= 992"><div class="grid-content ep-bg-purple" />

            <el-card class="box-card box-card-right">
                <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
            <el-card class="box-card box-card-right">
                <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>

        </el-col>
    </el-row>
</template>
<style>
.box-card-left, .box-card-right{
    margin-bottom: 20px;
}
</style>
<script lang="ts" setup>

import { reactive, toRefs} from 'vue'


const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, squareUrl, sizeList } = toRefs(state)

</script>