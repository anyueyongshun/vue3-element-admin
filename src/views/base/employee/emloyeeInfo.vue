<template>
  <div class="app-container">
    <el-card class="table-container">
      <el-row>
        <el-col :span="12" />
        <el-col :span="12">
          <img
            v-if="employeeDetail.photoPath"
            :src="employeeDetail.photoPath"
            class="avatar"
          />
        </el-col>
      </el-row>
      <div id="EmployeeInfos">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="姓名">
            {{ employeeDetail.name }}
          </el-descriptions-item>
          <el-descriptions-item label="登录账号">
            {{ employeeDetail.loginName }}
          </el-descriptions-item>
          <el-descriptions-item label="工号">
            {{ employeeDetail.jobNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构">
            {{ employeeDetail.orgName }}
          </el-descriptions-item>
          <el-descriptions-item label="性别">
            {{ employeeDetail.genderDesc }}
          </el-descriptions-item>
          <el-descriptions-item label="身份证号">
            {{ employeeDetail.idNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="出生日期">
            {{ formatDate(employeeDetail.birthday) }}
          </el-descriptions-item>
          <el-descriptions-item label="家庭住址">
            {{ employeeDetail.homeAddress }}
          </el-descriptions-item>
          <el-descriptions-item label="地址">
            <template v-if="employeeDetail.provinceName">
              {{ employeeDetail.provinceName }}>{{ employeeDetail.cityName }}>{{
                employeeDetail.areaName
              }}
            </template>
          </el-descriptions-item>
          <el-descriptions-item label="民族">
            {{ employeeDetail.nationalityName }}
          </el-descriptions-item>
          <el-descriptions-item label="政治面貌">
            {{ employeeDetail.politicsName }}
          </el-descriptions-item>
          <el-descriptions-item label="电话">
            {{ employeeDetail.telephone }}
          </el-descriptions-item>
          <el-descriptions-item label="手机">
            {{ employeeDetail.mobile }}
          </el-descriptions-item>
          <el-descriptions-item label="短号">
            {{ employeeDetail.shortNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="电子邮件">
            {{ employeeDetail.email }}
          </el-descriptions-item>
          <el-descriptions-item label="紧急联系人">
            {{ employeeDetail.firstContactPerson }}
          </el-descriptions-item>
          <el-descriptions-item label="紧急联系人电话">
            {{ employeeDetail.firstContactPersonPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="学历">
            {{ employeeDetail.qualificationName }}
          </el-descriptions-item>
          <el-descriptions-item label="毕业院校">
            {{ employeeDetail.graduateSchool }}
          </el-descriptions-item>
          <el-descriptions-item label="专业">
            {{ employeeDetail.professional }}
          </el-descriptions-item>
          <el-descriptions-item label="合同起始日期">
            {{ formatDate(employeeDetail.contractStartDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="合同结束日期">
            {{ formatDate(employeeDetail.contractEndDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="入职日期">
            {{ formatDate(employeeDetail.entryDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="转正日期">
            {{ formatDate(employeeDetail.positiveDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="离职日期">
            {{ formatDate(employeeDetail.quitDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="在职状态">
            {{ employeeDetail.jobStatusDesc }}
          </el-descriptions-item>
          <el-descriptions-item label="职位">
            {{ employeeDetail.jobPositionName }}
          </el-descriptions-item>
          <el-descriptions-item label="岗位">
            {{ employeeDetail.workPositionName }}
          </el-descriptions-item>
          <el-descriptions-item label="现住地址">
            {{ employeeDetail.address }}
          </el-descriptions-item>
          <el-descriptions-item label="婚姻状态">
            {{ employeeDetail.maritalStatusDesc }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            {{ employeeDetail.statusDesc }}
          </el-descriptions-item>
          <el-descriptions-item label="创建日期">
            {{ formatDate(employeeDetail.addTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="创建用户">
            {{ employeeDetail.addAccountName }}
          </el-descriptions-item>
          <el-descriptions-item label="修改日期">
            {{ formatDate(employeeDetail.modifyTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="修改用户">
            {{ employeeDetail.modifyAccountName }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            {{ employeeDetail.memo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-button
        type="primary"
        v-print="'#EmployeeInfos'"
        class="mt-5 mb-5 float-right"
        ><el-icon class="mr-1"><Printer /></el-icon>打印</el-button
      >
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { EmployeeModel } from "@/api/base/employee/model";
import { getLoginDetail } from "@/api/base/employee";
import { formatDate } from "@/hooks/commFunction";
import { ApiUrl } from "/systemConfig.json";

const employeeDetail = reactive<EmployeeModel>({});

//员工详细
function GetDetail() {
  getLoginDetail()
    .then((data) => {
      Object.assign(employeeDetail, data);
      if (employeeDetail.photoPath) {
        employeeDetail.photoPath = ApiUrl + employeeDetail.photoPath;
      } else {
        employeeDetail.photoPath = "";
      }
    })
    .finally(() => {});
}

onMounted(() => {
  GetDetail();
});
</script>
<style>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
