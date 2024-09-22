/* ------------------------------------------------------------------ */

function updateSlider (value, id, start) {
    Debug.info(start + value)
    document.getElementById(`${id}_description`).innerHTML = start + value
    updateConfig(value, id)
}

function updateConfig (value, target) {
    console.log(target, value)
    target = target.split("_")
    Config.events[target[0]][target[1]] = value
    
    //fs.writeFileSync("/src/config.json", JSON.stringify(Config))
}

function buttonClicked (btn) {
    switch (btn) {
        case "main":
            if (Active) {
                document.getElementById("main_button").innerHTML = "OFF"
                Active = false
            } else {
                document.getElementById("main_button").innerHTML = "ON"
                Active = true
            }
            break

        case "connect":
            intifaceConnect()
            webSocketConnect()
            break

        default: 
            Config["events"][btn]["enabled"] = !Config["events"][btn]["enabled"]
            if (Config["events"][btn]["enabled"]) {
                document.getElementById(`${btn}_button`).innerHTML = "ON"
            } else {
                document.getElementById(`${btn}_button`).innerHTML = "OFF"
            }
    }
}

function notify (text) {
    // write a notification function
}

/* ------------------------------------------------------------------ */

window.addEventListener("load", function () {
    for (const [key, value] of Object.entries(Config["events"])) {
        let intensityId = `${key}_intensity`
        let durationId = `${key}_duration`

        document.getElementById(`${intensityId}_description`).innerHTML = `Intensità: ${value["intensity"]}`
        document.getElementById(`${durationId}_description`).innerHTML = `Durata: ${(value["duration"])}`
        
        document.getElementById(intensityId).value = value["intensity"]
        document.getElementById(durationId).value = value["duration"]

        if (value["enabled"]) {
            document.getElementById(`${key}_button`).innerHTML = "ON"
        } else {
            document.getElementById(`${key}_button`).innerHTML = "OFF"
        }
    }
})

/* ------------------------------------------------------------------ */