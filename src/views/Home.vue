<template>
  <div class="common-layout">
    <el-container>
        <el-header>
            <!-- <TopBar></TopBar> -->
        </el-header>
        <el-main>
            <div style="max-width: 1000px;; margin:0 auto">
                <Main></Main>
            </div>
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