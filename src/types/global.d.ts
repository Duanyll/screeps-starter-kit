declare const _: import("lodash").LoDashStatic;

declare namespace NodeJS {
    /**
     * global 对象上挂载的方法用于在 console 中直接调用
     */
    interface Global {
        yes: (key: number) => void;
        /** 上次抛出异常的时间 */
        lastException: number;
        Game: Game;

        /** 统计距离上次 global 被重置的时间 */
        age: number;
        _: _.LoDashStatic;
    }
}
