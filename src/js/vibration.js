/* ------------------------------------------------------------------ */

let client
let active = false

/* ------------------------------------------------------------------ */

window.addEventListener("load", function () {
    Debug.info("Page loaded")
})

/* ------------------------------------------------------------------ */

async function vibrate(value) {

    Debug.info(`Intensity: ${value.intensity}, duration: ${value.duration}`)
    
    if (!checkConnections()) { return }

    if (active) { return Debug.info("A command is still being executed") }

    client.devices.forEach(device => {
        active = true
        device.vibrate(value.intensity)
        setTimeout(async () => {
            await device.stop()
            active = false
        }, value.duration * 1000)
    })
}

async function intifaceConnect() {

    Debug.info("Starting connection process")

    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345")
    client = new Buttplug.ButtplugClient("Toy")
    
    await client.connect(connector) // Wait for connection

    Debug.success("Connected")
    
    client.addListener("deviceremoved", () => {
        Debug.info("Device disconnected")
    })
}

async function checkConnections () {
    if (client == null) {
        Debug.error("Software is not connected")
        return false
    }

    if (json.stringify(client.devices) == "[]") {
        Debug.error("No device connected")
        return false
    }

    return true
}

/* ------------------------------------------------------------------ */