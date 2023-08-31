<template>
  <div class="p-[30px] relative box">
    <!-- 编辑 -->
    <template v-if="isEdit">
      <el-form :form="formItem" label-width="120px">
        <el-form-item label="营业执照">
          <MultiUpload v-model="formItem.license">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="法人身份证">
          <MultiUpload v-model="formItem.idcard_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="纳税证明">
          <MultiUpload v-model="formItem.taxpayer_type_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="公司照片">
          <MultiUpload v-model="formItem.header_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="开户许可证">
          <MultiUpload v-model="formItem.permit_img">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <el-form-item label="企业印章">
          <MultiUpload v-model="formItem.seal">
            <i-ep-Plus />
          </MultiUpload>
        </el-form-item>
        <!-- <div class="bottom-btn">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="updateBusinessAccount"
            >保存</el-button
          >
        </div> -->
      </el-form>
    </template>
    <!-- 详情 -->
    <template v-else>
      <el-form-item label="营业执照" label-width="120px">
        <PicturePreview :image-list="formItem.license" />
      </el-form-item>
      <el-form-item label="法人身份证" label-width="120px">
        <PicturePreview :image-list="formItem.idcard_img" />
      </el-form-item>
      <el-form-item label="纳税证明" label-width="120px">
        <PicturePreview :image-list="formItem.taxpayer_type_img" />
      </el-form-item>
      <el-form-item label="公司照片" label-width="120px">
        <PicturePreview :image-list="formItem.header_img" />
      </el-form-item>
      <el-form-item label="开户许可证" label-width="120px">
        <PicturePreview :image-list="formItem.permit_img" />
      </el-form-item>
      <el-form-item label="企业印章" label-width="120px">
        <PicturePreview :image-list="formItem.seal" />
      </el-form-item>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  getBusinessAccountDetail,
  editBusinessAccount,
} from "@/api/account/business";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => "",
  },
  childData: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue"]);

const formItem = ref(props.childData as any);

watch(
  () => props.childData,
  (newValue) => {
    formItem.value = props.childData;
  }
);

watch(
  () => formItem.value,
  (newValue) => {
    emit("update:modelValue", formItem.value);
  }
);

// const formItem = ref({
// 	license: [],
// 	idcard_img: [],
// 	taxpayer_type_img: [],
// 	header_img: [],
// 	permit_img: [],
// 	seal: [],
// } as any);

/**
 * 更新
 */
// async function updateBusinessAccount() {
// 	// console.log(formItem.value);
// 	// 后台返回的 contacts_mobile 更新修改为 mobile
// 	let params = {
// 		...formItem.value,
// 		mobile: formItem.value.contacts_mobile,
// 		contacts_mobile: undefined,
// 	};
// 	try {
// 		await editBusinessAccount(params);
// 		ElMessage({
// 			message: "编辑成功",
// 			type: "success",
// 		});
// 	} catch (error: any) {
// 		return new Error(error);
// 	}
// }

// async function getAccountDetail() {
// 	if (props.id) {
// 		const res = await getBusinessAccountDetail(props.id);
// 		console.log(res);

// 		try {
// 			formItem.value = res.data;
// 			// console.log(formItem.value);
// 		} catch (error: any) {
// 			return new Error("error", error);
// 		}
// 	}
// }

// getAccountDetail();
</script>
<style scoped lang="scss">
.box {
  padding-bottom: 100px;
}

.bottom-btn {
  position: absolute;
  bottom: 20px;
  left: 45%;
  transform: translateX(-50%);
}
</style>
