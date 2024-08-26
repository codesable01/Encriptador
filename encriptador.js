const d = document;
const textArea = d.querySelector(".form-input");
const imagenmuneco = d.querySelector(".result-img");
const loaderthunder = d.querySelector(".loader");
const resulttitle = d.querySelector(".result-title");
const resulttext = d.querySelector(".result-text");
const resultsubtittle=d.querySelector(".result-subtittle");
const btnencriptar = d.querySelector(".form-btn");
const btndesencriptar = d.querySelector("#btn-desencriptar"); // Aquí el ID correcto
const btncopy = d.querySelector(".result--btn");
const alertMsj = d.querySelector(".alert-msj");
const btnCopy = d.querySelector("#btn-copy");
const btnPaste = d.querySelector("#btn-paste");
const chibby = d.querySelector(".chibby");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Función para las recargas(El de las recargas)
// Definir los límites de recargas y el tiempo de espera 
const maxReloads = 8;
const reloadTimeout = 60000; // 1 minuto

// Obtener la referencia al elemento logoAlura
const logoAlura = document.getElementById("logo-alura");

// Añadir el evento de clic al logo para manejar las recargas
logoAlura.addEventListener("click", () => {
    let reloadCount = +localStorage.getItem("reloads") || 0;
    let lastReload = +localStorage.getItem("lastReload") || 0;

    // Reiniciar el contador si ha pasado más de un minuto desde la última recarga
    if (Date.now() - lastReload > reloadTimeout) reloadCount = 0;

    // Comprobar si se ha alcanzado el máximo número de recargas
    if (reloadCount < maxReloads) {
        localStorage.setItem("reloads", ++reloadCount);
        localStorage.setItem("lastReload", Date.now());
        location.reload(); // Recargar la página
    } else {
        alert("Límite de recargas alcanzado. Espera 1 minuto."); // Mostrar un mensaje si se ha alcanzado el límite
    }
});




// Función para validar el texto
function validarTexto(mensaje) {
    if (mensaje.trim() === "") {
        return false; // Campo vacío
    }

    const regex = /^[a-z\s]*$/; // Solo letras minúsculas y espacios
    return regex.test(mensaje);
}


// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1]; // Reemplaza la letra por su equivalente encriptado
                break; // Termina el bucle cuando se encuentra la correspondencia
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Evento de entrada en el textarea
textArea.addEventListener("input", (e) => {
    let texto = e.target.value;
    if (validarTexto(texto)) {
        alertMsj.style.display = "none";
        imagenmuneco.style.display = "none";
        chibby.style.display="none";
        loaderthunder.classList.remove("hidden");
        resulttitle.textContent = "Capturando mensaje...";
        resulttext.textContent = "";
        resultsubtittle.textContent = "" ;
        // Oculta el botón de pegar y muestra el de copiar
        btnPaste.classList.add("hidden");
        btncopy.classList.add("hidden");


    } else {
        alertMsj.style.display = "block";
        alertMsj.textContent = "Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales";
    }
});

// Función del botón encriptar
btnencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value;
    if (validarTexto(mensaje)) {
        let mensajeEncriptado = encriptarMensaje(mensaje);
        resulttext.textContent = mensajeEncriptado;
        btncopy.classList.remove("hidden");
        resulttitle.textContent = "El resultado es:";
        alertMsj.style.display = "none";
        btnPaste.classList.add("hidden");
       


    } else {
        resulttitle.textContent = "";
        resulttext.textContent = "";
        alertMsj.style.display = "block";
    }
});

// Función del botón desencriptar
btndesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value;
    if (validarTexto(mensaje)) {
        let mensajeDesencriptado = desencriptarMensaje(mensaje);
        resulttitle.textContent = "El resultado es:";
        resulttext.textContent = mensajeDesencriptado;
        alertMsj.style.display = "none";
        btncopy.classList.remove("hidden");
        btnPaste.classList.add("hidden");


    } else {
        resulttitle.textContent = "";
        resulttext.textContent = "";
        alertMsj.style.display = "block";
    }
});

// Evento del botón copiar
btnCopy.addEventListener("click", () => {
    let copytext = resulttext.textContent;
    navigator.clipboard.writeText(copytext).then(() => {
        chibby.style.display = "block";
        loaderthunder.classList.add("hidden");
        resulttitle.textContent = "El texto se copió";
        btnCopy.classList.add("hidden"); // Oculta el botón de copiar después de copiar
        btnPaste.classList.remove("hidden"); // Muestra el botón de pegar
        resulttext.textContent = "";
    });
});

// Evento del botón pegar
btnPaste.addEventListener("click", () => {
    navigator.clipboard.readText().then((text) => {
        textArea.value = text;
        chibby.style.display = "block";
        loaderthunder.classList.add("hidden");
        resulttitle.textContent = "Texto pegado:";
        resulttext.textContent = text;
        btnCopy.classList.remove("hidden"); // Muestra el botón de copiar después de pegar
        btnPaste.classList.add("hidden"); // Oculta el botón de pegar
    });
});
