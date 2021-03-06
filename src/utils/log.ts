// 打印, 日志
// @ts-ignore
const IS_DEV = '__NODE_ENV__' === 'development';
// 库名称
// const LibName = '__LIB_NAME__';
let LibName = '';

/**
 * 用于设置 库名称, 本方法在 库 模式下有用
 * @param name
 */
export function setLibName(name: string) {
    LibName = name;
}

/**
 * 打印警告
 * @param apiName api 名称
 * @param info 提示信息
 */
export function logWarn(apiName?: string, info?: string): void {
    console.log(
        `%c😥 ${LibName} warning: \n%s%s`,
        'color:#E6A23C;font-weight:bold',
        apiName ? `Call api ${apiName} warning` : '',
        info,
    );
}

/**
 * 打印错误信息
 * @param apiName api 名称
 * @param info 提示信息
 */
export function logError(apiName?: string, info?: string): void {
    console.error(
        `%c❌ ${LibName} error: \n%s%s`,
        'color:#ed1941;font-weight:bold',
        apiName ? `Call api ${apiName} ` : '',
        info || '',
    );
}

export function logTag() {
    if (IS_DEV) {
        console.log(
            `%c💖 Welcome to ${LibName}. Version is __BUILD_VERSION__`,
            'border-radius:3px;border:dashed 1px ##F56C6C;padding:26px 20px;font-size:14px;color:#409EFF',
        );
    }
}
