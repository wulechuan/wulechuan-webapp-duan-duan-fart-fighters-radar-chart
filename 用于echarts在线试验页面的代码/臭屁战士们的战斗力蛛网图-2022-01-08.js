/* global myChart */

const seriesData = [
    {
        name: '小树懒',
        value: [
            37, // 催屁神豆食量
            83, // 中国吹牛指标
            45.3, // 放屁量指标
            91, // 放屁质量综合指标
            42, // 贪睡
        ],
    },
    {
        name: '大嘴鸭',
        value: [
            62, // 催屁神豆食量
            85, // 中国吹牛指标
            23, // 放屁量指标
            100, // 放屁质量综合指标
            20, // 贪睡
        ],
    },
    {
        name: '肥肥',
        value: [
            89, // 催屁神豆食量
            99, // 中国吹牛指标
            100, // 放屁量指标
            76, // 放屁质量综合指标
            91, // 贪睡
        ],
    },
    {
        name: '端端',
        value: [
            100, // 催屁神豆食量
            100, // 中国吹牛指标
            100, // 放屁量指标
            100, // 放屁质量综合指标
            100, // 贪睡
        ],
    },
    {
        name: '爸爸',
        value: [
            80, // 催屁神豆食量
            80, // 中国吹牛指标
            40, // 放屁量指标
            40, // 放屁质量综合指标
            250, // 贪睡
        ],
    },
    {
        name: '小奶猪',
        value: [
            80, // 催屁神豆食量
            80, // 中国吹牛指标
            80, // 放屁量指标
            50, // 放屁质量综合指标
            100, // 贪睡
        ],
    },
    {
        name: '小奶龙',
        value: [
            100, // 催屁神豆食量
            100, // 中国吹牛指标
            50, // 放屁量指标
            80, // 放屁质量综合指标
            80, // 贪睡
        ],
    },
]

const seriesColors = [
    '#f93', // 小树懒
    '#ca0', // 大嘴鸭
    '#a73', // 肥肥
    '#ff0', // 端端
    '#69d', // 爸爸
    '#f99', // 小奶猪
    '#7c8', // 小奶龙
]

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

let bgIsDark = false

function checkBgDarkness() {
    const options = myChart.getOption()
    const newCheckIsDark = options.darkMode
    return newCheckIsDark === true
}

function getOptions() {
    let label1_TextColor

    let label2_TextColor
    let label2_BgColor

    let radarLineColors
    let radarSplitAreaColors

    let chartBackgroundColor

    if (bgIsDark) {
        chartBackgroundColor = '#333'

        label1_TextColor = label1_OverDarkBg_TextColor

        label2_TextColor = label2_OverDarkBg_TextColor
        label2_BgColor = label2_OverDarkBg_BgColor

        radarLineColors = radarLineColors_OverDarkBg
        radarSplitAreaColors = radarSplitAreaColors_OverDarkBg
    } else {
        chartBackgroundColor = 'transparent'

        label1_TextColor = label1_OverLightBg_TextColor

        label2_TextColor = label2_OverLightBg_TextColor
        label2_BgColor = label2_OverLightBg_BgColor

        radarLineColors = radarLineColors_OverLightBg
        radarSplitAreaColors = radarSplitAreaColors_OverLightBg
    }

    return {
        backgroundColor: chartBackgroundColor,
        animationDuration: 510,
        title: {
            text: '臭 屁 战 士 综 合 战 力 表',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 24,
                color: label1_TextColor,
            },
        },
        legend: {
            data: seriesData.map(i => i.name),
            top: 66,
            selected: seriesAbilities,
        },
        color: seriesColors,
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
                name: '各位战士',
                type: 'radar',
                data: seriesData,
                symbolSize: 9,
                lineStyle: {
                    width: 3,
                },
            },
        ],
    }
}

function doUpdateCharts() {
    const newCheckIsDark = checkBgDarkness()
    if (newCheckIsDark === null) { return }

    // console.log('interval', bgIsDark, newCheckIsDark)
    if (bgIsDark !== newCheckIsDark) {
        bgIsDark = newCheckIsDark
        setTimeout(() => {
            // console.log('interval do')
            myChart.setOption(getOptions())
        }, 450)
    }
}

setInterval(doUpdateCharts, 300)

const seriesAbilities = seriesData.reduce((dict, i) => {
    const seriesName = i.name
    const storageValue = localStorage.getItem(`echarts-series-ability-${seriesName}`)
    dict[seriesName] = storageValue === 'true' // || storageValue === true
    return dict
}, {})

option = getOptions() // eslint-disable-line

myChart.on('legendselectchanged', function (params) {
    const seriesName = params.name
    const isEnabled = params.selected[seriesName]

    const storageEntryKey = `echarts-series-ability-${seriesName}`
    localStorage.setItem(storageEntryKey, isEnabled)
})
