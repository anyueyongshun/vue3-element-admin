<template>
  <div class="app-container">
    <div class="search-container">
      <el-form>
        <el-form-item label="名称">
          <el-input
            v-model="filterText"
            style="width: 240px"
            placeholder="请输入名称"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-card class="table-container">
      <el-tree
        node-key="id"
        :props="props"
        :data="datas"
        show-checkbox
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>
              <el-icon v-if="data.isAdmin"><UserFilled /></el-icon>
              {{ node.label }}
            </span>
            <span>
              <el-button
                type="primary"
                size="small"
                link
                @click="handleAdd(node, data)"
              >
                <i-ep-plus />新增
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="handleEdit(node, data)"
              >
                <i-ep-edit />编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="handleDelete(node, data)"
              >
                <i-ep-delete />删除
              </el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree } from "@/api/auth/role/index";
import { Tree } from "@/api/auth/role/model";

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const datas = reactive<Tree[]>([]);

//const datas: Tree[] = [];

const props = {
  label: "name",
  children: "children",
};

const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate);
};

function handleLoadTree() {
  loadTree()
    .then((data) => {
      datas.push(data);
    })
    .finally(() => {});
}

const filterNode = (value: any, data: any) => {
  if (!value) return true;
  return data.name?.includes(value);
};

function handleAdd(node: Node, data: Tree) {}

function handleEdit(node: Node, data: Tree) {}

function handleDelete(node: Node, data: Tree) {}

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

onMounted(() => {
  handleLoadTree();
});
</script>

<style>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;
}
</style>
