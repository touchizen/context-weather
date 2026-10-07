import type { Register } from 'claude-code'

export const STORM_AT = 70

export const weather = (percent: number): string => {
  if (percent >= STORM_AT) return '⛈️'
  if (percent >= 50) return '☁️'
  if (percent >= 30) return '🌤️'
  return '☀️'
}

export const formatTokens = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n)

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const { context } = await $.session.usage()

    if (context.percent === null || context.percent === undefined) {
      return next(e)
    }

    const percent = Math.round(context.percent)
    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text color={percent >= STORM_AT ? 'red' : undefined} dimColor={percent < STORM_AT}>
          {weather(percent)} {percent}% · {formatTokens(context.tokens ?? 0)} / {formatTokens(context.window)} tokens
        </Text>
      </Box>
    )
  })
}
