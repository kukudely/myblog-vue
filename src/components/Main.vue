<template>
    <el-row :gutter="20">
    <!-- left -->
        <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content ep-bg-purple" />

            <!-- <Nav></Nav> -->
            <div v-show="screenWidth>768">
                <el-card class="box-card box-card-left">
                <div style="margin: 0 auto; width:fit-content;">
                    <el-avatar :size="100" :src="myImg"/>
                </div>
                <div style="margin: 0 auto; width:fit-content;">
                    <span>{{myName}}</span>
                </div>
                <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
                </el-card>
                <!-- 分类 -->
                <el-card class="box-card box-card-left">
                    <div v-for="item in cateList" id="cate" style="margin-bottom: 5px;">
                        <div style="display: inline;">{{item.name}}</div>
                        
                        <div style="display: inline; float: right; text-align: center;border-radius:5px;width: 25px; background-color:#e2ebf0;">
                            {{this.cateArticleList.get(item.id)}}
                        </div>
                    </div>
                </el-card>
            </div>
            
            <div v-show="screenWidth <= 992 && screenWidth>=768">
                <el-card class="box-card box-card-right">
                <span>最近文章</span>

                <div style="margin-top: 10px;" v-for="item in recentArtList" class="text item">
                   
                    <p>{{item.CreatedAt}}</p>
                    <el-link @click="$router.push(`/ArticleContent/${item.ID}`)">{{item.title}}</el-link>
                    <el-divider />
                </div>
                
            </el-card>
                <!-- <el-card class="box-card box-card-right">
                    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                </el-card> -->
            </div>
           

        </el-col>
        <!-- middle -->
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12" id="col-main"><div class="grid-content ep-bg-purple" />
            <router-view :key="$route.path"></router-view>
        </el-col>

        <!-- right -->
        <el-col :xs="24" :sm="1" :md="6" :lg="6" :xl="6" id="col-right" v-show="screenWidth >= 992 || screenWidth<=768"><div class="grid-content ep-bg-purple" />
            
            <div v-show="screenWidth<=768">
                <el-card class="box-card box-card-left">
                <div style="margin: 0 auto; width:fit-content;">
                    <el-avatar :size="100" :src="myImg"/>
                </div>
                <div style="margin: 0 auto; width:fit-content;">
                    <span>{{myName}}</span>
                </div>
                <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
                </el-card>
                <!-- <el-card class="box-card box-card-left">
                    
                </el-card> -->
            </div>
            
            <el-card class="box-card box-card-right">
                <span>最近文章</span>

                <div style="margin-top: 10px;" v-for="item in recentArtList" class="text item">
                   
                    <p>{{item.CreatedAt}}</p>
                    <el-link @click="$router.push(`/ArticleContent/${item.ID}`)">{{item.title}}</el-link>
                    <el-divider />
                </div>
                
            </el-card>
            <!-- <el-card class="box-card box-card-right">
                <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card> -->

        </el-col>
    </el-row>
</template>
<style>
#col-main{
    padding-bottom: 20px;
}
.box-card-left, .box-card-right{
    margin-bottom: 20px;
}
.box-card-main{
    margin-bottom: 10px;
}
#cate{
    padding: 5px;
    font-size: 10px;
}
#cate:hover{
    background-color: #e2ebf0;
    border-radius: 5px;
}
</style>
<script>
// import ArticleList from './ArticleList.vue'

// import { getTransitionRawChildren, reactive, toRefs} from 'vue'


// const state = reactive({
//   circleUrl:
//     'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//   squareUrl:
//     'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
//   sizeList: ['small', '', 'large'],
// })

// const { circleUrl, squareUrl, sizeList } = toRefs(state)
export default {
    name : "main",
    // 注册属性
    // props: {
    //     screenWidths: {
    //         type: Number,
    //         default: 992,
    //     },
    // },
    // beforeCreate(){
        
    // },
    created() {
        this.getProfile()
        this.getCateList()
        this.getRecentArtList()
        // this.getArticleList()
        const that = this
        window.onload = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }

        
    },
    beforeMount(){
        
    },
    mounted() {
        // mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
        //this.getProfile()
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })() 
        }
    },
    data() {
        return {
            screenWidth: 992,
            myName: "",
            myImg:" ",
            profile:{},
            currentPage:1, //默认当前页面为1
            total: 1, //总共有多少数据
            pageSize: 20,
            artList: [],
            cateList: [],
            recentArtList:[],
            recentArtListLength:4,
            // cateArticleList: [],
            cateArticleList:new Map(),
        };
    },
    methods: {
        // 获取个人信息
        async getProfile() {
            const { data: res } = await this.$http.get(`profile/2`)
            this.myName = res.data.name
            this.myImg = res.data.img
        },
        async getCateList() {
            const { data: res } = await this.$http.get(`category`)
            this.cateList = res.data
            for (let i = 0; i < this.cateList.length; i++) {

                this.getCateArtList(this.cateList[i].id)
            }
        },
        async getRecentArtList() {
            const { data: res } = await this.$http.get(`recentart`,{
                params: {
                    artnums: this.recentArtListLength,
                }
            })
            this.recentArtList = res.data
            for (let i = 0; i < this.recentArtListLength; i++) {
                this.recentArtList[i].CreatedAt = this.recentArtList[i].CreatedAt.substr(0,10);
            }
            console.log(this.recentArtList)
        },
        async getCateArtList(id) {
            const { data: res } = await this.$http.get(`article/list/${id}`)
            this.cateArticleList.set(id, res.total)
            // this.cateArticleList.push(res.total)
            // console.log(this.cateArticleList)
        },
    },
    destroyed() {
        window.onresize = null;
    },
}

</script>