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
      <el-form-item :label="$t('auctionPrice')">
        <el-input
            @keydown.enter.prevent
            v-model="formattedValue"
            :placeholder="$t('auctionPricePlaceholder')"
            @input="onInputChange"
            clearable
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <p>{{ $t("auctionBotCheck") }}</p>
      <div class="slider-container" @mousemove="onMouseMove" @mouseup="onMouseUp">
        <!-- 滑动轨道 -->
        <div class="slider-track"></div>
        <!-- 目标标记 -->
        <div class="target-mark" :style="{ left: correctLeft + 'px' }"></div>
        <!-- 滑块 -->
        <div class="slider-handle"
             :style="{ left: sliderLeft + 'px' }"
             @mousedown="onMouseDown"></div>
      </div>
      <p v-if="message">{{ message }}</p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import JSEncrypt from 'jsencrypt';

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
      isDragging: false,
      sliderLeft: 0,        // 滑块的当前位置
      startX: 0,            // 初始X坐标
      correctLeft: 250,     // 目标标记位置（在轨道上的位置，单位为像素）
      containerWidth: 300,  // 容器宽度
      handleWidth: 40,      // 滑块的宽度
      message: '',
      publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu819w5tHWLUxhVRq8npPNJk4TNL05OOR1WOXQMaK6gPT74s96de3Jia2TqN7FyBvwfFLLonTsfeif+CYtoI85IQlCIFZlQd2ji0Le6lPZmwlhQ9QH6v4AJrBNW5yi72Gffh1infSOs+mnMwKTCXU777S6TSuMKHrTPcFvDdBWX3osXy4rOfhFP6tP61CxeRd9Uqj0rsrVOG1YlOi+8FeNBOzRsygdE63vyu2CnboeV3l/b7v7HbP0S8zQbr4kgbhmEvEMO8X3D7njrkhDPpEHkBOu7tV5wnz84o+75b53RL/PTJC3dhoLrHZpdnbrS+YXsIyYZnM6kHV9jBI7KGMLwIDAQAB',
      encrypted: '',
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
    onMouseDown(event) {
      this.isDragging = true;
      this.startX = event.clientX - this.sliderLeft;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      if (this.isDragging) {
        let newLeft = event.clientX - this.startX;
        // 限制滑块在轨道范围内移动
        newLeft = Math.max(0, Math.min(newLeft, this.containerWidth - this.handleWidth));
        this.sliderLeft = newLeft;
      }
    },
    onMouseUp() {
      if (this.isDragging) {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        // 验证滑块是否在正确位置
        // if (Math.abs(this.sliderLeft - this.correctLeft) < 5) {
        if (this.sliderLeft > this.correctLeft) {
          this.message = this.$t('auctionBotCheckSuccess');
          const encrypt = new JSEncrypt();
          encrypt.setPublicKey(this.publicKey); // 设置公钥

          // 需要加密的滑块数据
          const sliderData = {
            status: 'success',
            timestamp: Date.now(),
            track: this.sliderLeft // 滑块轨迹数据
          };

          // 将数据转换为字符串
          const dataToEncrypt = JSON.stringify(sliderData);

          // 使用公钥加密
          this.encrypted = encrypt.encrypt(dataToEncrypt);
        } else {
          this.message = this.$t('auctionBotCheckFail');
          this.sliderLeft = 0;  // 重置滑块位置
        }
      }
    },
    resetSlider() {
      this.sliderLeft = 0;  // 重置滑块位置
      this.encrypted = '';
      this.message = '';
    },
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
      this.resetSlider();
    },
    save() {
      if (this.inputValue.length == 0 || parseFloat(this.inputValue) <= parseFloat(this.rowData.startPrice.replace(/[^0-9.]/g, ""))) {
        this.$message.warning( this.$t('auctionInputPriceShouldHighThanStartPrice') );
        return ;
      }
      if (this.encrypted.length < 1) {
        this.$message.warning(this.$t('pleaseFinishBotCheck'));
        return ;
      }
      this.$confirm(this.$t('confirmSubmit'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning',
      }).then(() => {
        let params = {
          id: this.rowData.id,
          price: this.inputValue
        };
        this.loading = true;
        axios.post(this.url + '/qq/auction/submit',params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("token"),
            'token': this.encrypted
          },
        })
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success(this.$t('submitAuctionRequest'));
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
        this.resetSlider();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('cancelConfirm')
        });
        this.resetSlider();
      });
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.slider-container {
  width: 300px;
  height: 40px;
  background-color: #e0e0e0;
  position: relative;
  margin-top: 20px;
  cursor: pointer;
}

.slider-track {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: absolute;
  top: 0;
  left: 0;
}

.slider-handle {
  width: 40px;
  height: 100%;
  background-color: #2196f3;
  position: absolute;
  top: 0;
  cursor: pointer;
}

/* 目标标记 */
.target-mark {
  width: 4px;
  height: 100%;
  background-color: red;
  position: absolute;
  top: 0;
}
</style>