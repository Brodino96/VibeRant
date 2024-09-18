/* ------------------------------------------------------------------ */

Debug = new debug()
const Config = require("../config.json")

/* ------------------------------------------------------------------ */

class debug {
    success (str) { if (Config.debugMode) { console.log(`[SUCCESS] ${str}`) } }
    error (str) { if (Config.debugMode) { console.log(`[ERROR] ${str}`) } }
    info (str) { if (Config.debugMode) { console.log(`[INFO] ${str}`) } }
}

/* ------------------------------------------------------------------ */