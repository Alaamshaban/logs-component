const concat = require("concat");
(async function build() {
    const files = [
        "./dist/elements/browser/polyfills.js",
        "./dist/elements/browser/styles.js",
        "./dist/elements/browser/main.js",
    ];
    await concat(files, "dist/logs-viewer-component.js");
})();