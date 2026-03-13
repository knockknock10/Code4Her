export class TriggerDetector {
  constructor(onTrigger) {
    this.onTrigger = onTrigger;
    this.tapCount = 0;
    this.tapTimeout = null;
    
    // Shake detection vars
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;
    this.shakeThreshold = 15;
    
    this.handleMotion = this.handleMotion.bind(this);
  }

  // Tap Pattern (5 quick taps)
  handleTap() {
    this.tapCount++;
    if (this.tapCount >= 5) {
      this.onTrigger('tap_pattern');
      this.resetTaps();
    }
    
    clearTimeout(this.tapTimeout);
    this.tapTimeout = setTimeout(() => this.resetTaps(), 1000); // Taps must be within 1 sec
  }

  resetTaps() {
    this.tapCount = 0;
  }

  // Shake gesture
  startShakeDetection() {
    if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('devicemotion', this.handleMotion, false);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('devicemotion', this.handleMotion, false);
      }
    }
  }

  stopShakeDetection() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', this.handleMotion, false);
    }
  }

  handleMotion(event) {
    if (!event.accelerationIncludingGravity) return;
    
    const { x, y, z } = event.accelerationIncludingGravity;
    
    if (this.lastX !== null) {
      const deltaX = Math.abs(this.lastX - x);
      const deltaY = Math.abs(this.lastY - y);
      const deltaZ = Math.abs(this.lastZ - z);

      if (deltaX > this.shakeThreshold || deltaY > this.shakeThreshold || deltaZ > this.shakeThreshold) {
        this.onTrigger('shake_gesture');
        // Debounce shake triggers
        this.stopShakeDetection();
        setTimeout(() => this.startShakeDetection(), 5000);
      }
    }
    
    this.lastX = x;
    this.lastY = y;
    this.lastZ = z;
  }
}
