let socket = null

function webSocketConnect() {

    if (socket != null) {
        return Debug.info("WebSocket was alredy on")
    }

    socket = new WebSocket("ws://localhost:3000")
    
    socket.addEventListener("open", function () {
        Debug.success("Connected to the WebSocket server")
    })
    
    socket.addEventListener("message", function (event) {
        Debug.info("Data recived from the server:", event.data)
        handleWebsocketMessage(event)
    })
    
    socket.addEventListener("close", function () {
        Debug.info("Connection closed")
    })
    
    socket.addEventListener("error", function (error) {
        Debug.error("WebSocket:", error)
    })
}