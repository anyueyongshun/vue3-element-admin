<template>
  <el-dialog
    v-model="dialogShow"
    width="1000px"
    :title="'拥有此[' + dialogTitle + ']的账号'"
  >
    <div class="app-container">
      <div class="search-container">
        <el-form ref="queryFormRef" :inline="true">
          <el-form-item label="登录名">
            <el-input
              placeholder="请输入登录名"
              v-model="searchLoginName"
              maxlength="20"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery()">
              <i-ep-search />查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-card class="table-container">
        <el-scrollbar height="500px">
          <el-table
            border
            v-loading="loading"
            highlight-current-row
            :data="filterTableData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="70"
              align="center"
              label="序号"
            />
            <el-table-column prop="loginName" label="登录名" />
            <el-table-column label="状态" width="70">
              <template #default="scope">
                <el-tag
                  :type="getTagType(scope.row)"
                  effect="dark"
                  round
                  size="small"
                  >{{ scope.row.statusDesc }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="addTime" label="创建时间" />
            <el-table-column prop="lastLoginTime" label="上次登录时间" />
            <el-table-column prop="memo" label="备注" /> </el-table
        ></el-scrollbar>
      </el-card>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getAccounts as getAuthAccounts } from "@/api/auth/authority";
import { getAccounts as getMenuAccounts } from "@/api/auth/menu";
import { getAccounts as getRoleAccounts } from "@/api/auth/role";
import { AccountModel } from "@/api/auth/account/model";

const props = defineProps({
  //1.权限，2.菜单 3.角色
  accountType: {
    type: String,
    default: () => {
      return "";
    },
  },
  id: {
    type: String,
    default: () => {
      return "";
    },
  },
});

const loading = ref(false);
const AccountDatas = reactive<AccountModel[]>([]);
const dialogShow = ref(false);
const dialogTitle = ref("");
const searchLoginName = ref("");
const filterTableData = computed(() =>
  AccountDatas.filter(
    (data) =>
      !searchLoginName.value ||
      data
        .loginName!.toLowerCase()
        .includes(searchLoginName.value.toLowerCase())
  )
);
//查询账号列表
function handleQuery() {
  if (props.id == "" || props.accountType == "") return;
  loading.value = true;
  if (props.accountType == "1") {
    dialogTitle.value = "权限";
    getAuthAccounts(props.id)
      .then((data) => {
        AccountDatas.length = 0;
        AccountDatas.push(...data);
      })
      .finally(() => {
        loading.value = false;
      });
  } else if (props.accountType == "2") {
    dialogTitle.value = "菜单";
    getMenuAccounts(props.id)
      .then((data) => {
        AccountDatas.length = 0;
        AccountDatas.push(...data);
      })
      .finally(() => {
        loading.value = false;
      });
  } else if (props.accountType == "3") {
    dialogTitle.value = "角色";
    getRoleAccounts(props.id)
      .then((data) => {
        AccountDatas.length = 0;
        AccountDatas.push(...data);
      })
      .finally(() => {
        loading.value = false;
      });
  }
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
defineExpose({ dialogShow });

watch(
  () => props.id,
  (newVal: string) => {
    handleQuery();
  }
);

onMounted(() => {
  handleQuery();
});
</script>
