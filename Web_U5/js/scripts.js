/* ───────────────────────────────────────────────────────────── */
/*                      scripts.js                               */
/* ───────────────────────────────────────────────────────────── */

/* --------------------- SIDEBAR COLLAPSABLE --------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".sidebar .toggle-btn");
  const sidebar = document.querySelector(".sidebar");
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
    });
  }

  // ====== Toggle de la sidebar desde el enlace "Índice" del nav ======
  const linkIndice = document.getElementById("btnMostrarIndice");
  if (linkIndice && sidebar) {
    linkIndice.addEventListener("click", function (event) {
      event.preventDefault();           // Evita que el enlace recargue la página
      sidebar.classList.toggle("collapsed");
    });
  }

  /* ------------- ACORDEÓN (mostrar/ocultar paneles) ------------- */
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });
});

/* ----------------------- TEMPORIZADOR -------------------------- */
/*
  En las páginas de actividad, usa esta función para iniciar un temporizador.
  Ejemplo de uso en actividad-ejemplo.html (ver más abajo).
*/
function iniciarTemporizador(duracionSegundos, displayElemento, callbackFinal) {
  let tiempoRestante = duracionSegundos;
  const intervalId = setInterval(function () {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    displayElemento.textContent = 
      (minutos < 10 ? "0" + minutos : minutos) + ":" +
      (segundos < 10 ? "0" + segundos : segundos);
    if (--tiempoRestante < 0) {
      clearInterval(intervalId);
      if (typeof callbackFinal === "function") callbackFinal();
    }
  }, 1000);
  return intervalId;
}

/* ----------------- VALIDACIÓN DE RESPUESTAS (Ejemplo) ------------- */
/*
  Supón que en la actividad usas inputs con clase .respuesta,
  y el atributo data-correcto="verdadero" o "falso" según la respuesta.
  Cuando el usuario haga clic en un botón “Validar”, recorrerás todas las .respuesta
  y contabilizarás cuántas son correctas.
*/
function validarRespuestas() {
  const respuestas = document.querySelectorAll(".respuesta");
  let correctas = 0, totales = respuestas.length;
  respuestas.forEach((input) => {
    const esCorrecta = input.getAttribute("data-correcto") === "verdadero";
    if (input.checked && esCorrecta) {
      correctas++;
      input.parentElement.style.color = "green";
    } else if (input.checked && !esCorrecta) {
      input.parentElement.style.color = "red";
    }
    // si no está marcada pero era correcta, no la contamos.
  });
  return { correctas, totales };
}

/* --------------------- REINICIAR ACTIVIDAD ---------------------- */
function reiniciarActividad(formSelector) {
  const form = document.querySelector(formSelector);
  if (form) {
    form.reset();
    // limpiar colores de labels (si los marcamos en validar)
    const respuestas = form.querySelectorAll(".respuesta");
    respuestas.forEach((input) => {
      input.parentElement.style.color = "";
    });
    // quitar puntuación anterior si existiese
    const resultadoBox = form.querySelector(".resultado-actividad");
    if (resultadoBox) resultadoBox.textContent = "";
  }
}
