<template>
  <div class="common-layout">
    <el-container>
        <el-header>
            <TopBar></TopBar>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="4"><div class="grid-content ep-bg-purple" />
                    <Nav></Nav>
                </el-col>
                <el-col :span="16"><div class="grid-content ep-bg-purple" />
                    <el-card class="box-card">
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </el-card>
                </el-col>
                <el-col :span="4"><div class="grid-content ep-bg-purple" />

                </el-col>
                </el-row>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </el-container>
  </div>
</template>
<script>
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import Nav from '../components/Nav.vue'
export default {
  components: { TopBar, Footer, Nav}
}
</script>
<style>
.el-header{
    padding: 0;
}
</style>