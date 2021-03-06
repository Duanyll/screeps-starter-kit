declare module 'consts:buildTime' {
    /**
     * Constant that will be inlined by Rollup and rollup-plugin-consts.
     */
    const buildTime: string;
    export default buildTime;
}

type LogLevel = "prompt" | "assert" | "error" | "report" | "info" | "debug" | "silly";
