<template>
  <el-dialog v-model="dialogShow" width="600px" title="新增菜单">
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="路由" prop="routePath">
            <el-input v-model="formData.routePath" placeholder="请输入路由" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="URL" prop="url">
            <el-input v-model="formData.url" placeholder="请输入URL" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="打开方式" prop="target">
            <el-select v-model="formData.target" placeholder="请选择状态">
              <el-option
                v-for="item in targetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="order">
            <el-input-number v-model="formData.order" :min="1" :max="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入图标" />
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
import { addMenu } from "@/api/auth/menu";
import { MenuAddModel } from "@/api/auth/menu/model";

const formData = reactive<MenuAddModel>({ order: 1 });
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

//新增菜单提交
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      addMenu(formData)
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
  routePath: [
    { required: true, message: "请输入路由", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 50,
      message: "请输入1-50个字符",
      trigger: ["blur", "change"],
    },
  ],
  url: [
    { required: true, message: "请输入URL", trigger: "blur" },
    {
      required: true,
      min: 1,
      max: 100,
      message: "请输入1-100个字符",
      trigger: ["blur", "change"],
    },
  ],
  target: [{ required: true, message: "请选择打开方式", trigger: "blur" }],
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

const targetOptions = [
  {
    value: "_blank",
    label: "_blank",
  },
  {
    value: "_self",
    label: "_self",
  },
  {
    value: "_parent",
    label: "_parent",
  },
  {
    value: "_top",
    label: "_top",
  },
];

defineExpose({ dialogShow });

watch(
  () => props.pId,
  (newVal: string) => {
    formData.parentId = props.pId;
  }
);

onMounted(() => {});
</script>
