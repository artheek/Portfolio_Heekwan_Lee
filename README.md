# Heekwan Lee — VFX Portfolio

GitHub Pages용 정적 웹사이트입니다. 빌드나 패키지 설치 없이 동작합니다.

## 배포

1. 이 폴더 안의 파일을 `artheek/Portfolio_Heekwan_Lee` 저장소의 `main` 브랜치 루트에 업로드합니다.
2. Settings → Pages → Build and deployment에서 **Deploy from a branch**를 선택합니다.
3. Branch는 **main**, 폴더는 **/(root)**로 지정한 다음 Save를 누릅니다.
4. 배포 완료 후 주소: https://artheek.github.io/Portfolio_Heekwan_Lee/

## 콘텐츠 변경

- `index.html`: 소개, 공개 연락처, 작업 카드
- `style.css`: 색상과 레이아웃
- `script.js`: 연도 및 대표 이미지 오류 처리. 영상 시작 시각은 `index.html`의 링크에서 변경합니다.
- 영상 링크: https://www.youtube.com/watch?v=g9bOLQV_CiQ

작업 카드는 실제 작품 스틸로 오인되지 않도록 타이포그래피로 구성했습니다. 개별 샷 영상 제공 시 카드별 영상 ID와 설명을 추가할 수 있습니다.

대표 이미지는 YouTube, 폰트는 Google Fonts에서 불러옵니다. 영상 임베드는 로컬 검증 환경에서 재생 제한이 확인되어 YouTube 새 탭 링크로 구성했습니다. 게임 VFX는 0초, 영상 VFX는 70초부터 재생합니다.

## 로컬 확인

`python -m http.server 8765` 실행 후 http://localhost:8765 에서 확인합니다.

## 개별 영상 추가

`videos.js`에서 각 항목의 `preview`(짧은 MP4/WebM), `poster`(대표 이미지), `url`(전체 영상)을 입력합니다. 영상 칸은 데스크톱 3열, 태블릿 2열, 모바일 1열입니다. 파일이 없는 항목은 추가 예정으로 표시합니다. 미리보기는 무음 반복 재생되며 마우스가 벗어나거나 키보드 포커스가 이동하면 정지합니다. 동작 줄이기 설정에서는 자동 재생하지 않습니다.
## 효과 컴포넌트

- 게임/영상 카드: GlowEffect (static 컬러 Glow)
- 배경: SparklesCore (낮은 밀도, 30fps, reduced-motion 대응)
- 빌드된 effects.js와 effects.css를 사용합니다.
- React/TypeScript/Tailwind 원본과 재빌드 방법은 effects-source.zip에 포함되어 있습니다.
