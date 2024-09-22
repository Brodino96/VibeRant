/* ------------------------------------------------------------------ */    

Config = null
fetch('/frontend/config.json').then((response) => response.json()).then(function (json) {
    Config = json
})

const Debug = {
    "success": function (str) { if (Config.debugMode) { console.log(`[SUCCESS] ${str}`) } },
    "error": function (str) { if (Config.debugMode) { console.log(`[ERROR] ${str}`) } },
    "info": function (str) { if (Config.debugMode) { console.log(`[INFO] ${str}`) } }
}

/* ------------------------------------------------------------------ */