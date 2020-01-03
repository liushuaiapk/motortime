<template>
  <div class="home">
    <div class="topicbox">
      <img class="topic" :src="img.bk1">
    </div>
    <img class="recruit" :src="img.recruit">
    <Button class="actbtn" type="default" ghost>招募</Button>
    <Row class="topbox">
      <Col span="14" offset="4" class="text-l">
      <Row>
        <Col span="6"><img class="logopic" :src="img.logo">
        <span class="webname">汽车时间</span></Col>
        <Col span="18" class="ml-60"><Menu mode="horizontal" theme="dark" active-name="2">
          <MenuItem name="1" :to="{name: 'Home'}">
            首页
          </MenuItem>
          <MenuItem name="2">
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
<div class="looknew text-c">观看最新MOTOR TIME活动</div>
<Row>
  <Col span="6">
  <div class="activeleft">
    <div class="activetitle">水平对置の 荣耀</div>
    <div class="activeask mt-50">活动地点</div>
    <div class="activeask">position</div>
    <div class="activeinfo mt-20">8月31日在张家口崇礼的太舞滑雪场举办</div>
    <div class="activeask mt-40">活动时间</div>
    <div class="activeask">TIME</div>
    <div class="activeinfo mt-20">2019-08-31  10：00-21：00</div>
    <div class="activeinfo mt-40"> 8月31日，张家口崇礼太舞滑雪小镇，由《富士范儿》和《iAcro》联合主办的#水平对置的荣耀#第三站大型线下粉丝节圆满落幕。</div>
  </div>
</Col>
<Col span="18">
<div class="rightpic">
  <img class="activepicone" :src="img.bk1">
  <div class="trianglebottom"></div>
  <div class="heightright"></div>
  <img class="activepicone" :src="img.bk2">
  <div class="widthbottom"></div>
</div>
<div class="rightpic">
  <img class="activepictow" :src="img.bk1">
  <div class="triangle"></div>
</div>
</Col>
</Row>
<Row class="mt-5 mb-50">
  <Col span="6"><div class="activetwoleft">
    <div class="activetitle">水平对置の 荣耀</div>
    <div class="activeask mt-50">活动地点</div>
    <div class="activeask">position</div>
    <div class="activeinfo mt-20">8月31日在张家口崇礼的太舞滑雪场举办</div>
    <div class="activeask mt-40">活动时间</div>
    <div class="activeask">TIME</div>
    <div class="activeinfo mt-20">2019-08-31  10：00-21：00</div>
    <div class="activeinfo mt-40"> 8月31日，张家口崇礼太舞滑雪小镇，由《富士范儿》和《iAcro》联合主办的#水平对置的荣耀#第三站大型线下粉丝节圆满落幕。</div>
  </div></Col>
  <Col span="18"><div class="rightpic">
    <img class="activepicone" :src="img.bk1">
    <div class="triangletbottom"></div>
    <div class="heighttright"></div>
    <img class="activepicone" :src="img.bk2">
    <div class="widthtbottom"></div>
  </div>
  <div class="rightpic">
    <img class="activepictow" :src="img.bk1">
    <div class="trianglet"></div>
  </div></Col>
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
        params:{
          media_id:1,
          type:3
        },
        param:{
          page:1,
          size:12
        },
        img:{
          logo: require('../assets/img/logo.png'),
          appdownload: require('../assets/img/appdownload.png'),
          code_bk: require('../assets/img/code_bk.png'),
          recruit:require('../assets/img/recruit.png'),
          bk1: require('../assets/img/bk1.png'),
          bk2: require('../assets/img/bk2.png'),
          gotop: require('../assets/img/gotop.png'),
          honda:require('../assets/img/honda.png'),
        }
      }
    },
    created () {
      this.getAdvs()
      this.getBbsList()
    },
    methods: {
      getAdvs(){
        home.getAdvs(this.params).then(res => {
          if(res.data.state == 1) {
            this.list=res.data.data
          }
        })
      },
      getBbsList(){
       home.getBbsList(this.param).then(res => {
        if(res.data.state == 1) {
          this.listb=res.data.data
        }
      })
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
  height: 425px;
  object-fit: cover; 
}
.recruit{
  position: absolute;
  top: 28%;
  left: 38%;
  width: 270px;
  height: 50px;
}
.actbtn{
  position: absolute;
  top: 45%;
  left: 45%;
}
.ivu-btn-ghost.ivu-btn-dashed:hover, .ivu-btn-ghost.ivu-btn-default:hover{
  color: #1C1D21;
  border-color: #FFFFFF;
  background-color: #FFFFFF;
}
.ivu-btn{
  padding: 0px 30px;
}
.looknew{
  color: #6A6A6A;
  font-size: 16px;
  font-weight: bold;
  margin-top: 75px;
  margin-bottom: 50px;
}
.activeleft{
  width: 100%;
  height: 800px;
  padding: 60px;
  color: #1C1D21;
  background-color: #F6AB01;
}
.activetwoleft{
 width: 100%;
 height: 800px;
 padding: 60px;
 color: #FFFFFF;
 background-color: #1C1D21;
}
.activeask{
  font-size: 14px;
  font-weight: bold;
}
.activeinfo{
  font-size: 12px;
}
.activetitle{
  font-size: 30px;
  font-weight: bold;
}
.trianglebottom{
  width:0;
  height:0;
  border-top:20px solid transparent;
  border-left:15px solid #F6AB01;
  float: left;
  margin-right: 5px;
  bottom: 0;
  position: absolute;
}
.heightright{
  width:2px;
  height:200px;
  right: 50%;
  background-color: #F6AB01;
  bottom: 0;
  position: absolute;
}
.widthbottom{
  width:25%;
  height:2px;
  right: 0;
  background-color: #F6AB01;
  bottom: 0;
  position: absolute;
}
.heighttright{
  width:2px;
  height:200px;
  right: 50%;
  background-color: #1C1D21;
  bottom: 0;
  position: absolute;
}
.widthtbottom{
  width:25%;
  height:2px;
  right: 0;
  background-color: #1C1D21;
  bottom: 0;
  position: absolute;
}
.triangle{
  width:0;
  height:0;
  position: absolute;
  border-bottom:20px solid transparent;
  border-left:15px solid #F6AB01;
  float: left;
  margin-right: 5px;
}
.triangletbottom{
  width:0;
  height:0;
  position: absolute;
  border-top:20px solid transparent;
  border-left:15px solid #1C1D21;
  float: left;
  margin-right: 5px;
  bottom: 0;
  position: absolute;
}
.trianglet{
  width:0;
  height:0;
  position: absolute;
  border-bottom:20px solid transparent;
  border-left:15px solid #1C1D21;
  float: left;
  margin-right: 5px;
}
.rightpic{
  width: 100%;
  height: 400px;
  display: flex;
  position: relative;
}
.activepicone{
  width: 50%;
  height: 400px;

}
.activepictow{
  width: 100%;
  height: 400px;
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