export default function (router) {
    router.beforeEach((to, from, next) => {
        next()
    })

    router.afterEach((to) => {
        if (to.meta.title) {
            document.title = to.meta.title
        }
    })
}
