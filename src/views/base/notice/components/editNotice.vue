<template>
  <el-dialog v-model="dialogShow" width="80%" title="编辑通知">
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容" prop="contents">
            <el-scrollbar height="400px">
              <editor v-model="formData.contents"
            /></el-scrollbar>
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
import { editNotice, getDetail } from "@/api/base/notice";
import { NoticeEditModel } from "@/api/base/notice/model";
import Editor from "@/components/WangEditor/index.vue";

const formData = reactive<NoticeEditModel>({});
const dataFormRef = ref(ElForm);
const dialogShow = ref(false);
const emit = defineEmits(["handleQueryEvent"]);
const props = defineProps({
  id: {
    type: String,
    default: () => {
      return "";
    },
  },
});

//取通知明细
function GetDetail() {
  if (props.id !== "" && dialogShow.value === true) {
    getDetail(props.id)
      .then((data) => {
        Object.assign(formData, data);
      })
      .finally(() => {});
  }
}

//编辑通知提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      editNotice(formData)
        .then((data) => {
          if (data) {
            ElMessage.success("编辑成功");
            dialogShow.value = false;
            emit("handleQueryEvent");
          }
        })
        .finally();
    }
  });
}

//关闭编辑框
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
  publishStatus: [
    { required: true, message: "请输选择发布状态", trigger: "blur" },
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

watch(
  () => props.id,
  (newVal: string) => {
    GetDetail();
  }
);

onMounted(() => {
  GetDetail();
});
</script>
