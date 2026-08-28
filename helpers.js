// helpers.js - 使用 IndexedDB 存储和读取数据

// 打开（或创建）一个名为 'HistoryAppDB' 的数据库
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('HistoryAppDB', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // 创建一个名为 'appState' 的对象仓库来存储数据
            if (!db.objectStoreNames.contains('appState')) {
                db.createObjectStore('appState', { keyPath: 'id' });
            }
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// 保存数据
export async function saveData(key, value) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['appState'], 'readwrite');
        const store = transaction.objectStore('appState');
        const request = store.put({ id: key, value: value });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// 读取数据
export async function loadData(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['appState'], 'readonly');
        const store = transaction.objectStore('appState');
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result ? request.result.value : null);
        request.onerror = () => reject(request.error);
    });
}
