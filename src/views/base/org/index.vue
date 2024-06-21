<template>
  <div>
    <div class="app-container">
      <div class="search-container">
        <el-form :inline="true">
          <el-form-item label="名称">
            <el-input
              v-model="filterText"
              style="width: 240px"
              placeholder="请输入名称"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLoadTree">
              <i-ep-refresh />刷新</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-card class="table-container">
        <el-tree
          node-key="id"
          ref="treeRef"
          :props="props"
          :data="datas"
          show-checkbox
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          :filter-node-method="handleFilter"
          @check-change="handleCheckChange"
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
                  v-if="!data.isRoot"
                >
                  <i-ep-edit />编辑
                </el-button>
                <el-popconfirm
                  title="确认要删除?"
                  @confirm="handleDelete(node, data)"
                  v-if="!data.isRoot"
                >
                  <template #reference>
                    <el-button type="primary" size="small" link>
                      <i-ep-delete />删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </span>
            </span>
          </template>
        </el-tree>
      </el-card>
    </div>
    <addOrg
      ref="dialogAddRef"
      @handle-query-event="handleLoadTree"
      v-model:pId="parentId"
    />
    <editOrg
      ref="dialogEditRef"
      @handle-query-event="handleLoadTree"
      v-model:id="OrgId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree, updateStatus } from "@/api/base/org/index";
import { Tree, OrgUpdateStatusModel } from "@/api/base/org/model";
import addOrg from "./components/addOrg.vue";
import editOrg from "./components/editOrg.vue";

const filterText = ref("");
const parentId = ref("");
const OrgId = ref("");
const dialogAddRef = ref();
const dialogEditRef = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const datas = reactive<Tree[]>([]);

const props = {
  label: "name",
  children: "children",
};

//CheckChange
const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate);
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

//过滤tree
function handleFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

//新增组织机构
function handleAdd(node: Node, data: Tree) {
  parentId.value = data.id ?? "";
  dialogAddRef.value.dialogShow = true;
}

//编辑组织机构
function handleEdit(node: Node, data: Tree) {
  OrgId.value = data.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//删除组织机构
function handleDelete(node: Node, data: Tree) {
  var model: OrgUpdateStatusModel = { id: data.id, status: 3 };
  updateStatus(model)
    .then((data) => {
      ElMessage.success("操作成功");
      handleLoadTree();
    })
    .finally(() => {});
}

watchEffect(
  () => {
    treeRef.value?.filter(filterText.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

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
