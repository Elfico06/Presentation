function recuperarPrecio() {
    fetch("https://api.coincap.io/v2/assets/shiba-inu")
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.querySelector("#precio4").innerHTML = parseFloat(datos.data.priceUsd).toFixed(8)
            if (parseFloat(datos.data.changePercent24Hr) > 0) {
                document.querySelector("#precio4").style.color = "green";
                document.querySelector("#variacion4").style.color = "green";
                document.querySelector("#variacion4").innerHTML = "↑" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            } else {
                document.querySelector("#precio4").style.color = "red";
                document.querySelector("#variacion4").style.color = "red";
                document.querySelector("#variacion4").innerHTML = "↓" + parseFloat(datos.data.changePercent24Hr).toFixed(2)
            }

        })
}

recuperarPrecio()
setInterval(recuperarPrecio, 5000)