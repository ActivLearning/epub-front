// 监听选中文本
document.addEventListener('mouseup', function (e) {
    var sel = window.getSelection()
    if (!sel.isCollapsed && true) selected(e) // TODO
    else window.parent.document.getElementById('select-menu').style.visibility = 'hidden'
})
var u = navigator.userAgent
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
if (isAndroid) {
    document.addEventListener('touchcancel', function (e) {
        handleAddEvent(e)
    })
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault()
    })
} else {
    document.addEventListener('touchend', function (e) {
        handleAddEvent(e)
    })
}

function handleAddEvent(e) {
    var sel = window.getSelection()
    if (!sel.isCollapsed) touchSelected(e)
    else window.parent.document.getElementById('select-menu').style.visibility = 'hidden'
}
// 选中文本后的事件处理程序
function selected(e) {
    var x = e.clientX,
        y = e.clientY,
        menu = window.parent.document.getElementById('select-menu'),
        wrap = window.parent.document.getElementById('wrapper'),
        menuHeight = window.parent.document.defaultView.getComputedStyle(menu, null).height,
        menuWidth = window.parent.document.defaultView.getComputedStyle(menu, null).width,
        wrapHeight = window.parent.document.defaultView.getComputedStyle(wrap, null).height,
        wrapWidth = window.parent.document.defaultView.getComputedStyle(wrap, null).width,
        screenHeight = window.parent.screen.availHeight,
        screenWidth = window.parent.screen.availWidth

    menuHeight = parseInt(menuHeight)
    menuWidth = parseInt(menuWidth)
    wrapHeight = parseInt(wrapHeight)
    wrapWidth = parseInt(wrapWidth)

    if ((screenWidth - x) < menuWidth) {
        menu.style.left = x - menuWidth + 'px'
    } else {
        menu.style.left = x > wrapWidth ? wrapWidth - menuWidth + 'px' : Math.abs(x) + 'px'
    }
    if ((screenHeight - y) < menuHeight) {
        menu.style.top = y - menuHeight + 'px'
    } else {
        menu.style.top = y > wrapHeight ? wrapHeight - menuHeight + 'px' : Math.abs(y) + 'px'
    }

    menu.style.visibility = 'visible'
}
// 移动端选中处理
function touchSelected(e) {
    var x = e.changedTouches[0].clientX,
        y = e.changedTouches[0].clientY,
        menu = window.parent.document.getElementById('select-menu'),
        menuHeight = window.parent.document.defaultView.getComputedStyle(menu, null).height,
        menuWidth = window.parent.document.defaultView.getComputedStyle(menu, null).width,
        screenHeight = window.innerHeight, // 视口高度
        screenWidth = window.parent.screen.availWidth
    // alert(window.screen.availHeight);
    menuHeight = parseInt(menuHeight)
    menuWidth = parseInt(menuWidth)

    if ((screenWidth - x) > menuWidth) {
        menu.style.left = x + 'px'
    } else {
        menu.style.left = screenWidth - menuWidth + 'px'
    }
    if ((menuHeight + y) < screenHeight) {
        menu.style.top = y + 40 + 'px'
    } else {
        menu.style.top = y - 40 - menuHeight + 'px'
    }

    menu.style.visibility = 'visible'
}

// 解决复制粘贴问题的 hack
document.addEventListener('keydown', function (e) {
    var key = e.keyCode || e.which
    if (key === 67 && e.ctrlKey) {
        document.execCommand('copy', false, null)
    }
})

document.addEventListener('click', function (e) {
    console.log('e: ', e);
    if (e && e.target && e.target.nodeName === 'IMG') {
        parent.window.setImageSrc(e.target.currentSrc)
    } else if (e && e.target && e.target.nodeName === 'image') {
        parent.window.setImageSrc(e.target.href.baseVal)
    }
})
