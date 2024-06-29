<template>
  <el-dialog v-model="dialogShow" width="400px" title="权限码">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="常量" name="ConstCode">
        <el-scrollbar height="400px">
          <div v-html="toHtml(constStr)"></div></el-scrollbar
      ></el-tab-pane>
      <el-tab-pane label="枚举" name="EnumCode">
        <el-scrollbar height="400px"
          ><div v-html="toHtml(enumStr)"></div></el-scrollbar
      ></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { GetConst, GetEnum } from "@/api/auth/authority";

const dialogShow = ref(false);
const activeName = ref("ConstCode");
const constStr = ref("");
const enumStr = ref("");

//权限码-常量
function GetConsts() {
  GetConst()
    .then((data) => {
      if (data) {
        constStr.value = data;
      }
    })
    .finally();
}

//权限码-枚举
function GetEnums() {
  GetEnum()
    .then((data) => {
      if (data) {
        enumStr.value = data;
      }
    })
    .finally();
}

//转换html
function toHtml(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

defineExpose({ dialogShow });
onMounted(() => {
  GetConsts();
  GetEnums();
});
</script>
