<template>
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
              <el-button
                type="primary"
                size="small"
                link
                @click="handleAssign(node, data)"
                v-if="!data.isRoot"
              >
                <i-ep-lock />权限
              </el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
  <addRole
    ref="dialogAddRef"
    @handle-query-event="handleLoadTree"
    v-model:pId="parentId"
  />
  <editRole
    ref="dialogEditRef"
    @handle-query-event="handleLoadTree"
    v-model:id="roleId"
  />
  <assignAuthMenu
    ref="dialogAssignRef"
    v-model:roleId="roleId"
    v-model:roleName="roleName"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree, updateStatus } from "@/api/auth/role/index";
import { Tree, RoleUpdateStatusModel } from "@/api/auth/role/model";
import addRole from "./components/addRole.vue";
import editRole from "./components/editRole.vue";
import assignAuthMenu from "./components/assignAuthMenu.vue";

const filterText = ref("");
const parentId = ref("");
const roleId = ref("");
const roleName = ref("");
const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogAssignRef = ref();
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

//加载角色树
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

//新增角色
function handleAdd(node: Node, data: Tree) {
  parentId.value = data.id ?? "";
  dialogAddRef.value.dialogShow = true;
}

//编辑角色
function handleEdit(node: Node, data: Tree) {
  roleId.value = data.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//删除角色
function handleDelete(node: Node, data: Tree) {
  var model: RoleUpdateStatusModel = { id: data.id, status: 3 };
  updateStatus(model)
    .then((data) => {
      ElMessage.success("操作成功");
      handleLoadTree();
    })
    .finally(() => {});
}

//给角色分配权限、菜单
function handleAssign(node: Node, data: Tree) {
  roleId.value = data.id ?? "";
  roleName.value = data.name ?? "";
  dialogAssignRef.value.dialogShow = true;
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
