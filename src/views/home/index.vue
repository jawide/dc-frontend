<template>
  <div class="flex-grow-[17]">
    <el-card v-for="(value, index) in softwareList" :key="index">
      <div class="flex flex-row cursor-pointer" @click="toDetailPage(value.name)">
        <span class="hover:text-green-400 flex justify-center items-center mr-5">{{ value.name }}</span>
        <div class="flex-grow-[1] flex-shrink-[1] flex flex-col justify-center overflow-hidden w-0">
          <p class="items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
            {{ value.description }}
          </p>
        </div>
        <el-button-group @click.stop="copy(value.name)">
          <el-button>{{ `dc install ${value.name}` }}</el-button>
          <el-button>复制</el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import softwareApi from '@/api/modules/software';
import { SoftwareInfo } from '@/types';

const { t } = useI18n();
const softwareList: Array<SoftwareInfo> = reactive([]);
const router = useRouter();
const clipboard = useClipboard();

softwareApi.listall().then((res: Array<string>) => {
  softwareList.length = 0;
  res.forEach((v) => {
    softwareApi.info(v).then((res2) => {
      softwareList.push(res2);
      softwareList[softwareList.length - 1].name = v;
    });
  });
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
