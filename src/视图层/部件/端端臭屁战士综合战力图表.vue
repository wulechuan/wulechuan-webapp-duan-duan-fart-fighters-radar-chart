<template>
    <div class="duan-duan-fart-fighters-charts">
        <vue-echarts
            class="the-echarts-component"
            :class="chartsRootCSSClassNames"
            :echarts-creator="echartsCreator"
            :echarts-options="echartsOptions"
            @legendselectchanged="echartsHandleLegendSelectChange"
        ></vue-echarts>

        <div class="operations">
            <label class="form-field">
                <input type="checkbox" v-model="echartsThemeIsDark" class="wlc-checkbox" @change="handleOperationChange_ThemeDarkMark">
                <span class="field-label-text">采用深色主题</span>
            </label>

            <div class="rank-board">
                <h4>综合评定榜</h4>

                <hr>

                <ol class="rank-list">
                    <li
                        v-for="(character, arrayIndex) in 各臭屁战士之战力_已排序"
                        :key="`${arrayIndex + 1}-${character.name}`"
                    >
                        <span
                            class="label"
                            :style="{ color: character.color }"
                        >{{ character.name }}：</span><span class="value">{{ character.areaString }}</span>
                    </li>
                </ol>
            </div>

            <a href="https://echarts.apache.org/zh/option.html" target="_blank">《ECharts 文档》</a>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import EChartsVue2Component from '@wulechuan/echarts-vue2-component'
import * as echarts from 'echarts'

import type {
    EChartOption,
} from 'echarts'

import { Component, Vue } from 'vue-property-decorator'

interface TEchartsEventObject1 {
    /** Event type */
    type: string;

    /** Echarts series data name */
    name: string;
}

interface TEchartsEventObject_LegendSelectChange extends TEchartsEventObject1 {
    selected: { [seriesName: string]: boolean; };
}






const label1_OverDarkBg_TextColor = '#ffffff'
const label1_OverLightBg_TextColor = '#000000'

const label2_OverDarkBg_TextColor = '#000000'
const label2_OverDarkBg_BgColor = '#ffffff'
const label2_OverLightBg_TextColor = '#ffffff'
const label2_OverLightBg_BgColor = '#000000'

const radarLineColors_OverDarkBg = ['#ffffff30']
const radarSplitAreaColors_OverDarkBg = ['#ffffff09', '#ffffff03']

const radarLineColors_OverLightBg = ['#00000020']
const radarSplitAreaColors_OverLightBg = ['#00000009', '#00000003']



import { 各臭屁战士之战力, 各臭屁战士之战力综合值表 } from '@/数据/各臭屁战士之战力'
import { 各臭屁战士之图表元素之配色 } from '@/数据/各臭屁战士之图表元素之配色'





@Component({
    components: {
        'vue-echarts': EChartsVue2Component,
    },
})
export default class DuanDuanFartFightersCharts extends Vue {
    echartsCreator = echarts
    // echartsOptions = null
    echartsThemeIsDark = localStorage.getItem('charts-theme-is-dark') === 'true'
    chartTitleText = '臭 屁 战 士 综 合 战 力 图 表'

    mounted (): void {
        document.title = this.chartTitleText.replace(/\s+/g, '')
    }

    get 各臭屁战士之战力_已排序 (): Array<(typeof 各臭屁战士之战力[number]) & {
        areaString: string;
        color: string;
    }> {
        return 各臭屁战士之战力.map((characterData, index) => {
            return {
                ...characterData,
                areaString: characterData.area.toFixed(2),
                color: 各臭屁战士之图表元素之配色[index],
            }
        }).sort((甲, 乙) => 乙.area - 甲.area)
    }

    get chartsRootCSSClassNames (): { [cssClassName: string]: any; } {
        return {
            'theme-is-dark': this.echartsThemeIsDark,
        }
    }

