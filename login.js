/**
 * login.js
 * 
 * Accessible client-side login interactions for Dwella
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const identifierError = document.getElementById('identifier-error');
  const passwordError = document.getElementById('password-error');
  const generalError = document.getElementById('general-error');
  const generalErrorText = document.getElementById('general-error-text');
  const submitBtn = document.getElementById('submit-btn');

  // Password visibility toggle
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
    togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    togglePasswordBtn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
  });

  // Helper to show field error
  function showFieldError(input, errorElement, message) {
    input.classList.add('input-invalid');
    errorElement.textContent = message;
    errorElement.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  }

  // Helper to clear field error
  function clearFieldError(input, errorElement) {
    input.classList.remove('input-invalid');
    errorElement.textContent = '';
    errorElement.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  // Real-time clearance on typing
  identifierInput.addEventListener('input', () => {
    if (identifierInput.classList.contains('input-invalid')) {
      clearFieldError(identifierInput, identifierError);
    }
    generalError.hidden = true;
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('input-invalid')) {
      clearFieldError(passwordInput, passwordError);
    }
    generalError.hidden = true;
  });

  // Client validation on blur
  identifierInput.addEventListener('blur', () => {
    const val = identifierInput.value.trim();
    if (!val) {
      showFieldError(identifierInput, identifierError, 'Please enter your email or house/unit identifier.');
    }
  });

  passwordInput.addEventListener('blur', () => {
    const val = passwordInput.value;
    if (!val) {
      showFieldError(passwordInput, passwordError, 'Please enter your password.');
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;

    if (!identifier) {
      showFieldError(identifierInput, identifierError, 'Email or House / Unit ID is required.');
      isValid = false;
    } else {
      clearFieldError(identifierInput, identifierError);
    }

    if (!password) {
      showFieldError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      showFieldError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      isValid = false;
    } else {
      clearFieldError(passwordInput, passwordError);
    }

    if (!isValid) {
      generalErrorText.textContent = 'Please fix the errors below to continue.';
      generalError.hidden = false;
      return;
    }

    // Simulate login submission state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    setTimeout(() => {
      // Demo authentication simulation
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
      alert(`Sign in simulated for: ${identifier}`);
    }, 1200);
  });
});

