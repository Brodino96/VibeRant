/* ------------------------------------------------------------------ */

const Config = require("./config.json")
let debug = new Debug()

let client
let active = false

/* ------------------------------------------------------------------ */

window.addEventListener("load", function () {
    debug.info("Page loaded")
})

/* ------------------------------------------------------------------ */

async function vibrate(value) {

    debug.info(`Intensity: ${value.intensity}, duration: ${value.duration}`)
    
    if (!checkConnections()) { return }

    if (active) { return debug.info("A command is still being executed") }

    client.devices.forEach(device => {
        active = true
        device.vibrate(value.intensity)
        setTimeout(async () => {
            await device.stop()
            active = false
        }, value.duration)
    })
}

async function intifaceConnect() {

    debug.info("Starting connection process")

    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345")
    client = new Buttplug.ButtplugClient("Toy")
    
    await client.connect(connector) // Wait for connection

    debug.success("Connected")
    
    client.addListener("deviceremoved", () => {
        debug.info("Device disconnected")
    })
}

async function checkConnections () {
    if (client == null) {
        debug.error("Software is not connected")
        return false
    }

    if (json.stringify(client.devices) == "[]") {
        debug.error("No device connected")
        return false
    }

    return true
}

/* ------------------------------------------------------------------ */

class Debug {
    success (str) {
        if (Config.debugMode) {
            console.log(`[SUCCESS] ${str}`)
        }
    }
    error (str) {
        if (Config.debugMode) {
            console.log(`[ERROR] ${str}`)
        }
    }
    info (str) {
        if (Config.debugMode) {
            console.log(`[INFO] ${str}`)
        }
    }
}

/* ------------------------------------------------------------------ */