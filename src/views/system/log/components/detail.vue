<template>
  <el-dialog v-model="dialogShow" width="1000px" title="日志详细">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="账号" width="60px">
        {{ logDetail.loginName }}
      </el-descriptions-item>
      <el-descriptions-item label="类型">
        {{ logDetail.logTypeDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        {{ logDetail.requestUrl }}
      </el-descriptions-item>
      <el-descriptions-item label="时间">
        {{ logDetail.addTime }}
      </el-descriptions-item>
      <el-descriptions-item label="来源" span="2">
        {{ logDetail.source }}
      </el-descriptions-item>
      <el-descriptions-item label="内容" span="2">
        {{ logDetail.message }}
      </el-descriptions-item>
      <el-descriptions-item label="堆栈" span="2">
        <el-scrollbar height="400px">
          <div v-html="logDetail.stackTrace"></div>
        </el-scrollbar>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup lang="ts">
import { LogModel } from "@/api/system/log/model";
import { getDetail } from "@/api/system/log";

const dialogShow = ref(false);
const props = defineProps({
  logId: {
    type: String,
    default: () => {
      return "";
    },
  },
});

const logDetail = reactive<LogModel>({});

function GetDetail() {
  if (props.logId != "") {
    getDetail(props.logId)
      .then((data) => {
        Object.assign(logDetail, data);
      })
      .finally(() => {});
  }
}

defineExpose({ dialogShow });

watch(
  () => props.logId,
  (newVal: string) => {
    GetDetail();
  }
);

onMounted(() => {
  GetDetail();
});
</script>
