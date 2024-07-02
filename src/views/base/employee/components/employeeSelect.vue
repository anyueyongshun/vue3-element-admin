<template>
  <el-dialog v-model="dialogShow" width="600px" title="选择员工">
    <div class="search-container">
      <el-form>
        <el-form-item label="关键字">
          <el-input
            v-model="filterText"
            style="width: 240px"
            placeholder="请输入关键字"
            clearable
          />
        </el-form-item>
      </el-form>
    </div>
    <el-card class="table-container">
      <el-scrollbar height="400px">
        <el-tree
          node-key="id"
          ref="treeRef"
          :props="propsTree"
          :data="datas"
          show-checkbox
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :filter-node-method="handleFilter"
        >
          <template #default="{ node, data }">
            <svg-icon v-if="data.type == 1" icon-class="company" />
            <svg-icon v-else-if="data.type == 2" icon-class="department" />
            <svg-icon v-else-if="data.type == 3" icon-class="user" />
            {{ node.label }}
          </template>
        </el-tree>
      </el-scrollbar>
    </el-card>
    <template #footer>
      <el-button type="primary" @click="handleSelectConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getOrgEmployeeTree } from "@/api/base/employee/index";
import { OrgEmployeeSelectTreeModel, TreeKey } from "@/api/base/employee/model";

const dialogShow = ref(false);
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const datas = reactive<OrgEmployeeSelectTreeModel[]>([]);
const emit = defineEmits(["handleGetSelectEvent"]);
const selectEmployKeysResult = ref<string[]>([]);
const propsTree = {
  label: "name",
  children: "children",
};
const props = defineProps({
  selectEmployKeys: {
    type: Array<string>,
    default: () => {
      return [];
    },
  },
});

//加载组织机构员工树
function handleLoadTree() {
  if (dialogShow.value == false) return;
  getOrgEmployeeTree()
    .then((data) => {
      datas.length = 0;
      datas.push(data);
      treeRef.value?.setCheckedKeys(props.selectEmployKeys);
    })
    .finally(() => {});
}

//确定选择员工
function handleSelectConfirm() {
  selectEmployKeysResult.value.length = 0;
  var select = treeRef.value?.getCheckedKeys(true);
  select?.forEach((ele) => {
    selectEmployKeysResult.value!.push(ele.toString());
  });
  dialogShow.value = false;
  emit("handleGetSelectEvent");
}

//过滤tree
function handleFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}
watchEffect(
  () => {
    treeRef.value?.filter(filterText.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

defineExpose({ selectEmployKeysResult, dialogShow });

watch(dialogShow, (New, Old) => {
  handleLoadTree();
});

onMounted(() => {
  handleLoadTree();
});
</script>
