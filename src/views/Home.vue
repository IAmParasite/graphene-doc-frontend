<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <Sider></Sider>
    <a-layout>
      
      <a-layout-content style="margin: 0 26px;">
        <a-breadcrumb style="margin: 16px 0;text-align: left;">
          <a-breadcrumb-item>User </a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is dead.
        </div>

      </a-layout-content>
      <a-layout-footer style="text-align: center">
        石墨烯文档
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Sider from '../components/common/Sider.vue';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    Sider,
  },
  methods: {
    openNotification() {
      this.$notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
  },
};
</script>
