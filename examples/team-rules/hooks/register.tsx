import type {Register} from 'claude-code'

export const RULE = '팀 규칙: 파일을 수정하기 전에 한국어로 수정 계획을 먼저 설명하고 사용자의 승인을 기다리세요. 승인받기 전에는 파일을 변경하지 마세요. 승인 후 수정이 끝나면 관련 검사를 실행하세요.'

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    if (e.origin.kind !== 'composer') return next(e)
    $.ui.log('팀 규칙 자동 추가: 계획 먼저 → 승인 후 수정')
    $.ui.log('자동 추가 규칙 1: 수정 계획을 한국어로 먼저 설명해 주세요.')
    $.ui.log('자동 추가 규칙 2: 사용자 승인 전에는 파일을 변경하지 마세요.')
    $.ui.log('자동 추가 규칙 3: 수정 후 관련 검사를 실행해 주세요.')
    return next({...e, context: [...(e.context ?? []), RULE]})
  })
  on('ui.render', {component: 'AbovePrompt'}, ($, e) => {
    const {Box, Text} = $.ui.resolve(e)
    return <Box><Text color="green">팀 규칙 ON · 계획 먼저 → 승인 후 수정 → 관련 검사</Text></Box>
  })
}
