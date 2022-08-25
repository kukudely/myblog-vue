<template>
    <div>
        {{artInfo.img}}
    </div>
    <div>
        {{artInfo.title}}
    </div>
    <div>
        {{artInfo.content}}
    </div>
    
    <!-- 评论 -->
    <div>
      <el-card class="box-card" style="margin-top: 20px;">
        <el-input class="comment" v-model="inputName" placeholder="请输入名字" />
        <!-- <el-input class="comment" v-model="inputEmail" placeholder="请输入邮箱" /> -->
        
        <el-input
          class="comment"
          v-model="textareaComment"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入内容"
        />
        <el-button class="comment" @click="pushComment">提交</el-button>
      </el-card>
        
    </div>
    <div>
      <el-card class="box-card" style="margin-top: 20px;">
        <div v-for="item in commentList" :key="item.id" class="text item">
          <p>{{item.username}}</p>
          <p>{{item.CreatedAt}}</p>
          <p>{{item.content}}</p>
        </div>
      </el-card>
    </div>
</template>
<style>
.comment{
  margin-top: 20px;
}
</style>

<script>
export default {
  props: ['id'],
  data() {
    return {
      inputName:"",
      inputEmail:"",
      textareaComment:"",
      artInfo: {},
      commentList: [],
      comment: {
        content: ''
      },
      total: 0,
      headers: {
        username: '',
        user_id: 0
      },
      queryParam: {
        pagesize: 5,
        pagenum: 1
      }
    }
  },
  created() {
    this.getArtInfo()
    this.getCommentList()
    // this.headers = {
    //   username: window.sessionStorage.getItem('username'),
    //   user_id: window.sessionStorage.getItem('user_id')
    // }
  },
  methods: {
    // 查询文章
    async getArtInfo() {
      const { data: res } = await this.$http.get(`article/info/${this.id}`)
      this.artInfo = res.data
      window.sessionStorage.setItem('title', this.artInfo.title)
    },
    // 获取评论
    async getCommentList() {
      const { data: res } = await this.$http.get(`commentfront/${this.id}`, {
        params: {
          pagesize: this.queryParam.pagesize,
          pagenum: this.queryParam.pagenum
        }
      })
      this.commentList = res.data
      this.total = res.total
    },
    // 发送评论
    async pushComment() {
      const { data: res } = await this.$http.post('addcomment', {
        article_id: parseInt(this.id),
        // content: this.comment.content,
        // user_id: parseInt(this.headers.user_id),
        // username: this.headers.username
        content: this.textareaComment,
        username: this.inputName,
        status: 1
      })
      if (res.status !== 200) return this.$message.error(res.message)
      this.$message.success('评论成功，待审核后显示')
      this.$router.go(0)
    }
  }
}
</script>