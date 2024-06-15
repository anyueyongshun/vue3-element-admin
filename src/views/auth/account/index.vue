<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :inline="true" :model="queryParams">
        <el-form-item label="登录名">
          <el-input
            placeholder="请输入登录名"
            maxlength="20"
            v-model="queryParams.loginName"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            style="width: 140px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery()">
            <i-ep-search />查询
          </el-button>
          <el-button type="success" @click="handleAdd()">
            <i-ep-plus />新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="table-container">
      <el-table
        border
        v-loading="loading"
        highlight-current-row
        :data="AccountDatas"
        stripe
        style="width: 100%"
        @row-dblclick="handleDbClick"
      >
        <el-table-column type="index" width="70" align="center" label="序号" />
        <!-- <el-table-column prop="id" label="Id" /> -->
        <el-table-column prop="loginName" label="登录名" />
        <el-table-column label="状态" width="70">
          <template #default="scope">
            <el-tag
              :type="getTagType(scope.row)"
              effect="dark"
              round
              size="small"
              @click="
                handleUpdateStatus(scope.row, scope.row.status === 1 ? 2 : 1)
              "
              >{{ scope.row.statusDesc }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="创建时间" />
        <el-table-column prop="lastLoginTime" label="上次登录时间" />
        <el-table-column prop="lastLoginIP" label="上次登录IP" />
        <el-table-column prop="memo" label="备注" />
        <el-table-column fixed="right" label="操作" width="190">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleEdit(scope.row)"
            >
              <i-ep-edit />编辑
            </el-button>
            <el-popconfirm
              title="确认要删除?"
              @confirm="handleUpdateStatus(scope.row, 3)"
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
              @click="handleAssign(scope.row)"
            >
              <i-ep-lock />权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          background
          v-if="total > 0"
          v-model:total="total"
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          @current-change="handleQuery"
          @size-change="handleSizeChange"
          :page-sizes="[10, 15, 20, 25, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </template>
    </el-card>
  </div>
  <addAccount ref="dialogAddRef" @handle-query-event="handleQuery" />
  <editAccount
    ref="dialogEditRef"
    @handle-query-event="handleQuery"
    v-model:id="accountId"
  />
  <assignRoleAuth
    ref="dialogRoleAuthRef"
    v-model:accountId="accountId"
    v-model:accountName="accountName"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getAccountPage, updateStatus } from "@/api/auth/account";
import {
  AccountQuery,
  AccountModel,
  AccountUpdateStatusModel,
} from "@/api/auth/account/model";
import addAccount from "./components/add.vue";
import editAccount from "./components/edit.vue";
import assignRoleAuth from "./components/assignRoleAuth.vue";

const loading = ref(false);
const total = ref(0);
const queryParams = reactive<AccountQuery>({
  pageNum: 1,
  pageSize: 10,
  status: 0,
});
const AccountDatas = ref<AccountModel[]>();
const accountId = ref("");
const accountName = ref("");
const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogRoleAuthRef = ref();

//分页查询账号列表
function handleQuery() {
  loading.value = true;
  getAccountPage(queryParams)
    .then((data) => {
      AccountDatas.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

//调整分页大小时调用查询
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  queryParams.pageNum = 1;
  handleQuery();
};

//显示新增账号框
function handleAdd() {
  dialogAddRef.value.dialogShow = true;
}

//显示编辑账号框
function handleEdit(row: AccountModel) {
  accountId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//更新账号的状态
function handleUpdateStatus(row: AccountModel, status: number) {
  var data: AccountUpdateStatusModel = {
    id: row.id,
    status: status,
  };
  updateStatus(data)
    .then((data) => {
      ElMessage.success("操作成功");
      handleQuery();
    })
    .finally(() => {});
}

//双击行显示编辑账号
function handleDbClick(row: AccountModel, column: any, event: any) {
  accountId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//给账号分配权限、菜单、角色
function handleAssign(row: AccountModel) {
  accountId.value = row.id ?? "";
  accountName.value = row.loginName ?? "";
  dialogRoleAuthRef.value.dialogShow = true;
}

//返回账号状态显示的tag类型
function getTagType(row: AccountModel) {
  if (row.status == 1) {
    return "success";
  } else if (row.status == 2) {
    return "warning";
  } else {
    return "danger";
  }
}

const statusOptions = [
  {
    value: 0,
    label: "==全部==",
  },
  {
    value: 1,
    label: "启用",
  },
  {
    value: 2,
    label: "禁用",
  },
  {
    value: 3,
    label: "删除",
  },
];

onMounted(() => {
  handleQuery();
});
</script>
