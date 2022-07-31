<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = zhCn;
</script>

<template>
  <el-container class="h-[100%]">
    <el-header style="padding: 0 !important">
      <TheHeader></TheHeader>
    </el-header>
    <el-main class="flex-grow-[1] flex">
      <div class="flex-grow-[1] flex">
        <el-config-provider :locale="locale">
          <router-view></router-view>
        </el-config-provider>
      </div>
    </el-main>
    <el-footer>
      <TheFooter></TheFooter>
    </el-footer>
  </el-container>
</template>
