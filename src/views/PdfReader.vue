<template>
    <div>
        <pdf :src="pdfContent" :page="pdfpage" @click="pdfnext()"></pdf>
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
            }
                
        },
        mounted() {
            this.init();
        },
        destroyed() {
        },
        methods: {
            init() {

                let bookId = this.$route.params.id
                let from = this.$route.query.from
                this.bookId = bookId
                // TODO
                if (!this.bookId) {
                    return
                }
                if (from === 'self') {
                    bookDb.init(() => {
                            bookDb.getBookSelf(this.bookId, book => {
                            console.log(book)
                            this.pdfContent = book.content;
                        })
                    })
                } else {
                    bookDb.getBook(this.bookId, book => {
                        this.pdfContent = book.content;
                    })
                }
                // bookDb.getBook(this.bookId, book => {
                //     // this.pdfContent = book.content;
                //    console.log(book);
                // })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    @keyframes rotate {
        to { transform: rotate(360deg); }
    }
</style>
