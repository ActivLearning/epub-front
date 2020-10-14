<template>
    <div>
        <pdf :src="pdfContent" :page="pdfpage" @click="pdfnext()"></pdf>
        <div class="toast" v-show="toastFlag">{{toast}}</div>
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
                total: 3,
                toastFlag: false,
                toast: '',
                bookId: ''
            }
                
        },
        mounted() {
            this.init()
            this.initEvent()
                   
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
                        console.log(_this.pdfContent)
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
        font-size: 14px
    }
</style>
