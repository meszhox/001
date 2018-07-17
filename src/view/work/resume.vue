<template>
<div>
  <div :class="[showText ? 'notshow' : '' ]">
    <van-nav-bar title="我的简历" left-text="返回" left-arrow @click-left="goback" >
    </van-nav-bar>
    <div class="headImg">
      <img :src="headImg" alt="">
    </div>
    <div class="basicInfo">
      <van-cell-group>
        <van-cell title="基本信息" is-link :value=value1 @click="finishBasic" />
        <van-cell title="教育经历" is-link :value=value2 @click="addEduInfo" />
        <van-cell title="工作经历" is-link :value=value3 @click="addExperence" />
        <van-cell title="附件简历" is-link :value=value4 @click="addImage" />
      </van-cell-group>
    </div>
    <div class="page-foot">
      <p>注：</p>
      <p>1、完善简历信息会增加企业对您的了解，帮您尽快找到自己合适的岗位；</p>
      <p>2、完善简历表示您已知晓并同意<a href="#" @click="showTextBox">《工厂巴士用户协议》</a></p>
    </div>
    <button @click="saved" class="saveInfo">保存</button>
  </div>

  <!-- 用户协议,通过class切换简历信息和用户协议 -->
  <div :class="[showText ? 'info_txt' : 'notshow' ]">
    <h2>工厂巴士公众号用户协议</h2>
    <h3>一、声明</h3>
    <p>1.工厂巴士公众号指喻信中智（武汉）信息技术有限公司（以下简称喻信中智）经营的包括基于互联网及移动网向服务使用人（以下简称用户）提供服务的网络服务平台，该所有权及运作权均归喻信中智所有。</p>
    <p>2.本协议作为喻信中智与用户签订的服务协议，用以约束用户使用工厂巴士公众号服务（包括但不限于互联网网站、移动应用程序及其相关服务）的行为，用户进行“个人简历信息”登记、简历投递或使用工厂巴士公众号的行为，即被视为完全同意及接受本协议全部条款。</p>
    <h3>二、服务</h3>
    <p>1.工厂巴士公众号运用微信公众号平台，通过国际互联网络等手段为求职者获取职位信息、投递反馈等网络服务。喻信中智保留随时修改或中断服务而不需知照用户的权利。喻信中智行使修改或中断服务的权利，不需对关注者或第三方负责。本协议的修改权归喻信中智所有。用户要继续使用工厂巴士公众号服务需要两方面的确认：</p>
    <p>1)首先确认服务条款及其变动。</p>
    <p>2)同意接受所有的服务条款限制。</p>
    <h3>三、用户须知</h3>
    <p>1.上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他上网装置</p>
    <p>2.上网开支，包括并不限于网络接入费、上网设备租用费等。</p>
    <p>3.如果用户购买了工厂巴士公众号的付费服务，即视为同意支付其相关费用。付费失败将导致付费服务终止。由于服务终止导致用户或第三方受到的影响，喻信中智不负任何责任。</p>
    <h3>四、用户隐私权</h3>
    <p>1.本协议所称之用户隐私包括被法律确认为隐私内容，并符合下述范围的信息：</p>
    <p>1)用户关注工厂巴士公众号，登记个人简历信息时，根据应用要求提供的个人信息；</p>
    <p>2)在用户使用工厂巴士公众号服务、参加网站活动、或访问网站网页时，网站自动接收并记录的用户浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录；</p>
    <p>2.在不透露单个用户隐私资料的前提下，工厂巴士公众号有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
    <p>3.为服务用户的目的，工厂巴士公众号可能会通过您的手机号码、电子邮件或其他联系方式向您发送短信、邮件或消息（包括但不限于向用户推荐职位、发出活动和服务信息等）。用户在享用工厂巴士公众号服务的同时，同意接受工厂巴士公众号服务提供的各类信息服务。</p>
    <p>4.工厂巴士公众号承诺不公开或透露用户的密码、姓名、手机号码等在本站的非公开信息，除非因用户本人的需要、法律或其他合法程序的要求、服务条款的改变或修订等。</p>
    <p>5.工厂巴士公众号可能会与第三方合作向用户提供相关的网络服务，在用户授权的情况下，工厂巴士公众号有权将用户简历等信息提供给该第三方。</p>
    <p>6.用户的个人信息将在下述情况下部分或全部被披露：</p>
    <p>1)经用户同意，向第三方披露，如：向单位投递简历，视为用户同意；</p>
    <p>2)如用户是合格的知识产权人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</p>
    <p>3)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</p>
    <p>4)如果用户出现违反中国有关法律或者网站政策的情况，需要向第三方披露；</p>
    <p>5)为提供用户所要求的产品和服务，而必须和第三方分享用户的个人信息；</p>
    <p>6)其他工厂巴士公众号根据法律或者网站政策认为合适的披露
    7.同时用户须做到：
    </p>
    <p>1)用户名和昵称的注册与使用应符合网络道德，遵守中华人民共和国的相关法律法规。</p>
    <p>2)用户名和昵称中不能含有威胁、淫秽、漫骂、非法、侵害他人权益等有争议性的文字。</p>
    <p>3)用户必须保护好自己的帐号和密码，因用户本人泄露而造成的任何损失由用户本人负责。另外，每个用户都要对其帐户中的所有活动和事件负全责。用户可随时改变其密码和图标，也可以结束旧的帐户重开一个新帐户。用户若发现任何非法使用用户帐号或安全漏洞的情况，应当立即通告喻信中智公司。</p>
    <p>4)不得盗用他信息，由此行为造成的后果自负。</p>
    <p>8.由于工厂巴士公众号是一个招聘服务平台，当用户向工厂巴士公众号递交简历时，用户即同意喻信中智及相关招聘企业拥有法律上许可的对用户简历进行查询及使用的权利，由此产生的一切后果（包括但不限于相关招聘企业或其工作人员错误或非法使用前述用户简历信息）喻信中智不承担任何法律责任。</p>
    <p>9.用户完全了解及同意，在使用工厂巴士公众号服务过程中，可能存在由于不可抗力或喻信中智不能预料或不能控制的原因（包括但不限于计算机病毒、黑客攻击、系统不稳定、通信线路等原因）造成的风险（包括但不限于数据丢失、个人信息泄露等），因此造成的任何法律后果，喻信中智不承担任何法律责任。</p>
    <h3>五、责任说明</h3>
    <p>1.基于技术和不可预见的原因而导致的服务中断，或者因用户的非法操作而造成的损失，喻信中智不负责任。</p>
    <p>2.用户应当自行承担一切因自身行为而直接或者间接导致的民事或刑事法律责任。</p>
    <h3>六、其它说明</h3>
    <p>1.不得利用工厂巴士公众号危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用工厂巴士公众号制作、复制和传播下列信息：</p>
    <p>1)煽动抗拒、破坏宪法和法律、行政法规实施的；</p>
    <p>2)煽动颠覆国家政权，推翻社会主义制度的；</p>
    <p>3)煽动分裂国家、破坏国家统一的；</p>
    <p>4)煽动民族仇恨、民族歧视，破坏民族团结的；</p>
    <p>5)捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</p>
    <p>6)宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</p>
    <p>7)公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；</p>
    <p>8)损害国家机关信誉的；</p>
    <p>9)其他违反宪法和法律行政法规的；</p>
    <p>10)进行商业广告行为的。</p>
    <p>2.未经喻信中智的授权或许可，任何用户不得借用工厂巴士公众号的名义从事任何商业活动，也不得将工厂巴士公众号作为从事商业活动的场所、平台或其他任何形式的媒介。禁止将工厂巴士公众号用作从事各种非法活动的场所、平台或者其他任何形式的媒介。如用户违反上述规定，则喻信中智有权直接采取一切必要的措施，包括但不限于删除用户发布的内容、取消用户在网站获得的星级、荣誉以及虚拟财富，暂停或查封用户帐号，乃至通过诉讼形式追究用户法律责任等。</p>
    <p>3.喻信中智保留经自行裁决和判断而过滤、编辑或移除任何上述内容的权利。</p>
    <p>4.喻信中智对用户或任何第三方发布、存储或上传的任何内容或其任何损失或损害，均不负责也不承担责任，对用户可能遇到的任何错误、中伤、诽谤、诬蔑、不作为、谬误、淫秽、色情或亵渎，喻信中智公司也不承担责任。作为互动服务的提供者，喻信中智对其用户在任何公共论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。喻信中智保留在任何时候为任何理由而不经通知地移除、筛查或编辑本网站上发布或存储的任何内容的权利，且其具有绝对的裁量权如此行为，用户须自行负责备份和替换其在工厂巴士公众号发布或存储的任何内容，成本和费用自理。</p>
    <h3>七、版权说明</h3>
    <p>1.任何用户接受本服务协议，即表明该用户主动将其在任何时间段在本站发表的任何形式的信息的著作财产权，包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给喻信中智所有，同时表明该用户许可喻信中智有权利就任何主体侵权而单独提起诉讼，并获得全部赔偿。 本协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于用户在该公众号发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。</p>
    <p>2.用户同意并明确了解上述条款，不将已发表于本站的信息，以任何形式发布或授权其它网站（及媒体）使用。</p>
    <p>3.同时，喻信中智保留删除站内各类不符合规定的评论而不通知用户的权利。</p>
    <p>4.喻信中智是工厂巴士公众号的制作者,拥有此应用内容及资源的版权,受国家知识产权保护,享有对本应用声明的最终解释与修改权；未经喻信中智的明确书面许可,任何单位或个人不得以任何方式,以任何文字作全部和局部复制、转载、引用和链接。否则喻信中智将追究其法律责任。</p>
    <h3>八、免责声明</h3>
    <p>1. 工厂巴士公众号客户端的各种版本，包括但不限于JAVA版、Windows Mobile版、Android版、iOS版、Symbian版、BREW版、QT版等，均援引适用本用户服务条款，喻信中智拥有并保留其提供的各种手机客户端及在手机客户端中展示内容的所有知识产权。</p>
    <p>2.任何工厂巴士公众号手机客户端的手机品牌合作商，如Apple, AppStore，并不因合作获得手机客户端的知识产权，也非工厂巴士公众号手机客户端的赞助商，因手机客户端侵犯了任何第三方知识产权的，承担相应的法律责任。</p>
    <p>3.喻信中智对于任何包含、经由或连接、下载或从工厂巴士公众号所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经工厂巴士公众号上的内容、广告、展示而购买、取得的任何产品、信息或资料，喻信中智不负保证责任。用户自行负担使用工厂巴士公众号的风险。</p>
    <p>4.工厂巴士公众号有权但无义务，改善或更正本网站任何部分之任何疏漏、错误。</p>
    <h3>九、联系我们</h3>
    <p>如果用户对本协议或工厂巴士公众号的使用还存有任何疑问，可以发邮件至guocf@whyxzz.cn联系我们。</p>
    <button @click="closeText" >关闭</button>
  </div>
