# Context Weather · 컨텍스트 날씨

Claude Code의 대화 공간 사용량을 ☀️ 🌤️ ☁️ ⛈️ 아이콘, 퍼센트, 토큰 수로 보여 주는 모드야. **실제 기상 예보가 아니야.** 영상에서 한국어로 만들고 수정한 소스를 공개했어.

- 30% 미만: ☀️ / 30% 이상: 🌤️ / 50% 이상: ☁️ / 70% 이상: ⛈️
- 표시 예: `☀️ 6% · 55k / 1.0M tokens`
- Claude Code 2.1.287 이상. 실제 확인: macOS, Claude Code 2.1.290. Windows는 사용 안내를 제공하며 이 저장소의 실제 기기 검증은 하지 않았어.

## 처음 따라 하기

1. Windows: 시작 메뉴에서 **PowerShell**을 검색해 열어. Windows Terminal이 있다면 그 안의 PowerShell 탭도 좋아. Mac: **Command + Space**를 누르고 **터미널**을 검색해 열어.
2. Claude Code가 없다면 [공식 설치 안내](https://code.claude.com/docs/en/setup)의 운영체제별 명령으로 먼저 설치해. 설치 후 터미널을 새로 열어. 사용 가능한 계정으로 로그인해야 해.
3. 이 페이지의 **Code → Download ZIP**을 누르고 압축을 풀어. `context-weather-main` 폴더가 모드 폴더야. Git을 설치할 필요 없이 소스를 받을 수 있어.
4. 터미널에 `cd `를 입력하고 압축을 푼 폴더의 전체 경로를 큰따옴표로 붙여 넣은 뒤 Enter를 눌러. Windows 파일 탐색기는 주소 표시줄, Mac Finder는 폴더를 오른쪽 클릭한 뒤 Option 키를 누르면 나오는 ‘경로 이름으로 복사’를 이용해. 예시 경로의 사용자 이름과 다운로드 위치는 실제 위치로 바꿔.

Windows PowerShell 예시:

```powershell
cd "C:\Users\사용자이름\Downloads\context-weather-main"
claude plugin validate .
claude --plugin-dir .
```

Mac 터미널 예시:

```sh
cd "$HOME/Downloads/context-weather-main"
claude plugin validate .
claude --plugin-dir .
```

**한 줄씩 입력하고 Enter를 눌러.** `validate`는 소스에 어떤 훅과 API 호출이 있는지 검토하는 명령이야. 안전 인증은 아니야. `--plugin-dir .`은 지금 폴더의 모드를 이번 세션에 불러오는 뜻이야.

Git 사용자는 아래처럼 받아도 돼:

```sh
git clone https://github.com/touchizen/context-weather.git
cd context-weather
claude plugin validate .
claude --plugin-dir .
```

## 수정과 끄기

`hooks/register.tsx`에서 `STORM_AT = 70`을 바꾸면 폭풍 기준을 조정할 수 있어. Claude에게 이 폴더의 모드를 수정해 달라고 요청해도 돼. 직접 만든 개발 모드는 생성한 세션에서만 자동으로 불러와지므로, 파일 탐색기/Finder로 폴더를 보관하고 다음에는 `--plugin-dir`로 열어.

문제가 생기면 세션을 종료하고 `claude --safe-mode`로 시작해. 설치한 모드뿐 아니라 다른 사용자 지정도 함께 비활성화돼. 내장 모드는 유지돼.

## 영상에 소개한 소스 URL 모두 보기

| 기능 | 원본 소스 |
| --- | --- |
| 영상에서 만든 컨텍스트 날씨 | [touchizen/context-weather](https://github.com/touchizen/context-weather) |
| 삭제 전 파일 확인 · Blast Radius | [Anthropic 공식 샘플](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius) |
| 공식 Token Weather 예시 | [Anthropic 공식 샘플](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/token-weather) |
| 답변을 부드럽게 · smooth-stream | [KyongSik-Yoon/claude-mods](https://github.com/KyongSik-Yoon/claude-mods) |
| 운동 기록 · Terminal Gym | [DrumAndCode/terminal-gym](https://github.com/DrumAndCode/terminal-gym) |

Blast Radius 샘플은 Bash 도구 호출을 감시해. Windows에서 같은 삭제 확인 예시를 따라 하려면 [Git for Windows](https://git-scm.com/downloads/win)를 설치해 Bash 도구를 사용할 수 있게 해야 해. PowerShell 도구의 삭제 호출까지 보호한다고 가정하면 안 돼. 컨텍스트 날씨 자체에는 Git/Bash 설치가 필요하지 않아.

다른 제작자의 코드는 각 원본 저장소에서 확인해. 이 저장소에는 영상에서 만든 컨텍스트 날씨 소스만 포함돼.

## 접근 범위

현재 소스는 `$.session.usage()`와 `$.ui.resolve()`로 사용량을 읽어 표시해. 파일·네트워크·환경 변수·외부 프로그램 호출은 작성하지 않았어. 모드 자체는 사용자 권한으로 실행되므로 소스와 작성자를 확인한 뒤 켜.

## 라이선스

이 저장소의 context-weather 소스는 MIT. 다른 모드에는 각 원본의 라이선스가 적용돼.
