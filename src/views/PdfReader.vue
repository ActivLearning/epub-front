<template>
    <div>
        <pdf :src="pdfContent" :page="pdfpage" @click="pdfnext()"></pdf>
        <div class="toast" v-show="toastFlag">{{toast}}</div>
        <div class="pageNum">{{pdfpage}}/{{total}}</div>
        <div id="prev" class="arrow" @click="prev" v-if="!isMobile">‹</div>
        <div id="next" class="arrow" @click="next" v-if="!isMobile">›</div>
    </div>
</template>

<script>
    /* eslint-disable2 */
    import pdf from 'vue-pdf'
    import bookDb from '../util/bookDb2'

    export default {
        components: {
            pdf
        },
        data () {
            return {
                pdfpage: 1,
                pdfContent: '',
                total: 1,
                toastFlag: false,
                toast: '',
                bookId: '',
                isMobile: false,
            }
                
        },
        mounted() {
            this.init()
            this.initEvent()
            this.isMobile = !!this._isMobile()
            console.log(this.isMobile);
                   
        },
        destroyed() {
        },
        methods: {
            init() {
                let bookId = this.$route.params.id
                let from = this.$route.query.from
                this.bookId = bookId
                let _this = this
                // TODO
                if (!this.bookId) {
                    return
                }
                bookDb.init(() => {
                    bookDb.getBookSelf(this.bookId, book => {  
                        _this.pdfContent = book.content;
                        let newPdf = pdf.createLoadingTask(_this.pdfContent)
                        newPdf.promise.then(pdf => {
                            _this.total = pdf.numPages
                            console.log(pdf.numPages)
                        });
                    })
                })
                
            },
            initEvent() {
                let touchStartX
                let touchStartTime
                let _this = this
                document.addEventListener('touchstart', function (event) {
                    touchStartX = event.changedTouches[0].clientX
                    touchStartTime = event.timeStamp
                })
                document.addEventListener('touchend', function (event) {
                    const offsetX = event.changedTouches[0].clientX - touchStartX
                    const time = event.timeStamp - touchStartTime
                    if (time < 500 && offsetX > 40) {
                        _this.prev()
                    } else if (time < 500 && offsetX < -40) {
                        _this.next()
                    }
                    event.stopPropagation()
                })  
            },
            prev() {
                if(this.pdfpage > 1) {
                    this.pdfpage--
                } else {
                    this.showToast('This is the first page.')
                } 
            },
            next() {
                if(this.pdfpage < this.total) {
                    this.pdfpage++    
                } else {
                    this.showToast('This is the last page.')
                }
            },
            _isMobile() {
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag
            },
            showToast(txt ,time = 2000) {
                this.toastFlag = true
                this.toast = txt
                setTimeout(() => {
                     this.toastFlag = false
                 } ,time)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    @keyframes rotate {
        to { transform: rotate(360deg); }
    }
    .toast{
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        background: rgba(0, 0, 0, 0.8);
        padding: 8px 20px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 99;
    }
    .pageNum{
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: #999;
        z-index: 99;
    }
    #prev {
        left: 28px;
    }

    #next {
        right: 28px;
    }

    .arrow {
        position: absolute;
        top: 50%;
        margin-top: -32px;
        font-size: 64px;
        color: #E2E2E2;
        font-family: arial, sans-serif;
        font-weight: bold;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        &:hover {
            color: #777;
        }
        &:active {
            color: #000;
        }
    }
</style>
