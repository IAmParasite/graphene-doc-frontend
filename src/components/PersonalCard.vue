<template>
  <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
    <a-card style="width:80%;height:80%;margin:100px auto;">
      <div style="width: 100%">
        <a-tabs default-active-key="1" tab-position="left">
        <a-tab-pane key="1" tab="账号信息">
          <InfoSetting></InfoSetting>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">
          Content of Tab 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
          Content of Tab 3
        </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import InfoSetting from './PersonalCard/InfoSetting.pane.vue'

export default {
  name: 'PersonalCard',

  components: {
    InfoSetting,
  }
}
</script>