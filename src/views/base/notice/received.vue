<template>
  <div>
    <div class="app-container">
      <div class="search-container">
        <el-form ref="queryFormRef" :inline="true" :model="queryParams">
          <el-form-item label="标题">
            <el-input
              placeholder="请输入标题"
              maxlength="20"
              v-model="queryParams.title"
              clearable
            />
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select
              v-model="queryParams.publishStatus"
              placeholder="请选择发布状态"
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
          </el-form-item>
        </el-form>
      </div>
      <el-card class="table-container">
        <el-table
          border
          v-loading="loading"
          highlight-current-row
          :data="NoticeDatas"
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
          <el-table-column prop="typeDesc" label="分类" width="150" />
          <el-table-column label="状态" width="70">
            <template #default="scope">
              <el-tag
                :type="getTagType(scope.row)"
                effect="dark"
                round
                size="small"
                >{{ scope.row.isView == true ? "已阅" : "未阅" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="addAccountName" label="创建人" width="150" />
          <el-table-column prop="addTime" label="创建时间" width="190" />
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
    <detailNotice ref="dialogDetailRef" v-model:id="noticeId" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getNoticePageMyReceive, updateView } from "@/api/base/notice";
import { NoticeQuery, NoticeModel } from "@/api/base/notice/model";
import detailNotice from "./components/detailNotice.vue";

const loading = ref(false);
const total = ref(0);
const queryParams = reactive<NoticeQuery>({
  pageNum: 1,
  pageSize: 10,
  title: "",
  publishStatus: 0,
});
const NoticeDatas = ref<NoticeModel[]>();
const noticeId = ref("");
const dialogDetailRef = ref();

//分页查询通知列表
function handleQuery() {
  loading.value = true;
  getNoticePageMyReceive(queryParams)
    .then((data) => {
      NoticeDatas.value = data.list;
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

//双击行显示通知
function handleDbClick(row: NoticeModel, column: any, event: any) {
  noticeId.value = row.id ?? "";
  dialogDetailRef.value.dialogShow = true;
  updateView(noticeId.value);
}

//返回通知状态显示的tag类型
function getTagType(row: NoticeModel) {
  if (row.isView == true) {
    return "success";
  } else {
    return "info";
  }
}

const statusOptions = [
  {
    value: 0,
    label: "==全部==",
  },
  {
    value: 1,
    label: "发布",
  },
  {
    value: 2,
    label: "草稿",
  },
];

onMounted(() => {
  handleQuery();
});
</script>
