<template>
  <div class="video">
    <Row class="topbox">
      <Col span="14" offset="4" class="text-l">
      <Row>
        <Col span="6"><img class="logopic" :src="img.logo">
        <span class="webname">汽车时间</span></Col>
        <Col span="18" class="ml-60"><Menu mode="horizontal" theme="dark" active-name="3">
          <MenuItem name="1" :to="{name: 'Home'}">
            首页
          </MenuItem>
          <MenuItem name="2" :to="{name: 'Active'}">
            活动
          </MenuItem>
          <MenuItem name="3">
            视频
          </MenuItem>
        </Menu></Col>
      </Row>
    </Col>
    <Col span="2" class="text-r">
    <img class="appdownload" :src="img.appdownload" @click="appdownload()">
    <span class="appfont"@click="appdownload()">APP下载</span>
    <div class="codebox" v-if="codebk">
      <img class="codebk" :src="img.code_bk">
    </div>
  </Col>
</Row>
<Row class="videohand">
  <Col span="16" offset="4">
  <div class="locationbox">当前位置:
    <span class="location">视频</span>
  </div>
  <Row class="mt-20" :gutter="10">
    <Col span="8">
    <img class="videopic" :src="img.bk1">
    <img class="videoicon" :src="img.video">
  </Col>
  <Col span="16" class="videoinfo">
  <div class="videotitle mt-5">北京电通荣获2019 TANGRAMS姐妹品牌</div>
  <div class="c-black mt-15">
    <span class="c-gray f-14">主办方：</span>上海市摄影家协会
  </div>
  <div class="c-gray f-14 mt-10 ellipsis-2 videocouent">GU作为优衣库的姐妹品牌，主打价格实惠且样式时尚的服装。GU希望在中国最重要的节日——春节期间，促进产品销售的同时提升品牌知名</div>
  <div class="articleboot">
    <img class="chennl" :src="img.honda">
    <span class="sourtime ml-5">波子范儿</span>
    <span class="f-r sourtime mr-30 mt-5">2019-12-20</span>
  </div>
</Col>
</Row>
<Row class="mt-20" :gutter="10">
  <Col span="8">
  <img class="videopic" :src="img.bk1">
  <img class="videoicon" :src="img.video">
</Col>
<Col span="16" class="videoinfo">
<div class="videotitle mt-5">北京电通荣获2019 TANGRAMS姐妹品牌</div>
<div class="c-black mt-15">
  <span class="c-gray f-14">主办方：</span>上海市摄影家协会
</div>
<div class="c-gray f-14 mt-10 ellipsis-2 videocouent">GU作为优衣库的姐妹品牌，主打价格实惠且样式时尚的服装。GU希望在中国最重要的节日——春节期间，促进产品销售的同时提升品牌知名</div>
<div class="articleboot">
  <img class="chennl" :src="img.honda">
  <span class="sourtime ml-5">波子范儿</span>
  <span class="f-r sourtime mr-30 mt-5">2019-12-20</span>
</div>
</Col>
</Row>
<Row class="mt-20" :gutter="10">
  <Col span="8">
  <img class="videopic" :src="img.bk1">
  <img class="videoicon" :src="img.video">
</Col>
<Col span="16" class="videoinfo">
<div class="videotitle mt-5">北京电通荣获2019 TANGRAMS姐妹品牌</div>
<div class="c-black mt-15">
  <span class="c-gray f-14">主办方：</span>上海市摄影家协会
</div>
<div class="c-gray f-14 mt-10 ellipsis-2 videocouent">GU作为优衣库的姐妹品牌，主打价格实惠且样式时尚的服装。GU希望在中国最重要的节日——春节期间，促进产品销售的同时提升品牌知名</div>
<div class="articleboot">
  <img class="chennl" :src="img.honda">
  <span class="sourtime ml-5">波子范儿</span>
  <span class="f-r sourtime mr-30 mt-5">2019-12-20</span>
</div>
</Col>
</Row>
<Page :total="100" />
</Col>
</Row>
<BackTop :height="100" :bottom="245">
  <img class="gotop" :src="img.gotop_black">
</BackTop>
<div v-if="codebk" class="overlay" @click="overlay()"></div>
</div>
</template>
<script>
  import home from '../api/motortime';
  export default {
    data () {
      return {
        codebk:false,
        img:{
          logo: require('../assets/img/logo.png'),
          appdownload: require('../assets/img/appdownload.png'),
          code_bk: require('../assets/img/code_bk.png'),
          bk1: require('../assets/img/bk1.png'),
          honda:require('../assets/img/honda.png'),
          gotop_black: require('../assets/img/gotop_black.png'),
          video:require('../assets/img/video.png'),
        }
      }
    },
    methods: {
      appdownload(){
        this.codebk=true
      },
      overlay(){
        this.codebk=false
      },
    }
  }
</script>
<style scoped>
.videohand{
  margin-top: 60px;
  margin-bottom: 20px;
}
.topbox{
  width: 100%;
  height: 42px;
  position: fixed;
  top: 0;
  display: flex;
  background-color: #1C1D21;
  z-index: 999;
}
.logopic{
  width: 25px;
  height: 24px;
  vertical-align: middle;
}
.webname{
  font-size: 16px;
  font-weight: Medium;
  color: #F6AB01;
  margin-left: 10px;
  line-height: 40px;
}
.appdownload{
  width: 10px;
  height: 12px;
  margin-top: 8px;
}
.appfont{
  font-size: 12px;
  color: #eaeaea;
  margin-left: 5px;
  margin-top: 5px;
  line-height: 40px;
}
.codebox{
  position: absolute;
  top: 40px;
  right: 0;
}
.codebk{
  width: 50px;
  height: 55px;
}
.ivu-menu-dark{
  background: transparent;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu{
  color: #fff;
  line-height: 40px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover{
  color: #F6AB01 !important;
  border-bottom:2px solid #F6AB01 !important;
}
.locationbox{
  color: #9A9A9A;
}
.location{
  color: #F6AB01;
}
.videoinfo{
  height: 180px;
}
.videopic{
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.videoicon{
  width: 25px;
  height: 25px;
  position: absolute;
  top: 45%;
  left: 50%;
}
.videotitle{
  font-size: 18px;
  color: #1C1D21;
  font-weight: bold;
}
.videocouent{
  line-height: 25px;
}
.articleboot{
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.chennl{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  vertical-align: middle;
}
.ivu-page{
  text-align: center;
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
  color: #fff !important;
}
.ivu-page-item-active{
  border-color: #F6AB01 !important;
  background-color: #F6AB01 !important;
}
</style>