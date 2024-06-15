<template>
  <el-dialog
    v-model="dialogShow"
    width="600px"
    :title="'为角色[' + roleName + ']分配权限和菜单'"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="权限" name="authority">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterAuthText"
                style="width: 240px"
                placeholder="请输入名称"
                clearable
              />
            </el-form-item>
          </el-form>
        </div>
        <el-card class="table-container">
          <el-scrollbar height="400px">
            <el-tree
              node-key="id"
              ref="treeAuthRef"
              :props="propsTree"
              :data="datasAuth"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleAuthFilter"
              check-strictly
            >
              <template #default="{ node, data }">
                <span :style="[data.isAuth ? {} : { color: '#c1acac' }]">
                  {{ node.label }}
                </span>
              </template>
            </el-tree>
          </el-scrollbar>
          <template #footer
            ><el-button type="primary" @click="handleAssignAuth">
              <el-icon><Select /></el-icon>分配权限
            </el-button>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="菜单" name="menu">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterMenuText"
                style="width: 240px"
                placeholder="请输入名称"
                clearable
              />
            </el-form-item>
          </el-form>
        </div>
        <el-card class="table-container">
          <el-scrollbar height="400px">
            <el-tree
              node-key="id"
              ref="treeMenuRef"
              :props="propsTree"
              :data="datasMenu"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleMenuFilter"
              check-strictly
            >
              <template #default="{ node }">
                <el-icon><UserFilled /></el-icon>
                {{ node.label }}
              </template>
            </el-tree>
          </el-scrollbar>
          <template #footer
            ><el-button type="primary" @click="handleAssignMenu">
              <el-icon><Select /></el-icon>分配菜单
            </el-button></template
          >
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Tree } from "@/api/auth/authority/model";
import { loadTree as loadAuthTree } from "@/api/auth/authority/index";
import { loadTree as loadMenuTree } from "@/api/auth/menu/index";
import { RoleAuthorityModel, RoleMenuModel } from "@/api/auth/role/model";
import {
  assignMenu,
  assignAuth,
  getAuthorityIds,
  getMenuIds,
} from "@/api/auth/role/index";

const activeName = ref("authority");
const dialogShow = ref(false);
const datasAuth = reactive<Tree[]>([]);
const datasMenu = reactive<Tree[]>([]);
const treeAuthRef = ref<InstanceType<typeof ElTree>>();
const treeMenuRef = ref<InstanceType<typeof ElTree>>();
const filterAuthText = ref("");
const filterMenuText = ref("");
const props = defineProps({
  roleId: {
    type: String,
    default: () => {
      return "";
    },
  },
  roleName: {
    type: String,
    default: () => {
      return "";
    },
  },
});

//加载权限树
function handleLoadAuthTree() {
  if (props.roleId != "") {
    loadAuthTree()
      .then((data) => {
        datasAuth.length = 0;
        datasAuth.push(data);
      })
      .finally(() => {});
  }
}

//加载菜单树
function handleLoadMenuTree() {
  loadMenuTree()
    .then((data) => {
      datasMenu.length = 0;
      datasMenu.push(data);
    })
    .finally(() => {});
}

//分配权限
function handleAssignAuth() {
  var model: RoleAuthorityModel = {
    roleId: props.roleId,
    authorityIds: treeAuthRef.value?.getCheckedKeys(),
  };
  assignAuth(model)
    .then((data) => {
      /* if (data.data === true) {
        ElMessage.success("操作成功");
      } else {
        ElMessage.success("操作失败");
      } */
      ElMessage.success("操作成功");
    })
    .finally(() => {});
}

//分配菜单
function handleAssignMenu() {
  var model: RoleMenuModel = {
    roleId: props.roleId,
    menuIds: treeMenuRef.value?.getCheckedKeys(),
  };
  assignMenu(model)
    .then((data) => {
      /* if (data.data === true) {
        ElMessage.success("操作成功");
      } else {
        ElMessage.success("操作失败");
      } */
      ElMessage.success("操作成功");
    })
    .finally(() => {});
}

function handleSetAuth() {
  if (props.roleId != "") {
    getAuthorityIds(props.roleId)
      .then((data) => {
        treeAuthRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

function handleSetMenu() {
  if (props.roleId != "") {
    getMenuIds(props.roleId)
      .then((data) => {
        treeMenuRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//过滤tree
function handleAuthFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

//过滤tree
function handleMenuFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

const propsTree = {
  label: "name",
  children: "children",
};

defineExpose({ dialogShow });

watch(
  () => props.roleId,
  (newVal: string) => {
    handleLoadAuthTree();
    handleLoadMenuTree();
    handleSetAuth();
    handleSetMenu();
  }
);

watchEffect(
  () => {
    treeAuthRef.value?.filter(filterAuthText.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

watchEffect(
  () => {
    treeMenuRef.value?.filter(filterMenuText.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

onMounted(() => {
  handleLoadAuthTree();
  handleLoadMenuTree();
  handleSetAuth();
  handleSetMenu();
});
</script>
