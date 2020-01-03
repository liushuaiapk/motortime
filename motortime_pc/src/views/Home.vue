<template>
  <div class="home">
    <Carousel autoplay v-model="silder" loop :autoplay-speed='5000' dots="none" @on-change="silderpic(silder)">
      <CarouselItem v-for="(item,index) in advlist" :key="'advlist_' + item.id">
          <img class="silderpic" :src="item.pic_url" v-if="index<5" @click="goadvinfo(item.url)">
      </CarouselItem>
    </Carousel>
    <Row class="topbox">
      <Col span="14" offset="4" class="text-l">
      <Row>
        <Col span="6"><img class="logopic" :src="img.logo">
        <span class="webname">汽车时间</span></Col>
        <Col span="18" class="ml-60"><Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="1">
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
    <span class="appfont" @click="appdownload()">APP下载</span>
    <div v-if="codebk" class="codebk" :style="'background-image:url('+img.code_bk+')'">
      <img class="qrcode" :src="img.qrcode">
    </div>
  </Col>
</Row>
<div class="motorbox">
  <img class="motorpic" :src="img.motortime">
  <div class="motorfont">顶级豪华品牌</div>
</div>
<div class="yelbox">
  <Row>
    <Col span="16" offset="4">
    <div class="yelpic" :style="'background-image:url('+img.yelpic+')'">
      <i class="f-white f-l f-14 ml-15 mt-10">热点新闻</i>
      <i class="f-white f-r f-12 mr-10 mt-15">· MOTOR TIME热点第{{hotindex}}条</i>
      <div class="font-black f-l ml-10 ellipsis-2" @click="goadvinfo(advurl)" style="width: 100%;cursor: pointer;">{{sildertitle}}</div>
    </div>
    <div class="picbox">
      <img v-for="(item,index) in advlist" :key="'advolist_' + item.id" class="yelpiclist" :class="sildernum==index?'active':''" :src="item.pic_url" v-if="index<5" @click="sidermin(index)">
    </div>
  </Col>
</Row>
</div>
<Row class="blockbox code-row-bg" type="flex" justify="space-between">
  <Col span="16" offset="4" class="text-l">
  <Row :gutter="10">
    <Col span="8" class="mt-15" v-for="(item,index) in lists" :key="'lists_' + item.id" v-if="index<6">
    <Card>
      <div @click="articleInfo(item.id,item.module.id)" style="cursor: pointer;">
        <img class="blockpic" :src="item.pic_url">
        <div class="mask"></div>
        <div class="pd-10">
          <div class="ellipsis-2 blocktitle">{{item.title}}</div>
          <!-- <div class="ellipsis-3 blockcount">GU作为优衣库的姐妹品牌，主打价格实惠且样式时尚的服装。GU希望在中国最重要的节日——春节期间，促进产品销售的同时提升品牌知名</div> -->
          <div class="mt-10">
            <img class="chennl" :src="item.media.logo_url">
            <span class="sourtime ml-5">{{item.media.name}}</span>
            <span class="f-r sourtime mt-5">{{item.time_format}}</span>
          </div>
        </div>
      </div>
    </Card>
  </Col>
</Row>
</Col>
</Row>
<div class="text-c">
  <Button class="morebtn" @click="listsMore()" v-if="lists.length>6">MORE</Button>
</div>
<Row class="articlebox">
  <Col span="16" offset="4">
  <Row>
    <Col span="18">
    <Menu mode="horizontal" theme="dark" :active-name="chenname">
      <MenuItem v-for="(item,index) in listc" :key="'listc_' + item.id" :name="index+1" class="linehno" @click.native="silderchenn(item.id)">
        {{item.title}}
      </MenuItem>
    </Menu>
  </Col>
  <Col span="6" class="text-r">
  <span class="appfont linehno">· MOTOR TIME原创      ···</span>
