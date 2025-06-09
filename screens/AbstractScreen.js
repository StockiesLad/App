// @ts-check
/**
 * @typedef {import('@types').Runtime} Runtime
 */

export default class AbstractScreen {
    styles;
    runtime;

    constructor(
        /**@type {StyleSheet}*/ styles,
        /**@type {Runtime} */ runtime
    ) {
        this.styles = styles;
        this.runtime = runtime;
    }

    render() {
    }

    run() {
        
    }
}