<template>
  <el-dialog v-model="dialogShow" width="400px" title="新增账号">
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
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
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
import { addAccount } from "@/api/auth/account";
import { AccountAddModel } from "@/api/auth/account/model";

const formData = reactive<AccountAddModel>({});
const dataFormRef = ref(ElForm);
const dialogShow = ref(false);
const emit = defineEmits(["handleQueryEvent"]);

function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      addAccount(formData)
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

function closeDialog() {
  dialogShow.value = false;
}

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
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      required: true,
      min: 5,
      max: 20,
      message: "请输入5-20个字符",
      trigger: ["blur", "change"],
    },
  ],
});

defineExpose({ dialogShow });

onMounted(() => {});
</script>
