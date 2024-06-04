<template>
  <el-dialog v-model="dialogShow" width="400px" title="编辑账号">
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="formData.loginName" placeholder="请输入登录名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { editAccount, getDetail } from "@/api/auth/account";
import { AccountEditModel } from "@/api/auth/account/model";

const formData = reactive<AccountEditModel>({});
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

//取账号明细
function GetDetail() {
  if (props.id !== "" && dialogShow.value === true) {
    getDetail(props.id)
      .then((data) => {
        Object.assign(formData, data);
      })
      .finally(() => {});
  }
}

//编辑账号提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      editAccount(formData)
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
  loginName: [
    { required: true, message: "请输入登录名", trigger: "blur" },
    {
      required: true,
      min: 5,
      max: 20,
      message: "请输入5-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
});

const statusOptions = [
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
