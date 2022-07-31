<template>
  <el-card class="flex-grow-[1] flex flex-col" :body-style="{ 'flex-grow': 1 }">
    <template #header>
      <div class="flex flex-row align-middle">
        <div class="flex-1">
          <el-button class="flex-1" @click="back">返回</el-button>
        </div>
        <div class="flex-1 flex justify-center items-center">
          <span>{{ name }}</span>
        </div>
        <div class="flex-1"></div>
      </div>
    </template>
    <MonacoEditor class="h-[100%]" language="yaml" :value="content"></MonacoEditor>
  </el-card>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import softwareApi from '@/api/modules/software';

MonacoEditor.render = () => h('div');

const { t } = useI18n();
const router = useRouter();
const { name } = router.currentRoute.value.params;
const content = ref('');

softwareApi.select(name as string).then((res) => {
  content.value = res;
});

function back() {
  router.back();
}
</script>
