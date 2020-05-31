//import variables
import { API } from "./api.js";
import * as UI from "./interfaz.js";




UI.formularioBuscar.addEventListener("submit", (e) => {
  e.preventDefault();

  //Obtain data
  const artista = document.querySelector("#artista").value,
        cancion = document.querySelector("#cancion").value;

  if (artista === "" || cancion === "") {
    //The user leaves the fields empty.

    UI.divMensajes.innerHTML = "Error... Campos obligatorios";

    UI.divMensajes.classList.add("error");

    setTimeout(() => {
      UI.divMensajes.innerHTML = "";
      UI.divMensajes.classList.remove("error");
    }, 3000);
    
  } else {

    // the form is complete, consult the API
    const api = new API(artista, cancion);
    api.consultarAPI().then((data) => {

      if (data.respuesta.lyrics) {

        //The lyrics exist
        const letra = data.respuesta.lyrics;
        UI.resultadoMensaje.textContent = letra;

      } else {

              //The lyrics not exist
              UI.divMensajes.innerHTML = "La cancion no existe";

              UI.divMensajes.classList.add("error");

              setTimeout(() => {
                UI.divMensajes.innerHTML = "";
                UI.divMensajes.classList.remove("error");
                UI.formularioBuscar.reset();

        }, 3000);
      }
    });
  }
});


