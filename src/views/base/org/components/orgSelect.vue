<template>
  <div>
    <el-card>
      <div class="mb-2">
        <el-input
          v-model="filterText"
          placeholder="请输入名称"
          clearable
          maxlength="20"
        >
          <template #prefix>
            <i-ep-search class="mr-1" />
          </template>
        </el-input>
      </div>
      <el-scrollbar>
        <el-tree
          node-key="id"
          ref="treeRef"
          :props="props"
          :data="datas"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :filter-node-method="handleFilter"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>
                <svg-icon v-if="data.orgType == 1" icon-class="company" />
                <svg-icon
                  v-else-if="data.orgType == 2"
                  icon-class="department"
                />
                {{ node.label }}
              </span>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree } from "@/api/base/org/index";
import { Tree } from "@/api/base/org/model";

const filterText = ref("");
const emit = defineEmits(["handleQueryEvent"]);
const treeRef = ref<InstanceType<typeof ElTree>>();
const datas = reactive<Tree[]>([]);
const orgId = ref("");

const props = {
  label: "name",
  children: "children",
};

//加载组织机构树
function handleLoadTree() {
  loadTree()
    .then((data) => {
      datas.length = 0;
      datas.push(data);
    })
    .finally(() => {});
}

//点击组织机构
function handleNodeClick(row: Tree) {
  orgId.value = row.id ?? "";
  emit("handleQueryEvent");
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

defineExpose({ orgId });

onMounted(() => {
  handleLoadTree();
});
</script>
