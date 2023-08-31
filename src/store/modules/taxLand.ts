import { getTaxlandDetail } from "@/api/account/business";
import { defineStore } from "pinia";

export const useStore = defineStore("taxLand", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      sign_type: [] as any,
      auth_type: [] as any,
      S_T: [
        { label: "静默签", value: 1 },
        { label: "二维码签约", value: 2 },
        { label: "短信签约", value: 3 },
      ],
      A_T: [
        { label: "二要素（姓名、身份证）", value: 1 },
        { label: "三要素（姓名、手机号、身份证）", value: 2 },
        { label: "三要素（姓名、身份证、银行卡）", value: 3 },
        { label: "四要素（姓名、手机号、身份证、银行卡）", value: 4 },
      ],
    };
  },
  actions: {
    updateTaxLandList(tax_land_id: string) {
      this.sign_type = [];
      this.auth_type = [];
      getTaxlandDetail(tax_land_id)
        .then((res) => {
          console.log(res);

          const { certification_rules: a_type, signing_rules: s_type } =
            res.data.info;
          this.S_T.forEach((i) => {
            s_type.forEach((j) => {
              if (i.value == j) {
                this.sign_type.push(i);
              }
            });
          });
          this.A_T.forEach((i) => {
            a_type.forEach((j) => {
              if (i.value == j) {
                this.auth_type.push(i);
              }
            });
          });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
});
