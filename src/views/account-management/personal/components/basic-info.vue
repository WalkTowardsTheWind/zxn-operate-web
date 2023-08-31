<template>
  <zxn-plan class="mt-[30px]">
    <el-form label-width="80px" :model="formData">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="账户ID">
            <el-input v-if="isEdit" v-model="formData.account" />
            <span v-else>{{ formData.account }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-if="isEdit" v-model="formData.real_name" />
            <span v-else>{{ formData.real_name }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-if="isEdit" v-model="formData.phone" />
            <span v-else>{{ formData.phone }}</span>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-if="isEdit" value="身份证" />
            <span v-else>身份证</span>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-if="isEdit" v-model="formData.bank" />
            <span v-else>{{ formData.bank }}</span>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-if="isEdit" v-model="formData.bank_account" />
            <span v-else>{{ formData.bank_account }}</span>
          </el-form-item>
          <el-form-item label="开户地址">
            <el-input v-if="isEdit" v-model="formData.address" />
            <span v-else>{{ formData.address }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证">
            <MultiUpload v-if="isEdit" v-model="formData.idcard_img" />
            <PicturePreview :image-list="formData.idcard_img" />
          </el-form-item>
          <el-form-item label="银行卡">
            <MultiUpload v-if="isEdit" v-model="formData.bank_card_img" />
            <PicturePreview :image-list="formData.bank_card_img" />
          </el-form-item>
          <el-form-item label="认证视频">
            <MultiUpload
              v-if="isEdit"
              v-model="formData.attestation_video_url"
            />
            <PicturePreview :image-list="formData.attestation_video_url" />
          </el-form-item>
          <el-form-item label="认证照片">
            <MultiUpload v-if="isEdit" v-model="formData.attestation_img_url" />
            <PicturePreview :image-list="formData.attestation_img_url" />
          </el-form-item>
          <el-form-item label="个人签字">
            <MultiUpload v-if="isEdit" v-model="formData.sign_img" />
            <PicturePreview :image-list="formData.sign_img" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <zxn-bottom-btn v-if="isEdit">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="info" plain @click="$router.go(-1)">取消</el-button>
    </zxn-bottom-btn>
  </zxn-plan>
</template>

<script lang="ts" setup>
import {
  getPersonalAccountDetail,
  editPersonalAccount,
} from "@/api/account/personal";
import router from "@/router";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => "",
  },
});

const formData = ref({} as any);

function getDetil() {
  getPersonalAccountDetail({ id: props.id }).then((res) => {
    formData.value = res.data;
  });
}

function save() {
  editPersonalAccount(formData.value)
    .then(() => {
      ElMessage({
        message: "编辑成功",
        type: "success",
      });
      router.go(-1);
    })
    .catch((err) => {
      return new Error(err);
    });
}

getDetil();
</script>
