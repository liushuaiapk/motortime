<template>
  <div class="video">
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
    <img class="appdownload" :src="img.appdownload" @click="appdownload()">
    <span class="appfont"@click="appdownload()">APP下载</span>
    <div class="codebox" v-if="codebk">
      <img class="codebk" :src="img.code_bk">
    </div>
  </Col>
</Row>
<Row class="details">
  <Col span="12" offset="6">
  <div class="text-c topicbox">
    <img class="toppic" :src="img_url" @click="imagePreview()">
    <div class="picnum"><span class="f-16 c-white mr-5">{{picnow}}</span><span class="f-12 c-white">/{{picnum}}</span></div>
  </div>
  <div class="mt-5">
    <Row :gutter="10">
      <Col span="6" v-for="(item,index) in info.all_pics" :key="'list_' + index" v-if="index<4">
      <img :class="picindex==index?'picactive':'piclist'" :src="item.img_url" @click="changePic(index)">
    </Col>
  </Row>
</div>
<div class="title mt-15">{{info.title}}</div>
<div class="mt-15">
  <img class="chennl" :src="info.media.logo_url">
  <span class="sourtime ml-5">{{info.media.name}}</span>
  <span class="sourtime ml-25">{{info.time_format}}</span>
</div>
<div v-html="info.content" class="coutent"></div>
<div class="statement">版权声明：文章仅代表作者个人观点，不代表汽车时间立场。未经作者许可，不得转载。</div>
<div class="other">读了这篇文章的人还读了...</div>
<Row class="mt-20" :gutter="20" v-if="recommends.length>0">
  <Col span="6" v-for="item in recommends" :key="'list_' + item.id">
  <img class="otherpic" :src="item.pic_url">
  <div class="ellipsis-2 f-12 c-black">{{item.title}}</div>
</Col>
</Row>
<div class="comment">
  <span class="leftstand mr-5"></span>评论
</div>
<div class="mt-10">
  <Input v-model="textarea" type="textarea" :rows="4" placeholder="请输入评论内容..." />
</div>
<div class="comment">
  <span class="leftstand mr-5"></span>热门评论
</div>
<div class="mt-15" v-for="item in comments" :key="'listc_' + item.id">
  <img class="chennl" :src="item.user.headimg_url">
  <span class="memname ml-5">{{item.user.user_name}}</span>
  <div class="commentbox">
    <div class="commentcontent">{{item.content}}</div>
    <div class="commentime mt-10">
      <span>{{item.create_time}}</span>
      <span class="f-r"><img class="praise mr-5" :src="item.is_praise==1?img.praise:img.praise_no">
        <span v-if="item.praise_num>0">{{item.praise_num}}</span>
      </span>
    </div>
  </div>
  <div class="replybox" v-if="item.replys" v-for="(reply,index) in item.replys" :key="'replys_' + reply.id">
    <span class="memname mr-5">{{ reply.user.user_name }}</span><span class="reply">回复</span><span class="memname ml-5">{{ reply.reuser.user_name }}</span>
    <div class="commentcontent mt-10">{{ reply.content }}</div>
    <div class="commentime mt-10">
      <span>{{reply.create_time}}</span>
      <span class="f-r"><img class="praise mr-5" :src="img.praise_no">50</span>
    </div>
  </div>
</div>
<div  v-if="comments.length==0" class="mt-30 text-c">
  暂无评论
</div>
</Col>
</Row>
<BackTop :height="100" :bottom="245">
  <img class="gotop" :src="img.gotop_black">
</BackTop>
<div v-if="codebk" class="overlay" @click="overlay()"></div>
<div v-if="preview" class="imagePreview">
  <Row class='imglist'>
    <Col span="16" offset="4">
    <div class="text-r" @click="close">
      <Icon type="ios-close-circle-outline" size='30' />
    </div>
  </Col>
  <Col span="12" offset="6">
  <Carousel v-model="silder" dots="none">
    <CarouselItem v-for="(item,index) in images" :key="'piclist_' + index">
      <img class="silderpic" :src="item.img_url">
      <span class="c-white f-16 mt-15">{{item.title}}</span>
      <span class="c-white f-16 f-r">{{index+1}}/{{images.length}}</span>
    </CarouselItem>
  </Carousel>
