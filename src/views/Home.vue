<template>
  <div class="w">
    <div class="head">
      <div class="logo">
        <a href="/" title="dc" @click="home()"></a>
      </div>
      <div class="slogan">欢迎来到本网站</div>
      <el-button round class="btn" @click="dialogVisible = true" v-if="this.$store.state.bind">qq绑定</el-button>
      <div v-else="!this.$store.state.bind" class="qq">{{
        '[' + this.qqForm.corpTicker + ']' + this.qqForm.nickName + '-' + this.qqForm.characterName }}
        <el-button round class="btn1" @click="qqxiu">修改</el-button>
      </div>
    </div>
    <div style="text-decoration-color: #02a6b5" class="bar">
      <div class="dc">
        <ul>
          <li>
            <a style="cursor: pointer" @click="eve_switch_pap()" v-bind:class="{ bgc: clickli === 0 }">PAP个人详情</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="eve_switch_papph()" v-bind:class="{ bgc: clickli === 1 }">PAP个人排行</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="eve_switch_gspap()" v-bind:class="{ bgc: clickli === 2 }">公司内部PAP排行</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="eve_switch_dcgspap()" v-bind:class="{ bgc: clickli === 5 }"
              v-show="this.squadArray.some(value => this.corpArray.includes(value))">DC联盟公司PAP平均排行</a>
          </li>
<!--          <li>-->
<!--            <a href="#" @click="eve_switch_gsqqzhucu()" v-bind:class="{ bgc: clickli === 3 }"-->
<!--              v-show="this.$store.state.admin == true">DC各公司详情</a>-->
<!--          </li>-->
          <li>
            <a style="cursor: pointer" @click="eve_switch_gsseat()" v-bind:class="{ bgc: clickli === 4 }"
              v-show="this.squadArray.some(value => this.corpArray.includes(value))">公司seat注册情况</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="alliance_report()" v-bind:class="{ bgc: clickli === 6 }"
               v-show="this.squadArray.some(value => this.corpArray.includes(value))">公司实时月报</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="auction()" v-bind:class="{ bgc: clickli === 7 }"
               v-show="this.squadArray.some(value => this.corpArray.includes(value))">拍卖</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="auctionMoon()" v-bind:class="{ bgc: clickli === 8 }"
               v-show="this.squadArray.some(value => this.moonArray.includes(value))">月矿数据</a>
          </li>
          <li>
            <a style="cursor: pointer" @click="auctionSkyHook()" v-bind:class="{ bgc: clickli === 9 }"
               v-show="this.squadArray.some(value => this.moonArray.includes(value))">天钩数据</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- //主体 -->
    <div class="main">
      <router-view></router-view>
      <!-- 悬浮框 -->
      <div class="card">
        <el-card class="box-card">
          <Dcqq></Dcqq>
        </el-card>
      </div>
    </div>

    <!-- qq绑定弹出框 -->
    <el-dialog title="QQ绑定" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="QQ号码" prop="qq">
          <el-input v-model="form.qq" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="character">
          <el-input v-model="form.character" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qqBind">确 定</el-button>
      </span>
    </el-dialog>
    <!-- qq修改 -->
    <el-dialog title="修改" :visible.sync="xdialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="xform" :rules="xrules" ref="xformRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="QQ号码" prop="qqNumber">
          <el-input v-model="xform.qqNumber" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="xform.nickName" ></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="characterName">
          <el-input v-model="xform.characterName" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qqXiuGai">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Dcqq from '@/components/dcqq/Dcqq.vue'

