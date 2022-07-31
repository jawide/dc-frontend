<template>
  <el-card class="flex-grow-[1] flex flex-col" :body-style="{ 'flex-grow': 1 }">
    <template #header>
      <div class="flex flex-row align-middle mb-3">
        <div class="flex-1">
          <el-button @click="back">返回</el-button>
        </div>
        <div class="flex-1 flex justify-center items-center">
          <span>{{ info.name }}</span>
        </div>
        <div class="flex-1">
          <div class="flex flex-row justify-end">
            <el-button class="mr-3" @click="temp">生成临时链接</el-button>
            <el-button-group @click.stop="copy(info.name)">
              <el-button>{{ `dc install ${info.name}` }}</el-button>
              <el-button>复制</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <el-input v-model="info.description" type="textarea" :rows="3"></el-input>
    </template>
    <MonacoEditor class="h-[100%]" language="yaml" :value="content"></MonacoEditor>
  </el-card>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import softwareApi from '@/api/modules/software';
import { SoftwareInfo } from '@/types';

MonacoEditor.render = () => h('div');

const { t } = useI18n();
const router = useRouter();
const clipboard = useClipboard();
const content = ref('');
const info: SoftwareInfo = reactive({
  name: router.currentRoute.value.params.name as string,
  description: '...',
});

softwareApi.select(info.name).then((res) => {
  content.value = res;
});

softwareApi.info(info.name).then((res: SoftwareInfo) => {
  Object.assign(info, res);
});

function back() {
  router.back();
}

function copy(name: string) {
  clipboard.copy(`dc install ${name}`).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success',
    });
  });
}

function temp() {
  softwareApi
    .temp({
      description: info.description,
      content: content.value,
    })
    .then((res) => {
      router.push(`/software/${res.name}`).then(() => {
        info.name = router.currentRoute.value.params.name as string;
      });
    });
}
</script>
