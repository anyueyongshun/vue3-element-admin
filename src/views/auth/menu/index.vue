<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input
            v-model="filterText"
            style="width: 240px"
            placeholder="请输入名称"
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
              <el-icon><UserFilled /></el-icon>
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
              <el-popconfirm
                title="确认要删除?"
                @confirm="handleDelete(node, data)"
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
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loadTree, updateStatus } from "@/api/auth/menu/index";
import { Tree, MenuUpdateStatusModel } from "@/api/auth/menu/model";
import addMenu from "./components/addMenu.vue";
import editMenu from "./components/editMenu.vue";

const filterText = ref("");
const parentId = ref("");
const menuId = ref("");
const dialogAddRef = ref();
const dialogEditRef = ref();
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

const filterNode = (value: any, data: any) => {
  if (!value) return true;
  return data.name?.includes(value);
};

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
