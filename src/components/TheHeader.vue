<template>
  <el-card class="flex flex-row">
    <span class="text-green-400 cursor-pointer" @click="toHome">DC Software</span>
    <div class="flex-grow-[1]"></div>
  </el-card>
</template>

<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();

function toHome() {
  router.push('/');
}
</script>
