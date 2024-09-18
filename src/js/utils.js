/* ------------------------------------------------------------------ */

const Debug = new debug()
const Config = require("../config.json")

/* ------------------------------------------------------------------ */

window.addEventListener("load", function () {
    Debug.info("Page loaded")
})

/* ------------------------------------------------------------------ */


class debug {
    success (str) { if (Config.debugMode) { console.log(`[SUCCESS] ${str}`) } }
    error (str) { if (Config.debugMode) { console.log(`[ERROR] ${str}`) } }
    info (str) { if (Config.debugMode) { console.log(`[INFO] ${str}`) } }
}

/* ------------------------------------------------------------------ */