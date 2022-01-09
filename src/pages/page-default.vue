<template>
    <div class="page page--default">
        <DuanDuanFartFightersCharts></DuanDuanFartFightersCharts>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DuanDuanFartFightersCharts from '@/components/duan-duan-fart-fighters-charts.vue'

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
