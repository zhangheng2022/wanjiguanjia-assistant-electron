<template>
  <el-dialog
    v-model="dialogShow"
    width="450"
    center
    top="1vh"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  >
    <template #header>
      <div class="flex items-center cursor-pointer" @click="dialogShow = false">
        <!-- <SvgIcon name="back" width="20px" height="20px"></SvgIcon> -->
        <span class="text-size-sm ml-1">回到上一步</span>
      </div>
    </template>
    <div class="flex flex-col flex-justify-center flex-items-center">
      <!-- <img src="@renderer/assets/imgs/roundlogo.png" width="100px" height="100px" /> -->
      <h3 class="text-black mt-0">万机管家企业版试用申请</h3>
    </div>
    <el-form
      ref="computedRegisterDialogFormRef"
      class="form-warp"
      :model="computedRegisterDialogForm"
      size="large"
      label-width="100"
      label-position="left"
      :rules="computedRegisterDialogFormRules"
    >
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="computedRegisterDialogForm.companyName"
          placeholder="请输入公司名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="computedRegisterDialogForm.mobile"
          placeholder="请输入手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <el-input
          v-model="computedRegisterDialogForm.city"
          placeholder="请输入所在城市"
          clearable
        />
      </el-form-item>
      <el-form-item label="团队规模" prop="teamSize" label-position="top">
        <el-radio-group v-model="computedRegisterDialogForm.teamSize">
          <el-radio value="1-3人" size="large">1-3人</el-radio>
          <el-radio value="5-10人" size="large">5-10人</el-radio>
          <el-radio value="10人以上" size="large">10人以上</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="业务模式" prop="businessModel" label-position="top">
        <el-radio-group v-model="computedRegisterDialogForm.businessModel">
          <el-radio value="同行" size="large">同行</el-radio>
          <el-radio value="平台" size="large">平台</el-radio>
          <el-radio value="零售" size="large">零售</el-radio>
          <el-radio value="其他" size="large">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="之前用什么管库存" prop="manageInvType" label-position="top">
        <el-radio-group v-model="computedRegisterDialogForm.manageInvType">
          <el-radio value="手写" size="large">手写</el-radio>
          <el-radio value="表格" size="large">表格</el-radio>
          <el-radio value="别的软件" size="large">别的软件</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="flex flex-col items-center">
        <el-button class="w-full" type="primary" round @click="computedRegisterDialogFormSubmit"
          >提交</el-button
        >
        <span class="text-size-sm text-gray mt-2">申请提交后，1个工作日内客服将联系您</span>
      </div>
    </el-form>
  </el-dialog>
  <el-dialog
    v-model="computedRegisterResultDialogShow"
    width="350"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  >
    <div class="flex flex-col justify-center items-center">
      <el-icon color="#65B85D" size="80">
        <SuccessFilled />
      </el-icon>
      <h3 class="text-black my-2">提交成功</h3>
      <span class="text-size-sm text-gray my-2">1个工作日内客服将联系您</span>
      <el-button
        class="w-full"
        size="large"
        type="primary"
        round
        @click="computedRegisterResultDialogShow = false"
        >我知道了</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRaw, watch } from "vue";
import { register } from "@renderer/common/http/methods/login";
import { isPhoneNumber } from "@renderer/utils/validate";

const dialogShow = defineModel("dialogShow", { type: Boolean, default: false });

watch(
  () => dialogShow.value,
  (val) => {
    if (!val) {
      computedRegisterDialogFormRef.value.resetFields();
    }
  },
);

const computedRegisterDialogFormRef = ref();
const computedRegisterDialogForm = ref({
  companyName: "",
  mobile: "",
  city: "",
  teamSize: "",
  businessModel: "",
  manageInvType: "",
});
const computedRegisterDialogFormRules = ref({
  companyName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      message: "请输入正确的手机号",
      validator: (_, value) => isPhoneNumber(value),
      trigger: "blur",
    },
  ],
  city: [{ required: true, message: "请输入所在城市", trigger: "blur" }],
  teamSize: [{ required: true, message: "请选择团队规模", trigger: "blur" }],
  businessModel: [{ required: true, message: "请选择主要业务模式", trigger: "blur" }],
  manageInvType: [{ required: true, message: "请选择主要之前用什么管库存", trigger: "blur" }],
});
const computedRegisterResultDialogShow = ref(false);

function computedRegisterDialogFormSubmit(): void {
  computedRegisterDialogFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      let params = {
        ...toRaw(computedRegisterDialogForm.value),
        password: 123456,
        code: 1234,
        terminalType: 7,
      };
      register(params).then(() => {
        dialogShow.value = false;
        computedRegisterResultDialogShow.value = true;
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>

<style lang="scss" scoped>
.form-warp:deep(.el-input__wrapper) {
  background: #f5f5f5;
  border-radius: 200px;
}
</style>
