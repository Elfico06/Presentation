function recuperarPrecio() {
    fetch("https://api.coincap.io/v2/assets/ethereum")
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector("#precio2").innerHTML = parseInt(datos.data.priceUsd)
            if (parseFloat(datos.data.changePercent24Hr) > 0) {
                document.querySelector("#variacion2").style.color = "green";
                document.querySelector("#variacion2").innerHTML = "↑" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            } else {
                document.querySelector("#variacion2").style.color = "red";
                document.querySelector("#variacion2").innerHTML = "↓" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            }

        })
}

recuperarPrecio()
setInterval(recuperarPrecio, 5000)