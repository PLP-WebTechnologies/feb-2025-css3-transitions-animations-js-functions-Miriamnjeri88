document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const animationSpeedSelect = document.getElementById('animationSpeed');
    const lastAnimationTime = document.getElementById('lastAnimationTime');
    
    // Animation types
    const animations = ['spin', 'slide', 'grow'];
    let currentAnimationIndex = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Add click animation
        this.classList.add('grow');
        setTimeout(() => this.classList.remove('grow'), 500);
    });
    
    // Animation Button
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animations.forEach(anim => animatedElement.classList.remove(anim));
        
        // Apply current animation
        const currentAnim = animations[currentAnimationIndex];
        animatedElement.classList.add(currentAnim);
        
        // Update animation index for next click
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        
        // Save last animation time
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        lastAnimationTime.textContent = timeString;
        localStorage.setItem('lastAnimationTime', timeString);
        
        // Remove animation class after it completes
        setTimeout(() => {
            animatedElement.classList.remove(currentAnim);
        }, 1000);
    });
    
    // Animation Speed Selector
    animationSpeedSelect.addEventListener('change', function() {
        const speed = this.value;
        
        // Remove any existing speed classes
        document.body.classList.remove('slow', 'fast');
        
        // Apply selected speed (normal is default)
        if (speed !== 'normal') {
            document.body.classList.add(speed);
        }
        
        // Save speed preference
        localStorage.setItem('animationSpeed', speed);
    });
    
    // Load user preferences from localStorage
    function loadPreferences() {
        // Dark mode preference
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Animation speed preference
        const speed = localStorage.getItem('animationSpeed') || 'normal';
        animationSpeedSelect.value = speed;
        if (speed !== 'normal') {
            document.body.classList.add(speed);
        }
        
        // Last animation time
        const lastTime = localStorage.getItem('lastAnimationTime');
        if (lastTime) {
            lastAnimationTime.textContent = lastTime;
        }
    }
    
    // Initialize button animations
    setInterval(() => {
        themeToggle.classList.toggle('pulse');
        animateBtn.classList.toggle('bounce');
    }, 3000);
});