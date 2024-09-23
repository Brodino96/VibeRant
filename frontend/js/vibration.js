/* ------------------------------------------------------------------ */

Active = false
let client = null

/* ------------------------------------------------------------------ */

async function vibrate(data) { 

    Debug.info(`Intensity: ${value.intensity}, duration: ${value.duration}`)
    
    if (!checkConnections()) { return }

    if (Active) { return Debug.info("A command is still being executed") }

    client.devices.forEach(device => {
        Active = true
        device.vibrate(value.intensity)
        setTimeout(async () => {
            await device.stop()
            Active = false
        }, value.duration * 1000)
    })
}

async function intifaceConnect() {
    
    if (client != null && client.connected) {
        return Debug.success("Intiface is alredy connected")
    }

    Debug.info("Starting connection process")
    
    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345")
    client = new Buttplug.ButtplugClient("Toy")
    
    try {
        await client.connect(connector)
    } catch (e) {
        Debug.error(`Detected: ${e}`)
        return notify("Error connecting")
    }
    
    Debug.success("Connected")
    
    client.addListener("deviceremoved", function () {
        Debug.info("Device disconnected")
    })

    client.addListener("deviceadded", function () {
        Debug.info("Device added")
    })

    notify("Connected")
}

/* ------------------------------------------------------------------ */