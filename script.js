document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;

  const steps = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.next-btn');
  const backBtns = document.querySelectorAll('.back-btn');
  const restartBtn = document.getElementById('restart');
  const barraProgreso = document.getElementById('progress-bar');
  const pasosTotales = steps.length;

  const actualizarBarra = (step) => {
    const progress = (step / pasosTotales) * 100;
    barraProgreso.style.width = `${progress}%`;
    barraProgreso.setAttribute('aria-valuenow', progress);
    barraProgreso.textContent = `Paso ${step}`;
  };

  const mostrarPaso = (step) => {
    steps.forEach((el, idx) => {
      el.classList.toggle('d-none', idx !== step - 1);
    });
    actualizarBarra(step);
  };

  const validateStep = (step) => {
    let isValid = true;

    // Validación de los campos de entrada obligatorios
    const inputs = steps[step - 1].querySelectorAll('input[required]');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid'); // Marca como inválido
        isValid = false;
      } else {
        input.classList.remove('is-invalid'); // Limpia el estilo posterior a llenar los campos
      }
    });

    // Validación de los radio button
    const radioGroups = steps[step - 1].querySelectorAll('input[type="radio"][required]');
    if (radioGroups.length > 0) {
      const nameSet = new Set([...radioGroups].map(radio => radio.name));
      nameSet.forEach(name => {
        const group = document.querySelectorAll(`input[name="${name}"]`);
        const isGroupChecked = [...group].some(radio => radio.checked);
        if (!isGroupChecked) {
          isValid = false;
          group.forEach(radio => radio.classList.add('is-invalid'));
        } else {
          group.forEach(radio => radio.classList.remove('is-invalid'));
        }
      });
    }

    return isValid;
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep++;
        mostrarPaso(currentStep);
      } else {
        alert('Por favor, completa todos los campos obligatorios antes de continuar.');
      }
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep--;
      mostrarPaso(currentStep);
    });
  });

  restartBtn.addEventListener('click', () => {
    currentStep = 1;
    mostrarPaso(currentStep);
  });

  document.getElementById('next-3').addEventListener('click', () => {
    document.getElementById('paqueteria-seleccionada').textContent = document.querySelector('input[name="opcion-envio"]:checked').nextElementSibling.textContent;
    document.getElementById('resumen-nombre-remitente').textContent = document.getElementById('nombre-remitente').value;
    document.getElementById('resumen-nombre-destinatario').textContent = document.getElementById('nombre-destinatario').value;
    document.getElementById('resumen-direccion-destinatario').textContent = document.getElementById('direccion-destinatario').value;
  });

  // Actualizar la barra de progreso
  actualizarBarra(currentStep);
});
