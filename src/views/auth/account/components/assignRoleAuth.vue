<template>
  <el-dialog
    v-model="dialogShow"
    width="600px"
    :title="'为账号[' + accountName + ']分配角色、权限、菜单'"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="权限(拥有)" name="authorityOwner">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterAuthOwnerText"
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
              ref="treeAuthOwnerRef"
              :props="propsTree"
              :data="datasAuthOwner"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleAuthOwnerFilter"
              check-strictly
            >
              <template #default="{ node, data }">
                <span :style="[data.isAuth ? {} : { color: '#c1acac' }]">
                  {{ node.label }}
                </span>
              </template>
            </el-tree>
          </el-scrollbar>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="权限(包含)" name="authorityInclude">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterAuthIncludeText"
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
              ref="treeAuthIncludeRef"
              :props="propsTree"
              :data="datasAuthInclude"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleAuthIncludeFilter"
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
            ><el-button type="primary" @click="handleAssignAuthInclude(1)">
              <el-icon><Select /></el-icon>分配权限
            </el-button>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="权限(排除)" name="authorityExclude">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterAuthExcludeText"
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
              ref="treeAuthExcludeRef"
              :props="propsTree"
              :data="datasAuthExclude"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleAuthExcludeFilter"
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
            ><el-button type="primary" @click="handleAssignAuthExclude(2)">
              <el-icon><Select /></el-icon>分配权限
            </el-button>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="角色" name="authority">
        <div class="search-container">
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input
                v-model="filterRoleText"
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
              ref="treeRoleRef"
              :props="propsTree"
              :data="datasRole"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleRoleFilter"
              check-strictly
            >
              <template #default="{ node, data }">
                <el-icon v-if="data.isAdmin"><UserFilled /></el-icon>
                {{ node.label }}
              </template>
            </el-tree>
          </el-scrollbar>
          <template #footer
            ><el-button type="primary" @click="handleAssignRole">
              <el-icon><Select /></el-icon>分配角色
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
              :props="propsMenuTree"
              :data="datasMenu"
              show-checkbox
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="handleMenuFilter"
              check-strictly
            >
              <template #default="{ node, data }">
                <svg-icon :icon-class="data.icon" />
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
import { loadTree as loadRoleTree } from "@/api/auth/role/index";
import {
  AccountAuthorityModel,
  AccountMenuModel,
  AccountRoleModel,
} from "@/api/auth/account/model";
import {
  assignMenu,
  assignAuth,
  assignRole,
  getAuthorityOwnerIds,
  getAuthorityIncludeIds,
  getAuthorityExcludeIds,
  getRoleIds,
  getMenuIds,
} from "@/api/auth/account/index";

const activeName = ref("authorityOwner");
const dialogShow = ref(false);

const datasAuthOwner = reactive<Tree[]>([]);
const datasAuthInclude = reactive<Tree[]>([]);
const datasAuthExclude = reactive<Tree[]>([]);
const datasRole = reactive<Tree[]>([]);
const datasMenu = reactive<Tree[]>([]);

const treeAuthOwnerRef = ref<InstanceType<typeof ElTree>>();
const treeAuthIncludeRef = ref<InstanceType<typeof ElTree>>();
const treeAuthExcludeRef = ref<InstanceType<typeof ElTree>>();
const treeRoleRef = ref<InstanceType<typeof ElTree>>();
const treeMenuRef = ref<InstanceType<typeof ElTree>>();

const filterAuthOwnerText = ref("");
const filterAuthIncludeText = ref("");
const filterAuthExcludeText = ref("");
const filterRoleText = ref("");
const filterMenuText = ref("");

const props = defineProps({
  accountId: {
    type: String,
    default: () => {
      return "";
    },
  },
  accountName: {
    type: String,
    default: () => {
      return "";
    },
  },
});

//------------------------账号添加权限，菜单，角色-----------------------------
//加载权限树
function handleLoadAuthTree() {
  loadAuthTree(false)
    .then((data) => {
      datasAuthInclude.length = 0;
      datasAuthInclude.push(data);
      datasAuthExclude.length = 0;
      datasAuthExclude.push(data);
    })
    .finally(() => {});
}

