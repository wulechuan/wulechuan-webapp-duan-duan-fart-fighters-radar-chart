export const 各臭屁战士之战力 = [
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
    {
        name: '小黄',
        value: [
            80, // 催屁神豆食量
            100, // 中国吹牛指标
            100, // 放屁量指标
            100, // 放屁质量综合指标
            69, // 贪睡
        ],
    },
    {
        name: '鸡鸭鸭',
        value: [
            60, // 催屁神豆食量
            100, // 中国吹牛指标
            20, // 放屁量指标
            60, // 放屁质量综合指标
            86, // 贪睡
        ],
    },
    {
        name: '老霸（老师）',
        value: [
            120, // 催屁神豆食量
            100, // 中国吹牛指标
            100, // 放屁量指标
            150, // 放屁质量综合指标
            100, // 贪睡
        ],
    },
    {
        name: '龙龟（老师）',
        value: [
            100, // 催屁神豆食量
            100, // 中国吹牛指标
            150, // 放屁量指标
            120, // 放屁质量综合指标
            100, // 贪睡
        ],
    },
].map(characterData => {
    return {
        ...characterData,
        area: calculateAreaForSingleCharacter(characterData.value),
    }
})

export const 各臭屁战士之战力综合值表 = 各臭屁战士之战力.reduce((dict, characterData) => {
    const { name, area } = characterData
    dict[name] = area
    return dict
}, {} as { [characterName: string]: number; })



export function calculateAreaForSingleCharacter (values: number[]): number {
    const valuesCount = values.length
    const singleAngleInDegrees = 360 / valuesCount
    const singleAngleInArc = singleAngleInDegrees * Math.PI / 180

    const values2 = values.concat([
        values[0],
    ])

    const area = values.reduce((A, v, i) => {
        const edge1 = v / 10
        const edge2 = values2[i + 1] / 10
        const _a = edge1 * edge2 * Math.sin(singleAngleInArc) * .5
        return A + _a
    }, 0)

    return area
}
