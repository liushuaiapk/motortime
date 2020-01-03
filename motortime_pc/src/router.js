import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
  {
    path: "/",
    meta: {
      'title': '汽车时间',
      'keepAlive': true
    },
    name: "Home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/active",
    meta: {
      'title': '活动',
      'keepAlive': true
    },
    name: "Active",
    component: () => import("./views/Active.vue")
  },
  {
    path: "/videolist",
    meta: {
      'title': '视频列表',
      'keepAlive': true
    },
    name: "VideoList",
    component: () => import("./views/VideoList.vue")
  },
  {
    path: "/postdetails/:id",
    meta: {
      'title': '资讯详情',
      'keepAlive': true
    },
    name: "PostDetails",
    component: () => import("./views/PostDetails.vue")
  },
  {
    path: "/videodetails/:id",
    meta: {
      'title': '视频详情',
      'keepAlive': true
    },
    name: "VideoDetails",
    component: () => import("./views/VideoDetails.vue")
  },
  {
    path: "/picdetails/:id",
    meta: {
      'title': '图片详情',
      'keepAlive': true
    },
    name: "PicDetails",
    component: () => import("./views/PicDetails.vue")
  },
  {
    path: "/bbsdetails/:id",
    meta: {
      'title': '帖子详情',
      'keepAlive': true
    },
    name: "BbsDetails",
    component: () => import("./views/BbsDetails.vue")
  },
  {
    path: "/aboutus",
    meta: {
      'title': '关于我们',
      'keepAlive': true
    },
    name: "AboutUs",
    component: () => import("./views/AboutUs.vue")
  },
  {
    path: "/joinus",
    meta: {
      'title': '加入我们',
      'keepAlive': true
    },
    name: "JoinUs",
    component: () => import("./views/JoinUs.vue")
  },
  {
    path: "/linkus",
    meta: {
      'title': '联系我们',
      'keepAlive': true
    },
    name: "LinkUs",
    component: () => import("./views/LinkUs.vue")
  },
  ]
})
