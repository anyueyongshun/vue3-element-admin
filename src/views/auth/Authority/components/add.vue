<template>
  <el-dialog v-model="dialogShow" width="400px" title="新增权限">
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="权限码" prop="code">
            <el-input v-model="formData.code" placeholder="请输入权限码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="启用权限" prop="IsAuth">
            <el-switch v-model="formData.isAuth" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="排序" prop="order">
            <el-input-number v-model="formData.order" :min="1" :max="100" />
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
import { addAuthority } from "@/api/auth/authority";
import { AuthorityAddModel } from "@/api/auth/authority/model";

const formData = reactive<AuthorityAddModel>({ order: 1 });
const dataFormRef = ref(ElForm);
const dialogShow = ref(false);
const emit = defineEmits(["handleQueryEvent"]);

const props = defineProps({
  pId: {
    type: String,
    default: () => {
      return "";
    },
  },
});

//新增权限提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      addAuthority(formData)
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
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  code: [
    { required: true, message: "请输入编码", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 20,
      message: "请输入1-20个字符",
      trigger: ["blur", "change"],
    },
  ],
  memo: [
    {
      required: false,
      min: 0,
      max: 100,
      message: "最多输入100个字符",
      trigger: ["blur", "change"],
    },
  ],
});

defineExpose({ dialogShow });

watch(
  () => props.pId,
  (newVal: string) => {
    formData.parentId = props.pId;
  }
);

onMounted(() => {});
</script>
