<template>
  <div class="home">
    <div class="topicbox">
      <img class="topic" :src="img.bk2">
    </div>
    <img class="recruit" :src="img.motortime">
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
  <Col span="8">
  <img class="leftone" :src="img.aboutus1">
</Col>
<Col span="16">
<div>
 <Row class="rightbox">
  <Col span="14"><img class="rightone" :src="img.aboutus2"></Col>
  <Col span="10"><img class="righttwo" :src="img.aboutus3"></Col>
</Row>
</div>
<div>
 <Row>
  <Col span="10"><img class="righttwo" :src="img.aboutus4"></Col>
  <Col span="14"><img class="rightone" :src="img.aboutus5"></Col>
</Row>
</div>
</Col>
</Row>
<div class="text-c mt-50 mb-50">
  <Button class="mr-40">微信公众号</Button><Button class="mr-40">汽车时间APP</Button><Button class="mr-40">汽车时间官网</Button>
</div>
<div class="bkpic mb-50" :style="'background-image:url('+img.aboutus6+')'">
  <div class="black">
    <img class="arrows_lt mb-15" :src="img.arrows_lt">
    <div class="f-18">从思考，到创造</div>
    <div class="f-12 mt-20">
      汽车时间是一个聚焦科技与创新的资讯平台，致力于为一切热爱思考与发现的用户，提供有效率的信息服务，从而帮助他们更清晰准确地洞察世界、实现更好的创新与创造。
    </div>
    <div class="f-12">
      虎嗅平台上有独家原创内容，也有大量行业作者投递与授权的内容，还有我们在全网抓取筛选的授权内容。
      求真、品质、个性化、效率，是虎嗅对内容推荐与分发的追求。
    </div>
    <div class="f-12">
      汽车时间于2012年5月上线，目前在APP\微信公众号\网站\微博等渠道均拥有百万级日活用户。
    </div>
    <div class="f-12">
      汽车时间在科技类中稳居头部阵营。2018年，“汽车时间APP”在新榜年度500强排名第85，总阅读数1.6亿+，10万+文章522篇，超过99.99%的公众号；第三方新闻平台总阅读数10亿+；
    </div>
    <div class="f-12">
      截至2019年1月，汽车时间作者已达到5200+，其中认证作者510+。
    </div>
  </div>
</div>
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
          motortime:require('../assets/img/motortime.png'),
          bk1: require('../assets/img/bk1.png'),
          bk2: require('../assets/img/bk2.png'),
          gotop: require('../assets/img/gotop.png'),
          honda:require('../assets/img/honda.png'),
          arrows_lt:require('../assets/img/arrows_lt.png'),
          aboutus1: require('../assets/img/aboutus/aboutus1.png'),
          aboutus2: require('../assets/img/aboutus/aboutus2.png'),
          aboutus3: require('../assets/img/aboutus/aboutus3.png'),
          aboutus4: require('../assets/img/aboutus/aboutus4.png'),
          aboutus5: require('../assets/img/aboutus/aboutus5.png'),
          aboutus6: require('../assets/img/aboutus/aboutus6.png'),

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
.leftone{
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.rightbox{
  line-height: 0;
}
.rightone{
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.righttwo{
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.bkpic{
  width: 100%;
  height: 550px;
  position: relative;
  background-repeat:no-repeat;
  background-size:100% 100%;
}
.black{
  width: 450px;
  height: 490px;
  color: #FFFFFF;
  padding: 40px 70px;
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #1C1D21;
}
.arrows_lt{
  width: 14px;
  height: 14px;
  margin-left: -30px;
}
.f-12{
  line-height: 1.8;
  text-indent:24px;
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