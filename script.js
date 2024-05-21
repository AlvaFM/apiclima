//obtener los elementos del DOM/HTML

const ciudadInput = document.getElementById("ciudad");

const obtenerPronosticoBtn = document.getElementById("ObtenerPronostico");

const pronosticoDiv = document.getElementById("pronostico");

obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

function obtenerPronostico(){

    const ciudad = ciudadInput.value.trim();
    if (ciudad===""){
        mostrarError("Por favor ingresa una ciudad");
        return
    }
    //Pega tu APi key aca abajo
    const apiKey ="11dadabbc6d7ace85d4d1226b4ca1f9c";

    const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //una solicitud HTTP utilizando fetch con la url construida

    fetch(url)
    .then(Response => Response.json())
    .then(data => {
        mostrarPronostico(data);

    })
    .catch(error=>{
        mostrarError("Error al obtener el pronostico (no funca), intentalo otrae ")
    });



};

function mostrarPronostico(data){
    const {name,main,weather}= data
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;
    const pronosticoHTML = `
        <div class="card"><
            <div class="card-body">
                <h2 class="card-title">${name}</h2>

                <p class="card-text">Temperatura : ${temperatura} </p>
                <p class="card-text">Sensacion : ${sensacion} </p>
                <p class="card-text">Humedad : ${humedad} </p>
                <p class="card-text">Descripcion : ${descripcion} </p>
            </div>
        /div>
    `;
    //insertar el js dentro del HTML
    pronosticoDiv.innerHTML = pronosticoHTML;
}

function mostrarError(mensaje){
    const errorHTML = `
    <div class="alert-danger" role="alert">
    ${mensaje}
    </div>
    `;
    pronosticoDiv.innerHTML = errorHTML;
};

