<template>
    <div class="dialog-wrap">
        <ui-dialog  v-click-outside="onClickOutside" :open.sync="innerShow">
            <iframe 
                frameborder="0"
                scrolling="no" 
                class="iframeWrap"
                id="iframeDialog"
                :src="wikiSrc">
            </iframe>
            <a @click="openWiki" class="more">more ></a>
        </ui-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

export default {
    name: 'DialogWiki',

    props: {
        wikiSrc: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            innerShow: this.show,
        };
    },

    watch: {
        show(value) {
            this.innerShow = value
        },
        innerShow(value) {
            this.$emit('update:show', value)
        },
    },

    methods: {
        openWiki() {
            this.closeDialog()
            window.open(this.wikiSrc)
        },
        onClickOutside() {
            this.closeDialog()
        },
        openDialog() {
            this.innerShow = true
        },
        closeDialog() {
            this.innerShow = false
        }
    }
};
</script>

<style lang="scss">
    .mu-dialog {
        max-width: inherit;
        .mu-dialog-body {
            text-align: right;
        }
    }
</style>
<style lang="scss" scoped>
    .iframeWrap {
        border: none;
        width: 100%;
        height: 50vh;
    }
    .more {
        cursor: pointer;
        color: #2196f3;
    }
</style>
