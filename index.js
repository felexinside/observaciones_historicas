<script>
  var etapas = @@tramite->tramite->etapas;
  var datos = @@tramite->tramite->datos;
  var tablaBody = document.getElementById('tabla').getElementsByTagName('tbody')[0];

  const etapasIgnoradas = [
    "Pago de Derechos",
    "Clave única_Ingreso con cuenta",
    "Ingreso- Dependientes",
    "Verificación de pago",
    "Solicitud de documentos adicionales",
    "Etapa para adjuntar documentación pre-rechazo",
    "Genera EE dep",
    "Generar EE",
    "Copia Resolución Usuario",
    "Descarga EE",
    "Pago pre-rechazo",
    "Verificación de pago",
    "Pago residencia temporal",
    "Solicitud de documentos adicionales resolución"
  ];

  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  function formatDate(dateString) {
    var date = new Date(dateString);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  function obtenerObservacionAnalisis() {
    for (var i = 0; i < datos.length; i++) {
      if (datos[i].ingreso_observaciones) {
        return datos[i].ingreso_observaciones;
      }
    }
    return "No hay observaciones disponibles.";
  }

  function obtenerObservacionResolucion() {
    for (var i = 0; i < datos.length; i++) {
      if (datos[i].obs_analisis_resolutivo) {
        return datos[i].obs_analisis_resolutivo;
      }
    }
    return "No hay observaciones disponibles.";
  }

  function obtenerObservacionRechazoInadmi() {
    for (var i = 0; i < datos.length; i++) {
      if (datos[i].observaciones_retroceso_inadmi) {
        return datos[i].observaciones_retroceso_inadmi;
      }
    }
    return "No hay observaciones disponibles.";
  }

  for (var i = 0; i < etapas.length; i++) {
    var etapa = etapas[i];

    if (etapa.estado.toLowerCase() === "pendiente") {
      continue;
    }

    var fila = tablaBody.insertRow();
    var cell1 = fila.insertCell(0);
    var cell2 = fila.insertCell(1);
    var cell3 = fila.insertCell(2);
    var cell4 = fila.insertCell(3);
    var cell5 = fila.insertCell(4);

    var nombreEtapa = etapa.tarea.nombre;

    cell1.innerHTML = nombreEtapa;
    cell2.innerHTML = etapa.estado;
    cell3.innerHTML = formatDate(etapa.fecha_termino);
    cell4.innerHTML = etapa.usuario_asignado.nombres + ' ' + etapa.usuario_asignado.apellido_paterno;

    if (nombreEtapa.toLowerCase() === "análisis") {
      var link = document.createElement('a');
      link.href = "#";
      link.textContent = "Ver Observación";
      link.onclick = function (event) {
        event.preventDefault();
        var observacion = obtenerObservacionAnalisis();
        document.getElementById("modal-observacion").innerText = `Observación (Análisis): ${observacion}`;
        modal.style.display = "block";
      };
      cell5.appendChild(link);

    } else if (nombreEtapa.toLowerCase() === "resolución") {
      var link = document.createElement('a');
      link.href = "#";
      link.textContent = "Ver Observación";
      link.onclick = function (event) {
        event.preventDefault();
        var observacion = obtenerObservacionResolucion();
        document.getElementById("modal-observacion").innerText = `Observación (Resolución): ${observacion}`;
        modal.style.display = "block";
      };
      cell5.appendChild(link);

    } else if (nombreEtapa.toLowerCase() === "revisión inadmisible") {
      var link = document.createElement('a');
      link.href = "#";
      link.textContent = "Ver Observación";
      link.onclick = function (event) {
        event.preventDefault();
        var observacion = obtenerObservacionRechazoInadmi();
        document.getElementById("modal-observacion").innerText = `Observación (Revisión inadmisible): ${observacion}`;
        modal.style.display = "block";
      };
      cell5.appendChild(link);

    } else if (etapasIgnoradas.includes(nombreEtapa)) {
      cell5.innerHTML = "";
    } else {
      var link = document.createElement('a');
      link.href = 'https://tramites.extranjeria.gob.cl/backend/seguimiento/ver_etapa/' + etapa.id;
      link.textContent = etapa.id;
      link.target = "_blank";
      cell5.appendChild(link);
    }
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
</script>
