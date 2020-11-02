<template>
    <div class="dialog-wrap">
        <ui-dialog  v-click-outside="onClickOutside" :open.sync="innerShow">
            <div v-if="wikiData[0]" class="wiki-wrap">
                <div class="img-box">
                    <img v-if="wikiData[0].thumbnail && wikiData[0].thumbnail.url" :src="wikiData[0].thumbnail.url" alt="">
                    <div v-else class="image__error"></div>
                </div>
                <div class="cont-wrap">
                    <div class="cont">
                        <div v-if="wikiData[0].title" class="title">{{ wikiData[0].title }}</div>
                        <div v-if="wikiData[0].description" class="desc">{{ wikiData[0].description }}</div>
                        <div v-else v-html="wikiData[0].excerpt" class="excerpt"></div>
                    </div>
                </div>
            </div>
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
        wikiData: {
            type: Array,
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

<style lang="scss" scoped>
    .wiki-wrap {
        display: flex;
        .img-box {
            width: 152px;
            height: 152px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            img {
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
            .image__error {
                width: 100%;
                height: 100%;
                background: #f5f7fa;
            }
        }
        .cont-wrap {
            flex: 1;
            text-align: left;
            align-items: center;
            display: flex;
            .cont {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .title, .desc {
                    width: 100%;
                }
                .title {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 25px;
                    @media screen and (max-width:500px) {
                        margin-bottom: 10px;
                    }
                }
                .desc {
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                }
            }
        }
    }
    .more {
        cursor: pointer;
        color: #2196f3;
    }
    @media screen and (max-width:500px) {
        .wiki-wrap {
             .img-box {
                width: 102px;
                height: 102px;
            }
        }
    }
</style>

<style lang="scss">
    .mu-dialog {
        width: 50%;
        max-width: inherit;
        .mu-dialog-body {
            text-align: right;
            padding: 20px;
        }
    }
    @media screen and (max-width:500px) {
        .mu-dialog {
            width: 85%;
            max-width: inherit;
            .mu-dialog-body {
                text-align: right;
            }
        }
    }
</style>
