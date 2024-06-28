<template>
  <div class="app-container">
    <el-card>
      <el-form ref="dataFormRef" :model="formData" label-width="auto">
        <el-row>
          <el-col :span="24">
            <el-form-item label="日志存储类型" prop="logStoreType">
              <el-switch
                v-model="formData.logStoreType"
                active-text="数据库"
                inactive-text="文件"
                :active-value="1"
                :inactive-value="2"
                inline-prompt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开启登录日志" prop="isLogin">
              <el-switch v-model="formData.isLogin" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开启异常日志" prop="isException">
              <el-switch v-model="formData.isException" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开启操作日志" prop="isOperate">
              <el-switch v-model="formData.isOperate" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开启访问日志" prop="isWatchDog">
              <el-switch v-model="formData.isWatchDog" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { GetLogConfig, UpdateLogConfig } from "@/api/system/sysConfig";
import { LogConfigModel } from "@/api/system/sysConfig/model";

const formData = reactive<LogConfigModel>({});
const dataFormRef = ref(ElForm);

//取日志配置详细
function handleLogConfig() {
  GetLogConfig()
    .then((data) => {
      if (data) {
        Object.assign(formData, data);
      }
    })
    .finally();
}

//保存日志配置
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      UpdateLogConfig(formData)
        .then((data) => {
          if (data) {
            ElMessage.success("操作成功");
          }
        })
        .finally();
    }
  });
}

onMounted(() => {
  handleLogConfig();
});
</script>
