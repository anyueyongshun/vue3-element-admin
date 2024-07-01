<template>
  <el-dialog v-model="dialogShow" width="80%" title="查看通知">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="类型" width="100px">
        {{ formData.typeDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        {{ formData.publishStatusDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="发布人">
        {{ formData.addAccountName }}
      </el-descriptions-item>
      <el-descriptions-item label="发布时间">
        {{ formData.addTime }}
      </el-descriptions-item>
      <el-descriptions-item label="标题" span="2">
        {{ formData.title }}
      </el-descriptions-item>
      <el-descriptions-item label="内容" span="2">
        <el-scrollbar height="400px">
          <div v-html="formData.contents"></div>
        </el-scrollbar>
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getDetail } from "@/api/base/notice";
import { NoticeModel } from "@/api/base/notice/model";

const formData = reactive<NoticeModel>({});
const dialogShow = ref(false);
const props = defineProps({
  id: {
    type: String,
    default: () => {
      return "";
    },
  },
});

//取通知明细
function GetDetail() {
  if (props.id !== "" && dialogShow.value === true) {
    getDetail(props.id)
      .then((data) => {
        Object.assign(formData, data);
      })
      .finally(() => {});
  }
}

//关闭编辑框
function closeDialog() {
  dialogShow.value = false;
}

defineExpose({ dialogShow });

watch(
  () => props.id,
  (newVal: string) => {
    GetDetail();
  }
);

onMounted(() => {
  GetDetail();
});
</script>
