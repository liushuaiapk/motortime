<template>
  <div class="home">
    <div class="topicbox">
      <img class="topic" :src="img.bk2">
    </div>
    <img class="recruit" :src="img.joinus">
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
<Row class="text-c mt-40 mb-50">
  <Col span="16" offset="4">
  <div class="f-16 f-w">我们汇聚各界人才，共同成就伟大创举。</div>
  <div class="mt-20 f-12">我们背景各异，既有善于思考的人才，又有动手能力极强的“实干家”。正是有了这样的团队，产品才能不断推陈出新，我们才能不断通过创新方式帮助人们追寻梦想。而这种创新精神，正是源于我们对出色工作的共同追求和对彼此的坚定承诺。因为在这里，相互学习即意味着向最优秀的人才学习。</div>
</Col>
</Row>
<Row>
  <Col span="12">
  <img class="joinus1" :src="img.joinus1">
</Col>
<Col span="12" class="rightbox">
<img class="joinus2" :src="img.joinus2">
<img class="joinus2" :src="img.joinus3">
</Col>
</Row>
<Row class="text-c mt-40 mb-50">
  <Col span="16" offset="4">
  <div class="f-16 f-w">从事自己热爱的事业，获享丰富福利。</div>
  <div class="mt-20 f-12">员工是  最重要的资源，也是我们的灵魂。我们为员工及其家人提供各种福利计划，为他们的身心健康保驾护航。无论你在担任何种职位，都能充分利用各种健康和健身资源，还能在需要时享受休假计划。</div>
</Col>
</Row>
<Row>
  <Col class="rightbox" span="14">
  <img class="joinus4" :src="img.joinus4">
</Col>
<Col span="10">
<div class="rightblack">
  <img class="crrowone" :src="img.arrows_lt">
  <div class="f-16">新媒体汽车编辑</div>
  <div class="f-14 mt-20">职位描述：</div>
  <div class="f-12 mt-5">1. 负责策划、撰写汽车类新媒体平台（微信、微博）内容。</div>
  <div class="f-12 mt-5">2. 对新媒体文章写作风格有一定了解，有想法、敢创作。</div>
  <div class="f-12 mt-5">3. 负责撰写并发布汽车类文章至全网平台（车家号 易车号 头条号 百家号等)</div>
  <div class="f-14 mt-15">任职要求：</div>
  <div class="f-12 mt-5">1. 拥有对汽车行业和媒体的热情。</div>
  <div class="f-12 mt-5">2. 了解主流汽车品牌车型，具有较强的新闻敏感度，并对汽车领域拥有独到见解。</div>
  <div class="f-12 mt-5">3. 能够独立策划贴合时下热门话题的选题内容。</div>
  <div class="f-12 mt-5">4. 具备较强的文字功底，性格活泼、思维敏捷。</div>
  <div class="f-12 mt-5">5. 熟练使用Office、PS、各类排版编辑器等办公软件。</div>
  <div class="f-12 mt-5">6. 拥有C1驾驶证，能够适应短期出差。</div>                          
</div>
</Col>
</Row>
<Row>
  <Col span="10">
  <div class="rightblack">
    <img class="crrowtwo" :src="img.arrows_lt">
    <div class="f-16">高级销售经理</div>
    <div class="f-14 mt-20">职位描述：</div>
    <div class="f-12 mt-5">1.负责汽车类，互联网服务等产业客户资源</div>
    <div class="f-12 mt-5">2.媒体广告，原生内容，整合营销资源售卖</div>
    <div class="f-12 mt-5">3.客户服务与客户资源开拓</div>
    <div class="f-14 mt-15">任职要求：</div>
    <div class="f-12 mt-5">1.互联网广告3年以上从业经验，有汽车媒体销售背景的经验者优先</div>
    <div class="f-12 mt-5">2.熟悉科技互联网产业，对内容营销有兴趣，有内容生产能力的从业者优先考虑 </div>
    <div class="f-12 mt-5">3.沟通能力强，踏实肯干，进取心强</div>                     
  </div>
</Col>
<Col class="rightbox" span="14">
<img class="joinus4" :src="img.joinus5">
</Col>
</Row>
<Row class=mb-50>
  <Col class="rightbox" span="14">
  <img class="joinus4" :src="img.joinus6">
</Col>
<Col span="10">
<div class="rightblack">
  <img class="crrowthree" :src="img.arrows_lt">
  <div class="f-16">策划助理</div>
  <div class="f-14 mt-20">职位描述：</div>
  <div class="f-12 mt-5">1.可熟练使用PPT，独立撰写营销及活动类方案；</div>
  <div class="f-12 mt-5">2.熟悉受众网络及各类社交媒体的行为模式；</div>
  <div class="f-12 mt-5">3.有较强的客户服务意识和服务态度；</div>
  <div class="f-12 mt-5">4.逻辑思维较强，具备创新能力；</div>
  <div class="f-12 mt-5">5.有良好的沟通能力和理解力；</div>
  <div class="f-12 mt-5">6.有良好的语言和文字表达能力，并善于学习；</div>
  <div class="f-12 mt-5">7.逻辑思维和分析能力较强，勇于创新、善于学习，拥有较强的团队意识；</div>
  <div class="f-12 mt-5">8.对汽车行业有浓厚兴趣更佳。</div>
  <div class="f-14 mt-15">任职要求：</div>
  <div class="f-12 mt-5">1.参与项目策划，配合项目负责人完成项目策划方案的撰写；</div>
  <div class="f-12 mt-5">2.参与所策划项目的组织、执行； </div>
  <div class="f-12 mt-5">3.配合项目的各个阶段策划不同的活动，并撰写相应的新闻稿件；</div>
  <div class="f-12 mt-5">4.跟进策划项目的文案撰写，完善、创新活动内容； </div>
  <div class="f-12 mt-5">5.跟进项目进度，撰写结案报告。</div>                        
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
          joinus:require('../assets/img/joinus.png'),
          bk1: require('../assets/img/bk1.png'),
          bk2: require('../assets/img/bk2.png'),
          gotop: require('../assets/img/gotop.png'),
          honda:require('../assets/img/honda.png'),
          arrows_lt:require('../assets/img/arrows_lt.png'),
          joinus1: require('../assets/img/joinus/joinus1.png'),
          joinus2: require('../assets/img/joinus/joinus2.png'),
          joinus3: require('../assets/img/joinus/joinus3.png'),
          joinus4: require('../assets/img/joinus/joinus4.png'),
          joinus5: require('../assets/img/joinus/joinus5.png'),
          joinus6: require('../assets/img/joinus/joinus6.png'),

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
.joinus1{
  width: 100%;
  height: 600px;
  object-fit: cover;
}
.joinus2{
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.rightbox{
  line-height: 0;
}
.joinus4{
  width: 100%;
  height: 440px;
  object-fit: cover;
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
  height: 50px;
}
.rightblack{
  width: 100%;
  height: 440px;
  color: #FFFFFF;
  padding: 20px 50px;
  background-color: #1C1D21;
}
.crrowone{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(-90deg);
}
.crrowtwo{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(90deg);
}
.crrowthree{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
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