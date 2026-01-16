(function() {
  'use strict';

  // Configuration
  const config = window.inclusivWidget || {};
  const position = config.position || 'bottom-right';
  const primaryColor = config.primaryColor || '#6366f1';
  const showBranding = config.showBranding !== false;

  // Styles
  const styles = `
    .inclusiv-widget-trigger {
      position: fixed;
      ${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      ${position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
      width: 56px;
      height: 56px;
      background: ${primaryColor};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      z-index: 999999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: none;
      padding: 0;
    }
    .inclusiv-widget-trigger:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .inclusiv-widget-trigger:focus {
      outline: 3px solid ${primaryColor};
      outline-offset: 3px;
    }
    .inclusiv-widget-trigger svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
    .inclusiv-widget-panel {
      position: fixed;
      ${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      ${position.includes('bottom') ? 'bottom: 90px;' : 'top: 90px;'}
      width: 320px;
      max-height: 80vh;
      background: #18181b;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      z-index: 999998;
      overflow: hidden;
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .inclusiv-widget-panel.open {
      display: block;
      animation: inclusiv-slide-up 0.3s ease;
    }
    @keyframes inclusiv-slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .inclusiv-widget-header {
      padding: 16px;
      border-bottom: 1px solid #27272a;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .inclusiv-widget-title {
      color: white;
      font-weight: 600;
      font-size: 16px;
      margin: 0;
    }
    .inclusiv-widget-close {
      background: none;
      border: none;
      color: #71717a;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .inclusiv-widget-close:hover {
      color: white;
    }
    .inclusiv-widget-content {
      padding: 16px;
      overflow-y: auto;
      max-height: calc(80vh - 120px);
    }
    .inclusiv-widget-section {
      margin-bottom: 16px;
    }
    .inclusiv-widget-section-title {
      color: #a1a1aa;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .inclusiv-widget-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: #27272a;
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .inclusiv-widget-option:hover {
      background: #3f3f46;
    }
    .inclusiv-widget-option-label {
      color: white;
      font-size: 14px;
    }
    .inclusiv-widget-toggle {
      width: 44px;
      height: 24px;
      background: #3f3f46;
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .inclusiv-widget-toggle.active {
      background: ${primaryColor};
    }
    .inclusiv-widget-toggle::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }
    .inclusiv-widget-toggle.active::after {
      transform: translateX(20px);
    }
    .inclusiv-widget-slider {
      width: 100%;
      height: 6px;
      background: #3f3f46;
      border-radius: 3px;
      margin-top: 8px;
      appearance: none;
      cursor: pointer;
    }
    .inclusiv-widget-slider::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      background: ${primaryColor};
      border-radius: 50%;
      cursor: pointer;
    }
    .inclusiv-widget-footer {
      padding: 12px 16px;
      border-top: 1px solid #27272a;
      text-align: center;
    }
    .inclusiv-widget-footer a {
      color: #71717a;
      font-size: 11px;
      text-decoration: none;
    }
    .inclusiv-widget-footer a:hover {
      color: ${primaryColor};
    }
    .inclusiv-widget-reset {
      width: 100%;
      padding: 10px;
      background: #27272a;
      border: none;
      border-radius: 8px;
      color: #a1a1aa;
      font-size: 13px;
      cursor: pointer;
      margin-top: 8px;
    }
    .inclusiv-widget-reset:hover {
      background: #3f3f46;
      color: white;
    }

    /* Accessibility modifications */
    body.inclusiv-large-text { font-size: 120% !important; }
    body.inclusiv-larger-text { font-size: 140% !important; }
    body.inclusiv-high-contrast { filter: contrast(1.3) !important; }
    body.inclusiv-dark-contrast { filter: invert(1) hue-rotate(180deg) !important; }
    body.inclusiv-dark-contrast img { filter: invert(1) hue-rotate(180deg) !important; }
    body.inclusiv-highlight-links a { outline: 3px solid ${primaryColor} !important; outline-offset: 2px !important; }
    body.inclusiv-large-cursor, body.inclusiv-large-cursor * { cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="%23000" d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 4.702z"/></svg>') 0 0, auto !important; }
    body.inclusiv-dyslexia-font { font-family: 'OpenDyslexic', 'Comic Sans MS', cursive !important; letter-spacing: 0.1em !important; word-spacing: 0.2em !important; }
    body.inclusiv-line-height { line-height: 2 !important; }
    body.inclusiv-pause-animations *, body.inclusiv-pause-animations *::before, body.inclusiv-pause-animations *::after { animation-play-state: paused !important; transition: none !important; }
    body.inclusiv-reading-guide { cursor: crosshair !important; }
  `;

  // Create style element
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // State
  const state = {
    isOpen: false,
    settings: JSON.parse(localStorage.getItem('inclusiv-settings') || '{}')
  };

  // Save settings
  function saveSettings() {
    localStorage.setItem('inclusiv-settings', JSON.stringify(state.settings));
  }

  // Apply settings
  function applySetting(key, value) {
    const classMap = {
      largeText: 'inclusiv-large-text',
      largerText: 'inclusiv-larger-text',
      highContrast: 'inclusiv-high-contrast',
      darkContrast: 'inclusiv-dark-contrast',
      highlightLinks: 'inclusiv-highlight-links',
      largeCursor: 'inclusiv-large-cursor',
      dyslexiaFont: 'inclusiv-dyslexia-font',
      lineHeight: 'inclusiv-line-height',
      pauseAnimations: 'inclusiv-pause-animations',
      readingGuide: 'inclusiv-reading-guide'
    };

    const className = classMap[key];
    if (className) {
      if (value) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    }
    state.settings[key] = value;
    saveSettings();
    updatePanel();
  }

  // Reset all settings
  function resetSettings() {
    Object.keys(state.settings).forEach(key => {
      applySetting(key, false);
    });
    state.settings = {};
    saveSettings();
    updatePanel();
  }

  // Create trigger button
  const trigger = document.createElement('button');
  trigger.className = 'inclusiv-widget-trigger';
  trigger.setAttribute('aria-label', 'Open accessibility settings');
  trigger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>';
  document.body.appendChild(trigger);

  // Create panel
  const panel = document.createElement('div');
  panel.className = 'inclusiv-widget-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Accessibility settings');
  document.body.appendChild(panel);

  // Update panel content
  function updatePanel() {
    panel.innerHTML = `
      <div class="inclusiv-widget-header">
        <h2 class="inclusiv-widget-title">Accessibility Settings</h2>
        <button class="inclusiv-widget-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="inclusiv-widget-content">
        <div class="inclusiv-widget-section">
          <div class="inclusiv-widget-section-title">Content</div>
          <div class="inclusiv-widget-option" data-setting="largeText">
            <span class="inclusiv-widget-option-label">Large Text (120%)</span>
            <div class="inclusiv-widget-toggle ${state.settings.largeText ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="largerText">
            <span class="inclusiv-widget-option-label">Larger Text (140%)</span>
            <div class="inclusiv-widget-toggle ${state.settings.largerText ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="lineHeight">
            <span class="inclusiv-widget-option-label">Increased Line Height</span>
            <div class="inclusiv-widget-toggle ${state.settings.lineHeight ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="dyslexiaFont">
            <span class="inclusiv-widget-option-label">Dyslexia-Friendly Font</span>
            <div class="inclusiv-widget-toggle ${state.settings.dyslexiaFont ? 'active' : ''}"></div>
          </div>
        </div>
        <div class="inclusiv-widget-section">
          <div class="inclusiv-widget-section-title">Color & Contrast</div>
          <div class="inclusiv-widget-option" data-setting="highContrast">
            <span class="inclusiv-widget-option-label">High Contrast</span>
            <div class="inclusiv-widget-toggle ${state.settings.highContrast ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="darkContrast">
            <span class="inclusiv-widget-option-label">Invert Colors</span>
            <div class="inclusiv-widget-toggle ${state.settings.darkContrast ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="highlightLinks">
            <span class="inclusiv-widget-option-label">Highlight Links</span>
            <div class="inclusiv-widget-toggle ${state.settings.highlightLinks ? 'active' : ''}"></div>
          </div>
        </div>
        <div class="inclusiv-widget-section">
          <div class="inclusiv-widget-section-title">Navigation</div>
          <div class="inclusiv-widget-option" data-setting="largeCursor">
            <span class="inclusiv-widget-option-label">Large Cursor</span>
            <div class="inclusiv-widget-toggle ${state.settings.largeCursor ? 'active' : ''}"></div>
          </div>
          <div class="inclusiv-widget-option" data-setting="pauseAnimations">
            <span class="inclusiv-widget-option-label">Pause Animations</span>
            <div class="inclusiv-widget-toggle ${state.settings.pauseAnimations ? 'active' : ''}"></div>
          </div>
        </div>
        <button class="inclusiv-widget-reset">Reset All Settings</button>
      </div>
      ${showBranding ? '<div class="inclusiv-widget-footer"><a href="https://tryinclusiv.com/widget" target="_blank" rel="noopener">Powered by Inclusiv</a></div>' : ''}
    `;

    // Add event listeners
    panel.querySelector('.inclusiv-widget-close').addEventListener('click', togglePanel);
    panel.querySelector('.inclusiv-widget-reset').addEventListener('click', resetSettings);
    panel.querySelectorAll('.inclusiv-widget-option').forEach(option => {
      option.addEventListener('click', () => {
        const setting = option.dataset.setting;
        applySetting(setting, !state.settings[setting]);
      });
    });
  }

  // Toggle panel
  function togglePanel() {
    state.isOpen = !state.isOpen;
    panel.classList.toggle('open', state.isOpen);
    trigger.setAttribute('aria-expanded', state.isOpen);
  }

  // Event listeners
  trigger.addEventListener('click', togglePanel);

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isOpen) {
      togglePanel();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (state.isOpen && !panel.contains(e.target) && !trigger.contains(e.target)) {
      togglePanel();
    }
  });

  // Apply saved settings on load
  Object.keys(state.settings).forEach(key => {
    if (state.settings[key]) {
      applySetting(key, true);
    }
  });

  // Initialize panel
  updatePanel();

  // Track widget load (for analytics)
  if (typeof fetch !== 'undefined') {
    fetch('https://tryinclusiv.com/api/widget/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: window.location.hostname,
        event: 'load'
      })
    }).catch(() => {});
  }
})();