export default {
  components: {
    Dcqq
  },
  data() {
    return {
      dialogVisible: false,
      xdialogVisible: false,
      form: {
        qq: '',
        name: '',
        character: '',
      },
      xform: {
        qqNumber: '',
        nickName: '',
        characterName: '',
      },
      rules: {
        qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              //  校验数字的正则
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入qq号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          }
        ],
        name: [
          {
            validator: function (rule, value, callback) {
              const str = '[' + this.qqForm.corpTicker + ']' + value +'-' + this.qqForm.characterName;
              const str_noNick = '[' + this.qqForm.corpTicker + ']' +'-' + this.qqForm.characterName;
              // 使用正则表达式匹配中文字符
              const chineseRegExp = /[\u4e00-\u9fa5]/g;
              // 使用 replace 方法将中文字符替换为空字符串，并获取替换后的字符串长度
              const replacedStr = str.replace(chineseRegExp, '');
              // 计算字符串长度：中文字符算作 3 个字符，其他字符算作 1 个字符
              let length;
              if (str.match(chineseRegExp)) {
                length = replacedStr.length * 1 + str.match(chineseRegExp).length * 3;
              } else {
                length = replacedStr.length * 1;
              }
              if (str_noNick.length > 60) {
                callback(new Error("游戏角色名过长,请在seat中选择其他角色作为主角色"));
              } else if (length > 60) {
                callback(new Error("昵称过长,请适当缩减"));
              } else {
                //校验通过
                callback();
              }
            }.bind(this),
            trigger: "blur",
          }
        ]
      },
      xrules: {
        qqNumber: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              //  校验数字的正则
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入qq号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          }
        ],
        nickName: [
          {
            validator: function (rule, value, callback) {
              const str = '[' + this.qqForm.corpTicker + ']' + value +'-' + this.qqForm.characterName;
              const str_noNick = '[' + this.qqForm.corpTicker + ']' +'-' + this.qqForm.characterName;
              // 使用正则表达式匹配中文字符
              const chineseRegExp = /[\u4e00-\u9fa5]/g;
              // 使用 replace 方法将中文字符替换为空字符串，并获取替换后的字符串长度
              const replacedStr = str.replace(chineseRegExp, '');
              // 计算字符串长度：中文字符算作 3 个字符，其他字符算作 1 个字符
              let length;
              if (str.match(chineseRegExp)) {
                length = replacedStr.length * 1 + str.match(chineseRegExp).length * 3;
              } else {
                length = replacedStr.length * 1;
              }
              if (str_noNick.length > 60) {
                callback(new Error("游戏角色名过长,请在seat中选择其他角色作为主角色"));
              } else if (length > 60) {
                callback(new Error("昵称过长,请适当缩减"));
              } else {
                //校验通过
                callback();
              }
            }.bind(this),
            trigger: "blur",
          }]
      },
      clickli: 0,
      //判断是否为管理
      adminid: [],
      adminarr: [],
      squadArray: [],
      corpArray: ['27','29', '50','53'],
      moonArray: ['34','43'],

      //get接口活动的表单
      qqForm: {},
      cookie: '',
      bar: 'Bearer',
      token: '',
      arr: [],
      /**
       * 第四个最新
       * 第三个测试admin
       * 第二个测试公司管理
       */
      result: '',
      // result: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOjk4NjQ4MDYxLCJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyMSIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjEifV0sImV4cCI6MTcyNTY5NTU4OSwiY2hhcmFjdGVySWQiOjIxMTkyMDA0NjAsImp0aSI6ImUzMjYzMWU4LWMzYWItNDAyMi05MjA0LTAwMTExZjhmN2VhZCIsImNsaWVudF9pZCI6InNlYXQuZGMtZXZlIiwidXNlcm5hbWUiOiJYUyBvbmlsaW5lIn0.SJwuMRLBEfS0QXW7aMyenDWLRjYebLKCCGwCgsRsaBk5a4BnDWIhznd7NdEKbj8xRxn66qzywqnqEkc1nJ0h9M8jFCc1FsniIYWIHubpQthuPo80q-i1KmGHtrdgphLL0uvPDo1UwsNys7f1Hq-dKZbvOaPX986lFd72TpH5lvKefeaz5o1BenL4W-lxu6vkFVhTsckG3xDqCs5KITCcTkVYnOw2U2pE_qfEegm_u15TnFptNZSED3GskWKarZJKGQdiGjvQAULNeiY5bIJByYMlC-2pAZPVONznVlQX86HqYEjDb2R6sTrq5-c1_zKyOFXIDvBsjRkuo9c3hdAZ7Q',
      // result: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOjk4NjQ4MDYxLCJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyNyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjcifSx7InNxdWFkSWQiOiIzMiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzIifSx7InNxdWFkSWQiOiIzNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzYifV0sImV4cCI6MTcyNTY5MTE2OSwiY2hhcmFjdGVySWQiOjIxMTYzNjk0ODgsImp0aSI6IjYwOWM4YWMzLWRkM2MtNGQ5Mi1iNTEzLTYzMDFkMjVkMGJkMiIsImNsaWVudF9pZCI6InNlYXQuZGMtZXZlIiwidXNlcm5hbWUiOiJZTSBzYWt1cmEifQ.SIew0HGZvqIbfx8eR57D7W0EzyyfCcVfZolFUtAiZc_HCoOKSiPw7Nfl0NEKu2gYBKhbC-Vo2FDzt__f77QWARtRq5jUrRVjlAdugo-C5laWPgBDPjtx52WnwSsbZ3aRJb-1T3jzLY2IxhAxuj6U6daTHGm-DnByVIhSRcqyKDizpYS-3wiT9gA06sqBYV05Dn6ZGcqOMfq47XsD0vLmgVFsTaQCEMsw0sA1JwKiLZGKyj-36-H7ickUamphq9bAf3ZYFzH_buP9V3WxURendCtJRPmHNPCquXc9vbNatV-UhJ7PxfUeg7u4PrBQKzZqPrxme1CvPZW1VvkUtDg4rA',
      // result: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOjk4NTQ3NzcxLCJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjYifSx7InNxdWFkSWQiOiIyNyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjcifSx7InNxdWFkSWQiOiIzMiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzIifSx7InNxdWFkSWQiOiIzMyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzMifSx7InNxdWFkSWQiOiIzNCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzQifSx7InNxdWFkSWQiOiIzNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzYifSx7InNxdWFkSWQiOiI0NCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDQifSx7InNxdWFkSWQiOiI0NiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDYifV0sImV4cCI6MTcyNjA1MDgzMSwiY2hhcmFjdGVySWQiOjIxMTQ4MjU3MjAsImp0aSI6IjVjZmFlZWU1LWNmYzQtNDhhMS1iNTgxLTBhZDIwMzU5MjRhOCIsImNsaWVudF9pZCI6InNlYXQuZGMtZXZlIiwidXNlcm5hbWUiOiJkZWFyIG11bXVzYW4ifQ.BXSM5l-epfTw7XsZHy4RjnGZD11ria217BN58goV-Ll-rHa6w5Y1_rrhvoi6w-5AAmbV_8ldnJOaf95HSXAfVD16fui3SfAKfq62KP05VYGg3oYkpKt6MXWn8KcP-bmSiXWTQ8Cy-ael5g9Vhsfcab4QaV_T0kSIvEmCZgi6dR_cX5KZkYalt2nCEoL2cfp2ct58L6PLw7iZLOqF4yU3MLIrzgMaaePkIRa3iNmF6lSo8fbziz1afn32-02D5bAUTdZwkN58P0JYwHKn9s6y7WPFqEsc7Dxc2bCFTZG8BnFoVhd69dXQD11dkrbcwd41UnRrCsHDUcQi8wXoVul4NQ'
    }
  },
  methods: {
    home() {
      this.$router.push('/')
    },
    async getQQ() {
      this.token = sessionStorage.getItem("token");
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/qq/bind',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      }).catch(err => err)
      this.qqForm = res.data;
      this.$store.state.form = this.qqForm

      this.form.character = this.qqForm.characterName

      // this.getadmin();
      if (res.data.qqNumber == 0) {
        this.$store.state.bind = true
      } else {
        this.$store.state.bind = false
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    qqBind() {
      this.$refs.formRef.validate(async (validate) => {
        this.qqForm.nickName = this.form.name;
        this.qqForm.qqNumber = this.form.qq;
        if (validate) {
          const { data: res } = await this.$http({
            method: 'post',
            url: 'https://tools.dc-eve.com/qq/bind',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem("token"),
              'Ip': sessionStorage.getItem("ip"),
            },
            data: this.qqForm
          })

          this.$store.state.bind = false;
          alert(res.message);
          this.dialogVisible = false;
        } else {
          alert('请填写所有数据')
        }
      })




    },
    //修改对话框
    qqxiu() {
      this.xform = this.qqForm;
      this.xdialogVisible = true;
    },
    async qqXiuGai() {
      this.$refs.xformRef.validate(async (validate) => {
        this.qqForm.nickName = this.xform.nickName;
        this.qqForm.qqNumber = this.xform.qqNumber;
        if (validate) {
          const { data: res } = await this.$http({
            method: 'post',
            url: 'https://tools.dc-eve.com/qq/bind',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem("token"),
              'Ip': sessionStorage.getItem("ip"),
            },
            data: this.qqForm
          })

          this.getQQ();
          if (res == null) {
            alert("响应失败")
          } else {
            if (res.code == 500) {
              alert(res.data)
            } else {
              alert(res.message);
              this.xdialogVisible = false;
            }
          }
          //
        } else {
          alert('请填写所有数据')
        }
      })



    },
    eve_switch_pap() {
      this.clickli = 0;
      this.$router.push('/pap');
    },
    eve_switch_papph() {
      this.clickli = 1;
      this.$router.push('/rankpap');
    },
    eve_switch_gspap() {
      this.clickli = 2;
      this.$router.push('/corporatepap');
    },
    // eve_switch_gsqqzhucu() {
    //   this.clickli = 3;
    //   this.$router.push('/alliancegs')
    //
    // },
    eve_switch_gsseat() {
      this.clickli = 4;
      this.$router.push('/seat')
    },
    eve_switch_dcgspap() {
      this.clickli = 5;
      this.$router.push('/dcpap');
    },
    // 公司实时月报页面跳转
    alliance_report() {
      this.clickli = 6;
      this.$router.push('/alliancereport')
    },
    // 拍卖系统
    auction: function () {
      this.clickli = 7;
      this.$router.push('/auction')
    },

    // 月矿数据
    auctionMoon() {
      this.clickli = 8;
      this.$router.push('/auction_moon')
    },

    // 天钩数据
    auctionSkyHook() {
      this.clickli = 9;
      this.$router.push('/auction_sky_hook')
    },

    getCookie() {
      this.arr = document.cookie.split("; ")
      for (var i = 0; i < this.arr.length; i++) {
        var arr1 = this.arr[i].split("=")     //将名/值对以“=”分割开
        if (arr1[0] == "tools_remember") {
          this.result = arr1[1];  //如果名为name,则结果result为名对应的值
        }
      }
      this.cookie = this.bar.concat(" ", this.result);
      sessionStorage.setItem('token', this.cookie);
      if (this.cookie.length < 8) {
        // window.location.replace("https://seat.dc-eve.com")
      }
    },
    //判断是不是管理
    async getSquadInfo() {
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/qq/bind/squad/info',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        }
      }).catch(err => err)
      if (res.code === 200) {
        this.squadArray = res.data;
        this.$store.userRole = res.data;

      } else {
        this.$message.error(res.message);
      }
    }

  },
  created() {
    this.getCookie();
  },
  beforeMount() {
    this.getQQ();
  },
  mounted() {
    // this.getSquadInfo();
    this.squadArray = sessionStorage.getItem('userRole').split(",");
    switch (this.$route.path) {
      case '/pap':
        this.clickli = 0;
        break;
      case '/rankpap':
        this.clickli = 1;
        break;
      case '/corporatepap':
        this.clickli = 2;
        break;
      case '/seat':
        this.clickli = 4;
        break;
      case '/dcpap':
        this.clickli = 5;
        break;
      case '/alliancereport':
        this.clickli = 6;
        break;
      case '/auction':
        this.clickli = 7;
        break;
      case '/auction_moon':
        this.clickli = 8;
        break;
      case '/auction_sky_hook':
        this.clickli = 9;
        break;
      case '/no-permission':
        // this.clickli = 9;
        break;
    }
  },


}
</script>

