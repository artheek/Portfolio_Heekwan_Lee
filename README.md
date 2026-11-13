# Heekwan Lee VFX Portfolio

Static GitHub Pages portfolio. Existing Google Sans typography, exterior hover Sparkles, portfolio grid, scroll transitions and profile layout are preserved.

## Media

- Main reel: Heekwan_Lee_GFX_Portfolio_06.mp4. The 4K/60fps background autoplays muted from 2 seconds; opening the full reel starts at 0 seconds with audio.
- Realtime VFX: only_gfx.mp4, starting at 0 seconds. 4K/60fps fullscreen and 2560x1440/60fps muted hover preview, looping to 0.
- Film VFX: Film_Reel, starting and looping at 0 seconds; existing media retained.
- Individual shots: Arknight_cinematic, basic_slash, fire_slash, SF_FPS, blood_magical, water_slash. Six gapless cards, with 4K playback and muted 2K hover previews.
- Fullscreen viewer has a persistent seek bar, elapsed/total time, play/pause and mute controls. Where browser fullscreen is unavailable, the same viewer fills the viewport.
- HLS playlists reference adjacent TS segments. Upload all segments and playlists together. Version queries avoid stale segment caches after media replacement.

## Updating

Edit videos.js to change media mappings. hls.js supports HLS on MSE browsers; Safari can use native HLS. React effects source is preserved in effects-source.zip.
