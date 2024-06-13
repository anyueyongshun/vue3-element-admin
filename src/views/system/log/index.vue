<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="内容">
          <el-input
            v-model="queryParams.Message"
            style="width: 240px"
            placeholder="请输入日志内容"
          />
        </el-form-item>
        <el-form-item label="账号">
          <el-input
            v-model="queryParams.LoginName"
            style="width: 240px"
            placeholder="请输入登录账号"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="queryParams.logType" placeholder="请选择日志类型">
            <el-option
              v-for="item in logTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-input
            v-model="queryParams.FromDate"
            style="width: 240px"
            placeholder="请输入开始日期"
          />
        </el-form-item>
        <el-form-item label="--">
          <el-input
            v-model="queryParams.ToDate"
            style="width: 240px"
            placeholder="请输入结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <i-ep-search />查询
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
        <el-table-column type="index" width="70" align="center" label="序号" />
        <el-table-column prop="message" label="内容" />
        <el-table-column prop="loginName" label="账号" />
        <el-table-column prop="logType" label="类型" />
        <el-table-column prop="addTime" label="时间" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleDetail(scope.row)"
            >
              <el-icon><Document /></el-icon>
              详细
            </el-button>
            <el-popconfirm
              title="确认要删除?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="primary" size="small" link>
                  <i-ep-delete />删除
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
  </div>
  <detailLog
    ref="dialogDetailRef"
    @handle-query-event="handleQuery"
    v-model:id="logId"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getLogPage, getDetail, deleteLog } from "@/api/system/log/index";
import { QueryModel, LogModel } from "@/api/system/log/model";
import detailLog from "./components/detail.vue";

const dialogDetailRef = ref();
const logId = ref("");

const loading = ref(false);
const total = ref(0);
const queryParams = reactive<QueryModel>({
  pageNum: 1,
  pageSize: 10,
});
const datas = ref<LogModel[]>([]);

//加载日志列表
function handleQuery() {
  loading.value = true;
  getLogPage(queryParams)
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

//日志详细
function handleDbClick(row: LogModel, column: any, event: any) {
  logId.value = row.id ?? "";
  dialogDetailRef.value.dialogShow = true;
}

//日志详细
function handleDetail(row: LogModel) {
  logId.value = row.id ?? "";
  dialogDetailRef.value.dialogShow = true;
}

//删除日志
function handleDelete(row: LogModel) {
  deleteLog(row.id)
    .then((data) => {
      ElMessage.success("操作成功");
      handleQuery();
    })
    .finally(() => {});
}

//日志类型
const logTypeOptions = [
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
