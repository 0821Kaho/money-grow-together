
// Utility for game sound effects

class TontonGameSoundEffect {
  private static audioContext: AudioContext | null = null;
  private static sounds: Record<string, AudioBuffer> = {};
  private static isMuted: boolean = false;
  
  // Initialize audio context
  static initialize() {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        TontonGameSoundEffect.audioContext = new AudioContext();
      }
    } catch (error) {
      console.error("Web Audio API is not supported in this browser.");
    }
  }
  
  // Load a sound
  static async loadSound(name: string, url: string): Promise<void> {
    if (!TontonGameSoundEffect.audioContext) {
      TontonGameSoundEffect.initialize();
    }
    
    if (!TontonGameSoundEffect.audioContext) return;
    
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await TontonGameSoundEffect.audioContext.decodeAudioData(arrayBuffer);
      
      TontonGameSoundEffect.sounds[name] = audioBuffer;
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error);
    }
  }
  
  // Play a sound
  static play(name: string, options: { volume?: number; loop?: boolean } = {}) {
    if (TontonGameSoundEffect.isMuted || !TontonGameSoundEffect.audioContext || !TontonGameSoundEffect.sounds[name]) {
      return null;
    }
    
    try {
      const source = TontonGameSoundEffect.audioContext.createBufferSource();
      source.buffer = TontonGameSoundEffect.sounds[name];
      source.loop = options.loop || false;
      
      // Volume control
      const gainNode = TontonGameSoundEffect.audioContext.createGain();
      gainNode.gain.value = options.volume !== undefined ? options.volume : 1;
      
      source.connect(gainNode);
      gainNode.connect(TontonGameSoundEffect.audioContext.destination);
      
      source.start();
      return source;
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
      return null;
    }
  }
  
  // Play simple sounds without preloading (uses Audio API)
  static playSimple(url: string, volume: number = 1.0) {
    if (TontonGameSoundEffect.isMuted) return;
    
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      
      // Try to play with user interaction handling
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback prevented by browser", error);
        });
      }
    } catch (error) {
      console.error("Error playing simple sound:", error);
    }
  }
  
  // Toggle mute
  static toggleMute(): boolean {
    TontonGameSoundEffect.isMuted = !TontonGameSoundEffect.isMuted;
    return TontonGameSoundEffect.isMuted;
  }
  
  // Set mute state
  static setMute(isMuted: boolean): void {
    TontonGameSoundEffect.isMuted = isMuted;
  }
  
  // Check if sound is muted
  static isSoundMuted(): boolean {
    return TontonGameSoundEffect.isMuted;
  }
  
  // Common game sound effects
  static playSuccess() {
    this.playSimple("/sounds/success.mp3", 0.5);
  }
  
  static playClick() {
    this.playSimple("/sounds/click.mp3", 0.3);
  }
  
  static playError() {
    this.playSimple("/sounds/error.mp3", 0.4);
  }
  
  static playLevelUp() {
    this.playSimple("/sounds/level-up.mp3", 0.6);
  }
  
  static playCoin() {
    this.playSimple("/sounds/coin.mp3", 0.5);
  }
}

export default TontonGameSoundEffect;
