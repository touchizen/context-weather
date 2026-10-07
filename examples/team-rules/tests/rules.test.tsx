import {expect, test} from 'claude-code/testing'

test('preserves the request and existing context while adding the approval rule', async ($, on) => {
  let received: {text: string; context?: readonly string[]} | undefined
  on('ui.log', () => ({value: undefined}))
  on('prompt.submit', (_$, event) => {
    received = event
    return {text: event.text}
  })
  await $.prompt.submit({text: 'calculator.py의 add 오류를 고쳐 줘.', context: ['existing context'], wait: false, origin: {kind: 'composer'}})
  expect(received?.text).toBe('calculator.py의 add 오류를 고쳐 줘.')
  expect(received?.context?.[0]).toBe('existing context')
  expect(received?.context?.[1]).toContain('승인을 기다리세요')
})

test('leaves background notifications unchanged', async ($, on) => {
  let received: {context?: readonly string[]} | undefined
  on('prompt.submit', (_$, event) => {
    received = event
    return {text: event.text}
  })
  await $.prompt.submit({text: 'task done', context: ['original'], wait: false, origin: {kind: 'task-notification'}})
  expect(received?.context).toEqual(['original'])
})
