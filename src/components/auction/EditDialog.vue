<template>
  <el-dialog
      :before-close="cancel"
      width="600px"
      :close-on-click-modal="false"
      title="编辑所属公司" :visible.sync="visible">
    <el-form >
      <el-form-item label="所属公司">
        <el-select
            @change="handleChange"
            style="width: 400px;"
            filterable
            collapse-tags
            clearable
            v-model="selectedCorp" placeholder="请选择">
          <el-option
              v-for="item in options.corp"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    visible: Boolean,
    rowData: [],
    url: '',
  },
  data() {
    return {
      options : {
        corp:[],
      },
      selectedCorp: '',
      selectedOption: {},
    }
  },
  methods: {
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
    // 星域下拉查询
    corpSelectList() {
      axios.get('https://tools.dc-eve.com/qq/auction/corp/list', {
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
    cancel() {
      this.selectedCorp = '';
      this.$emit('update:visible', false);
    },
    save() {
      let params = [];
      params = this.rowData.map(item => {
        return {
          moonId: item.moonId,
          planetId: item.planetId,
          corporationId: this.selectedOption.value,
          corporationName: this.selectedOption.level,
        }
      });
      axios.post(this.url,params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('所属公司修改成功');
              this.selectedCorp = '';
              this.$emit('update:visible', false);
              this.$emit('save');
            } else {
              this.$message.error(response.data.data);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
    },
  },
  mounted() {
    this.corpSelectList();
  },
};
</script>
