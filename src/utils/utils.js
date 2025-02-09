// @/utils/utils.js

function deepClone(obj) {
    // 处理基本数据类型
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 处理日期对象
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // 处理数组
    if (Array.isArray(obj)) {
        const arr = [];
        for (let i = 0; i < obj.length; i++) {
            arr[i] = deepClone(obj[i]);
        }
        return arr;
    }

    // 处理对象
    if (obj instanceof Object) {
        const objClone = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                objClone[key] = deepClone(obj[key]);
            }
        }
        return objClone;
    }

    // 其他情况返回原对象
    return obj;
}

export { deepClone };
