<template>
  <el-dialog v-model="dialogShow" width="800px" title="新增员工">
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录账号" prop="loginName">
            <el-input
              v-model="formData.loginName"
              placeholder="请输入登录账号"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工号" prop="jobNumber">
            <el-input v-model="formData.jobNumber" placeholder="请输入工号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构" prop="orgId">
            <el-tree-select
              v-model="formData.orgId"
              :data="orgData"
              default-expand-all
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="formData.birthday"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idNumber">
            <el-input
              v-model="formData.idNumber"
              placeholder="请输入身份证号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭住址" prop="homeAddress">
            <el-input
              v-model="formData.homeAddress"
              placeholder="请输入家庭住址"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="在职状态" prop="jobStatus">
            <el-select v-model="formData.jobStatus" placeholder="请选择状态">
              <el-option
                v-for="item in jobStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位" prop="jobPositionId">
            <el-select
              v-model="formData.jobPositionId"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in dicJobPosition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位" prop="workPositionId">
            <el-select
              v-model="formData.workPositionId"
              placeholder="请选择岗位"
            >
              <el-option
                v-for="item in dicWorkPosition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现住地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入现住地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="省" prop="provinceId">
            <el-input v-model="formData.provinceId" placeholder="请输入省" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="市" prop="cityId">
            <el-input v-model="formData.cityId" placeholder="请输入市" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="区" prop="areaId">
            <el-input v-model="formData.areaId" placeholder="请输入区" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nationalityId">
            <el-select
              v-model="formData.nationalityId"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in dicNationality"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="politicsId">
            <el-select v-model="formData.politicsId" placeholder="请选择状态">
              <el-option
                v-for="item in dicPolitics"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="telephone">
            <el-input v-model="formData.telephone" placeholder="请输入电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="短号" prop="shortNumber">
            <el-input v-model="formData.shortNumber" placeholder="请输入短号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="formData.email" placeholder="请输入电子邮件" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系人" prop="firstContactPerson">
            <el-input
              v-model="formData.firstContactPerson"
              placeholder="请输入紧急联系人"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="紧急联系人电话" prop="firstContactPersonPhone">
            <el-input
              v-model="formData.firstContactPersonPhone"
              placeholder="请输入紧急联系人电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="照片路径" prop="photoPath">
            <el-input
              v-model="formData.photoPath"
              placeholder="请输入照片路径"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学历" prop="qualificationId">
            <el-select
              v-model="formData.qualificationId"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in dicQualification"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业院校" prop="graduateSchool">
            <el-input
              v-model="formData.graduateSchool"
              placeholder="请输入毕业院校"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业" prop="professional">
            <el-input
              v-model="formData.professional"
              placeholder="请输入专业"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同起始日期" prop="contractStartDate">
            <el-date-picker
              v-model="formData.contractStartDate"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同结束日期" prop="contractEndDate">
            <el-date-picker
              v-model="formData.contractEndDate"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职日期" prop="entryDate">
            <el-date-picker
              v-model="formData.entryDate"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转正日期" prop="positiveDate">
            <el-date-picker
              v-model="formData.positiveDate"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期" prop="quitDate">
            <el-date-picker
              v-model="formData.quitDate"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="婚姻状态" prop="maritalStatus">
            <el-select
              v-model="formData.maritalStatus"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in maritalStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
import { addEmployee } from "@/api/base/employee";
import { getDicByGroupId } from "@/api/base/dic";
import { getOrgTreeSelect } from "@/api/base/org";
import { EmployeeAddModel } from "@/api/base/employee/model";
import { SelectModel } from "@/hooks/commModel";

const formData = reactive<EmployeeAddModel>({});
const dataFormRef = ref(ElForm);
const dialogShow = ref(false);
const emit = defineEmits(["handleQueryEvent"]);
const dicNationality = reactive<SelectModel[]>([]);
const dicPolitics = reactive<SelectModel[]>([]);
const dicQualification = reactive<SelectModel[]>([]);
const dicJobPosition = reactive<SelectModel[]>([]);
const dicWorkPosition = reactive<SelectModel[]>([]);
const orgData = reactive<SelectModel[]>([]);

//新增员工提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      addEmployee(formData)
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

//获取select控件的数据
function handleSetDic() {
  getDicByGroupId("nat")
    .then((data) => {
      if (data) {
        dicNationality.push(...data);
      }
    })
    .finally();
  getDicByGroupId("pol")
    .then((data) => {
      if (data) {
        dicPolitics.push(...data);
      }
    })
    .finally();
  getDicByGroupId("qual")
    .then((data) => {
      if (data) {
        dicQualification.push(...data);
      }
    })
    .finally();
  getDicByGroupId("jobp")
    .then((data) => {
      if (data) {
        dicJobPosition.push(...data);
      }
    })
    .finally();
  getDicByGroupId("workp")
    .then((data) => {
      if (data) {
        dicWorkPosition.push(...data);
      }
    })
    .finally();
  getOrgTreeSelect()
    .then((data) => {
      if (data) {
        orgData.push(...data);
      }
    })
    .finally();
}

//验证规则
const rules = reactive({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  idNumber: [
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: "blur",
    },
  ],
  homeAddress: [
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: "blur",
    },
  ],
  jobNumber: [
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: "blur",
    },
  ],
  orgId: [{ required: true, message: "请选择组织机构", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  birthday: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
  jobPositionId: [{ required: true, message: "请选择职位", trigger: "blur" }],
  workPositionId: [{ required: true, message: "请选择岗位", trigger: "blur" }],
  jobStatus: [{ required: true, message: "请选择在职状态", trigger: "blur" }],
  maritalStatus: [
    { required: true, message: "请选择婚姻状态", trigger: "blur" },
  ],
  qualificationId: [{ required: true, message: "请选择学历", trigger: "blur" }],
  politicsId: [{ required: true, message: "请选择政治面貌", trigger: "blur" }],
  nationalityId: [{ required: true, message: "请选择民族", trigger: "blur" }],
});

const maritalStatusOptions = [
  {
    value: 1,
    label: "已婚",
  },
  {
    value: 2,
    label: "未婚",
  },
  {
    value: 3,
    label: "离异",
  },
];

const jobStatusOptions = [
  {
    value: 1,
    label: "在职",
  },
  {
    value: 2,
    label: "离职",
  },
];

const genderOptions = [
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },
];

defineExpose({ dialogShow });

onMounted(() => {
  handleSetDic();
});
</script>
