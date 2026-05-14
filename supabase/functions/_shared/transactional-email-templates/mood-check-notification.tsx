import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'calmfalcon.ai'

interface MoodCheckNotificationProps {
  mood?: number
  moodLabel?: string
  moodEmoji?: string
  note?: string
  sessionId?: string
  submittedAt?: string
}

const MoodCheckNotificationEmail = ({
  mood,
  moodLabel,
  moodEmoji,
  note,
  sessionId,
  submittedAt,
}: MoodCheckNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New mood check: {moodEmoji} {moodLabel} ({mood}/5)
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New mood check on {SITE_NAME}</Heading>

        <Section style={moodBox}>
          <Text style={moodEmojiStyle}>{moodEmoji ?? '•'}</Text>
          <Text style={moodLabelStyle}>
            {moodLabel ?? 'Mood'} — {mood ?? '?'}/5
          </Text>
        </Section>

        {note ? (
          <>
            <Text style={label}>Anonymous note (email)</Text>
            <Text style={noteStyle}>“{note}”</Text>
          </>
        ) : (
          <Text style={muted}>No note left.</Text>
        )}

        <Hr style={hr} />

        <Text style={meta}>
          Submitted: {submittedAt ?? 'just now'}
          {sessionId ? ` • Session: ${sessionId}` : ''}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: MoodCheckNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New mood check: ${data.moodEmoji ?? ''} ${data.moodLabel ?? ''} (${data.mood ?? '?'}/5)`.trim(),
  displayName: 'Mood check notification',
  previewData: {
    mood: 4,
    moodLabel: 'Good',
    moodEmoji: '🙂',
    note: 'Feeling productive today, made progress on the project.',
    sessionId: 'abc123',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '20px',
  fontWeight: 600,
  color: '#0a0a0a',
  margin: '0 0 24px',
}
const moodBox = {
  padding: '20px',
  backgroundColor: '#f7f6f2',
  borderRadius: '12px',
  textAlign: 'center' as const,
  margin: '0 0 24px',
}
const moodEmojiStyle = { fontSize: '40px', margin: '0 0 8px', lineHeight: 1 }
const moodLabelStyle = {
  fontSize: '16px',
  fontWeight: 500,
  color: '#0a0a0a',
  margin: 0,
}
const label = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: '#888',
  margin: '0 0 6px',
}
const noteStyle = {
  fontSize: '15px',
  color: '#262626',
  lineHeight: 1.6,
  margin: '0 0 24px',
  fontStyle: 'italic' as const,
}
const muted = {
  fontSize: '14px',
  color: '#888',
  fontStyle: 'italic' as const,
  margin: '0 0 24px',
}
const hr = { borderColor: '#eee', margin: '24px 0' }
const meta = { fontSize: '12px', color: '#999', margin: 0 }
