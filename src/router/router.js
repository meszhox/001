import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// export default new Router({
//   routes: [
//     {
//       path: '../view',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '../view/HomeCompany.vue',
//       name:'HomeCompany',
//     }
//   ]
// })

// 设置路由
const routes = [{
  path: '/',
  redirect: 'work'
},
{
  name: 'work',
  component: () => import('../view/work/index.vue'),
  meta: {index:0, title: '首页'}
},
{
  name: 'company',
  component: () => import('../view/company/index.vue'),
  meta: {index:0, title: '公司'}
},
{
  name:'sq-record',
  component: () => import('../view/work/sq-record.vue'),
  meta:{index:1, title: '申请记录'}
},
{
  name:'zw-collection',
  component: () => import('../view/work/zw-collection.vue'),
  meta:{index:1, title: '职位收藏'}
},
{
  name:'zw-commend',
  component: () => import('../view/work/zw-commend.vue'),
  meta:{index:1, title: '职位推荐'}
},
{
  name:'teach',
  component: () => import('../view/work/teach.vue'),
  meta:{index:1, title: '求职攻略'}
},
{
  name:'search',
  component: () => import('../view/work/search.vue'),
  meta:{ title: '搜索'}
},
{
  name:'workDetail',
  component: () => import('../view/work/workDetail.vue'),
  meta:{ title: '职位详情'}
},
{
  name:'resume',
  component: () => import('../view/work/resume.vue'),
  meta:{ title: '我的简历'}
},
{
  name:'company-information',
  component: () => import('../view/company/company-information.vue'),
  meta:{ title: '公司详情'}
},
{
  name:'succeed',
  component: () => import('../view/work/succeed.vue'),
  meta:{ title: '申请成功'}
}
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes
});

export {
  router
};