</Col>
</Row>
</div>
</div>
</template>
<script>
  import home from '../api/motortime';
  export default {
    data () {
      return {
        silder:0,
        preview:false,
        textarea:'',
        codebk:false,
        info:'',
        img_url:'',
        recommends:[],
        params:{
          page:1,
          size:10
        },
        comments:[],
        picindex:0,
        picnow:1,
        picnum:'',
        images:[],
        img:{
          logo: require('../assets/img/logo.png'),
          appdownload: require('../assets/img/appdownload.png'),
          code_bk: require('../assets/img/code_bk.png'),
          bk1: require('../assets/img/bk1.png'),
          bk2: require('../assets/img/bk2.png'),
          honda:require('../assets/img/honda.png'),
          gotop_black: require('../assets/img/gotop_black.png'),
          praise_no:require('../assets/img/praise_no.png'),
          praise:require('../assets/img/praise.png'),
          arrows_l:require('../assets/img/arrows_l.png'),
          arrows_r:require('../assets/img/arrows_r.png'),
        }
      }
    },
    created () {
      this.post_id = this.$route.params.id
      this.getInfo()
      this.getRecommends()
    },
    methods: {
      getInfo () {
        home.getShow(this.post_id).then(res => {
          if(res.data.state == 1) {
            this.info = res.data.data
            this.images =res.data.data.all_pics
            this.picnum=this.images.length
            this.img_url=this.info.all_pics[0].img_url
            console.log(this.images)
          }
        })
      },
      getRecommends () {
        home.getRecommends(this.post_id).then(res => {
          if(res.data.state == 1) {
            this.recommends = res.data.data
          }
        })
      },
      changePic(index){
        this.picindex=index;
        this.img_url=this.info.pics[index].img_url
      },
      getCommentList(){
        home.getCommentList(this.post_id, this.params).then(res => {
          this.comments.push.apply(this.comments, res.data.data.data)
        })
      },
      imagePreview(index){
        this.preview=true
      },
      close(){
        this.preview=false
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
.details{
  margin-top: 60px;
  margin-bottom: 50px;
}
.topicbox{
  position: relative;
}
.toppic{
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.picnum{
  position: absolute;
  bottom:20px;
  right:20px;
  text-indent: 2px;
}
.piclist{
  width: 100%;
  height: 80px;
  margin-top: 10px;
}
.picactive{
  width: 100%;
  height: 100px;
  border:1px solid #F6AB01;
}
.arrows{
  width: 5px;
  height: 10px;
}
.title{
  color: #3A3A3A;
  font-size: 16px;
  font-weight: bold;
}
.chennl{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  vertical-align: middle;
}
.subtitle{
  color: #3A3A3A;
  font-size: 14px;
  font-weight: bold;
}
.coutent{
  color: #3A3A3A;
  font-size: 12px;
  line-height: 2;
}
.statement{
  color: #6A6A6A;
  font-size: 10px;
  margin-top: 50px;
}
.other{
  color: #3A3A3A;
  font-size: 12px;
  margin-top: 30px;
}
.otherpic{
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.comment{
  color: #3A3A3A;
  font-size: 14px;
  margin-top: 40px;
  font-weight: bold;
}
.leftstand{
  height: 14px;
  width: 2px;
  color: #F6AB01;
  border-left: 2px solid #F6AB01;
}
.commentime{
  color: #D0D0D0;
  font-size: 12px;
}
.memname{
  color: #3A3A3A;
  font-size: 14px;
}
.commentbox{
  margin-left: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}
.commentcontent{
  color: #6A6A6A;
  font-size: 14px;
}
.praise{
  width: 12px;
  height: 13px;
}
.replybox{
  margin-top: 10px;
  margin-left: 40px;
  padding-left: 5px;
  border-left: 2px solid #F8F8F8;
}
.reply{
  color: #D0D0D0;
  font-size: 14px;
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
.imagePreview{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1C1D21;
}
.imglist{
  position: absolute;
  width: 100%;
  height: 660px;
  top: 50px;
}
.silderpic{
  width: 100%;
  height: 480px;
}
.ivu-icon{
  color: #fff;
}
</style>