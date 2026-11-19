/**
 * ============================================================================
 * FocusFlow - Dynamic Context Adaptation Engine
 * Adapts visual spectrum, luminance, and layout complexity to time of day
 * and user-reported cognitive energy.
 * ============================================================================
 */

class ContextEngine {
  constructor() {
    this.overrideMode = localStorage.getItem('focusflow_theme_pref') || 'auto'; // 'auto' | 'morning' | 'afternoon' | 'night'
    this.currentContext = 'afternoon';
    this.fatigueLevel = 'normal'; // 'low' | 'normal' | 'high'
    this.ambientLightSensorAvailable = false;
    this.listeners = [];
    this.checkInterval = null;
  }

  init() {
    this.evaluateContext();

    // Check time every 60 seconds for seamless circadian transitions
    this.checkInterval = setInterval(() => {
      if (this.overrideMode === 'auto') {
        this.evaluateContext();
      }
    }, 60000);

    // Optional Ambient Light Sensor API support
    if ('AmbientLightSensor' in window) {
      try {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener('reading', () => {
          this.ambientLightSensorAvailable = true;
          this.handleLuxReading(sensor.illuminance);
        });
        sensor.start();
      } catch (err) {
        this.ambientLightSensorAvailable = false;
      }
    }
  }

  handleLuxReading(lux) {
    if (this.overrideMode !== 'auto') return;
    if (lux < 40 && this.currentContext !== 'night') {
      this.applyContext('night', true);
    }
  }

  evaluateContext() {
    if (this.overrideMode !== 'auto') {
      this.applyContext(this.overrideMode, false);
      return;
    }

    const hour = new Date().getHours();
    let detectedContext = 'afternoon';

    if (hour >= 5 && hour < 12) {
      detectedContext = 'morning';
    } else if (hour >= 12 && hour < 18) {
      detectedContext = 'afternoon';
    } else {
      detectedContext = 'night';
    }

    this.applyContext(detectedContext, true);
  }

  applyContext(context, isAuto = false) {
    const prevContext = this.currentContext;
    this.currentContext = context;

    document.documentElement.setAttribute('data-context', context);
    document.documentElement.setAttribute('data-fatigue', this.fatigueLevel);

    this.adaptLayoutComplexity(context, this.fatigueLevel);

    this.notify({
      context: this.currentContext,
      previousContext: prevContext,
      isAuto,
      overrideMode: this.overrideMode,
      fatigueLevel: this.fatigueLevel,
      timestamp: new Date()
    });
  }

  /**
   * Adapts workspace card density based on circadian phase and cognitive fatigue.
   */
  adaptLayoutComplexity(context, fatigue) {
    const morningCards = document.querySelectorAll('.context-card-morning');
    const afternoonCards = document.querySelectorAll('.context-card-afternoon');
    const nightCards = document.querySelectorAll('.context-card-night');
    const complexityBadge = document.getElementById('layout-complexity-badge');
    const workspaceSection = document.getElementById('assignments-workspace-section');

    morningCards.forEach(el => el.classList.add('hidden'));
    afternoonCards.forEach(el => el.classList.add('hidden'));
    nightCards.forEach(el => el.classList.add('hidden'));

    if (fatigue === 'high') {
      if (complexityBadge) complexityBadge.textContent = 'Minimal Focus View';
      nightCards.forEach(el => el.classList.remove('hidden'));
      if (workspaceSection) workspaceSection.classList.add('fatigue-simplified');
      return;
    }

    if (workspaceSection) workspaceSection.classList.remove('fatigue-simplified');

    if (context === 'morning') {
      morningCards.forEach(el => el.classList.remove('hidden'));
      if (complexityBadge) complexityBadge.textContent = 'Morning Planning Mode';
    } else if (context === 'afternoon') {
      afternoonCards.forEach(el => el.classList.remove('hidden'));
      if (complexityBadge) complexityBadge.textContent = 'Deep Study Mode';
    } else {
      nightCards.forEach(el => el.classList.remove('hidden'));
      if (complexityBadge) complexityBadge.textContent = 'Evening Wind-Down';
    }
  }

  setOverride(mode) {
    this.overrideMode = mode;
    try {
      localStorage.setItem('focusflow_theme_pref', mode);
    } catch (e) {}
    this.evaluateContext();
  }

  setFatigueLevel(level) {
    this.fatigueLevel = level;
    document.documentElement.setAttribute('data-fatigue', level);
    this.adaptLayoutComplexity(this.currentContext, this.fatigueLevel);
    this.notify({
      context: this.currentContext,
      overrideMode: this.overrideMode,
      fatigueLevel: this.fatigueLevel,
      timestamp: new Date()
    });
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify(data) {
    this.listeners.forEach(cb => {
      try { cb(data); } catch (e) { console.error('Context listener error:', e); }
    });
  }
}

window.ContextEngine = new ContextEngine();
