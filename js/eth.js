function recuperarPrecio() {
    fetch("https://api.coincap.io/v2/assets/ethereum")
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector("#precio2").innerHTML = parseFloat(datos.data.priceUsd).toFixed(8)
            if (parseFloat(datos.data.changePercent24Hr) > 0) {
                document.querySelector("#precio2").style.color = "green";
                document.querySelector("#variacion2").style.color = "green";
                document.querySelector("#variacion2").innerHTML = "↑" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            } else {
                document.querySelector("#precio2").style.color = "red";
                document.querySelector("#variacion2").style.color = "red";
                document.querySelector("#variacion2").innerHTML = "↓" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            }

        })
}

recuperarPrecio()
setInterval(recuperarPrecio, 5000)