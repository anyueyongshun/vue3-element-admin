<template>
  <el-row justify="center">
    <el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="5">
      <div class="app-container">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>修改密码</span>
            </div>
          </template>
          <el-form
            ref="dataFormRef"
            :model="formData"
            label-width="auto"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="原密码" prop="oldPassword">
              <el-input
                v-model="formData.oldPassword"
                type="password"
                show-password
                placeholder="请输入原密码"
              />
            </el-form-item>
            <el-form-item
              label="新密码"
              prop="newPassword"
              type="password"
              show-password
            >
              <el-input
                v-model="formData.newPassword"
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="confirmPassword"
              type="password"
              show-password
            >
              <el-input
                v-model="formData.confirmPassword"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="flex-x-end">
              <el-button type="primary" @click="handleChangePassword">
                <el-icon class="mr-1"><Select /></el-icon>修改
              </el-button>
            </div>
          </template>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { changePassword } from "@/api/auth/account";
import { AccountChangePasswordModel } from "@/api/auth/account/model";

const formData = reactive<AccountChangePasswordModel>({
  newPassword: "",
  oldPassword: "",
  confirmPassword: "",
});
const dataFormRef = ref(ElForm);

//修改密码
function handleChangePassword() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      changePassword(formData)
        .then((data) => {
          if (data) {
            ElMessage.success("操作成功");
          }
        })
        .finally();
    }
  });
}

//验证规则
const rules = reactive({
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      required: true,
      min: 4,
      max: 20,
      message: "请输入4-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  oldPassword: [
    { required: true, message: "请输入原密码", trigger: "blur" },
    {
      required: true,
      min: 4,
      max: 20,
      message: "请输入4-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    {
      required: true,
      min: 4,
      max: 20,
      message: "请输入4-20个字符",
      trigger: ["blur", "change"],
    },
  ],
});
onMounted(() => {});
</script>
