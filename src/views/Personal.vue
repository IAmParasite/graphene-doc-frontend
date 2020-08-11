<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout>
      
      <a-layout-content style="margin: 0 26px;">
        <a-breadcrumb style="margin: 16px 0;text-align: left;">
          <a-breadcrumb-item>User </a-breadcrumb-item>
          <a-breadcrumb-item>个人信息设置</a-breadcrumb-item>
        </a-breadcrumb>
        <!--个人信息卡片-->
        <PersonalCard></PersonalCard>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        石墨烯文档
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import PersonalCard from '../components/PersonalCard.vue'

export default {
    name: 'Personal',

    components: {
      PersonalCard,
    }
}
</script>