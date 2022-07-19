import { tryStrParse } from './data';

/**
 * 获取 本地存储
 * @param key
 * @param tryPares  获取后是否尝试将获取的数据通过  JSON.parse() 处理
 * @returns {any}
 */
export function localGetItem<T = any>(key: string, tryPares = true): T {
    if (key) {
        const str: any = localStorage.getItem(key);
        if (str === null || str === undefined) return null as any;
        if (tryPares) {
            return tryStrParse(str);
        }
        return str as any;
    }
    return null as any;
}

/**
 * 设置本地存储，
 * @param key
 * @param value
 * @param toStr 在写入之前，是否将数据 通过 JSON.stringify 处理后写入
 * @param isHM
 */
export function localSetItem(key: string, value: any, toStr = true) {
    const saveValue = toStr ? JSON.stringify(value) : value;
    localStorage.setItem(key, saveValue);
}
