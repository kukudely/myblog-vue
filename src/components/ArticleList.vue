<template>
    <el-card class="box-card box-card-main" 
            v-for="item in artList" 
            link
            @click="$router.push(`/ArticleContent/${item.ID}`)"
            style="cursor: pointer;">
        <div>
            <el-image :src=item.img />
        </div>
        <div style="font-size: 25px;padding: 5px; font-family:微软雅黑;">
            <!-- {{item.ID}} -->
            {{item.title}}
        </div>
        <div style="padding: 5px; font-family:微软雅黑;">
            &nbsp;&nbsp;&nbsp;&nbsp;{{item.desc}}
        </div>
    </el-card>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size=pageSize :total=total />
</template>

<script>
export default {
    name : "ArticleList",
    
    created() {
        this.getArticleList()
    },
    data() {
        return {
            articleTitle:'',
            articleDesc:'',
            currentPage:1, //默认当前页面为1
            total: 1, //总共有多少数据
            pageSize: 3,
            artList: [],
        };
    },
    methods: {
        async handleCurrentChange(val){
            this.currentPage = val
            console.log(val)
            this.getArticleList()
        },
        async getArticleList() {
            const { data: res } = await this.$http.get(`article`,{
                params: {
                    pagesize: this.pageSize,
                    pagenum: this.currentPage
                }
            })
            this.artList = res.data
            this.total = res.total
            console.log(this.artList)
        },
    },
}
</script>