</Col>
</Row>
</Col>
</Row>
<Row>
  <Col span="6">
  <div @click="articleInfo(lista[0].id,lista[0].module.id)" class="articlebk" :style="'background-image:url('+lista[0].pic_url+')'">
    <div class="mmbox">
      <Row>
        <Col span="16"><span class="articletitle ellipsis">{{lista[0].title}}</span></Col>
        <Col span="8"><span class="sourchennl ellipsis">
          <img class="chennl mr-5" :src="lista[0].media.logo_url">
        {{lista[0].media.name}}</span></Col>
      </Row>
    </div>
  </div>
  <div class="articlemask"></div>
  <div @click="articleInfo(lista[1].id,lista[1].module.id)" class="articlebk" :style="'background-image:url('+lista[1].pic_url+')'">
    <div class="mmbox">
      <Row>
        <Col span="16"><span class="articletitle ellipsis">{{lista[1].title}}</span></Col>
        <Col span="8">
        <span class="sourchennl ellipsis">
          <img class="chennl mr-5" :src="lista[1].media.logo_url">
        {{lista[1].media.name}}</span>
      </Col>
    </Row>
  </div>
</div>
</Col>
<Col span="12">
<div @click="articleInfo(lista[2].id,lista[2].module.id)" class="articlecbk" :style="'background-image:url('+lista[2].pics[0].img_url+')'"></div>
<div class="bkpanel" @click="articleInfo(lista[2].id,lista[2].module.id)">
  <span class="articleone ellipsis-2">{{lista[2].title}}</span>
  <div class="articleboot">
    <img class="chennl" :src="lista[2].media.logo_url">
    <span class="sourtime ml-5">{{lista[2].media.name}}</span>
    <span class="f-r sourtime mr-30 mt-5">{{lista[2].time_format}}</span>
  </div>
</div>
</Col>
<Col span="6">
<div @click="articleInfo(lista[3].id,lista[3].module.id)" class="articlebk" :style="'background-image:url('+lista[3].pic_url+')'">
  <div class="mmbox">
    <Row>
      <Col span="16">
      <span class="articletitle ellipsis">{{lista[3].title}}</span>
    </Col>
    <Col span="8">
    <span class="sourchennl ellipsis">
      <img class="chennl mr-5" :src="lista[3].media.logo_url">
    {{lista[3].media.name}}</span>
  </Col>
</Row>
</div>
</div>
<div @click="articleInfo(lista[4].id,lista[4].module.id)" class="articlebk" :style="'background-image:url('+lista[4].pic_url+')'">
  <div class="mmbox">
    <Row>
      <Col span="16">
      <span class="articletitle ellipsis">{{lista[4].title}}</span>
    </Col>
    <Col span="8">
    <span class="sourchennl ellipsis">
      <img class="chennl mr-5" :src="lista[4].media.logo_url">
    {{lista[4].media.name}}</span>
  </Col>
</Row>
</div>
</div>
</Col>
</Row>
<div class="bbsbox">
  <Row class="">
    <Col span="16" offset="4">
    <div class="scrollbox">
      <div class="scrolltrue">
        <img class="scrollpic" :src="img.scroll">
      </div>
    </div>
    <div class="text-c">
      <div class="bbshand">社区</div>
      <img class="communitypic" :src="img.community">
    </div>
    <div class="bbslist">
      <Row :gutter="10">
        <Col v-for="(item,index) in listb" :key="'llistb_' + item.id" :span="index==2||index==3||index==8||index==9?'10':'7'" class="mb-10">
        <div class="bbsbk" @click="bbsInfo(item.id)" :style="'background-image:url('+item.image[0]+')'">
          <div class="bbsmask ellipsis-2">{{item.title}}</div>
          <div class="messbox">
            <img class="chennl mr-5 mt-5" :src="item.channel.logo_url">
            <div class="message">
              <span class="bbsname">{{item.channel.alias}}</span>
              <div class="bbssource">{{item.channel.name}}</div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</Col>
