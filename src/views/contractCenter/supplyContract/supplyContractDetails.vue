<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form class="zxn-box" :model="formItem" label-width="100px">
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <el-text class="mx-1">{{ formItem.contract_name }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <el-text class="mx-1">{{ formItem.contract_no }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同类型">
                  <el-text class="mx-1">{{
                    proxy.$enumSet["contractCenterEnum.contractType"][
                      formItem.contract_kind
                    ]
                  }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方">
                  <el-text class="mx-1">{{ formItem.party_a }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方">
                  <el-text class="mx-1">{{ formItem.party_b }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约点位">
                  <el-text class="mx-1">{{ formItem.tax_location }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="合同期限">
                  <el-text class="mx-1">{{
                    proxy.$enumSet["contractCenterEnum.contractTerm"][
                      formItem.contract_term
                    ]
                  }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间">
                  <el-text class="mx-1">{{ formItem.sign_time }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="到期时间">
                  <el-text class="mx-1">{{ formItem.end_time }}</el-text>
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求">
                  <el-text class="mx-1">{{ formItem.remarks }}</el-text>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件">
                  <PicturePreview
                    :image-list="formItem.file_url"
                  ></PicturePreview>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <PicturePreview
                    :image-list="formItem.annex_url"
                  ></PicturePreview>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">无内容</div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { enterpriseContractDetailsType } from "@/api/contractCenter/enterpriseContract/types";
import { getContractDetails } from "@/api/contractCenter";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "线下合同",
  },
  // {
  //   name: "2",
  //   label: "线下合同",
  // },
];

//表单信息
const formItem = ref<enterpriseContractDetailsType>({
  contract_name: "",
  contract_no: "",
  contract_kind: "",
  party_a: "",
  party_b: "",
  tax_location: "",
  contract_term: "",
  sign_time: "",
  end_time: "",
  remarks: "",
  file_url: [],
  annex_url: [],
});
const handleSubmit = () => {};
const handleClose = () => {};

const getData = () => {
  const ID = Number(route.query.id);
  getContractDetails(ID)
    .then((response) => {
      var {
        contract_name,
        contract_no,
        contract_kind,
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
      } = response.data.info;
      console.log(contract_name);
      formItem.value = {
        contract_name,
        contract_no,
        contract_kind: contract_kind + "",
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
      };
    })
    .catch();
};
getData();

onMounted(() => {});
</script>
<style lang="scss" scoped>
.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
