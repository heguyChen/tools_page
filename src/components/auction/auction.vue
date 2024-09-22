<template>
  <div>
    <div style="margin-top: 5px;margin-left: 10px;">

      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-row :gutter="1">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('region')">
                <el-select
                    filterable
                    multiple
                    collapse-tags
                    clearable
                    @change="regionChange"
                    v-model="formData.region" >
                  <el-option
                      v-for="item in options.region"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('constellation')">
                <el-select
                    filterable
                    multiple
                    collapse-tags
                    clearable
                    @change="constellationChange"
                    v-model="formData.constellation" >
                  <el-option
                      v-for="item in options.constellation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('system')">
                <el-select
                    filterable
                    multiple
                    collapse-tags
                    clearable
                    @change="systemChange"
                    v-model="formData.system" >
                  <el-option
                      v-for="item in options.system"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('itemName')">
                <el-input v-model="formData.itemName" :placeholder="$t('please_input_item_name')"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('itemCategory')">
                <el-select
                    multiple
                    collapse-tags
                    v-model="formData.itemCategory" >
                  <el-option :label="$t('moon')" value="2"></el-option>
                  <el-option :label="$t('auto_moon')" value="3"></el-option>
                  <el-option :label="$t('sky_hook')" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('auctionStatus')">
                <el-select
                    multiple
                    collapse-tags
                    v-model="formData.auctionStatus" >
                  <el-option v-show="isMoonAdmin" :label="$t('NOT_START')" value="0"></el-option>
                  <el-option :label="$t('PROCESSING')" value="1"></el-option>
                  <el-option :label="$t('END')" value="2"></el-option>
                  <el-option :label="$t('USE')" value="3"></el-option>
                  <el-option :label="$t('PROCESSED')" value="4"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button type="primary" @click="query()">{{ $t("search") }}</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button  @click="clear()">{{ $t("clear") }}</el-button>
              </el-form-item>
            </div>
          </el-col>


        </el-row>
        <el-row>
          <el-col
              v-show="isMoonAdmin"
              :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button icon="el-icon-video-play" type="primary" @click="start()">批量启动</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col
              v-show="isMoonAdmin"
              :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button icon="el-icon-delete" type="primary" @click="del()">批量删除</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="itemCategoryString"
            :label="$t('itemCategory')"
            width="80">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="itemName"
            :label="$t('itemName')"
            width="180">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="regionName"
            :label="$t('region')"
            width="80">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="constellationName"
            :label="$t('constellation')"
            width="100">
        </el-table-column>
        <el-table-column
            sortable="custom"
            class-name="center-align"
            prop="systemName"
            :label="$t('system')"
            width="100">
        </el-table-column>
        <el-table-column
            prop="itemDetail"
            :label="$t('itemDetail')"
            width="320">
        </el-table-column>
        <el-table-column
            sortable="custom"
            prop="startPrice"
            :label="$t('startPrice')"
            width="140">
          <template slot="header" slot-scope="scope">
            {{ $t("startPrice") }}
            <el-tooltip placement="top">
              <div slot="content">
                手动月矿价值=3个月矿石含量*化矿率(87%)*化矿后物品伏尔戈星域最新日成交均价*矿石税率<br>
                自动月矿价值=手动月矿价值*40%
                <br>
                税率表:<br>
                R64税率27%<br>R32税率17%<br>R16税率12%<br>R8税率5%<br>R4税率2%
              </div>
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="startTime"
            :label="$t('startTime')"
            width="160">
        </el-table-column>
        <el-table-column
            prop="auctionInfo"
            :label="$t('auctionInfo')"
            width="200">
          <template slot-scope="scope">
            <div style="white-space: pre-line;">{{ scope.row.auctionInfo }}</div>
          </template>
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="auctionStatusString"
            :label="$t('auctionStatus')"
            width="80">
          <template slot-scope="scope">
            <div style="white-space: pre-line;">{{ scope.row.auctionStatusString }}</div>
          </template>
        </el-table-column>
        <el-table-column
            class-name="center-align"
            :label="$t('option')"
            width="109">
          <template slot-scope="scope">
            <el-tooltip content="启动" placement="top" effect="light">
              <el-button
                  v-show="scope.row.auctionStatus == 0"
                  @click="start(scope.row)"
                  type="text" icon="el-icon-video-play" size="medium" label="123"></el-button>
            </el-tooltip>
            <el-tooltip :content="$t('auction')" placement="top" effect="light">
              <el-button
                  v-show="scope.row.auctionStatus == 1"
                  @click="auctionShow(scope.row)"
                  type="text" icon="el-icon-s-check" size="medium" label="123"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" effect="light">
              <el-button
                  v-show="isMoonAdmin"
                  @click="del(scope.row)"
                  type="text"
                  icon="el-icon-delete"
                  size="medium"
                  label="123"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <auction-input
          :visible.sync="dialogVisible"
          :rowData="currentRow"
          @save="list"
      ></auction-input>
    </div>
    <!-- 分页器 -->
    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 50, 100]"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import AuctionInput from '@/components/auction/AuctionInput.vue'

