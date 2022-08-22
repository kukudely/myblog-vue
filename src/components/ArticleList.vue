<template>
    <el-card class="box-card box-card-main" v-for="o in 3">
        <div v-for="o in 15" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="3" :total=total />
</template>

<script>
export default {
    name : "main",
    
    data() {
        return {
            currentPage:1, //默认当前页面为1
            total: 200, //总共有多少数据
        };
    },
    methods: {
        async handleCurrentChange(val){
            this.currentPage = val
            console.log(this.currentPage)
        }
    },
}
</script>