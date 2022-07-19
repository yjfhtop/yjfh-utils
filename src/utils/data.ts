// 数据处理

// 数据类型
export type DataType =
    | 'Object'
    | 'Array'
    | 'Function'
    | 'Null'
    | 'Number'
    | 'String'
    | 'Boolean'
    | 'Undefined'
    | 'Symbol'
    | 'File'
    | 'Date'
    | 'RegExp';

/**
 * 获取数据类型
 * @param data
 * @returns {string}  Object  Array Function Null ....
 */
export function getDataType(data: any): DataType {
    const typeStr = Object.prototype.toString.call(data);
    let useTypeStr = typeStr.slice(8);
    useTypeStr = useTypeStr.slice(0, useTypeStr.length - 1);
    return useTypeStr as DataType;
}

/**
 * 尝试将 字符 转为 js使用的类型， 如果转换不成功，返回原数据
 * @param data
 * @returns {*}
 */
export function tryStrParse<T = string>(data: string): T {
    let target = data;
    try {
        target = JSON.parse(data);
    } catch (e) {
        // pass
    }
    return target as any;
}

/**
 * 深度克隆, 只对常用类型做了拷贝处理（见 switch）
 * @param data
 * @returns {*|{}}
 */
export function deepCopy<T>(data: T): T {
    // 存储引用数据, 用于判断是否有循环引用
    const reMap = new Map();

    function copy(orgData: any): T {
        const typeStr = getDataType(orgData);

        const useData = orgData;
        let newData: any = [];
        switch (typeStr) {
            case 'Array':
            case 'Object':
                // 处理循环引用 s
                if (reMap.has(orgData)) {
                    return reMap.get(orgData);
                }
                // 处理循环引用 e
                if (typeStr === 'Array') {
                    newData = [];
                    // 处理循环引用 s
                    reMap.set(orgData, newData);
                    // 处理循环引用 e
                    for (let i = 0; i < useData.length; i++) {
                        newData[i] = copy(useData[i]);
                    }
                } else {
                    newData = {};
                    // 处理循环引用 s
                    reMap.set(orgData, newData);
                    // 处理循环引用 e
                    Object.keys(useData).forEach((key) => {
                        newData[key] = copy(useData[key]);
                    });
                }
                return newData;
            case 'Boolean':
            case 'Function':
            case 'Null':
            case 'Number':
            case 'String':
            case 'Undefined':
                return orgData;
            default:
                return orgData;
        }
    }

    return copy(data);
}

/**
 * 合并数据, 只有新旧数据都是 obj 类型才生效(key 对应的 value 也是这样)， 否则，一直返回新数据
 * @param oldData
 * @param newData
 * @param copy 是否copy数据， 脱离引用
 */
export function mergeData<T>(oldData: T, newData: T, copy = true): T {
    let useOld = oldData;
    let useNew = newData;
    if (copy) {
        useOld = deepCopy(oldData);
        useNew = deepCopy(newData);
    }
    function merge(oldD: T, newD: T) {
        const cOldData = oldD;
        const oldTypeStr = getDataType(cOldData);
        const newTypeStr = getDataType(newD);

        if (newTypeStr === 'Object' && oldTypeStr === 'Object') {
            Object.keys(newD).forEach((key) => {
                if ((newD as any)[key] !== undefined) {
                    (cOldData as any)[key] = merge((cOldData as any)[key], (newD as any)[key]);
                }
            });
            return cOldData;
        }
        if (newD === undefined) {
            return cOldData;
        }
        return newD;
    }
    return merge(useOld, useNew);
}

/**
 * 判断数据是否相同， 引用类型不是判断引用， 而是判断值， 注意， 值对case 的类型进行了判断， 如果在类型外，直接返回 false
 * 注意, 注意， 注意： 没有对循环 引用做处理
 * @param data1
 * @param data2
 * @returns {boolean}
 */
export function isEq(data1: any, data2: any): boolean {
    const data1Type = getDataType(data1);
    const data2Type = getDataType(data2);
    if (data1Type !== data2Type) return false;

    switch (data1Type) {
        case 'Boolean':
        case 'Function':
        case 'Null':
        case 'Number':
        case 'String':
        case 'Undefined':
        case 'Symbol':
            return Object.is(data1, data2);
        case 'Array':
            if (data1.length !== data2.length) return false;
            if (data1.length === 0) return true;

            return !data1.some((item: any, index: number) => {
                const data2Item = data2[index];
                const eq = isEq(item, data2Item);
                return !eq;
            });
        case 'Object':
            // 如果想要 对 Symbol 等类型比较，请使用 Reflect.ownKeys
            // eslint-disable-next-line no-case-declarations
            const data1KeyArr = Object.keys(data1);
            // eslint-disable-next-line no-case-declarations
            const data2keyArr = Object.keys(data2);

            if (data1KeyArr.length !== data2keyArr.length) return false;
            if (data2keyArr.length === 0) return true;

            return !data1KeyArr.some((key) => {
                const item1 = data1[key];
                const item2 = data2[key];

                const eq = isEq(item1, item2);
                return !eq;
            });

        // file 一般不可比较， 这里做一些简单的比较
        case 'File':
            return (
                data1.lastModified === data2.lastModified &&
                data1.name === data2.name &&
                data1.size === data2.size &&
                data1.type === data2.type
            );
        case 'Date':
            return data1.getTime() === data2.getTime();
        case 'RegExp':
            return `${data1}` === `${data2}`;
        default:
            return false;
    }
}
