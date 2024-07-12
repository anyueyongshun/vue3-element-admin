<template>
  <div>
    <div class="app-container">
      <el-row :gutter="12">
        <el-col :lg="4" :xs="24">
          <orgSelect ref="orgSelectRef" @handle-query-event="handleQuery" />
        </el-col>
        <el-col :lg="20" :xs="24">
          <div class="search-container">
            <el-form :inline="true" :model="queryParams">
              <el-form-item label="名称">
                <el-input
                  v-model="queryParams.name"
                  style="width: 240px"
                  placeholder="请输入名称"
                  clearable
                />
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
              :data="datas"
              stripe
              style="width: 100%"
              @row-dblclick="handleDbClick"
            >
              <el-table-column
                type="index"
                width="70"
                align="center"
                label="序号"
              />
              <el-table-column prop="orgName" label="组织机构" />
              <el-table-column prop="name" label="姓名" />
              <!-- <el-table-column prop="loginName" label="登录名" /> -->
              <!-- <el-table-column prop="jobNumber" label="工号" /> -->
              <el-table-column prop="mobile" label="电话" />
              <el-table-column prop="qualificationName" label="学历" />
              <el-table-column prop="entryDate" label="入职日期" />
              <!-- <el-table-column prop="provinceName" label="省" /> -->
              <el-table-column prop="address" label="现居地址" />
              <el-table-column label="状态" width="70">
                <template #default="scope">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击会在 [在职] 与 [离职] 之间切换"
                    placement="bottom"
                  >
                    <el-tag
                      :type="getTagType(scope.row)"
                      effect="dark"
                      round
                      size="small"
                      @click="
                        handleUpdateStatus(
                          scope.row,
                          scope.row.jobStatus === 1 ? 2 : 1
                        )
                      "
                      >{{ scope.row.jobStatusDesc }}</el-tag
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="memo" label="备注" /> -->
              <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    link
                    @click="handleEdit(scope.row)"
                  >
                    <el-icon mr-1><Document /></el-icon>
                    编辑
                  </el-button>
                  <el-popconfirm
                    title="确认要删除?"
                    @confirm="handleUpdateStatus(scope.row, 3)"
                  >
                    <template #reference>
                      <el-button type="primary" size="small" link>
                        <i-ep-delete mr-1 />删除
                      </el-button>
                    </template>
                  </el-popconfirm>
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
        </el-col>
      </el-row>
    </div>
    <addEmployee ref="dialogAddRef" @handle-query-event="handleQuery" />
    <editEmployee ref="dialogEditRef" @handle-query-event="handleQuery" />
    <detailEmployee ref="dialogDetailRef" v-model:employeeId="employeeId" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getEmployeePage, updateStatus } from "@/api/base/employee/index";
import {
  EmployeeListModel,
  EmployeeUpdateStatusModel,
  QueryModel,
} from "@/api/base/employee/model";
import addEmployee from "./components/addEmployee.vue";
import editEmployee from "./components/editEmployee.vue";
import detailEmployee from "./components/detailEmployee.vue";
import orgSelect from "../org/components/orgSelect.vue";

const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogDetailRef = ref();
const orgSelectRef = ref();
const orgId = ref("");
const employeeId = ref("");

const loading = ref(false);
const total = ref(0);
const queryParams = reactive<QueryModel>({
  pageNum: 1,
  pageSize: 10,
});
const datas = ref<EmployeeListModel[]>([]);

//加载员工列表
function handleQuery() {
  loading.value = true;
  queryParams.orgId = orgSelectRef.value.orgId;
  orgId.value = orgSelectRef.value.orgId;
  getEmployeePage(queryParams)
    .then((data) => {
      datas.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

//调整页大小
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  queryParams.pageNum = 1;
  handleQuery();
};

//员工详情
function handleDbClick(row: EmployeeListModel, column: any, event: any) {
  employeeId.value = row.id ?? "";
  dialogDetailRef.value.dialogShow = true;
}

//新增员工
function handleAdd() {
  //parentId.value = data.id ?? "";
  dialogAddRef.value.dialogShow = true;
}

//编辑员工
function handleEdit(row: EmployeeListModel) {
  employeeId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//更新员工状态
function handleUpdateStatus(row: EmployeeListModel, status: number) {
  var data: EmployeeUpdateStatusModel = {
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

//状态类型
function getTagType(row: EmployeeListModel) {
  if (row.jobStatus == 1) {
    return "success";
  } else if (row.jobStatus == 2) {
    return "warning";
  } else {
    return "danger";
  }
}

onMounted(() => {
  handleQuery();
});
</script>
