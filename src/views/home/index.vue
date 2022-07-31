<template>
  <div class="flex-grow-[17]">
    <el-card v-for="(value, index) in softwareList" :key="index">
      <div class="flex flex-row cursor-pointer" @click="toDetailPage(value)">
        <span class="cursor-pointer hover:text-green-400 flex justify-center items-center">{{ value }}</span>
        <div class="flex-grow-[1]"></div>
        <el-button-group @click.stop="copy(value)">
          <el-button>{{ `dc install ${value}` }}</el-button>
          <el-button>复制</el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import softwareApi from '@/api/modules/software';

const { t } = useI18n();
const softwareList: Array<string> = reactive([]);
const router = useRouter();
const clipboard = useClipboard();

softwareApi.listall().then((res: Array<string>) => {
  softwareList.length = 0;
  softwareList.push(...res);
});

function toDetailPage(name: string) {
  router.push(`/software/${name}`);
}
function copy(name: string) {
  clipboard.copy(`dc install ${name}`).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success',
    });
  });
}
</script>
