<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="名称">
          <el-input
            v-model="queryParams.Name"
            style="width: 240px"
            placeholder="请输入名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
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
        <el-table-column type="index" width="70" align="center" label="序号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态" width="70">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="点击会在 [启用] 与 [禁用] 之间切换"
              placement="bottom"
            >
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
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleEdit(scope.row)"
            >
              <el-icon><Document /></el-icon>
              编辑
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
  <addDicGroup ref="dialogAddRef" @handle-query-event="handleQuery" />
  <editDicGroup
    ref="dialogEditRef"
    @handle-query-event="handleQuery"
    v-model:id="dicGroupId"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getDicGroupPage, updateStatus } from "@/api/base/dicGroup/index";
import {
  QueryModel,
  DicGroupUpdateStatusModel,
  DicGroupModel,
} from "@/api/base/dicGroup/model";
import addDicGroup from "./components/addDicGroup.vue";
import editDicGroup from "./components/editDicGroup.vue";

const dialogAddRef = ref();
const dialogEditRef = ref();
const dicGroupId = ref("");

const loading = ref(false);
const total = ref(0);
const queryParams = reactive<QueryModel>({
  pageNum: 1,
  pageSize: 10,
});
const datas = ref<DicGroupModel[]>([]);

//加载字典组列表
function handleQuery() {
  loading.value = true;
  getDicGroupPage(queryParams)
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

//编辑字典组
function handleDbClick(row: DicGroupModel, column: any, event: any) {
  dicGroupId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//新增字典组
function handleAdd() {
  dialogAddRef.value.dialogShow = true;
}

//编辑字典组
function handleEdit(row: DicGroupModel) {
  dicGroupId.value = row.id ?? "";
  dialogEditRef.value.dialogShow = true;
}

//更新字典组状态
function handleUpdateStatus(row: DicGroupModel, status: number) {
  var data: DicGroupUpdateStatusModel = {
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
function getTagType(row: DicGroupModel) {
  if (row.status == 1) {
    return "success";
  } else if (row.status == 2) {
    return "warning";
  } else {
    return "danger";
  }
}

onMounted(() => {
  handleQuery();
});
</script>
