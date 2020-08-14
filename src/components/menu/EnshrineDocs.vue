<template>
    <div>    
    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <docCard :docObj="item"></docCard>
      </a-list-item>
    </a-list>
    </div>
</template>
<script type="text/ecmascript-6">
import docCard from '../docs/docCard.vue'
const data = [
  {
    title: '今日头条',
  },
  {
    title: '啊这',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
export default {
  components: {
    docCard,
  },
  data(){
    return {
      data,
    }
  },
  methods: {
    toDocs() {
      this.$router.push('/docs/1');
    }
  }
}
</script><style></style>