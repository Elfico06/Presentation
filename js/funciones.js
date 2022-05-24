function recuperarPrecio() {
    fetch("https://api.coincap.io/v2/assets/bitcoin")
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector("#precio").innerHTML = parseInt(datos.data.priceUsd)
            if (parseFloat(datos.data.changePercent24Hr) > 0) {
                document.querySelector("#variacion").style.color = "green";
                document.querySelector("#variacion").innerHTML = "↑" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            } else {
                document.querySelector("#variacion").style.color = "red";
                document.querySelector("#variacion").innerHTML = "↓" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            }

        })
}

recuperarPrecio()
setInterval(recuperarPrecio, 5000)