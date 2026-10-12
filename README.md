# Heekwan Lee VFX Portfolio

Static GitHub Pages portfolio. Google Sans typography; hover-only exterior Sparkles; native video playback.

## Media
- Source: Heekwan_Lee_GFX_Portfolio_05.mp4, 3840x2160, 60fps.
- Background and fullscreen: reel-4k.m3u8 (4K/60fps with audio; background muted).
- Hover previews: reel-2k.m3u8 (2560x1440/60fps, no audio).
- HLS segments are hosted beside the playlists. Keep every referenced .ts file.
- hls.js provides playback on MSE browsers; Safari uses native HLS when needed.
- Fullscreen uses the browser Fullscreen API. Embedded browsers without it use a viewport-sized player.
- Realtime VFX starts at 0s, Film VFX at 70s. All five temporary shots use this same reel.

## Update
Change videos.js to connect final per-shot preview, full video and poster URLs. MP4/WebM and HLS supported.
Source for React effects is in effects-source.zip. Existing profile copy remains unchanged.

