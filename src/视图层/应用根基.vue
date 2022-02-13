<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="stylus">
html, body, #app {
    width 100%
    height 100%
}

html {
    font-size 20px
}

body {
    margin 0
}

#app {
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    margin 0
}

.form-field {
    cursor pointer
    fonr-family inherit
    font-size inherit
    line-height 1.3rem
    padding 0.25rem
    border-radius 0.25rem

    &:hover {
        background-color #7772
    }

    .field-label-text {
        display inline-block
        vertical-align top
        padding 0.15rem 0.5rem
        line-height 1rem
    }

    .wlc-checkbox {
        display inline-block
        vertical-align top
        width 1rem
        height 1rem
        margin 0.15rem 0 0.15rem 0.35rem
    }
}
</style>
