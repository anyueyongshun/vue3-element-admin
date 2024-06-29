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
                <svg-icon :icon-class="data.icon" />
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
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="查看拥有此菜单的账号"
                  placement="bottom"
                >
                  <el-button
                    type="primary"
                    size="small"
                    link
                    @click="handleOwnerAccounts(node, data)"
                    v-if="!data.isRoot"
                  >
                    <svg-icon
                      icon-class="user"
                      style="width: 1.2em; height: 1.2em"
                    />账号
                  </el-button>
                </el-tooltip>
              </span>
            </span>
          </template>
        </el-tree>
      </el-card>
    </div>
    <addMenu
      ref="dialogAddRef"
      @handle-query-event="handleLoadTree"
      v-model:pId="parentId"
    />
    <editMenu
      ref="dialogEditRef"
      @handle-query-event="handleLoadTree"
      v-model:id="menuId"
    />
    <roleAuthMenu
      ref="dialogRoleAuthMenuRef"
      v-model:id="menuId"
      v-model:accountType="accountType"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree, updateStatus } from "@/api/auth/menu/index";
import { Tree, MenuUpdateStatusModel } from "@/api/auth/menu/model";
import addMenu from "./components/addMenu.vue";
import editMenu from "./components/editMenu.vue";
import roleAuthMenu from "../account/components/roleAuthMenu.vue";

const filterText = ref("");
const parentId = ref("");
const menuId = ref("");
const accountType = ref("2");
const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogRoleAuthMenuRef = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const datas = reactive<Tree[]>([]);

const props = {
  label: "title",
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

//加载菜单树
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
  return data.title.indexOf(value) !== -1;
}

//新增菜单
function handleAdd(node: Node, data: Tree) {
  parentId.value = data.id ?? "";
  dialogAddRef.value.dialogShow = true;
}

//编辑菜单
function handleEdit(node: Node, data: Tree) {
  menuId.value = data.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//显示拥有此菜单的账号
function handleOwnerAccounts(node: Node, data: Tree) {
  menuId.value = data.id ?? "";
  dialogRoleAuthMenuRef.value.dialogShow = true;
}

//删除菜单
function handleDelete(node: Node, data: Tree) {
  var model: MenuUpdateStatusModel = { id: data.id, status: 3 };
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
