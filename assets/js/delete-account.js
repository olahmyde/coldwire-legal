(function () {
  var SUPPORT = 'support@icwebpro.net';
  var openBtn = document.getElementById('open-delete-modal');
  var closeBtn = document.getElementById('close-delete-modal');
  var backdrop = document.getElementById('delete-modal-backdrop');
  var modal = document.getElementById('delete-modal');
  var form = document.getElementById('delete-form');
  var handleInput = document.getElementById('delete-handle');
  var emailInput = document.getElementById('delete-email');
  var confirmInput = document.getElementById('delete-confirm');
  var errorEl = document.getElementById('delete-form-error');

  if (!openBtn || !modal) return;

  var lastFocus = null;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
  }

  function openModal() {
    lastFocus = document.activeElement;
    backdrop.hidden = false;
    backdrop.setAttribute('aria-hidden', 'false');
    modal.hidden = false;
    document.body.classList.add('modal-open');
    showError('');
    handleInput.focus();
  }

  function closeModal() {
    backdrop.hidden = true;
    backdrop.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    showError('');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function buildMailto() {
    var handle = handleInput.value.trim();
    var email = emailInput.value.trim();
    var subject = 'ColdWire account deletion request';
    var lines = [
      'Please delete my ColdWire account and all associated data.',
      '',
      'Handle: ' + handle,
    ];
    if (email) lines.push('Reply-to email: ' + email);
    lines.push('', 'I confirm I want permanent deletion of this account.');
    var body = lines.join('\n');
    return (
      'mailto:' +
      encodeURIComponent(SUPPORT) +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body)
    );
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showError('');

    if (!handleInput.value.trim()) {
      showError('Enter your agent handle.');
      handleInput.focus();
      return;
    }
    if (!confirmInput.checked) {
      showError('Confirm that you understand this is permanent.');
      confirmInput.focus();
      return;
    }

    window.location.href = buildMailto();
    setTimeout(closeModal, 300);
  });
})();
