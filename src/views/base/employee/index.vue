<template>
  <div>
    <div class="app-container">
      <el-row :gutter="12">
        <el-col :lg="4" :xs="24">
          <orgSelect ref="orgSelectRef" @handle-query-event="handleQuery" />
        </el-col>
        <el-col :lg="20" :xs="24">
          <div class="search-container">
            <el-form ref="queryFormRef" :inline="true" :model="queryParams">
              <el-form-item label="姓名">
                <el-input
                  v-model="queryParams.name"
                  style="width: 150px"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
              <el-form-item label="登录账号">
                <el-input
                  v-model="queryParams.loginName"
                  style="width: 150px"
                  placeholder="请输入登录账号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="工号">
                <el-input
                  v-model="queryParams.jobNumber"
                  style="width: 150px"
                  placeholder="请输入工号"
                  clearable
                />
              </el-form-item>
              <template v-if="isExpand">
                <el-form-item label="身份证号">
                  <el-input
                    v-model="queryParams.idNumber"
                    style="width: 150px"
                    placeholder="请输入身份证号"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input
                    v-model="queryParams.mobile"
                    style="width: 150px"
                    placeholder="请输入手机号"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select
                    v-model="queryParams.gender"
                    placeholder="请选择性别"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in genderOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> </el-select
                ></el-form-item>

                <el-form-item label="婚姻状态">
                  <el-select
                    v-model="queryParams.maritalStatus"
                    placeholder="请选择婚姻状态"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in maritalStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> </el-select
                ></el-form-item>
                <el-form-item label="政治面貌"
                  ><el-select
                    v-model="queryParams.politicsId"
                    placeholder="请选择政治面貌"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in dicPolitics"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="学历"
                  ><el-select
                    v-model="queryParams.qualificationId"
                    placeholder="请选择学历"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in dicQualification"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="在职状态">
                  <el-select
                    v-model="queryParams.jobStatus"
                    placeholder="请选择状态"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in jobStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> </el-select
                ></el-form-item>
                <el-form-item label="职位"
                  ><el-select
                    v-model="queryParams.jobPositionId"
                    placeholder="请选择职位"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in dicJobPosition"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="岗位"
                  ><el-select
                    v-model="queryParams.workPositionId"
                    placeholder="请选择岗位"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in dicWorkPosition"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="民族"
                  ><el-select
                    v-model="queryParams.nationalityId"
                    placeholder="请选择民族"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in dicNationality"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="合同到期">
                  <el-date-picker
                    v-model="contractEndDate"
                    type="daterange"
                    range-separator="--"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 250px"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  /> </el-form-item
              ></template>
              <el-form-item>
                <el-button type="primary" @click="handleQuery()">
                  <i-ep-search />查询
                </el-button>
                <el-button type="success" @click="handleAdd()">
                  <i-ep-plus />新增
                </el-button>
                <el-button icon="refresh" @click="handleReset">重置</el-button>
                <el-button class="ml-3" @click="handleExport"
                  ><template #icon><i-ep-download /></template>导出</el-button
                >
                <el-link
                  class="ml-2"
                  type="primary"
                  :underline="false"
                  @click="isExpand = !isExpand"
                >
                  <template v-if="isExpand"> 收起<i-ep-arrow-up /> </template>
                  <template v-else> 展开<i-ep-arrow-down /> </template>
                </el-link>
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
              <el-table-column prop="mobile" label="手机" />
              <el-table-column prop="qualificationName" label="学历" />
              <el-table-column prop="entryDate" label="入职日期">
                <template #default="scope">
                  {{ formatDate(scope.entryDate) }}
                </template>
              </el-table-column>
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
import type { FormInstance } from "element-plus";
import {
  getEmployeePage,
  updateStatus,
  exportEmployee,
} from "@/api/base/employee/index";
import {
  EmployeeListModel,
  EmployeeUpdateStatusModel,
  QueryModel,
} from "@/api/base/employee/model";
import addEmployee from "./components/addEmployee.vue";
import editEmployee from "./components/editEmployee.vue";
import detailEmployee from "./components/detailEmployee.vue";
import orgSelect from "../org/components/orgSelect.vue";
import { SelectModel } from "@/hooks/commModel";
import { getDicByGroupId } from "@/api/base/dic";
import { formatDate } from "@/hooks/commFunction";