    get echartsOptions (): { [key: string]: any; } {
        const {
            echartsThemeIsDark,
            chartTitleText,
        } = this

        const seriesAbilities = 各臭屁战士之战力.reduce((dict, i) => {
            const seriesName = i.name
            const storageValue = localStorage.getItem(`echarts-series-ability-${seriesName}`)
            dict[seriesName] = storageValue === 'true' // || storageValue === true
            return dict
        }, {} as { [seriesName: string]: boolean; })

        let legendInactiveItemColor
        let label1_TextColor

        let label2_TextColor
        let label2_BgColor

        let radarLineColors
        let radarSplitAreaColors

        if (echartsThemeIsDark) {
            legendInactiveItemColor = '#555'
            label1_TextColor = label1_OverDarkBg_TextColor

            label2_TextColor = label2_OverDarkBg_TextColor
            label2_BgColor = label2_OverDarkBg_BgColor

            radarLineColors = radarLineColors_OverDarkBg
            radarSplitAreaColors = radarSplitAreaColors_OverDarkBg
        } else {
            legendInactiveItemColor = '#ddd'
            label1_TextColor = label1_OverLightBg_TextColor

            label2_TextColor = label2_OverLightBg_TextColor
            label2_BgColor = label2_OverLightBg_BgColor

            radarLineColors = radarLineColors_OverLightBg
            radarSplitAreaColors = radarSplitAreaColors_OverLightBg
        }

        const echartsOptions: EChartOption = {
            // darkMode: echartsThemeIsDark,
            backgroundColor: 'transparent',
            animationDuration: 510,

            title: {
                text: chartTitleText,
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 24,
                    color: label1_TextColor,
                },
            },

            legend: {
                data: 各臭屁战士之战力.map(i => i.name),
                top: 66,
                selected: seriesAbilities,
                inactiveColor: legendInactiveItemColor,
                textStyle: {
                    color: label1_TextColor,
                },
            },

            color: 各臭屁战士之图表元素之配色,

            radar: {
                shape: 'circle',
                radius: '50%',
                center: ['50%', '60%'],
                indicator: [
                    { name: '催屁神豆食量', max: 100 },
                    { name: '中国吹牛指标', max: 100 },
                    { name: '放屁量指标', max: 100 },
                    { name: '放屁质量综合指标', max: 100 },
                    { name: '贪睡指标', max: 100 },
                ],
                nameGap: 51,
                axisName: {
                    fontSize: 17,
                    lineHeight: 25,
                    padding: [6, 10, 3, 10],
                    color: label2_TextColor,
                    backgroundColor: label2_BgColor,
                    borderRadius: 5,
                },
                axisLine: {
                    lineStyle: {
                        color: radarLineColors,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: radarLineColors,
                    },
                },
                splitArea: {
                    areaStyle: {
                        color: radarSplitAreaColors,
                    },
                },
            },

            series: [
                {
                    name: '各位臭屁战士的数据',
                    type: 'radar',

                    data: 各臭屁战士之战力,

                    symbolSize: 9,

                    lineStyle: {
                        width: 3,
                    },
                },
            ],

            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.86)',
                borderWidth: 2,

                formatter (param) {
                    const { name, color } = param as { name: string; color: string; [x: string]: any; }
                    const areaText: string = 各臭屁战士之战力综合值表[name].toFixed(2)
                    return `<p class="echarts-tooltip-single-row"><span class="label" style="color: ${color};">${
                        name
                    }：</span><span class="value">${
                        areaText
                    }</span><span class="value-unit">哩咯哢能量</span></p>`
                },
            },
        }

        return echartsOptions
    }

    handleOperationChange_ThemeDarkMark (event: InputEvent): void {
        if (!event.target) { return }
        const inputElement = event.target as HTMLInputElement
        localStorage.setItem('charts-theme-is-dark', `${inputElement.checked}`)
    }

    echartsHandleLegendSelectChange (eventObject: TEchartsEventObject_LegendSelectChange): void {
        const seriesName = eventObject.name
        const isEnabled = eventObject.selected[seriesName]

        const storageEntryKey = `echarts-series-ability-${seriesName}`
        localStorage.setItem(storageEntryKey, `${isEnabled}`)
    }
}
</script>

<style lang="stylus">
.duan-duan-fart-fighters-charts {
    padding 1.5rem
    display flex
    flex-direction row
    justify-content center
    align-items stretch
    overflow hidden
    box-sizing border-box
    width 100%
    height 100%

    .operations,
    .the-echarts-component {
        box-sizing border-box
        border-radius 0.5rem
        box-shadow 0 0 0.75rem 0 rgba(black, 0.219)
    }

    .operations {
        position relative
        flex 0 0 17rem
        margin-left 1rem
        padding .5rem 1rem 2.5rem
        border-style solid
        border-width 1px
        border-color black
        background-color #eee

        label {
            margin 0.5rem 0
            display block
        }

        a {
            position absolute
            left 0
            right 0
            bottom 0
            margin 0.75rem auto
            text-align center
            background-color #ccc
            padding 0.5rem 1rem
            text-decoration none
        }
    }

    .the-echarts-component {
        flex 1 1 auto
        padding 1rem
        border-style solid
        border-width 1px
        border-color black

        &.theme-is-dark {
            background-color #222
        }
    }

    .echarts-tooltip-single-row {
        margin 0
        width 18em
        padding 0 0 0 0.5em

        > .label,
        > .value,
        > .value-unit {
            display inline-block
        }

        > .label {
            width 8em
            text-align left
        }

        > .value {
            color white
            width 3em
            text-align right
            margin 0 1em 0 0.5em
        }

        > .value-unit {
            width 6em
            text-align left
        }
    }

    .rank-board {
        border-radius 0.5em
        font-size 0.85em
        padding 0.2rem
        color #666
        background-color #111
        cursor default

        h4 {
            font-size 1rem
            color white
            text-align center
            margin 1em 0
            letter-spacing 0.5em
            text-indent 0.5em
        }

        hr {
            border-width 0
            margin 1em 0 0.5em
            height 1px
            background-color #fff3
        }
    }

    .rank-list {
        margin 0
        padding 0.5em 0.5em 1em 3em

        > li {
            margin 0.25em 0
            padding 0.5em 0.5em
            white-space nowrap
            border-radius 0.3em

            > .label,
            > .value {
                display inline-block
            }

            > .label {
                width 6.5em
                margin 0 0.5em
            }

            > .value {
                width 5em
                margin 0 0.5em 0 0
                text-align right
                color white
            }

            &:hover {
                background-color rgba(white, 0.15)
            }
        }
    }
}
</style>
