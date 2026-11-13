const nav = document.querySelector(".topnav");
const menuButton = nav.querySelector(".icon");
const dialog = document.querySelector("dialog");
const form = document.querySelector("#reservation");
const formBody = document.querySelector(".modal-body");
const confirmation = document.querySelector(".success-message");

function setMenu(open) {
  nav.classList.toggle("responsive", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
nav.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

document.querySelectorAll(".modal-btn").forEach((button) => {
  button.addEventListener("click", () => dialog.showModal());
});
dialog.querySelectorAll(".close, .btn-close").forEach((button) => {
  button.addEventListener("click", () => dialog.close());
});
dialog.addEventListener("close", () => {
  if (confirmation.hidden) return;
  form.reset();
  confirmation.hidden = true;
  formBody.hidden = false;
});

const { first, last, email, birthdate, quantity } = form.elements;
const locations = form.elements.namedItem("location");
const terms = document.querySelector("#checkbox1");
const names = (input, label) => ({
  controls: [input],
  error: () => input.value.trim().length < 2
    ? `Le champ ${label} doit contenir au moins deux caractères.`
    : "",
});

const fields = [
  names(first, "prénom"),
  names(last, "nom"),
  {
    controls: [email],
    error: () => {
      if (email.validity.valueMissing) return "Saisissez votre adresse e-mail.";
      return email.validity.typeMismatch ? "Saisissez une adresse e-mail valide." : "";
    },
  },
  {
    controls: [birthdate],
    error: () => {
      if (!birthdate.value) return "Saisissez votre date de naissance.";
      return new Date(`${birthdate.value}T00:00:00`) > new Date()
        ? "La date de naissance ne peut pas être dans le futur."
        : "";
    },
  },
  {
    controls: [quantity],
    error: () => {
      const { badInput, valueMissing, rangeUnderflow, rangeOverflow, stepMismatch } = quantity.validity;
      if (badInput) return "Saisissez un nombre valide.";
      if (valueMissing) return "Saisissez le nombre de tournois.";
      if (rangeUnderflow || rangeOverflow) return "Le nombre doit être compris entre 0 et 99.";
      return stepMismatch ? "Saisissez un nombre entier." : "";
    },
  },
  {
    controls: Array.from(locations),
    error: () => locations.value ? "" : "Sélectionnez un tournoi.",
  },
  {
    controls: [terms],
    error: () => terms.checked ? "" : "Acceptez les conditions pour continuer.",
  },
];

for (const field of fields) {
  const [firstControl] = field.controls;
  const error = document.createElement("p");
  error.id = `${firstControl.id}-error`;
  error.className = "field-error";
  error.hidden = true;
  firstControl.closest(".formData").append(error);
  field.message = error;
  for (const control of field.controls) {
    control.setAttribute("aria-describedby", error.id);
    control.addEventListener("input", () => {
      if (!error.hidden) validateField(field);
    });
  }
}

function validateField({ controls, error, message }) {
  const text = error();
  message.textContent = text;
  message.hidden = !text;
  for (const control of controls) {
    if (text) control.setAttribute("aria-invalid", "true");
    else control.removeAttribute("aria-invalid");
  }
  return !text;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalid = fields.filter((field) => !validateField(field));
  if (invalid.length) {
    invalid[0].controls[0].focus();
    return;
  }
  formBody.hidden = true;
  confirmation.hidden = false;
  confirmation.querySelector("p").focus();
});