const queryFormRef = ref<FormInstance>();
const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogDetailRef = ref();
const orgSelectRef = ref();
const orgId = ref("");
const employeeId = ref("");
const isExpand = ref(false);

const dicNationality = reactive<SelectModel[]>([]);
const dicPolitics = reactive<SelectModel[]>([]);
const dicQualification = reactive<SelectModel[]>([]);
const dicJobPosition = reactive<SelectModel[]>([]);
const dicWorkPosition = reactive<SelectModel[]>([]);

const loading = ref(false);
const total = ref(0);

const contractEndDate = ref<Date[]>([]);
const defaultOption = { value: " ", label: "==选择==" };
const queryParams = reactive<QueryModel>({
  pageNum: 1,
  pageSize: 10,
  gender: 0,
  jobStatus: 0,
  maritalStatus: 0,
  nationalityId: " ",
  politicsId: " ",
  qualificationId: " ",
  jobPositionId: " ",
  workPositionId: " ",
});
const datas = ref<EmployeeListModel[]>([]);

//加载员工列表
function handleQuery() {
  loading.value = true;
  queryParams.orgId = orgSelectRef.value.orgId;
  orgId.value = orgSelectRef.value.orgId;
  if (contractEndDate.value != null && contractEndDate.value.length == 2) {
    queryParams.contractEndDateFrom = contractEndDate.value[0];
    queryParams.contractEndDateTo = contractEndDate.value[1];
  }
  getEmployeePage(queryParams)
    .then((data) => {
      datas.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

//导出员工
function handleExport() {
  queryParams.orgId = orgSelectRef.value.orgId;
  if (contractEndDate.value != null && contractEndDate.value.length == 2) {
    queryParams.contractEndDateFrom = contractEndDate.value[0];
    queryParams.contractEndDateTo = contractEndDate.value[1];
  }

  exportEmployee(queryParams).then((response: any) => {
    const fileData = response.data;
    const fileName = decodeURI(
      response.headers["content-disposition"].split(";")[1].split("=")[1]
    );
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";

    const blob = new Blob([fileData], { type: fileType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadUrl);
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

const maritalStatusOptions = [
  {
    value: 0,
    label: "==选择==",
  },
  {
    value: 1,
    label: "已婚",
  },
  {
    value: 2,
    label: "未婚",
  },
  {
    value: 3,
    label: "离异",
  },
];

const jobStatusOptions = [
  {
    value: 0,
    label: "==选择==",
  },
  {
    value: 1,
    label: "在职",
  },
  {
    value: 2,
    label: "离职",
  },
];

const genderOptions = [
  {
    value: 0,
    label: "==选择==",
  },
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },
];

//获取select控件的数据
function handleSetDic() {
  getDicByGroupId("nat")
    .then((data) => {
      if (data) {
        dicNationality.push(defaultOption);
        dicNationality.push(...data);
      }
    })
    .finally();
  getDicByGroupId("pol")
    .then((data) => {
      if (data) {
        dicPolitics.push(defaultOption);
        dicPolitics.push(...data);
      }
    })
    .finally();
  getDicByGroupId("qual")
    .then((data) => {
      if (data) {
        dicQualification.push(defaultOption);
        dicQualification.push(...data);
      }
    })
    .finally();
  getDicByGroupId("jobp")
    .then((data) => {
      if (data) {
        dicJobPosition.push(defaultOption);
        dicJobPosition.push(...data);
      }
    })
    .finally();
  getDicByGroupId("workp")
    .then((data) => {
      if (data) {
        dicWorkPosition.push(defaultOption);
        dicWorkPosition.push(...data);
      }
    })
    .finally();
}

// 重置操作
function handleReset() {
  queryFormRef.value?.resetFields();
  handleQuery();
}

onMounted(() => {
  handleSetDic();
  handleQuery();
});
</script>
