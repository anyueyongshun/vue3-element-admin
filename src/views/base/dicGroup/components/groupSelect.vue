<template>
  <card>
    <el-input v-model="groupName" placeholder="字典组名称" clearable>
      <template #prefix>
        <i-ep-search />
      </template>
    </el-input>
    <el-table
      border
      v-loading="loading"
      highlight-current-row
      :data="datas"
      stripe
      style="width: 100%"
      @row-click="handleRowClick"
    >
      <el-table-column prop="name" label="字典组名称" />
    </el-table>
  </card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getDicGroups } from "@/api/base/dicGroup/index";
import { DicGroupModel } from "@/api/base/dicGroup/model";

const loading = ref(false);
const dicGroupId = ref("");
const datas = reactive<DicGroupModel[]>([]);
const emit = defineEmits(["handleQueryEvent"]);

//加载字典组列表
function handleQuery() {
  loading.value = true;
  getDicGroups()
    .then((data) => {
      datas.length = 0;
      datas.push(...data);
    })
    .finally(() => {
      loading.value = false;
    });
}

//点击字典组
function handleRowClick(row: DicGroupModel, column: any, event: any) {
  dicGroupId.value = row.id;
  emit("handleQueryEvent");
}

defineExpose({ dicGroupId });

onMounted(() => {
  handleQuery();
});
</script>
