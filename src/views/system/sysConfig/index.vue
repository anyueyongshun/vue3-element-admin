<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统配置</span>
        </div>
      </template>
      <el-form
        ref="dataFormSysConfigRef"
        :model="formDataSysConfig"
        label-width="auto"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="默认密码" prop="defaultPassword">
              <el-input
                v-model="formDataSysConfig.defaultPassword"
                placeholder="请输入默认密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1" />
          <el-col :span="17">
            <el-form-item label="IP黑名单" prop="blackListIp">
              <el-input
                v-model="formDataSysConfig.blackListIp"
                placeholder="请输入IP黑名单(用逗号分隔)"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmitSysConfig"
          >保存</el-button
        >
      </template>
    </el-card>
    <el-divider />
    <el-card>
      <template #header>
        <div class="card-header">
          <span>日志配置</span>
        </div>
      </template>
      <el-form
        ref="dataFormLogConfigRef"
        :model="formDataLogConfig"
        label-width="auto"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="日志存储类型" prop="logStoreType">
              <el-switch
                v-model="formDataLogConfig.logStoreType"
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
              <el-switch v-model="formDataLogConfig.isLogin" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开启异常日志" prop="isException">
              <el-switch v-model="formDataLogConfig.isException" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开启操作日志" prop="isOperate">
              <el-switch v-model="formDataLogConfig.isOperate" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开启访问日志" prop="isWatchDog">
              <el-switch v-model="formDataLogConfig.isWatchDog" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmitLogConfig"
          >保存</el-button
        >
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  GetLogConfig,
  UpdateLogConfig,
  GetSysConfig,
  UpdateSysConfig,
} from "@/api/system/sysConfig";
import { LogConfigModel, SysConfigModel } from "@/api/system/sysConfig/model";

const formDataLogConfig = reactive<LogConfigModel>({});
const dataFormLogConfigRef = ref(ElForm);

const formDataSysConfig = reactive<SysConfigModel>({});
const dataFormSysConfigRef = ref(ElForm);

//取日志配置详细
function handleLogConfig() {
  GetLogConfig()
    .then((data) => {
      if (data) {
        Object.assign(formDataLogConfig, data);
      }
    })
    .finally();
}

//保存日志配置
function handleSubmitLogConfig() {
  dataFormLogConfigRef.value.validate((isValid: boolean) => {
    if (isValid) {
      UpdateLogConfig(formDataLogConfig)
        .then((data) => {
          if (data) {
            ElMessage.success("操作成功");
          }
        })
        .finally();
    }
  });
}

//取系统配置详细
function handleSysConfig() {
  GetSysConfig()
    .then((data) => {
      if (data) {
        Object.assign(formDataSysConfig, data);
      }
    })
    .finally();
}

//保存系统配置
function handleSubmitSysConfig() {
  dataFormSysConfigRef.value.validate((isValid: boolean) => {
    if (isValid) {
      UpdateSysConfig(formDataSysConfig)
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
  handleSysConfig();
});
</script>
