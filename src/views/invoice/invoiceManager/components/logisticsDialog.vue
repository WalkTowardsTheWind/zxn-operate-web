<template>
  <el-dialog v-model="visible" class="zxn-dialog" title="查看物流" width="816">
    <div class="logistics">
      <el-form class="logistics-img" label-width="80">
        <el-form-item label="票样">
          <zxn-image :imgList="[formItem.invoice_sample_url]" />
        </el-form-item>
        <el-form-item label="物流面单">
          <zxn-image :imgList="[formItem.express_url]" />
        </el-form-item>
      </el-form>
      <div class="logistics-info">
        <el-scrollbar height="400px">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in formItem.Traces"
              :key="index"
              :timestamp="activity.AcceptTime"
            >
              {{ activity.AcceptStation }}
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { getExpressDetail } from "@/api/invoice";
export default {
  name: "addInvoice",
};
</script>
<script setup lang="ts">
let visible = ref(false);
const formItem = reactive({
  invoice_sample_url: "",
  express_url: "",
  Traces: [],
});
const init = (id: number): void => {
  formItem.invoice_sample_url = "";
  formItem.express_url = "";
  formItem.Traces = [];
  visible.value = true;
  getInfo(id);
};
const getInfo = async (id: number) => {
  const { data } = await getExpressDetail(id);
  formItem.invoice_sample_url = data.invoice_sample_url;
  formItem.express_url = data.express_url;
  formItem.Traces = data.express_detail.Traces.reverse();
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
<style lang="scss" scoped>
.logistics {
  display: flex;
  align-items: flex-start;

  &-img {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-label {
      margin-right: 10px;
      margin-left: 30px;
      font-size: 14px;
      font-weight: 500;
      color: #656565;
    }
  }

  &-info {
    flex: 1 auto;
  }
}
</style>