</Row>
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
        silder: 0,
        codebk:false,
        advlist:[],
        lista:[],
        lists:[],
        listc:[],
        listb:[],
        sildernum:0,
        articlenum:0,
        chenname:'',
        sildertitle:'',
        params:{
          media_id:1,
          type:3
        },
        param:{
          is_image:0,
          page:1,
          size:200
        },
        parama:{
          page:1,
          size:6
        },
        img:{
          logo: require('../assets/img/logo.png'),
          appdownload: require('../assets/img/appdownload.png'),
          code_bk: require('../assets/img/code_bk.png'),
          motortime:require('../assets/img/motortime.png'),
          yelpic:require('../assets/img/yelpic.png'),
          community:require('../assets/img/community.png'),
          scroll: require('../assets/img/scroll.png'),
          gotop: require('../assets/img/gotop.png'),
          more: require('../assets/img/more.png'),
          more_black: require('../assets/img/more_black.png'),
          honda:require('../assets/img/honda.png'),
          bk1: require('../assets/img/bk1.png'),
          bk2: require('../assets/img/bk2.png'),
          qrcode: require('../assets/img/qrcode.png'),
          joinus3: require('../assets/img/joinus/joinus3.png')
        }
      }
    },
    created () {
      this.getAdvs()
      this.getArticleList()
      this.getBbsList()
      this.getSliders()
      this.getChannel()
    },
    methods: {
      getAdvs(){
        home.getAdvs(this.params).then(res => {
          if(res.data.state == 1) {
            var arr=res.data.data
            if(arr.length>5){
              this.advlist=arr.slice(0,5);
            }else{
              this.advlist=res.data.data
            }
            
            this.sildertitle=arr[0].name
            this.advurl=arr[0].url
            this.hotindex=arr[0].id
          }
        })
      },
      getSliders(){
        home.getSliders().then(res => {
          if(res.data.state == 1) {
            this.lists=res.data.data
          }
        })
      },
      getChannel(){
        home.getChannel().then(res => {
          if(res.data.state == 1) {
            this.listc=res.data.data
            setTimeout(() => {
              this.chenname=1
            }, 500);
          }
        })
      },
      getArticleList(){
        home.getArticleList(this.parama).then(res => {
          if(res.data.state == 1) {
            this.lista=res.data.data
          }
        })
      },
      getBbsList(){
       home.getBbsList(this.param).then(res => {
        if(res.data.state == 1) {
          var list=res.data.data.data
          var listb=[]
          var n=1;
          for(var i=0;i<list.length;i++){
            if(list[i].image.length>0){
              n++
              if(n<14){
                listb.push(list[i])
              }
            }
          }
          this.listb=listb
        }
      })
     },
     articleInfo(id,type){
      if(type==1){
        var urlname='PostDetails'
      }else if(type==2){
        var urlname='PicDetails'
      }else if(type==3){
        var urlname='VideoDetails'
      }
      this.$router.push({
        name: urlname,
        params: {
          id: id,
        }
      })
    },
    bbsInfo(id){
      this.$router.push({
        name: 'BbsDetails',
        params: {
          id: id,
        }
      })
    },
    silderpic(value){
      if(value==4){
        var b=0;
        this.sildernum=0
      }else{
        var b=value+1;
        this.sildernum=value+1
      }
      
      var list=this.advlist
      for(var i=0;i<list.length;i++){
        if(i==b){
          this.sildertitle=list[i].name
          this.advurl=list[i].url
        }
      }
    },
    sidermin(index){
      this.silder=index
      var b=index;
      this.sildernum=index
      var list=this.advlist
      for(var i=0;i<list.length;i++){
        if(i==b){
          this.sildertitle=list[i].name
          this.advurl=list[i].url
          this.hotindex=list[i].id
        }
      }
    },
    goadvinfo(url){
      window.location.href=url
       // window.open(url, '_blank');
     },
     silderchenn(e){
      this.parama.channel_id=e
      this.getArticleList()
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
.home{
  background-color: #F8F8F8;
}
.silderpic{
  width: 100%;
  height: 425px;
  object-fit: cover;
  cursor: pointer;
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
  cursor: pointer;
}
.codebk{
  width: 50px;
  height: 55px;
  float: right;
  padding: 8px 2px 2px 2px;;
  background-repeat:no-repeat;
  background-size:100% 100%;
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
.motorbox{
  position: absolute;
  top: 25%;
  left: 20%;
}
.motorpic{
  width: 175px;
  height: 22px;
}
.motorfont{
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 10px;
}
.yelbox{
  position: absolute;
  top: 45%;
}
.yelpic{
  float: right;
  width: 55%;
  height: 100px;
  background-repeat:no-repeat;
  background-size:100% 100%;
}
.picbox{
  float: left;
  width: 100%;
  height: 81px;
  background-color: #F6AB01;
}
.yelpiclist{
  width: 19%;
  height: 80px;
  display: block;
  float: left;
  margin-top: 1px;
  object-fit: cover;
}
.f-white{
  color: #FFE8B5;
}
.ml-15{
  margin-left: 15%;
}
.font-black{
  color: #1C1D21;
}
.ml-10{
  margin-left: 10%;
}
.active{
  width: 24%;
  height: 105px;
  border: 2px solid #F6AB01;
  margin-top: -15px;
}

.blockbox{
  width: 100%;
  margin-top: 70px;
}
.blockpic{
  width: 100%;
  height: 200px;
}
.mask{
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
}
.mask:hover {
  background: rgba(0,0,0,0.5);
}
.blocktitle{
  color: #1C1D21;
  font-size: 18px;
  font-weight: bold;
}
.blockcount{
  color: #6A6A6A;
  font-size: 14px;
}
.sourtime{
  color: #6A6A6A;
  font-size: 10px;
}
.chennl{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  vertical-align: middle;
}
.morebtn{
  color: #6A6A6A;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 50px;
  padding: 5px 30px;
}
.articlebox{
  width: 100%;
  background:#1C1D21;
}
.linehno{
  line-height: 60px !important;
}
.mmbox{
  width: 100%;
  padding: 15px 10px;;
  position: absolute;
  bottom: 0;
  line-height: 2;
  color: #FFFFFF;
}
.articletitle{
  font-size: 16px;
  float: left;
}
.sourchennl{
  float: right;
  font-size: 12px;
}
.articlebk{
  width: 100%;
  height: 210px;
  position: relative;
  background-repeat:no-repeat;
  background-size:cover;
  opacity: 0.8;
  cursor: pointer;
}
.articlebk:hover{
 opacity: 1;
}
.articlebk:hover .mmbox{
  color: #3A3A3A;
  background-color: #FFFFFF;
}
.articlecbk{
  width: 100%;
  height: 420px;
  position: relative;
  background-repeat:no-repeat;
  background-size:100% 100%;
  cursor: pointer;
}
.bkpanel{
  width: 100%;
  height: 120px;
  padding: 15px;
  background-color: #fff;
  cursor: pointer;
}
.articleone{
  color: #1C1D21;
  font-weight: bold;
  font-size: 14px;
}
.articleboot{
  width: 100%;
  position: absolute;
  bottom: 15px;
}
.bbsbox{
  width: 100%;
  height: auto;
  margin-top: 102px;
  background-color: #F6AB01;
  padding-bottom: 50px;
}
.scrollbox{
  width: 100%;
  height: 350px;
  margin-top: -52px;
  overflow: hidden;
}
.scrolltrue{
  width: 104%;
  height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.scrollpic{
  width: 100%;
  height: auto;
}
.bbshand{
  color: #1C1D21;
  font-size: 16px;
  font-weight: bold;
  margin-top: 50px;
}
.communitypic{
  width: 97px;
  height: 12px;
  margin-top: 15px;
}
.bbslist{
  margin-top: 45px;
}
.bbsmask{
  display: none;
}
.bbsbk:hover .bbsmask{
  padding: 15px;
  display: block;
  width: 100%;
  height: 60px;
  color: #FFFFFF;
  font-size: 12px;
  position: absolute;
  letter-spacing: 2px;
  top: 0;
  left: 0;
  background-color: #1C1D21;
}
.bbsbk{
  width: 100%;
  height: 280px;
  color: #fff;
  padding: 15px;
  position: relative;
  background-repeat:no-repeat;
  background-size:cover;
  cursor: pointer;
}
.bbsname{
  font-size: 12px;
  font-weight: bold;
}
.bbssource{
  font-size: 12px;
}
.messbox{
  position: absolute;
  bottom: 15px;
  display: flex;
}
.custombtn{
  width: 50px;
  height: 25px;
  text-align: center;
  border:1px solid #fff;
  border-radius: 2.5px;
  position: absolute;
  top: 45%;
  left: 40%;
}
.custombtn:hover{
  background-color: #fff;
}
.custombtn:hover .custompicb{
  background-color: #fff;
  display: inline;
}
.custombtn:hover .custompic{
  background-color: #fff;
  display: none;
}
.custompic{
  width: 25px;
  height: 6px;
  display: inline;
}
.custompicb{
  width: 25px;
  height: 6px;
  display: none;
}
</style>