</div>
</template>

<script>
import '../../assets/img/icon-add2/iconfont.css'
import 'vant/lib/vant-css/index.css';
import Vue from 'vue'
import { NavBar, Cell, CellGroup, Field } from 'vant'
Vue.use(NavBar)
.use(Cell)
.use(CellGroup)
.use(Field)
export default {
  data(){
    return{
      user:{
        name: " ",
        sex: " ",
        age: " ",
        phone: " ",
        marriage: " ",
        baby: " ",
        native: " ",
        education: " ",
        address: " ",
        salary: " ",
      },
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      showText: false,
      headImg: ''
    }
  },
  methods:{
    menu() {
      window.scrollTo(0,0);
     },
    goback(){
      this.$router.go(-1)
    },
    addExperence(){
      this.$router.replace({name:'add-workex'})
    },
    finishBasic(){
      this.$router.replace({name:'basicInfo-detail'})
    },
    addEduInfo(){
      this.$router.replace({name:'add-educationInfo'})
    },
    addImage(){
      this.$router.replace({name:'add-imageResume'})
    },
    saved(){
      this.$router.push({name:'sq-record'})
    },
    showTextBox(){
      this.showText = true
    },
    closeText(){
      this.showText = false
    }
  },
  mounted(){
    let _Id = this.$route.params._id;
    let _itemNum = {};
    Vue.apiGet("/api/hr/profileuser/wxuserinfo").then(res => {
      let _data = res.data;
      this.headImg = _data.headimgurl
    }) ;
    this.$http.post("/api/hr/profile/IsComeGet",{ID:_Id});
    this.$http.post("/api/hr/profileuser/1/r",_itemNum).then(res => {
      if (res.data.Content != null){
        let _data = res.data.Content.Table[0];
      }
      else{
        this.value1 = '未完善';
        this.value2 = '未完善';
        this.value4 = '未完善';
        return
      }
      if( _data.Name && _data.Sex && _data.Birth && _data.IDCardNum){
        this.value1 = '已完善'
      }
      else{
        this.value1 = '未完善'
      }
      if(_data.ImgPath != '[]'){
        this.value4 = '已完善'
      }
      else{
        this.value4 = '未完善'
      }
      if(_data.GradSchool != null  && _data.Political != null && _data.Major != null){
        this.value2 = '已完善'
      }
      else{
        this.value2 = '未完善'
      }
    });
    this.$http.post("/api/hr/WorkerExper/1/r/-1",_itemNum).then(res => {
      if(res.data.Message == 'success'){
        this.value3 = '已完善'
      }
      else{
        this.value3 = '未完善'
      }
    })

  },
  created(){
    this.menu()
  }
}
</script>

