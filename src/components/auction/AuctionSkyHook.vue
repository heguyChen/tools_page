<template>
  <div>
    <div style="margin-top: 5px;margin-left: 10px;">

      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-row :gutter="1">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="星域">
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
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="星座">
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
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="星系">
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
              <el-form-item label="行星名称">
                <el-input v-model="formData.planetName" placeholder="请输入行星名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="状态">
                <el-select
                    multiple
                    collapse-tags
                    v-model="formData.skyHookStatus" >
                  <el-option label="空闲中" value="0"></el-option>
                  <el-option label="拍卖中" value="1"></el-option>
                  <el-option label="使用中" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button type="primary" @click="query()">查询</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button @click="clear()">清空</el-button>
              </el-form-item>
            </div>
          </el-col>

        </el-row>

        <el-row :gutter="1">
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button icon="el-icon-edit" type="primary" @click="editShow()">批量编辑</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button icon="el-icon-position" type="primary" @click="submitAuction()">批量发布</el-button>
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
            prop="planetName"
            label="行星"
            width="150">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="regionName"
            label="星域"
            width="100">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="constellationName"
            label="星座"
            width="100">
        </el-table-column>
        <el-table-column
            sortable="custom"
            class-name="center-align"
            prop="systemName"
            label="星系"
            width="100">
        </el-table-column>
        <el-table-column
            sortable
            show-overflow-tooltip
            class-name="center-align"
            prop="skyHookSource"
            label="每小时试剂产量"
            width="200">
        </el-table-column>
        <el-table-column
            sortable
            :formatter="formatNumber"
            class-name="center-align"
            prop="sourcePrice"
            label="估价"
            width="150">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="skyHookStatus"
            label="天钩状态"
            width="150">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="corporationName"
            label="所属公司"
            width="400">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            label="操作"
            width="199">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top" effect="light">
              <el-button
                  @click="editShow(scope.row)"
                  type="text" icon="el-icon-edit" size="medium" label="123"></el-button>
            </el-tooltip>
            <el-tooltip content="发布" placement="top" effect="light">
              <el-button
                  @click="submitAuction(scope.row)"
                  type="text" icon="el-icon-position" size="medium" label="123"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>

      <edit-dialog
          :visible.sync="dialogVisible"
          :rowData="selectedData"
          :param_url="this.url + '/qq/auction/skyHook/change'"
          @save="list"
      ></edit-dialog>
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
import moment from "moment";
import axios from 'axios';
import EditDialog from '@/components/auction/EditDialog.vue'

export default {
  components: {
    EditDialog,
  },
  methods: {
    // 拍卖请求
    clear() {
      this.formData = {
        system: [],
        constellation: [],
        region: [],
        planetName: '',
        level: [],
        isAuto: '',
        skyHookStatus: []
      };
      this.regionSelectList();
      this.constellationSelectList();
      this.systemSelectList();
    },
    formatNumber(row, column, cellValue) {
      if (!cellValue) return '';
      return cellValue.toLocaleString(); // 使用千位分隔符格式化数字
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
      axios.post(this.url + '/qq/auction/skyHook/region/list',params, {
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
      axios.post(this.url + '/qq/auction/skyHook/constellation/list',params, {
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
      axios.post(this.url + '/qq/auction/skyHook/system/list',params, {
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
    sortChange(param) {
      if (param.order && param.order === 'ascending') {
        this.formData.order = true;
      } else if (param.order && param.order === 'descending') {
        this.formData.order = false;
      } else {
        this.formData.order = null;
      }
     if (param.prop && param.prop === 'systemName') {
        this.formData.orderCol = 'system_name';
      }
      this.list();
    },
    editShow(row) {
      let params = [];
      if (row) {
        params.push({
          planetId: row.planetId,
        });
        this.selectedData = params;
      } else {
        params = this.selectedData.map(item => {
          return {
            planetId: item.planetId,
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }

      this.dialogVisible = true; // 显示弹出框

    },

    query() {
      this.currentPage = 1;
      this.list();
    },

    // 分页查询
    list() {
      this.loading = true;
      const params = {
        planetName: this.formData.planetName,
        systemId: this.formData.system,
        constellationId: this.formData.constellation,
        regionId: this.formData.region,
        skyHookStatus: this.formData.skyHookStatus,
        page: this.currentPage,
        size: this.pageSize,
        isAsc: this.formData.order,
        orderCol: this.formData.orderCol,
      }
      axios.post(this.url + '/qq/auction/skyHook/page',params, {
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
    submitAuction(row) {
      let params = [];
      if (row) {
        if (row.skyHookStatus != '空闲中') {
          this.$message.warning('请选择状态为空闲中的天钩');
          return ;
        }
        params.push({planetId: row.planetId});
      } else {
        if (this.selectedData.some(item => item.skyHookStatus !== '空闲中')) {
          this.$message.warning('请选择状态为空闲中的天钩');
          return ;
        }
        params = this.selectedData.map(item => {
          return {
            planetId: item.planetId
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.loading = true;
      axios.post(this.url + '/qq/auction/skyHook/submit',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('天钩拍卖提交成功');
              this.list();
            } else {
              this.$message.error(response.data.data);
            }
            this.loading = true;
          })
          .catch(error => {
            this.$message.error(error);
            this.loading = true;
          });
    },
  },

  data() {
    return {
      formData: {
        system: [],
        constellation: [],
        region: [],
        planetName: '',
        level: [],
        isAuto: '',
        skyHookStatus: [],
        order: '',
        orderCol: '',
      },
      options : {
        region:[],
        constellation: [],
        system: [],
      },
      dialogVisible: false,

      loading: true,
      tableData: [],
      //当前页数
      currentPage: 1,
      // 显示一页多少条数据
      pageSize: 10,
      // 总条数
      total: 0,
      selectedData: [],
      url: process.env.VUE_APP_API_BASE_URL_QQ,
    }
  },
  mounted() {
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