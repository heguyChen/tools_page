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
              <el-form-item label="月亮名称">
                <el-input v-model="formData.moonName" placeholder="请输入月亮名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="等级">
                <el-select
                    multiple
                    collapse-tags
                    v-model="formData.level" >
                  <el-option label="R64" value="R64"></el-option>
                  <el-option label="R32" value="R32"></el-option>
                  <el-option label="R16" value="R16"></el-option>
                  <el-option label="R8" value="R8"></el-option>
                  <el-option label="R4" value="R4"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="自动">
                <el-select
                    clearable
                    v-model="formData.isAuto" >
                  <el-option label="是" value="true"></el-option>
                  <el-option label="否" value="false"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-form-item label="状态">
                <el-select
                    multiple
                    collapse-tags
                    v-model="formData.moonStatus" >
                  <el-option label="空闲中" value="0"></el-option>
                  <el-option label="拍卖中" value="1"></el-option>
                  <el-option label="使用中" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="所属公司">
                <el-select
                    @change="handleChange"
                    style="width: 400px;"
                    multiple
                    collapse-tags
                    clearable
                    v-model="formData.corp" placeholder="请选择">
                  <el-option
                      v-for="item in options.corp"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
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
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button icon="el-icon-sort" type="primary" @click="changeType()">批量切换</el-button>
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
            prop="moonName"
            label="月亮"
            width="150">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="regionName"
            label="星域"
            width="80">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="constellationName"
            label="星座"
            width="80">
        </el-table-column>
        <el-table-column
            sortable="custom"
            class-name="center-align"
            prop="systemName"
            label="星系"
            width="80">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="sourceLevel"
            label="等级"
            width="50">
        </el-table-column>
        <el-table-column
            show-overflow-tooltip
            prop="source"
            label="含量"
            width="350">
        </el-table-column>
        <el-table-column
            sortable="custom"
            :formatter="formatNumber"
            prop="sourcePrice"
            label="估价"
            width="130">
        </el-table-column>
        <el-table-column
            sortable="custom"
            :formatter="formatNumber"
            prop="sourceTax"
            label="税金"
            width="130">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="isAutoString"
            label="类型"
            width="50">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="moonStatus"
            label="月矿状态"
            width="70">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            prop="corporationName"
            label="所属公司"
            width="230">
        </el-table-column>
        <el-table-column
            class-name="center-align"
            label="操作"
            width="149">
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
            <el-tooltip content="切换类型" placement="top" effect="light">
              <el-button @click="changeType(scope.row)"
                         type="text"
                         icon="el-icon-sort"
                         size="medium"
                         label="123"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <edit-dialog
          :visible.sync="dialogVisible"
          :rowData="selectedData"
          :param_url="this.url + '/qq/auction/moon/change'"
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
        moonName: '',
        level: [],
        isAuto: '',
        moonStatus: [],

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
      axios.post(this.url + '/qq/auction/moon/region/list',params, {
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
      axios.post(this.url + '/qq/auction/moon/constellation/list',params, {
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
      axios.post(this.url + '/qq/auction/moon/system/list',params, {
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
    // 公司下拉查询
    corpSelectList() {
      axios.get(this.url + '/qq/auction/corp/list', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            this.options.corp = response.data.data;
          })
          .catch(error => {
            this.$message.error(error);
          });
    },
    handleChange(value) {
      // 通过选中的 value 获取对应的 label
      const selectedOption = this.options.corp.find(option => option.value === value);
      if (selectedOption) {
        this.selectedOption = {
          value: selectedOption.value,
          level: selectedOption.label,
        };
      }
    },
    query() {
      this.currentPage = 1;
      this.list();
    },

    // 分页查询
    list() {
      this.loading = true;
      const params = {
        moonName: this.formData.moonName,
        systemId: this.formData.system,
        constellationId: this.formData.constellation,
        regionId: this.formData.region,
        corpId: this.formData.corp,
        level: this.formData.level,
        isAuto: this.formData.isAuto,
        moonStatus: this.formData.moonStatus,
        page: this.currentPage,
        size: this.pageSize,
        isAsc: this.formData.order,
        orderCol: this.formData.orderCol,
      }
      axios.post(this.url + '/qq/auction/moon/page',params, {
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
      }
      this.list();
    },
    editShow(row) {
      let params = [];
      if (row) {
        params.push({
          moonId: row.moonId,
          isAuto: !row.isAuto
        });
        this.selectedData = params;
      } else {
        params = this.selectedData.map(item => {
          return {
            moonId: item.moonId,
            isAuto: !item.isAuto
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }

      this.dialogVisible = true; // 显示弹出框
    },

    submitAuction(row) {
      let params = [];
      if (row) {
        if (row.moonStatus != '空闲中') {
          this.$message.warning('请选择状态为空闲中的月矿');
          return ;
        }
        params.push({moonId: row.moonId});
      } else {
        if (this.selectedData.some(item => item.moonStatus !== '空闲中')) {
          this.$message.warning('请选择状态为空闲中的月矿');
          return ;
        }
        params = this.selectedData.map(item => {
          return {
            moonId: item.moonId
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.loading = true;
      axios.post(this.url + '/qq/auction/moon/submit',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('月矿拍卖提交成功');
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

    changeType(row) {
      let params = [];
      if (row) {
        if (row.moonStatus != '空闲中') {
          this.$message.warning('请选择状态为空闲中的月矿');
          return ;
        }
        params.push({
          moonId: row.moonId,
          isAuto: !row.isAuto
        });
      } else {
        if (this.selectedData.some(item => item.moonStatus !== '空闲中')) {
          this.$message.warning('请选择状态为空闲中的月矿');
          return ;
        }
        params = this.selectedData.map(item => {
          return {
            moonId: item.moonId,
            isAuto: !item.isAuto
          }
        });
      }
      if (params.length == 0){
        this.$message.warning('请至少选择一条数据');
        return ;
      }
      this.loading = true;
      axios.post(this.url + '/qq/auction/moon/change',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('月矿类型切换成功');
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
    }
  },

  data() {
    return {
      formData: {
        system: [],
        constellation: [],
        region: [],
        corp: [],
        moonName: '',
        level: [],
        isAuto: '',
        moonStatus: [],
        order: '',
        orderCol: '',
      },
      options : {
        region:[],
        constellation: [],
        system: [],
        corp: [],
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
    this.corpSelectList();
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