//加载权限树
function handleLoadAuthOwnerTree() {
  loadAuthTree(true)
    .then((data) => {
      datasAuthOwner.length = 0;
      datasAuthOwner.push(data);
    })
    .finally(() => {});
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

//加载角色树
function handleLoadRoleTree() {
  loadRoleTree()
    .then((data) => {
      datasRole.length = 0;
      datasRole.push(data);
    })
    .finally(() => {});
}

//分配包含权限
function handleAssignAuthInclude(type: number) {
  var model: AccountAuthorityModel = {
    accountId: props.accountId,
    authorityType: type,
    authorityIds: treeAuthIncludeRef.value?.getCheckedKeys(),
  };
  assignAuth(model)
    .then((data) => {
      ElMessage.success("操作成功");
      handleSetAuthOwner();
    })
    .finally(() => {});
}

//分配排除权限
function handleAssignAuthExclude(type: number) {
  var model: AccountAuthorityModel = {
    accountId: props.accountId,
    authorityType: type,
    authorityIds: treeAuthExcludeRef.value?.getCheckedKeys(),
  };
  assignAuth(model)
    .then((data) => {
      ElMessage.success("操作成功");
      handleSetAuthOwner();
    })
    .finally(() => {});
}

//分配菜单
function handleAssignMenu() {
  var model: AccountMenuModel = {
    accountId: props.accountId,
    menuIds: treeMenuRef.value?.getCheckedKeys(),
  };
  assignMenu(model)
    .then((data) => {
      ElMessage.success("操作成功");
    })
    .finally(() => {});
}

//分配角色
function handleAssignRole() {
  var model: AccountRoleModel = {
    accountId: props.accountId,
    roleIds: treeRoleRef.value?.getCheckedKeys(),
  };
  assignRole(model)
    .then((data) => {
      ElMessage.success("操作成功");
      handleSetAuthOwner();
    })
    .finally(() => {});
}

//设置拥有权限
function handleSetAuthOwner() {
  if (props.accountId != "") {
    getAuthorityOwnerIds(props.accountId)
      .then((data) => {
        treeAuthOwnerRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//设置包含权限
function handleSetAuthInclude() {
  if (props.accountId != "") {
    getAuthorityIncludeIds(props.accountId)
      .then((data) => {
        treeAuthIncludeRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//设置排除权限
function handleSetAuthExclude() {
  if (props.accountId != "") {
    getAuthorityExcludeIds(props.accountId)
      .then((data) => {
        treeAuthExcludeRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//设置角色
function handleSetRole() {
  if (props.accountId != "") {
    getRoleIds(props.accountId)
      .then((data) => {
        treeRoleRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//设置菜单
function handleSetMenu() {
  if (props.accountId != "") {
    getMenuIds(props.accountId)
      .then((data) => {
        treeMenuRef.value?.setCheckedKeys(data);
      })
      .finally(() => {});
  }
}

//过滤tree
function handleAuthOwnerFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

//过滤tree
function handleAuthIncludeFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

//过滤tree
function handleAuthExcludeFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

//过滤tree
function handleRoleFilter(value: string, data: any) {
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
  return data.title.indexOf(value) !== -1;
}

const propsTree = {
  label: "name",
  children: "children",
  disabled: "disabled",
};

const propsMenuTree = {
  label: "title",
  children: "children",
  disabled: "disabled",
};

defineExpose({ dialogShow });

watch(
  () => props.accountId,
  (newVal: string) => {
    handlQuery();
  }
);

watchEffect(
  () => {
    treeAuthOwnerRef.value?.filter(filterAuthOwnerText.value);
    treeAuthIncludeRef.value?.filter(filterAuthIncludeText.value);
    treeAuthExcludeRef.value?.filter(filterAuthExcludeText.value);
    treeRoleRef.value?.filter(filterRoleText.value);
    treeMenuRef.value?.filter(filterMenuText.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

onMounted(() => {
  handlQuery();
});

function handlQuery() {
  if (dialogShow.value && props.accountId != "") {
    handleLoadAuthOwnerTree();
    handleLoadAuthTree();
    handleLoadMenuTree();
    handleLoadRoleTree();
    handleSetAuthOwner();
    handleSetAuthInclude();
    handleSetAuthExclude();
    handleSetRole();
    handleSetMenu();
  }
}
</script>
