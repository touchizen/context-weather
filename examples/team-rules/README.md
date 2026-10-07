# Team Rules · 팀 규칙 예시 모드

Claude Code를 켤 때 이 폴더를 불러오면 입력창 위에 `팀 규칙 ON`이 표시돼. 직접 입력한 요청에 아래 규칙을 추가 문맥으로 붙여 줘.

- 수정 계획을 한국어로 먼저 설명하고 사용자 승인을 기다리기
- 승인 전에는 파일을 변경하지 않기
- 승인 후 수정이 끝나면 관련 검사 실행하기

## 실행

저장소 루트 폴더에서 한 줄씩 실행해:

```sh
claude plugin validate ./examples/team-rules
claude --plugin-dir ./examples/team-rules
```

대화창에 `코드 고쳐 줘`처럼 요청하면 모드가 붙인 규칙이 확인 로그로 나타나. 기존 요청 글자와 기존 추가 문맥은 보존해. 백그라운드 알림에는 규칙을 붙이지 않아.

로그는 모드가 기록한 내용이며 Claude의 답변이 아니야. 모델이 읽는 추가 문맥은 대화창의 별도 사용자 메시지로 표시되지 않아. 규칙을 전달하는 예시이므로 도구 접근을 강제로 막는 권한 기능으로 생각하면 안 돼.

## 코드와 검사

`hooks/register.tsx`의 `RULE` 문자열을 바꾸면 규칙을 변경할 수 있어. `$.ui.log()` 줄은 확인용 화면 로그이며 실제 모델 문맥은 `next({...e, context: ...})`로 전달해.

```sh
claude plugin test ./examples/team-rules
```

2개 검사는 요청·기존 문맥을 유지하며 승인 규칙을 추가하는지, 백그라운드 알림을 바꾸지 않는지 확인해. 실제 촬영은 macOS / Claude Code 2.1.292에서 규칙 주입까지 확인했어. 계정 주간 한도로 이후 답변 생성은 촬영하지 않았어.

출처: [공식 Mods 이벤트 문서](https://code.claude.com/docs/en/plugins/mods/events#rewrite-or-add-to-a-prompt). 이 예시 소스는 저장소 루트의 MIT 라이선스를 따라.
