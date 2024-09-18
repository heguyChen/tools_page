<template>
  <el-dialog
      :before-close="cancel"
      top="100px"
      width="600px"
      :close-on-click-modal="false"
      :title="rowData.itemCategory + '：' + rowData.itemName" :visible.sync="visible">
    <el-form
        v-loading="loading"
        @submit.prevent>
      <el-form-item label="竞拍金额">
        <el-input
            @keydown.enter.prevent
            v-model="formattedValue"
            placeholder="请输入数字"
            @input="onInputChange"
            clearable
        >
        </el-input>
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
    rowData: {},
  },
  data() {
    return {
      inputValue: "", // 存储实际的数字值
      loading: false,
      url: process.env.VUE_APP_API_BASE_URL_QQ,
    };
  },
  computed: {
    // 将实际数字值格式化为千位符
    formattedValue: {
      get() {
        return this.formatNumber(this.inputValue);
      },
      set(val) {
        // 只存储数字，去掉所有非数字和小数点的字符
        this.inputValue = val.replace(/[^0-9.]/g, "");
      },
    },
  },
  methods: {
    // 格式化数字为千位符
    formatNumber(value) {
      if (!value) return "";
      const num = parseFloat(value);
      if (isNaN(num)) return value;
      return num.toLocaleString("en-US"); // 使用内置的数字格式化函数
    },
    // 处理输入变化，只允许数字和小数点
    onInputChange(value) {
      // 使用正则表达式限制输入，去除非数字和小数点字符
      let cleanValue = value.replace(/[^0-9.]/g, "");

      // 防止输入多个小数点
      const parts = cleanValue.split('.');
      if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
      }

      // 更新输入值
      this.inputValue = cleanValue;
    },
    cancel() {
      this.inputValue = "";
      this.$emit('update:visible', false);
    },
    save() {
      if (parseFloat(this.inputValue) <= parseFloat(this.rowData.startPrice.replace(/[^0-9.]/g, ""))) {
        this.$message.warning('拍卖价格应高于起拍价');
        return ;
      }
      let params = {
        id: this.rowData.id,
        price: this.inputValue
      };
      this.loading = true;
      axios.post(this.url + '/qq/auction/submit',params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
      })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('拍卖请求已提交');
              this.$emit('update:visible', false);
              this.$emit('save');
            } else {
              this.$message.error(response.data.data);
            }
            this.inputValue = "";
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error);
            this.inputValue = "";
          });

    },
  },
  mounted() {
  },
};
</script>
