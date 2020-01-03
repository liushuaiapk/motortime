<template>
  <div class="home">
    <div class="topicbox">
      <img class="topic" :src="img.bk2">
    </div>
    <img class="recruit" :src="img.cooperation">
    <Row class="topbox">
      <Col span="14" offset="4" class="text-l">
      <Row>
        <Col span="6"><img class="logopic" :src="img.logo">
        <span class="webname">汽车时间</span></Col>
        <Col span="18" class="ml-60"><Menu mode="horizontal" theme="dark" active-name="">
          <MenuItem name="1" :to="{name: 'Home'}">
            首页
          </MenuItem>
          <MenuItem name="2" :to="{name: 'Active'}">
            活动
          </MenuItem>
          <MenuItem name="3" :to="{name: 'VideoList'}">
            视频
          </MenuItem>
        </Menu></Col>
      </Row>
    </Col>
    <Col span="2" class="text-r">
    <img class="appdownload" :src="img.appdownload"@click="appdownload()">
    <span class="appfont"@click="appdownload()">APP下载</span>
    <img v-if="codebk" class="codebk" :src="img.code_bk">
  </Col>
</Row>
<Row class="mt-30">
  <Col span="16" offset="4">
  <Row :gutter="5">
    <Col span="12">
    <Row :gutter="5" class="leftbox">
      <Col span="12">
      <img class="toptow" :src="img.linkus1">
    </Col>
    <Col span="12">
    <img class="toptow" :src="img.linkus2">
  </Col>
</Row>
<img class="bottomone" :src="img.linkus3">
</Col>
<Col span="12">
<img class="rightone" :src="img.linkus4">
</Col>
</Row>
</Col>
</Row>
<Row class="mt-50 mb-50">
  <Col span="16">
  <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px">
    <bm-overview-map anchor="BMAP_ANCHOR_TOP_LEFT"></bm-overview-map>
    <bm-marker :position="{lng:116.487288,lat:40.002211}" :dragging="true">
      <bm-label content='望京SOHO' :labelStyle="{color:'#1C1D21',fontSize:'12px'}" :offset="{width:-20,height:-30}" />
    </bm-marker>
  </baidu-map>
</Col>
<Col span="8">
<div class="rightbox">
  <img class="arrows_lt mb-15" :src="img.arrows_lt">
  <div class="bigtitle">CONTACT US</div>
  <div class="tbigtitle">联系我们</div>
  <div class="pubtitle">电话：    010-84425181</div>
  <div class="pubtitle">地址：   北京市朝阳区东直门外大街26号奥加美术馆公             寓1006室</div>
  <div class="pubtitle">报道线索与内容投诉：tougao@huxiu.com</div>
  <div class="pubtitle">内容授权和品牌合作：hezuo@huxiu.com</div>
  <div class="pubtitle">营销推广商务合作：marketing@huxiu.com（或微信ID：huxiu_marketing）</div>
  <div class="pubtitle">虎Cares品牌电商合作：zhoudong@huxiu.com（或微信ID：huxiucares）</div>
  <div class="pubtitle">虎嗅精选与虎跑团合作：huxiuvip@huxiu.com（或微信ID：huxiuvip302）</div>
  <div class="pubtitle">技术联系：admin@huxiu.com</div>
</div>
</Col>
</Row>
<BackTop :height="100" :bottom="245">
  <img class="gotop" :src="img.gotop">
</BackTop>
<div v-if="codebk" class="overlay" @click="overlay()"></div>
</div>
</template>
<script>
  import home from '../api/motortime';
  export default {
    data () {
      return {
        value2: 0,
        codebk:false,
        split5:0.5,
        split3:0.5,
        split4:0.5,
        center: {lng: 116.487288, lat: 40.002211},
        zoom: 15,
        img:{
          logo: require('../assets/img/logo.png'),
          appdownload: require('../assets/img/appdownload.png'),
          code_bk: require('../assets/img/code_bk.png'),
          cooperation:require('../assets/img/cooperation.png'),
          bk2: require('../assets/img/bk2.png'),
          gotop: require('../assets/img/gotop.png'),
          honda:require('../assets/img/honda.png'),
          arrows_lt:require('../assets/img/arrows_lt.png'),
          linkus1: require('../assets/img/linkus/linkus1.png'),
          linkus2: require('../assets/img/linkus/linkus2.png'),
          linkus3: require('../assets/img/linkus/linkus3.png'),
          linkus4: require('../assets/img/linkus/linkus4.png'),
        }
      }
    },
    created () {
      this.getMaps()
    },
    methods: {
      getMaps() {
        var point = new BMap.Point(116.487288, 40.002211)
        map.centerAndZoom(point, 15)
        var marker = new BMap.Marker(point)
        map.addOverlay(marker) 
        var circle = new BMap.Circle(point, 15, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
        map.addOverlay(circle)
      },
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
.topicbox{
  position: relative;
}
.topic{
  width: 100%;
  height: 270px;
  object-fit: cover; 
}
.recruit{
  position: absolute;
  top: 20%;
  left: 36%;
  width: 400px;
  height: 40px;
}
.leftbox{
  margin-bottom: 5px;
  line-height: 0;
}
.toptow{
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.bottomone{
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.rightone{
  width: 100%;
  height:405px;
  object-fit: cover;
}
.map{
  width: 100%;
  height: 500px;
}
.rightbox{
  width: 100%;
  height: 500px;
  color: #fff;
  padding: 50px 75px;
  background-color: #1C1D21;
}
.bigtitle{
  font-size: 20px;
  font-weight: bold;
}
.tbigtitle{
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.pubtitle{
  font-size: 12px;
  margin-top: 5px;
}
.arrows_lt{
  width: 14px;
  height: 14px;
  margin-left: -30px;
}
.topbox{
  position: absolute;
  top: 20px;
  display: flex;
  width: 100%;
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
  line-height: 32px;
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
  line-height: 30px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover{
  color: #F6AB01 !important;
  border-bottom:2px solid #F6AB01 !important;
}
</style>