<style lang="less" scoped>
.w {
  position: relative;

  .head {
    width: 100%;
    height: 150px;
    background-image: url(../assets/image/bg.gif) !important;
    position: relative;

    .logo {
      position: absolute;
      top: 10px;
      left: 60px;
      width: 175px;
      height: 56px;

      a {
        display: block;
        overflow: hidden;
        height: 130px;
        width: 130px;
        background: url(https://images.evetech.net/alliances/99009163/logo?tenant=tranquility&size=128) no-repeat;
        // background-color: red;
      }

    }

    //标语
    .slogan {
      text-align: center;
      color: aqua;
      font-size: 50px;
      display: block;
      position: absolute;
      top: 35px;
      right: 500px;

    }

    .btn {
      position: absolute;
      height: 50px;
      width: 100px;
      top: 50px;
      right: 100px;
    }

    .qq {
      position: absolute;
      height: 50px;
      width: 300px;
      top: 50px;
      right: 50px;
      color: rgb(236, 241, 241);
      font-size: 20px;

      .btn1 {
        position: absolute;
        height: 50px;
        width: 100px;
        top: 30px;
        right: 100px;
      }
    }
  }

  .bar {
    position: absolute;
    top: 150px;
    height: 45px;
    width: 100%;
    border-bottom: 4px solid #b1191a;

    .dc {

      height: 45px;
      font-size: 16px;
      line-height: 45px;
      text-align: center;

      ul {
        width: 100%;

        li {
          float: left;


          a {
            display: block;
            height: 45px;
            padding: 0 25px;
            line-height: 45px;
            font-size: 16px;

          }
        }
      }


    }

    .bgc {
      background-color: #b1191a;
      color: #fff;
    }

  }

  .main {
    position: relative;
    top: 49px;
    height: 1080px;

    .card {
      width: 150px;
      position: absolute;
      top: 0px;
      right: -150px;
      z-index: 9999;

      .box-card {
        height: 210px;
        width: 150px;

        /deep/.el-card__body {
          padding: 0;
        }
      }
    }
  }


}
</style>