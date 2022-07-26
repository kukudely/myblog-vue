const ArticleList = () =>
  import(/* webpackChunkName: "group-index" */ '../components/ArticleList.vue')
const ArticleContent = () =>
  import(/* webpackChunkName: "group-detail" */ '../components/ArticleContent.vue')
const Search = () =>
  import(/* webpackChunkName: "group-detail" */ '../components/Search.vue')
// const Detail = () =>
// import(/* webpackChunkName: "group-detail" */ '../components/Details.vue')
// const Category = () =>
//   import(/* webpackChunkName: "group-category" */ '../components/CateList.vue')
// const Search = () =>
//   import(/* webpackChunkName: "group-search" */ '../components/Search.vue')
import { createRouter,createWebHistory } from "vue-router";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:ArticleList,
        },
        {
          path:'/Search',
          component:Search,
        },
        {
            path:'/ArticleContent/:id',
            component:ArticleContent,
            props: true
        }
    ]
})
export default router;
