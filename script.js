const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const meterBar = document.getElementById("meterBar");
const togglePassword = document.getElementById("togglePassword");

const generateBtn = document.getElementById("generateBtn");
const generatedPassword = document.getElementById("generatedPassword");
const genStrengthText = document.getElementById("genStrengthText");
const genMeterBar = document.getElementById("genMeterBar");

const copyBtn = document.getElementById("copyBtn");
const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const themeToggle = document.getElementById("toggleTheme");

const infoBtn = document.getElementById("infoBtn");
const infoModal = document.getElementById("infoModal");
const closeBtn = infoModal.querySelector(".close");


passwordInput.addEventListener("input", handlePasswordInput);
passwordInput.addEventListener("paste", () => {
  setTimeout(() => handlePasswordInput(), 0);
});

function handlePasswordInput() {
  const password = passwordInput.value;
  const strength = checkStrength(password);
  updateMeter(strength, meterBar, strengthText);
}

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

generateBtn.addEventListener("click", () => {
  const password = generatePassword();
  generatedPassword.value = password;
  const strength = checkStrength(password);
  updateMeter(strength, genMeterBar, genStrengthText);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(generatedPassword.value);
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => {
    copyBtn.textContent = "📋 Copy";
  }, 1500);
});

lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

function checkStrength(password) {
  if (!password || password.trim().length === 0) return -1;

  let score = 0;
  if (password.length >= 8) score += 2;
  if (password.length >= 12) score += 2;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;
  if (!/(.)\1{2,}/.test(password)) score += 1;

  return Math.min(score, 9);
}

function updateMeter(strength, barElement, textElement) {
  const levels = [
    "Very Weak", "Weak", "Still Weak", "Getting Better", "Okay",
    "Fair", "Good", "Strong", "Very Strong", "Excellent"
  ];

  const colors = [
    "#f87171", "#fb923c", "#facc15", "#a3e635", "#4ade80",
    "#34d399", "#22d3ee", "#60a5fa", "#8b5cf6", "#ec4899"
  ];

  const widths = [
    "10%", "20%", "30%", "40%", "50%",
    "60%", "70%", "80%", "90%", "100%"
  ];

  if (strength < 0) {
    textElement.textContent = "Strength: ";
    barElement.style.width = "0%";
    barElement.style.backgroundColor = "#ddd";
    return;
  }

  textElement.textContent = `Strength: ${levels[strength]}`;
  barElement.style.width = widths[strength];
  barElement.style.backgroundColor = colors[strength];
}

function generatePassword() {
  const length = parseInt(lengthRange.value);
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomChar = charset[Math.floor(Math.random() * charset.length)];
    password += randomChar;
  }
  return password;
}

infoBtn.addEventListener("click", () => {
  infoModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  infoModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === infoModal) {
    infoModal.style.display = "none";
  }
});
