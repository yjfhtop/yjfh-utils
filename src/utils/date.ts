// 日期处理相关

/**
 * 获取月份中的第一天的日期
 * @param date
 */
export function getFirstDayDate(date: Date): Date {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const str = `${y}/${m}/1`;
    return new Date(str);
}

/**
 * 获取当前月的天数
 * @param date
 */
export function getMonthDayNumber(date: Date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    if (m >= 12) {
        y++;
        m = 1;
    }
    m++;
    const nextMonth = new Date(`${y}/${m}/1`);
    const nextMonthTime = nextMonth.getTime();
    const nowM = new Date(nextMonthTime - 10);
    return nowM.getDate();
}

/**
 * 获取月份中的最后一天
 * @param date
 */
export function getLastDayDate(date: Date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = getMonthDayNumber(date);
    const target = new Date(`${y}/${m}/${d} 00:00:00`);
    return target;
}
