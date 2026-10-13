# Heekwan Lee VFX Portfolio

Static GitHub Pages portfolio. Google Sans typography; hover-only exterior Sparkles; native video playback.

## Media
- Source: Heekwan_Lee_GFX_Portfolio_05.mp4, 3840x2160, 60fps.
- Background and fullscreen: reel-4k.m3u8 (4K/60fps with audio; background muted).
- Hover previews: reel-2k.m3u8 (2560x1440/60fps, no audio).
- HLS segments are hosted beside the playlists. Keep every referenced .ts file.
- hls.js provides playback on MSE browsers; Safari uses native HLS when needed.
- Fullscreen uses the browser Fullscreen API. Embedded browsers without it use a viewport-sized player.
- Realtime VFX uses GFX_Reel (gfx-4k.m3u8 / gfx-2k.m3u8), starts at 63s for click and preview; both preview and fullscreen loop back to 0s after the initial 63s start. Film VFX uses Film_Reel (film-4k.m3u8 / film-2k.m3u8), starts and loops at 0s. Individual shots use their matching 4K MP4 and 2560x1440 muted preview, ordered Arknight_cinematic, basic_slash, fire_slash, SF_FPS, blood_magical.

## Update
Change videos.js to connect final per-shot preview, full video and poster URLs. MP4/WebM and HLS supported.
Source for React effects is in effects-source.zip. Existing profile copy remains unchanged.

