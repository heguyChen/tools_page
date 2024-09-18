<template>
    <div class="ge">
        <el-card>
            <div slot="header" class="clearfix">
              <el-row>
                <span class="zi">{{ this.year + '年' + this.month }}联盟公司月报</span>
                <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="getReport" class="date">
                </el-date-picker>
                <el-button type="primary" @click="getReport" round class=" btn">查询</el-button>
              </el-row>
              <el-row>
                <el-button v-if="isAdminFlag" round type="primary" @click="saveCorpLevel">保存缴纳情况和公司等级</el-button>
                <el-button round type="primary" @click="getErrorEsiExport">导出我司ESI问题成员</el-button>
                <span style="font-size: 16px;">导出人员会大于等于你的无esi数量，因为一个人会存在多个角色。黄色底是公司欠税。</span>
              </el-row>

            </div>
            <el-table
                class="card"
                :data="jsonData"
                style="width: 100%"
                v-loading="loading"
                :empty-text="'无数据'"
                :row-class-name="tableRowClassName"
                height="1000"
            >
                <el-table-column label="序号" width="70">
                    <template slot-scope="scope">
                        <span> {{  scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="corpName"
                    width="250"
                    label="公司名称">
                </el-table-column>
              <el-table-column
                  prop="characterTotal"
                  width="80"
                  label="总人口">
              </el-table-column>
              <el-table-column
                  prop="characterUnseat"
                  width="80"
                  label="无esi">
              </el-table-column>
              <el-table-column
                  prop="characterQq"
                  width="80"
                  label="无qq">
                <template slot-scope="scope">
                  <span> {{ scope.row.characterTotal - scope.row.characterQq }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  width="150"
                  label="人均/总出勤">
                <template slot-scope="scope">
                  <span> {{ scope.row.papAvg + "/" + scope.row.papTotal }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  sortable
                  prop="corpTax"
                  width="125"
                  label="公司税率">
              </el-table-column>
              <el-table-column
                  prop="allianceTax"
                  width="200"
                  label="联盟税收">
                <template slot-scope="scope">
                  <span> {{ scope.row.allianceTax !== null && scope.row.allianceTax !== undefined ? scope.row.allianceTax.toLocaleString() : '--' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="allianceTaxPaid"
                  width="100"
                  label="是否缴纳">
                <template slot-scope="scope">
                  <div class="input-box" >
                    <el-switch
                        active-text="是"
                        inactive-text="否"
                        size="small"
                        v-if="scope.row.isAdmin"
                        v-model="scope.row.allianceTaxPaid" >
                    </el-switch>
                    <span v-if="!scope.row.isAdmin"> {{ scope.row.allianceTaxPaid ? '√' : '×' }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="paidInfo"
                  width="200"
                  label="缴纳条">
              </el-table-column>
              <el-table-column
                  label="公司等级">
                <template slot-scope="scope">
                  <div class="input-box" >
                    <el-input-number
                        :min="0"
                        :max="5"
                        size="small"
                        v-if="scope.row.isAdmin"
                        v-model="scope.row.corpLevel" >
                    </el-input-number>
                    <span v-if="!scope.row.isAdmin"> {{ scope.row.corpLevel}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 50, 100]"
                layout="total, sizes, prev, pager, next ,jumper" :total="total" @size-change="handleSizeChange">
            </el-pagination>
        </el-card>


    </div>
</template>
  
<script>
import moment from "moment";
import axios from 'axios';
export default {
    name: 'report',
    data() {
        return {
            jsonData: [],
            title: 'pap总数',
            //当前页数
            currentPage: 1,
            // 显示一页多少条数据
            pagesize: 15,
            // 总条数
            total: 0,

            //时间选择器的时间
            time: '',
            //时间选择器的时间格式化后
            month: '',
            year: '',
            //接受pap总数统计的数组
            pap: [],
            loading: true,
            isAdminFlag: false,
            url: process.env.VUE_APP_API_BASE_URL_REPORT,
        }
    },
    methods: {
        //监听 pagesize 改变的事件
        handleSizeChange(newsize) {
            //这里conso 选中第几页 最新的值
            console.log(newsize);
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.pagesize = newsize;
            this.getReport();
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            //把最新的页码（newPage）赋值给 动态的 pagenum
            // this.pagenum = newPage;
            this.currentPage = newPage;
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            // this.userlistinfo();
            this.getReport();
        },
        //日历获得现在月份
        nowTime() {
            this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        },
        //pap公司排行
        async getReport() {
          this.month = moment(this.time).format("MM");
          this.year = moment(this.time).format("YYYY");
            this.loading = true;
            const { data: res } = await this.$http({
                method: 'get',
                url: this.url + '/report/report',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token"),
                },
                params: {
                    month: this.month,
                    page: this.currentPage,
                    size: this.pagesize,
                    year: this.year
                }
            })
            this.jsonData = res.data;
            this.total = res.total;
            this.loading = false;
            if (res && res.data && res.data.length > 0) {
              this.isAdminFlag = res.data[0].isAdmin;
            }
        },
      async getErrorEsiExport() {
        const { data: res } = await this.$http({
          method: 'get',
          url: this.url + '/report/esi/corpEsiErrorExport',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("token"),
          },
          params: {
            month: this.month,
            page: this.currentPage,
            size: this.pagesize,
            year: this.year
          },
          responseType : 'arraybuffer'
        })
        /// 将二进制数据封装成 Blob 对象
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // 创建a标签，设置下载链接和文件名
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.year + '-' + this.month + 'esi问题人员.xlsx';
        // 模拟点击a标签进行文件下载
        document.body.appendChild(link);
        link.click();
        // 移除a标签
        document.body.removeChild(link);
      },
      saveCorpLevel() {
        this.loading = true;
        // 发送 POST 请求
        // for (let i = 0; i < this.jsonData.length; i++) {
        //   let paid = this.jsonData[i].allianceTaxPaid;
        //   if (paid === '√') {
        //     this.jsonData[i].allianceTaxPaid = true;
        //   } else {
        //     this.jsonData[i].allianceTaxPaid = false;
        //   }
        // }

        let _that = this;
        axios.post(this.url + '/report/report', this.jsonData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("token")
          }
        })
        .then(response => {
          // 处理响应
          this.$message({
            message: response.data.message,
            type: 'success'
          });
          this.getReport();
          _that.loading = false;
        })
        .catch(error => {
          // 处理错误
          this.$message.error(error);
          _that.loading = false;
        });
      },
      tableRowClassName({row, rowIndex}) {
        // if (row.papAvg < 3) {
        //   return 'danger-row'
        // }
        if (!row.allianceTaxPaid) {
          return 'warning-row';
        }

        return '';
      },
      //单元格点击后，显示input，并让input 获取焦点
      handleCellClick:function(row, column, cell, event){
        emptransfer.addClass(cell,'current-cell');
        if(emptransfer.getChildElement(cell,3) !== 0){
          var _inputParentNode =emptransfer.getChildElement(cell,3);
          if(_inputParentNode.hasChildNodes()&& _inputParentNode.childNodes.length > 2) {
            var _inputNode = _inputParentNode.childNodes[2];
            if(_inputNode.tagName === 'INPUT'){
              _inputNode.focus();
            }
          }
        }
      },
      //input框失去焦点事件
      handleInputBlur:function(event){   //当 input 失去焦点 时,input 切换为 span，并且让下方 表格消失（注意，与点击表格事件的执行顺序）
        var _event = event;
        setTimeout(function(){
          var _inputNode = _event.target;
          if(emptransfer.getParentElement(_inputNode,4)!==0){
            var _cellNode = emptransfer.getParentElement(_inputNode,4);
            emptransfer.removeClass(_cellNode,'current-cell');
            emptransfer.removeClass(_cellNode,'current-cell2');
          }
        },200);
      },
    },
    mounted() {
        this.nowTime();
        this.getReport();
    },
    computed: {
        uvList() {
            // if (typeof this.allUvList === "undefined") {
            //   console.log(this);
            //   return;
            // } else {
            let list = this.jsonData.filter(
                (item) =>
                    item["name"].toString().toLowerCase().indexOf(this.search) > -1
            );
            let table_data = list.slice(
                (this.currentPage - 1) * this.pagesize,
                this.currentPage * this.pagesize
            );
            return table_data;
            // }
        },
    },
}
</script>
<style lang="less" >
.tb-edit .input-box {
  display: none
}
.tb-edit .current-cell .input-box {
  display: block;
  margin-left: -15px;
}

.el-table .warning-row {
  background: #E6A23C;
}

.el-table .danger-row {
  background: #F56C6C;
}
.ge {
    height: 100%;

    .card {
        color: black;
        font-size: 20px;
        text-align: center;
        align-content: center;
        height: 100%;
    }

    .zi {
        height: 80px;
        font-size: 50px;
        text-align: center;
        align-content: center;
        background: linear-gradient(to bottom, white, black);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        display: block;
    }

    .btn {
        position: absolute;
        width: 80px;
        margin: 0;
        top: 40px;
        right: 10px;
    }

    .date {
        position: absolute;
        width: 150px;
        margin: 0;
        top: 40px;
        right: 100px;
    }
}
</style>