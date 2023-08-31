<template>
  <div class="mt-[50px]">
    <el-form label-width="120px">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="渠道管理员">
            <el-input
              placeholder="请输入"
              v-model="addForm.channel_admin_name"
            />
          </el-form-item>
          <el-form-item label="已注册企业">
            <div class="flex gap-[20px]">
              <el-select class="" v-model="addForm.channel_type">
                <el-option label="个人" value="1"></el-option>
                <el-option label="企业" value="2"></el-option>
              </el-select>
              <el-input v-model="addForm.id" />
            </div>
          </el-form-item>
          <el-form-item label="佣金结算时间">
            <el-select
              class="w-full"
              v-model="addForm.commission_settlement_type"
            >
              <el-option value="1" label="按周结"></el-option>
              <el-option value="2" label="按月结"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定渠道">
            <el-input
              class="w-full"
              v-model="addForm.child_channel_id"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合作人协议">
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
      </el-row>
    </el-form>
    <zxn-bottom-btn>
      <el-button type="primary" @click="sumbit">完成</el-button>
      <el-button type="info">取消</el-button>
    </zxn-bottom-btn>
  </div>
</template>

<script lang="ts" setup>
import {
  addProduct,
  createExistAccount,
  delProduct,
} from "@/api/account/channel";

import router from "@/router";

const addForm = ref({
  channel_type: "2",
  channel_child_id: [],
} as any);

const product = ref([] as any);

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
  console.log(params);

  createExistAccount(params).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    router.go(-1);
  });
};

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