<style scoped>
.van-nav-bar {
  background: #1b1b1f;
  color: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
}
.van-icon,.van-nav-bar >>> .van-nav-bar__text,.van-nav-bar >>> .van-icon::before{
  color: #ffffff;
}
.headImg{
  padding-top: 60px;
  background: #ffffff;
  height: 80px;
}
.headImg img{
  width: 60px;
  height: 60px;
  display: block;
  margin: auto;
  border-radius: 100%;;
  /* margin-bottom: 20px; */
}
.basicInfo{
  background: #ffffff
}

/* .van-cell{
  border-bottom: 1px solid #dfdfdf
} */
.add-button{
  margin-top: 20px;
}
.add-button button{
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: none;
  color: #10b7ca;
}
.saveInfo{
  width: 96%;
  margin-left: 2%;
  height: 46px;
  background: #3385ff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  position: fixed;
  bottom: 10px;
}
.page-foot{
  font-size: 12px;
  width: 90%;
  margin-left: 5%;
  color: #555
}
.info_txt{
  width: 96%;
  margin-left: 2%;
}
.info_txt h2{
	text-align: center;
	font-size: 14px;
}
.info_txt h3{
	font-size: 12px;
}
.info_txt p{
	text-align:justify ;
	font-size: 0.6rem;
  padding: 10px;
  margin: 0;
}
.info_txt button{
  width: 96%;
  margin-left: 2%;
  height: 46px;
  background: #3385ff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.notshow{
  display: none
}
</style>
