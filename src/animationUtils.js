/**
 * TRAVEL BUDDY - ANIMATION UTILITIES
 * Lightweight JavaScript helpers for premium animations
 */

// ============================================
// 1. PARALLAX SCROLL CONTROLLER
// ============================================

export class ParallaxController {
  constructor() {
    this.elements = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768;
    this.ticking = false;
    
    if (!this.isReducedMotion && !this.isMobile) {
      this.init();
    }
  }

  init() {
    // Find all parallax elements
    this.elements = Array.from(document.querySelectorAll('.parallax-bg, .hero-parallax-bg'));
    
    // Bind scroll handler
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    
    // Initial update
    this.update();
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Only apply parallax if element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollPercent = (scrollY - elementTop + viewportHeight) / (elementHeight + viewportHeight);
        const translateY = (scrollPercent - 0.5) * 50; // Adjust multiplier for intensity
        
        element.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}

// ============================================
// 2. SCROLL REVEAL (Intersection Observer)
// ============================================

export class ScrollReveal {
  constructor(options = {}) {
    this.options = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
      ...options
    };
    
    this.observer = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!this.isReducedMotion) {
      this.init();
    } else {
      // If reduced motion, reveal all immediately
      this.revealAll();
    }
  }

  init() {
    this.observer = new IntersectionObserver(
      this.onIntersect.bind(this),
      this.options
    );

    // Observe all elements with .scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => this.observer.observe(el));
  }

  onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed
        this.observer.unobserve(entry.target);
      }
    });
  }

  revealAll() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => el.classList.add('revealed'));
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// ============================================
// 3. PROGRESS STEPPER ANIMATION
// ============================================

export class ProgressStepper {
  constructor(containerId, steps) {
    this.container = document.getElementById(containerId);
    this.steps = steps;
    this.currentStep = 0;
    this.render();
  }

  setStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return;
    
    this.currentStep = stepIndex;
    this.updateProgress();
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.setStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.setStep(this.currentStep - 1);
    }
  }

  render() {
    const html = `
      <div class="progress-stepper">
        <div class="progress-line">
          <div class="progress-line-active" style="width: 0%"></div>
        </div>
        ${this.steps.map((step, index) => `
          <div class="progress-step">
            <div class="progress-step-circle ${index === 0 ? 'active' : ''}" data-step="${index}">
              ${index + 1}
            </div>
            <span class="progress-step-label">${step}</span>
          </div>
        `).join('')}
      </div>
    `;
    
    this.container.innerHTML = html;
  }

  updateProgress() {
    const circles = this.container.querySelectorAll('.progress-step-circle');
    const progressLine = this.container.querySelector('.progress-line-active');
    
    circles.forEach((circle, index) => {
      circle.classList.remove('active', 'completed');
      
      if (index < this.currentStep) {
        circle.classList.add('completed');
        circle.innerHTML = '✓';
      } else if (index === this.currentStep) {
        circle.classList.add('active');
        circle.innerHTML = index + 1;
      } else {
        circle.innerHTML = index + 1;
      }
    });

    // Animate progress line
    const progressPercent = (this.currentStep / (this.steps.length - 1)) * 100;
    progressLine.style.width = `${progressPercent}%`;
  }
}

// ============================================
// 4. TOAST NOTIFICATION SYSTEM
// ============================================

export class ToastNotification {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.style.cssText = `
      background: ${this.getColor(type)};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
      font-weight: 500;
      max-width: 400px;
      pointer-events: auto;
      cursor: pointer;
    `;
    toast.textContent = message;

    this.container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.classList.add('exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.classList.add('exit');
      setTimeout(() => toast.remove(), 300);
    });
  }

  getColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  success(message, duration) {
    this.show(message, 'success', duration);
  }

  error(message, duration) {
    this.show(message, 'error', duration);
  }

  warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// ============================================
// 5. BUTTON RIPPLE EFFECT
// ============================================

export function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

// ============================================
// 6. NUMBER COUNTER ANIMATION
// ============================================

export function animateCounter(element, target, duration = 1000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.round(current).toLocaleString();
  }, 16);
}

// ============================================
// 7. SMOOTH SCROLL TO ELEMENT
// ============================================

export function smoothScrollTo(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// ============================================
// 8. CARD TILT EFFECT (Mouse Move)
// ============================================

export class CardTilt {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxTilt: 10,
      perspective: 1000,
      scale: 1.05,
      ...options
    };
    
    this.init();
  }

  init() {
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.perspective = `${this.options.perspective}px`;

    this.element.addEventListener('mouseenter', this.onEnter.bind(this));
    this.element.addEventListener('mousemove', this.onMove.bind(this));
    this.element.addEventListener('mouseleave', this.onLeave.bind(this));
  }

  onEnter() {
    this.element.style.transition = 'none';
  }

  onMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -this.options.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.options.maxTilt;
    
    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})
    `;
  }

  onLeave() {
    this.element.style.transition = 'transform 0.3s ease-out';
    this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

// ============================================
// 9. LAZY LOAD IMAGES WITH FADE IN
// ============================================

export class LazyImageLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      this.onIntersect.bind(this),
      { rootMargin: '50px' }
    );

    this.images = document.querySelectorAll('img[data-src]');
    this.images.forEach(img => this.observer.observe(img));
  }

  onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.style.opacity = '0';
        
        img.onload = () => {
          img.style.transition = 'opacity 0.3s ease-in';
          img.style.opacity = '1';
          img.removeAttribute('data-src');
        };
        
        this.observer.unobserve(img);
      }
    });
  }
}

// ============================================
// 10. INITIALIZE ALL ANIMATIONS
// ============================================

export function initAnimations() {
  // Initialize parallax
  if (window.innerWidth >= 768) {
    new ParallaxController();
  }

  // Initialize scroll reveal
  new ScrollReveal();

  // Initialize lazy loading
  new LazyImageLoader();

  // Add ripple to all buttons with class
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    addRippleEffect(btn);
  });

  console.log('✨ Premium animations initialized');
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
