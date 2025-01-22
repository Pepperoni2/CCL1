
class SoundManager {
    constructor() {
        this.sounds = {}; // Store all sounds by name
        this.backgroundMusic = null; // Store background music instance
        this.isMuted = false; // Mute state
        this.globalVolume = 1.0; // Volume between 0 and 1
    }

    // Load a sound
    loadSound(name, src, isMusic = false) {
        const audio = new Audio(src);
        audio.loop = isMusic; // If it's music, set it to loop
        audio.volume = this.globalVolume;

        if (isMusic) {
            this.backgroundMusic = audio;
        } else {
            this.sounds[name] = audio;
        }
    }

    // Play a sound
    playSound(name) {
        if (this.isMuted || !this.sounds[name]) return;
        this.sounds[name].currentTime = 0; // Restart the sound
        this.sounds[name].play();
    }

    // Play background music
    playMusic() {
        if (this.isMuted || !this.backgroundMusic) return;
        this.backgroundMusic.play();
    }

    // Pause background music
    pauseMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    // Stop background music
    stopMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0; // Reset to start
        }
    }

    // Set global volume
    setVolume(volume) {
        this.globalVolume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.globalVolume;
        }
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.globalVolume;
        });
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            if (this.backgroundMusic) this.backgroundMusic.pause();
            Object.values(this.sounds).forEach(sound => sound.pause());
        } else {
            if (this.backgroundMusic) this.backgroundMusic.play();
        }
    }
}

// Usage example
// const soundManager = new SoundManager();

// Load sounds
// soundManager.loadSound('jump', 'sounds/jump.mp3');
// soundManager.loadSound('shoot', 'sounds/shoot.mp3');
// soundManager.loadSound('phase1', '../assets/sounds/MOL_HighAlert.mp3', true);

// Play sounds
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Space') {
//         soundManager.playSound('jump');
//     } else if (e.key === 'Enter') {
//         soundManager.playSound('shoot');
//     }
// });

// Control music
// document.getElementById('playMusic').addEventListener('click', () => soundManager.playMusic());
// document.getElementById('pauseMusic').addEventListener('click', () => soundManager.pauseMusic());
// document.getElementById('stopMusic').addEventListener('click', () => soundManager.stopMusic());

// Control volume and mute
// document.getElementById('volumeSlider').addEventListener('input', (e) => soundManager.setVolume(e.target.value));
// document.getElementById('muteButton').addEventListener('click', () => soundManager.toggleMute());

export { SoundManager };
