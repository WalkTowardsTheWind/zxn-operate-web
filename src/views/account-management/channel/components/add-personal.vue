<template>
  <zxn-step :step-list="stepList" :active-step="activeStep" />
  <el-form label-width="120px" :model="addForm">
    <el-row :gutter="30">
      <template v-if="activeStep === 0">
        <el-col :span="6">
          <el-form-item label="账户名称">
            <el-input v-model="addForm.account" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addForm.pwd" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="addForm.conf_pwd" />
          </el-form-item>
        </el-col>
      </template>
      <template v-if="activeStep === 1">
        <el-col :span="6">
          <el-form-item label="真实姓名">
            <el-input v-model="addForm.real_name" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="addForm.phone" />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="addForm.idcard" />
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="addForm.bank" />
          </el-form-item>
          <el-form-item label="银行账户">
            <el-input v-model="addForm.bank_account" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证">
            <MultiUpload v-model="addForm.idcard_img" />
          </el-form-item>
          <el-form-item label="银行卡">
            <MultiUpload v-model="addForm.bank_card_img" />
          </el-form-item>
        </el-col>
      </template>
      <template v-if="activeStep === 2">
        <el-col :span="6">
          <el-form-item label="佣金结算时间">
            <el-select v-model="addForm.commission_settlement_type">
              <el-option label="月" value="1"></el-option>
              <el-option label="周" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定渠道">
            <el-select v-model="addForm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合伙人协议">
            <el-select v-model="addForm.contract_id">
              <el-option
                v-for="item in contractOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="product">
            <div class="head">
              <span>产品</span>
              <span>票面种类及税点</span>
              <span>合作价格</span>
            </div>
            <div class="form" v-for="(item, index) in product" :key="index">
              <el-select v-model="item.product_type" class="form-item">
                <el-option
                  v-for="item in productType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select class="form-item item3" v-model="item.invoice_type">
                <el-option
                  v-for="item in invoiceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input class="form-item" v-model="item.cooperate_point" />
              <div
                class="add del"
                v-if="product.length > 0"
                @click="delClick(index, item.product_id)"
              >
                - 删除
              </div>
            </div>
            <div class="add" @click="addClick">+ 添加产品</div>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <zxn-bottom-btn>
    <el-button
      type="primary"
      v-if="activeStep === stepList.length - 1"
      @click="sumbit"
      >完成</el-button
    >
    <el-button
      type="primary"
      v-if="activeStep !== stepList.length - 1"
      @click="activeStep++"
      >下一步</el-button
    >
    <el-button type="info" v-if="activeStep !== 0" @click="activeStep--"
      >上一步</el-button
    >
    <el-button type="info" v-if="activeStep === 0" @click="$router.back()"
      >取消</el-button
    >
  </zxn-bottom-btn>
</template>

<script lang="ts" setup>
import { addProduct, delProduct } from "@/api/account/channel";
import { createPersonalAccount } from "@/api/account/personal";
import router from "@/router";

const stepList = [
  { desc: "基本信息" },
  { desc: "银行卡信息" },
  { desc: "完成" },
];
const activeStep = ref(0);

const contractOptions = [
  {
    label: "业务拓展协议(个人)",
    value: "1",
  },
  {
    label: "业务拓展协议(企业)",
    value: "2",
  },
  {
    label: "共享经济服务协议",
    value: "3",
  },
  {
    label: "自由职业者服务协议",
    value: "4",
  },
];

const productType = [
  {
    label: "灵活用工",
    value: "1",
  },
  {
    label: "平台代发(灵活用工普票)",
    value: "2",
  },
  {
    label: "门征代开",
    value: "3",
  },
  {
    label: "劳务费普票",
    value: "4",
  },
  {
    label: "广西大额灵活用工",
    value: "5",
  },
];
const invoiceType = [
  {
    label: "6%增值税专用/普通发票",
    value: "1",
  },
  {
    label: "星号税率的差额普票",
    value: "2",
  },
  {
    label: "1%税率的普票",
    value: "3",
  },
  {
    label: "星号税率的差额普票",
    value: "4",
  },
  {
    label: "6%增值税专用",
    value: "5",
  },
];

const sumbit = () => {
  let params = {
    ...addForm.value,
    is_channel: 1,
    product: product.value,
  };
  createPersonalAccount(params).then((res) => {
    console.log(res);
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    router.go(-1);
  });
};

const addForm = ref({} as any);

const product = ref([] as any);

const addClick = () => {
  addProduct().then((res) => {
    product.value.push({
      product_id: res.data.id,
      product_type: "",
      invoice_type: "",
      cooperate_point: "",
    });
  });
};

const delClick = (index, id) => {
  delProduct({ id }).then(() => {
    if (product.value.length !== 0) {
      product.value.splice(index, 1);
    }
  });
};
</script>
