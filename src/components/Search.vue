<template>
    <el-card class="box-card box-card-main">
        <el-input
            v-model="input1"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            :prefix-icon="Search"
        />
    </el-card>
    <el-card class="box-card box-card-main">
        <p>{{searchTips}}</p>
        <div style="margin-top: 10px;" v-for="item in allArtList" class="text item">
            <p>{{item.ID}}</p>
            <p>{{item.title}}</p>
            <el-link @click="$router.push(`/ArticleContent/${item.ID}`)">{{item.element}}</el-link>
            <el-divider />
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref,getCurrentInstance, ComponentInternalInstance, onMounted, watch } from 'vue'
const { appContext: { config: { globalProperties }} }  =  getCurrentInstance() as ComponentInternalInstance;
const input1 = ref()
let resp = ref()
let searchTime = ref()
let searchTips = ref("站内搜索引擎")
let allArtList = ref(new Array())
watch(input1,function(value,oldvalue){
    var timeSart=new Date().getTime()
    let key = value
    let content = resp.value
    allArtList.value = []
    if(key!=""){
        for (let i = 0; i < content.length; i++) {
        //每篇文章分别搜索
            let n = searchFromOneArt(key,content[i])
            if(n["keynums"] > 0){
                allArtList.value.push(n)
            }
        }
        function compare(pro='keynums',order='desc' ) { 
            return function (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) { 
                let val1 = obj1[pro]; 
                let val2 = obj2[pro]; 
                if(order=== 'desc'){
                    val1 =obj2[pro];
                    val2 = obj1[pro]; 
                }
                if (val2 < val1 ) { //正序
                    return 1; 
                } else if (val2 > val1 ) { 
                    return -1; 
                } else { 
                    return 0; 
                } 
            } 
        } 
        allArtList.value.sort(compare())
        var timeEnd=new Date().getTime()
        searchTime.value = timeEnd-timeSart
        searchTips.value="本次搜索得到"+allArtList.value.length+"条数据。"+"耗时："+searchTime.value+"ms"
    }else{
        searchTips.value = "站内搜索引擎"
        
    }
    


})
const searchFromOneArt = (key: any,art: any)=>{
    // console.log("searchFromOneArt")
    // console.log(art)
    let oneArtPart=""
    let maxKey = 0
    var positions = new Array();
    // console.log("art.content.length")
    // console.log(art.content.length)
    for (let i = 0; i < art.content.length; i+=200) {
        const element =art.content.substr(i,200)
        let p = searchFromOnePart(key,element)
        let n = p.length
        if(maxKey<n){
            maxKey = n
            positions = p
            oneArtPart = element
        }
    }
    let info ={"ID":art.ID,"title":art.title,"keynums":maxKey,"position":positions,"element":oneArtPart}
    // console.log("info")
    // console.log(info)
    return info
}
const searchFromOnePart = (key: any,element: any)=>{
    var positions = new Array();
    function searchSubStr(str: string,subStr: string){
        var pos = str.indexOf(subStr);
        while(pos>-1){
            positions.push(pos);
            pos = str.indexOf(subStr,pos+1);
        }
    }
    searchSubStr(element,key);

    return positions
}
const getSearchJson = async()=> {
    const { data: res } = await globalProperties.$http.get(`search.json`)
    // this.artList = res.data
    // this.total = res.total
    // console.log(res[0].ID)
    resp.value = res;
    
}
getSearchJson()

</script>