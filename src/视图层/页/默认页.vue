<template>
    <div class="page page--default">
        <DuanDuanFartFightersCharts></DuanDuanFartFightersCharts>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DuanDuanFartFightersCharts from '@/视图层/部件/端端臭屁战士综合战力图表.vue'

@Component({
    components: {
        DuanDuanFartFightersCharts,
    },
})
export default class PageDefault extends Vue {}
</script>

<style lang="stylus">
.page--default {
    width 100%
    height 100%
}
</style>
