/**
 * 获取屏幕比
 */
export function getPixelRatio() {
    return window.devicePixelRatio || 1;
}

export interface CanvasElCtx {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

/**
 * 创建高清canvas
 * @param w
 * @param h
 * @param style
 */
export function createHDCanvas(
    w: number,
    h: number,
    style?: Partial<CSSStyleDeclaration>,
): CanvasElCtx {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const pxRatio = getPixelRatio();

    canvas.width = w * pxRatio;
    canvas.height = h * pxRatio;

    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.scale(pxRatio, pxRatio);

    if (style) {
        Object.keys(style).forEach((key) => {
            canvas.style[key as any] = style[key as any];
        });
    }

    return {
        canvas,
        ctx,
    };
}
