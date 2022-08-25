<template>
  <div class="common-layout">
    <el-container>
        <el-header> 
            <div >
              <TopBar></TopBar>
            </div>
        </el-header>
        <el-main style="background-color:whitesmoke;height: 100%;">
            <div style="max-width: 1200px; margin:0 auto">
                <Main></Main>
                <!-- <router-view :key="$route.path"></router-view> -->
            </div>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
        <el-backtop :bottom="50" />
    </el-container>
  </div>
</template>
<script>
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import Nav from '../components/Nav.vue'
import Main from '../components/Main.vue'
export default {
  components: { TopBar, Main, Footer, Nav }
}

</script>
<style>

.el-header{
    padding: 0 !important;
}
</style>