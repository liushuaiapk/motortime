<template>
  <div id="app">
    <router-view />
    <div class="footerbox">
      <Row>
        <Col class="footerinfo" span="16" offset="4">
        <Row>
          <Col span="16">
          <div class="uslist f-16">
            <router-link :to="{name: 'AboutUs'}">
              <span class="mr-15">关于我们</span>
            </router-link>
            <span class="mr-15">|</span>
            <router-link :to="{name: 'JoinUs'}">
              <span class="mr-15">加入我们</span>
            </router-link>
            <span class="mr-15">|</span>
            <router-link :to="{name: 'LinkUs'}">
              <span class="mr-15">联系我们</span>
            </router-link>
            <span class="mr-15">|</span>
            <span>商务合作</span>
          </div>
          <div class="uslist mt-25 f-14">
            本站由 阿里云 提供计算与安全服务   丨  举报邮箱：jubao@motortime.com
          </div>
          <div class="uslist mt-10 f-14">
            2011~2019 北京御城铭翼网络科技有限公司 | 京ICP备15065994号-1| 京ICP证 B2-20181209
          </div>
        </Col>
        <Col class="footerinfo" span="8">
        <div class="footeright">
          <Poptip trigger="hover" v-model="wechatcode">
            <img @click="qrcodeShow(1)" class="rideosimg mt-5" :src="img.wechat">
            <div slot="content">
              <div class="appcodebk" :style="'background-image:url('+img.code_bk+')'">
                <img class="qrcode" :src="img.qrcode">
              </div>
            </div>
          </Poptip>
          <Poptip class="ml-15" trigger="hover" v-model="ioscode">
            <img class="rideosimg mt-5" :src="img.wechat">
            <div slot="content">
              <div class="appcodebk" :style="'background-image:url('+img.ios+')'">
              <img class="qrcode" :src="img.qrcode">
            </div>
            </div>
          </Poptip>
          <Poptip class="ml-15" trigger="hover" v-model="androidcode">
            <img class="rideosimg mt-5" :src="img.android">
            <div slot="content">
              <div class="appcodebk" :style="'background-image:url('+img.code_bk+')'">
              <img class="qrcode" :src="img.qrcode">
            </div>
            </div>
          </Poptip>
          <!-- <div class="text-c ml-15">
            <div v-if="ioscode" class="appcodebk" :style="'background-image:url('+img.code_bk+')'">
              <img class="qrcode" :src="img.qrcode">
            </div>
            <img @click="qrcodeShow(2)" class="rideosimg mt-5" :src="img.ios">
          </div>
          <div class="text-c ml-15">
            <div v-if="androidcode" class="appcodebk" :style="'background-image:url('+img.code_bk+')'">
              <img class="qrcode" :src="img.qrcode">
            </div>
            <img @click="qrcodeShow(3)" class="rideosimg mt-5" :src="img.android">
          </div> -->
        </div>
      </Col>
    </Row>
  </Col>
</Row>
</div>
<div v-if="appcodebk" class="overlay" @click="appoverlay()"></div>
</div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        wechatcode:false,
        ioscode:false,
        androidcode:false,
        appcodebk:false,
        img:{
          code_bk: require('./assets/img/code_bk.png'),
          android: require('./assets/img/android.png'),
          ios: require('./assets/img/ios.png'),
          wechat: require('./assets/img/wechat.png'),
          qrcode: require('./assets/img/qrcode.png'),
        }
      }
    },
    methods: {
      qrcodeShow(id){
        if(id==1){
          this.wechatcode=true
          this.ioscode=false
          this.androidcode=false
          this.appcodebk=true
        }else if(id==2){
          this.wechatcode=false
          this.ioscode=true
          this.androidcode=false
          this.appcodebk=true
        }else if(id==3){
          this.wechatcode=false
          this.ioscode=false
          this.androidcode=true
          this.appcodebk=true
        }
      },
      appoverlay(){
        this.wechatcode=false
        this.ioscode=false
        this.androidcode=false
        this.appcodebk=false
      },
    }
  }
</script>

<style>
.f-12{
  font-size: 12px;
}
.f-14{
  font-size: 14px;
}
.f-16{
  font-size: 16px;
}
.f-18{
  font-size: 18px;
}
.text-c{
  text-align: center;
}
.text-r{
  text-align: right;
}
.text-l{
  text-align: left;
}
.f-w{
  font-weight: bold;
}
.f-r{
  float: right;
}
.f-l{
  float: left;
}
.pd-10{
  padding: 10px;
}
.mt-5{
  margin-top: 5px;
}
.mt-10{
  margin-top: 10px;
}
.mt-15{
  margin-top: 15px;
}
.mt-20{
  margin-top: 20px;
}
.mt-25{
  margin-top: 25px;
}
.mt-30{
  margin-top: 30px;
}
.mt-40{
  margin-top: 40px;
}
.mt-50{
  margin-top: 50px;
}
.mb-10{
  margin-bottom: 10px;
}
.mb-15{
  margin-bottom: 15px;
}
.mb-20{
  margin-bottom: 20px;
}
.mb-25{
  margin-bottom: 25px;
}
.mb-30{
  margin-bottom: 30px;
}
.mb-40{
  margin-bottom: 40px;
}
.mb-50{
  margin-bottom: 50px;
}
.ml-5{
  margin-left: 5px;
}
.ml-10{
  margin-left: 10px;
}
.ml-15{
  margin-left: 15px;
}
.ml-20{
  margin-left: 20px;
}
.ml-25{
  margin-left: 25px;
}
.mr-5{
  margin-right: 5px;
}
.mr-10{
  margin-right: 10px;
}
.mr-15{
  margin-right: 15px;
}
.mr-20{
  margin-right: 20px;
}
.mr-25{
  margin-right: 25px;
}
.mr-30{
  margin-right: 30px;
}
.mr-40{
  margin-right: 40px;
}
.c-white{
  color: #FFFFFF;
}
.c-black{
  color: #3A3A3A;
}
.c-gray{
  color: #6A6A6A;
}
.c-gold{
  color: #F6AB00;
}
.ellipsis{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsis-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsis-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footerbox{
  width: 100%;
  height: 180px;
  background-color: #1C1D21;
}
.footerinfo{
  margin-top: 40px;
}
.uslist{
  color: #6A6A6A
}
.footeright{
  display: flex;
  float: right;
}
.rideosimg{ 
  width: 30px;
  height: 30px;
}
.gotop{
  width: 30px;
  height: 30px;
}
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.appcodebk{
  width: 50px;
  height: 55px;
  transform: rotate(180deg);
  padding: 8px 2px 2px 2px;;
  background-repeat:no-repeat;
  background-size:100% 100%;
}
.ivu-poptip-body{
  padding: 0px 2px;
}
.ivu-poptip-popper{
  min-width: 50px;
}
.qrcode{
  width: 100%;
  height: 100%;
}
.uslist a{
  color: #6A6A6A;
}
.uslist a:hover{
  color: #FFFFFF;
}
</style>
