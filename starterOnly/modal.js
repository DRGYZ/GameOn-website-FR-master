function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close"); // Added

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeBtn.addEventListener("click", closeModal); // Added

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  // Added
  modalbg.style.display = "none";
}

// Fonctions de gestion d'erreurs
function showError(input, message) {
  const formData = input.closest(".formData");
  formData.setAttribute("data-error", message);
  formData.setAttribute("data-error-visible", "true");
}

function clearError(input) {
  const formData = input.closest(".formData");
  formData.removeAttribute("data-error");
  formData.setAttribute("data-error-visible", "false");
}

// Validation principale
function validate() {
  event.preventDefault(); // Empêche la soumission normale
  let isValid = true;
  const inputs = {
    first: document.getElementById("first"),
    last: document.getElementById("last"),
    email: document.getElementById("email"),
    birthdate: document.getElementById("birthdate"),
    quantity: document.getElementById("quantity"),
    location: document.querySelectorAll('input[name="location"]'),
    conditions: document.getElementById("checkbox1"),
  };

  // Validation Prénom
  if (inputs.first.value.trim().length < 2) {
    showError(
      inputs.first,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    isValid = false;
  } else clearError(inputs.first);

  // Validation Nom
  if (inputs.last.value.trim().length < 2) {
    showError(
      inputs.last,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    isValid = false;
  } else clearError(inputs.last);

  // Validation Email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!inputs.email.value.trim()) {
    showError(inputs.email, "Vous devez entrer votre email.");
    isValid = false;
  } else if (!emailRegex.test(inputs.email.value.trim())) {
    showError(inputs.email, "L'email entré n'est pas valide.");
    isValid = false;
  } else clearError(inputs.email);

  // Validation Bouton radio
  const isLocationSelected = [...inputs.location].some(
    (radio) => radio.checked
  );
  if (!isLocationSelected) {
    showError(inputs.location[0], "Sélectionnez un tournoi");
    isValid = false;
  } else clearError(inputs.location[0]);

  // Validation Conditions
  if (!inputs.conditions.checked) {
    showError(inputs.conditions, "Vous devez accepter les conditions");
    isValid = false;
  } else clearError(inputs.conditions);
  // Validation Date de naissance
  if (!inputs.birthdate.value) {
    showError(inputs.birthdate, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else clearError(inputs.birthdate);
  if (isNaN(inputs.quantity.value)) {
    showError(inputs.quantity, "Veuillez entrer un nombre valide.");
    isValid = false;
  } else if (inputs.quantity.value < 0 || inputs.quantity.value > 99) {
    showError(inputs.quantity, "Le nombre doit être compris entre 0 et 99.");
    isValid = false;
  } else clearError(inputs.quantity);

  // Validation Nombre de concours
  if (inputs.quantity.value.trim() === "") {
    showError(inputs.quantity, "Veuillez entrer un nombre de concours.");
    isValid = false;
  } else if (isNaN(Number(inputs.quantity.value))) {
    showError(inputs.quantity, "Veuillez entrer un nombre valide.");
    isValid = false;
  } else if (
    Number(inputs.quantity.value) < 0 ||
    Number(inputs.quantity.value) > 99
  ) {
    showError(inputs.quantity, "Le nombre doit être compris entre 0 et 99.");
    isValid = false;
  } else if (!Number.isInteger(Number(inputs.quantity.value))) {
    showError(inputs.quantity, "Veuillez entrer un nombre entier.");
    isValid = false;
  } else {
    clearError(inputs.quantity);
  }
  if (isValid) {
    const form = document.forms['reserve'];
    const successMessage = document.querySelector('.success-message');
    
    // Masque le formulaire et affiche le message
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Ferme la modale après 3 secondes
    setTimeout(() => {
      modalbg.style.display = 'none';
      form.style.display = 'block'; // Réaffiche le formulaire
      form.reset(); // Réinitialise les champs
      successMessage.style.display = 'none';
    }, 3000);
  }
  return false;
}
document.querySelector('.btn-close').addEventListener('click', () => {
  modalbg.style.display = 'none';
  document.forms['reserve'].reset();
});
