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
              <el-tooltip
                class="box-item"
                effect="dark"
                content="点击会在 [发布] 与 [草稿] 之间切换"
                placement="bottom"
              >
                <el-tag
                  :type="getTagType(scope.row)"
                  effect="dark"
                  round
                  size="small"
                  @click="
                    handleUpdatePublishStatus(
                      scope.row,
                      scope.row.publishStatus === 1 ? 2 : 1
                    )
                  "
                  >{{ scope.row.publishStatusDesc }}</el-tag
                >
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="memo" label="备注" />
          <el-table-column prop="addAccountName" label="创建人" width="150" />
          <el-table-column prop="addTime" label="创建时间" width="190" />
          <el-table-column fixed="right" label="操作" width="140">
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
    <addNotice ref="dialogAddRef" @handle-query-event="handleQuery" />
    <editNotice
      ref="dialogEditRef"
      @handle-query-event="handleQuery"
      v-model:id="noticeId"
    />
    <detailNotice ref="dialogDetailRef" v-model:id="noticeId" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  getNoticePage,
  updatePublishStatus,
  updateStatus,
} from "@/api/base/notice";
import {
  NoticeQuery,
  NoticeModel,
  NoticeUpdatePublishStatusModel,
  NoticeUpdateStatusModel,
} from "@/api/base/notice/model";
import addNotice from "./components/addNotice.vue";
import editNotice from "./components/editNotice.vue";
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
const dialogAddRef = ref();
const dialogEditRef = ref();
const dialogDetailRef = ref();

//分页查询通知列表
function handleQuery() {
  loading.value = true;
  getNoticePage(queryParams)
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

//显示新增通知框
function handleAdd() {
  dialogAddRef.value.dialogShow = true;
}

//显示编辑通知框
function handleEdit(row: NoticeModel) {
  noticeId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//更新通知的状态
function handleUpdatePublishStatus(row: NoticeModel, status: number) {
  var data: NoticeUpdatePublishStatusModel = {
    id: row.id,
    publishStatus: status,
  };
  if (row.publishStatus == 1) return;
  updatePublishStatus(data)
    .then((data) => {
      ElMessage.success("操作成功");
      handleQuery();
    })
    .finally(() => {});
}

//更新通知的状态
function handleUpdateStatus(row: NoticeModel, status: number) {
  var data: NoticeUpdateStatusModel = {
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

//双击行显示编辑通知
function handleDbClick(row: NoticeModel, column: any, event: any) {
  noticeId.value = row.id ?? "";
  dialogDetailRef.value.dialogShow = true;
}

//返回通知状态显示的tag类型
function getTagType(row: NoticeModel) {
  if (row.publishStatus == 1) {
    return "success";
  } else if (row.publishStatus == 2) {
    return "info";
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
