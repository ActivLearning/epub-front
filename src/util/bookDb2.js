/* eslint-disable */

let g_store

class BookDb {

    constructor() {
        this.DB_NAME = 'dbName'
        this.OBJECT = 'Book'
    }

    init(cb) {
        var request = indexedDB.open('eBookDB.db', 1);  // 打开 dbName 数据库
        request.onerror = function(e){              // 监听连接数据库失败时执行
            console.log('连接数据库失败');
        }
        request.onsuccess = function(e){            // 监听连接数据库成功时执行
            console.log('连接数据库成功');
        }

        request.onupgradeneeded = e => {
            var db = e.target.result;
            db.createObjectStore(this.OBJECT, {keyPath: 'id', autoIncrement: false});
            console.log('创建对象仓库成功');
        }

        request.onsuccess = e => {
            var db = e.target.result;
            var tx = db.transaction(this.OBJECT,'readwrite');
            g_store = tx.objectStore(this.OBJECT);
            cb && cb()
        }
    }

    init2() {
        var value = {
            'id': '2',
            'userName': 'asd',
            'age': 24
        }
        var req1 = g_store.put(value);        // 保存数据

        var req2 = g_store.get('2');            // 获取索引userId为1的数据
        req2.onsuccess = function(){
            // console.log(this.result);    // linxin
        }

        var req3 = g_store.delete('2');             // 删除索引为1的数据
        req3.onsuccess = function(){
            console.log('删除数据成功');        // 删除数据成功
        }
    }

    getBooks(cb) {
        var req = g_store.openCursor();
        var result = [];

        req.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            } else {
                cb && cb(result)
            }
        }
    }

    getBookSelf(id, cb) {
        let req = g_store.get(id)
        req.onsuccess = e => {
            console.log('getBook')
            console.log(e.target.result)
            cb && cb(e.target.result)
        }
    }

    // 从 dart 写入的读取
    getBook(id, cb) {
        console.log(id);
        var request = window.indexedDB.open('eBookDB.db', 1);
        var db;

        request.onsuccess = function (event) {
            db = request.result;
            console.log('数据库打开成功');
            function read() {
                var transaction = db.transaction(['Book']);
                var objectStore = transaction.objectStore('Book');
                var request = objectStore.get(id);

                request.onerror = function(event) {
                    console.log('事务失败');
                };

                request.onsuccess = function( event) {
                    console.log(id);
                    if (request) {
                        console.log(event.target.result);
                        let arrayBuffer = event.target.result.content.buffer; 
                        cb(arrayBuffer);
                    } else {
                        console.log('未获得数据记录');
                    }
                };
            }

            read();
        };
    }

    getBookDart(id, cb) {
        console.log('id: ', id);
        var req = g_store.openCursor();
        var result = [];

        req.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                result.push(cursor.value);
                cursor.continue();
            } else {
                console.log(result[0]);
                let arrayBuffer = result[0].content.buffer; 

                cb && cb({
                    content: arrayBuffer
                })
            }
        }
    }  

    addBook(book, cb) {
        let req = g_store.put(book)
        req.onsuccess = () => {
            console.log('保存成功')
            cb && cb()
        }
    }

    deleteBook(id, cb) {
        let req = g_store.delete(id)
        req.onsuccess = () => {
            console.log('删除数据成功')
            cb && cb()
        }
    }
}

let db = new BookDb()

export default db
