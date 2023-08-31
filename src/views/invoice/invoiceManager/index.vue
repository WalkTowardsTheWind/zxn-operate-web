<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
      hasUpdate
    >
      <template #enterprise>
        <invoiceTable
          ref="enterprise"
          type="enterprise"
          @on-upload="handleUpload"
          @on-logistics="handleLogistics"
        />
      </template>
      <template #channel>
        <invoiceTable
          ref="channel"
          type="channel"
          @on-upload="handleUpload"
          @on-logistics="handleLogistics"
        />
      </template>
    </zxn-tabs>
    <task-dialog ref="taskDialogRef" />
    <add-invoice ref="addInvoiceRef" @on-success="handleTabChange" />
    <logistics-dialog ref="logisticsDialogRef" />
  </zxn-plan>
</template>
<script lang="ts">
export default {
  name: "invoiceManager",
};
</script>
<script setup lang="ts">
import taskDialog from "./components/taskDialog.vue";
import addInvoice from "./components/addinvoice.vue";
import invoiceTable from "./components/invoiceTable.vue";
import logisticsDialog from "./components/logisticsDialog.vue";
const activeName = ref("enterprise");
const tabsList = [
  {
    name: "enterprise",
    label: "企业发票",
  },
  // {
  //   name: "channel",
  //   label: "渠道发票",
  // },
];
const enterprise = ref();
const channel = ref();
const handleTabChange = () => {
  if (activeName.value === "enterprise") {
    enterprise.value.getList();
  } else {
    channel.value.getList();
  }
};
const addInvoiceRef = ref();
const handleUpload = (cur) => {
  addInvoiceRef.value.init(cur.id);
};
const logisticsDialogRef = ref();
const handleLogistics = (cur) => {
  logisticsDialogRef.value.init(cur.id);
};
onActivated(() => {
  handleTabChange();
});
// const taskDialogRef = ref(null);
// const handleSearch = () => {
//   taskDialogRef.value.init([]);
// };
</script>
