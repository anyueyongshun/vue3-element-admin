<template>
  <el-dialog v-model="dialogShow" width="400px" title="新增通知">
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容" prop="contents">
            <el-input
              v-model="formData.contents"
              type="contents"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="memo">
            <el-input v-model="formData.memo" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发布状态" prop="publishStatus">
            <el-switch
              v-model="formData.publishStatus"
              active-text="发布"
              inactive-text="草稿"
              :active-value="1"
              :inactive-value="2"
              inline-prompt
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { addNotice } from "@/api/base/notice";
import { NoticeAddModel } from "@/api/base/notice/model";

const formData = reactive<NoticeAddModel>({
  type: 1,
  AccountIds: [
    "C514BE01-5C72-4E24-B3D7-3E221B410BDE",
    "28296269-ED12-43EA-AAEE-90804FB62D8C",
  ],
});
const dataFormRef = ref(ElForm);
const dialogShow = ref(false);
const emit = defineEmits(["handleQueryEvent"]);

//新增通知提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      addNotice(formData)
        .then((data) => {
          if (data) {
            ElMessage.success("新增成功");
            dialogShow.value = false;
            emit("handleQueryEvent");
          }
        })
        .finally();
    }
  });
}

//关闭新增框
function closeDialog() {
  dialogShow.value = false;
}

//验证规则
const rules = reactive({
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  contents: [
    { required: true, message: "请输入内容", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 5000,
      message: "请输入1-5000个字符",
      trigger: ["blur", "change"],
    },
  ],
  memo: [
    { required: false, message: "请输入备注", trigger: "blur" },
    {
      required: false,
      min: 0,
      max: 200,
      message: "请输入1-200个字符",
      trigger: ["blur", "change"],
    },
  ],
});

defineExpose({ dialogShow });

onMounted(() => {});
</script>