export default {
  components: {AuctionInput},
  methods: {
    // 拍卖请求
    clear() {
      this.formData = {};

    },

    // 监听3个下拉的变化
    regionChange(selected) {
      this.formData.region = selected;
      this.constellationSelectList();
      this.systemSelectList();
    },
    constellationChange(selected) {
      this.formData.constellation = selected;
      this.regionSelectList();
      this.systemSelectList();
    },
    systemChange(selected) {
      this.formData.system = selected;
      this.regionSelectList();
      this.constellationSelectList();
    },

    // 星域下拉查询
    regionSelectList() {
      const params = {
        constellationId : this.formData.constellation.map(item => item),
        systemId : this.formData.system.map(item => item),
      }
      axios.post(this.url + '/qq/auction/region/list',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            this.options.region = response.data.data;
          })
          .catch(error => {
            this.$message.error(error);
          });
    },

    // 星座下拉查询
    constellationSelectList() {
      const params = {
        regionId : this.formData.region.map(item => item),
        systemId : this.formData.system.map(item => item),
      }
      axios.post(this.url + '/qq/auction/constellation/list',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            this.options.constellation = response.data.data;
          })
          .catch(error => {
            this.$message.error(error);
          });
    },

    // 星系下拉查询
    systemSelectList() {
      const params = {
        regionId: this.formData.region.map(item => item),
        constellationId : this.formData.constellation.map(item => item),
      }
      axios.post(this.url + '/qq/auction/system/list',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            this.options.system = response.data.data;
          })
          .catch(error => {
            this.$message.error(error);
          });
    },

    query() {
      this.currentPage = 1;
      this.list();
    },

    // 分页查询
    list() {
      this.loading = true;
      const params = {
        itemName: this.formData.itemName,
        systemId: this.formData.system,
        constellationId: this.formData.constellation,
        regionId: this.formData.region,
        auctionStatus: this.formData.auctionStatus,
        category: this.formData.itemCategory,
        page: this.currentPage,
        size: this.pageSize,
        isAsc: this.formData.order,
        orderCol: this.formData.orderCol,
      }
      axios.post(this.url + '/qq/auction/page',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.tableData = response.data.data.data;
              this.total = response.data.data.total;
              this.currentPage = response.data.data.page;
              this.pageSize = response.data.data.size;
            } else {

              this.$message.error(response.data.data);
            }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error);
            this.loading = false;
          });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize; // 更新每页显示条数
      this.list();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage; // 更新当前页码
      this.list();
    },
    handleSelectionChange(selected) {
      this.selectedData = selected;
    },
    sortChange(param) {
      if (param.order && param.order === 'ascending') {
        this.formData.order = true;
      } else if (param.order && param.order === 'descending') {
        this.formData.order = false;
      } else {
        this.formData.order = null;
      }
      if (param.prop && param.prop === 'sourcePrice') {
        this.formData.orderCol = 'source_price';
      } else if (param.prop && param.prop === 'sourceTax') {
        this.formData.orderCol = 'source_tax';
      } else if (param.prop && param.prop === 'systemName') {
        this.formData.orderCol = 'system_name';
      } else if (param.prop && param.prop === 'startPrice') {
        this.formData.orderCol = 'start_price';
      }
      this.list();
    },
    start(row) {
      let params = [];
      if (row) {
        if (row.auctionStatus != 0) {
          this.$message.warning('请选择状态为未开始的物品');
          return ;
        }
        params.push({
          id: row.id,
          auctionStatus: 1
        });
      } else {
        if (this.selectedData.some(item => item.auctionStatus !== 0)) {
          this.$message.warning('请选择状态为未开始的物品');
          return ;
        }
        params = this.selectedData.map(item => {
          return {
            id: item.id,
            auctionStatus: 1
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.loading = true;
      axios.post(this.url + '/qq/auction/change',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('物品启动拍卖');
              this.list();
            } else {
              this.$message.error(response.data.data);
            }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error);
            this.loading = false;
          });
    },

    auctionShow(row) {
      let params = [];
      if (row) {
        if (row.auctionStatus != 1) {
          this.$message.warning('请选择状态为拍卖中的物品');
          return ;
        }
        params.push({
          id: row.id
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.currentRow = row;
      this.dialogVisible = true; // 显示弹出框
    },

    del(row) {
      let params = [];
      if (row) {
        params.push({id: row.id});
      } else {
        params = this.selectedData.map(item => {
          return {
            id: item.id
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.loading = true;
      axios.post(this.url + '/qq/auction/del',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('拍卖删除成功');
              this.list();
            } else {
              this.$message.error(response.data.data);
            }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error);
          });
    },

    //判断是不是管理
    getSquadInfo() {
      axios.get(this.url + '/qq/bind/squad/info', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.isMoonAdmin = response.data.data.some(value => this.moonArray.includes(value));
            } else {
              this.$message.error(response.data.data);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
    },
  },
  data() {
    return {
      isMoonAdmin: false,
      moonArray: ['34','43'],
      formData: {
        system: [],
        constellation: [],
        region: [],
        itemName: '',
        auctionStatus: [],
        itemCategory: '',
        order: '',
        orderCol: '',
      },
      options : {
        region:[],
        constellation: [],
        system: [],
      },
      loading: true,
      tableData: [],
      //当前页数
      currentPage: 1,
      // 显示一页多少条数据
      pageSize: 10,
      // 总条数
      total: 0,
      selectedData: [],
      dialogVisible: false,
      currentRow: {},
      url: process.env.VUE_APP_API_BASE_URL_QQ,

    }
  },
  mounted() {
    this.getSquadInfo();
    this.regionSelectList();
    this.constellationSelectList();
    this.systemSelectList();
    this.list();

  },
}
</script>
<style lang="less" >

.left-align .cell {
  text-align: left;
}

.center-align .cell {
  text-align: center;
}

.right-align .cell {
  text-align: right;
}
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
.el-table th .cell {
  text-align: center;
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