<template>
  <el-dialog
    custom-class="my-dialog"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <template #header>
      <div class="my-header">
        <h4>发佣确认</h4>
      </div>
    </template>
    <div>
      <el-form
        :model="formItem"
        inline
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算单号">
              <el-text class="mx-1">{{ formItem.settlement_order_no }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算单状态">
              <el-text class="mx-1">{{ formItem.status }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务企业">
              <el-text class="mx-1">{{ formItem.company_name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算时间">
              <el-text class="mx-1">{{ formItem.settlement_time }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算金额">
              <el-text class="mx-1">{{ formItem.real_money }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道点位">
              <el-text class="mx-1">{{ formItem.cooperate_pointnt }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收佣渠道">
              <el-text class="mx-1">{{ formItem.channel_name }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税前佣金">
              <el-text class="mx-1">{{ formItem.before_tax }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="税后佣金">
              <el-text class="mx-1">{{ formItem.after_tax }}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款银行">
              <el-text class="mx-1">{{ formItem.bank }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款账号">
              <el-text class="mx-1">{{ formItem.bank_account }}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="凭证">
              <multi-upload v-model="transfer_certificate"></multi-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="HandleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { updateChannelSettlementStatus } from "@/api/settlementCenter/channelSettlement";
const emit = defineEmits(["update:dialogVisible", "up-Table"]);
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  formItem: { type: Array, equired: true, default: () => {} },
});
var transfer_certificate = ref([]);

let dialogVisible = computed(() => props.dialogVisible);
let formItem = computed(() => {
  console.log(props.formItem);

  return props.formItem;
}) as any;
const handleConfirm = async () => {
  try {
    var data = {
      id: formItem.value.id,
      status: "1",
      transfer_certificate: JSON.stringify(transfer_certificate.value),
    };
    await updateChannelSettlementStatus(data);
    emit("update:dialogVisible", false);
    ElMessage({
      type: "success",
      message: "成功下发该任务",
    });
    emit("up-Table");
  } catch (error) {
    console.log(error);
  }
};
const HandleClose = () => {
  emit("update:dialogVisible", false);
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确认关闭弹窗？")
    .then(() => {
      done();
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    })
    .then(() => {
      console.log(dialogVisible.value);
    });
};
</script>
