import { useId } from 'react'

// Brand-coloured channel icons, shared by the "Every Channel" card and the live demo section.

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path fill="#fff" d="M16 7.2a8.7 8.7 0 0 0-7.5 13.2l-1.2 4.4 4.5-1.2A8.7 8.7 0 1 0 16 7.2Zm0 15.9c-1.3 0-2.6-.4-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3a7.2 7.2 0 1 1 6.2 3.4Zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2Z" />
    </svg>
  )
}

export function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#3B82F6" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      <path d="M4.6 7.5h14.8M4.6 16.5h14.8" />
    </svg>
  )
}

export function GmailIcon() {
  return (
    <svg viewBox="0 0 24 18" width="22" height="17" aria-hidden="true">
      <path fill="#4285F4" d="M1.6 18h3.8V8.7L0 4.6v11.8C0 17.3.7 18 1.6 18Z" />
      <path fill="#34A853" d="M18.6 18h3.8c.9 0 1.6-.7 1.6-1.6V4.6l-5.4 4.1V18Z" />
      <path fill="#FBBC04" d="M18.6 1.6v7.1L24 4.6V2.4c0-2-2.3-3.1-3.8-1.9l-1.6 1.1Z" />
      <path fill="#EA4335" d="M5.4 8.7V1.6L12 6.5l6.6-4.9v7.1L12 13.6 5.4 8.7Z" />
      <path fill="#C5221F" d="M0 2.4v2.2l5.4 4.1V1.6L3.8.5C2.3-.7 0 .4 0 2.4Z" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path fill="#fff" d="M17.6 32V20.6h3.8l.6-4.4h-4.4v-2.8c0-1.3.4-2.1 2.2-2.1h2.3V7.4a31 31 0 0 0-3.4-.2c-3.3 0-5.6 2-5.6 5.8v3.2H9.4v4.4h3.7V32h4.5Z" />
    </svg>
  )
}

export function SmsIcon() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#34C759" />
      <path fill="#fff" d="M16 8.5c-4.7 0-8.5 3.1-8.5 7 0 2.2 1.2 4.1 3.1 5.4l-.7 2.9 3.3-1.8c.9.3 1.8.4 2.8.4 4.7 0 8.5-3.1 8.5-7s-3.8-6.9-8.5-6.9Z" />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#34C759" />
      <path fill="#fff" d="M12.3 8.6c-.4-.6-1.2-.8-1.8-.4l-1.6 1c-.9.6-1.4 1.6-1.2 2.7.6 3.3 2.2 6.3 4.6 8.8 2.5 2.5 5.5 4.1 8.8 4.6 1.1.2 2.1-.3 2.7-1.2l1-1.6c.4-.6.2-1.4-.4-1.8l-2.9-1.9c-.5-.3-1.2-.3-1.6.1l-1.2 1.1c-1.8-.9-3.5-2.6-4.4-4.4l1.1-1.2c.4-.5.5-1.1.1-1.6l-1.2-2.2Z" />
    </svg>
  )
}

export function InstagramIcon() {
  const gradId = 'ig-grad' + useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#FDF497" />
          <stop offset="0.05" stopColor="#FDF497" />
          <stop offset="0.45" stopColor="#FD5949" />
          <stop offset="0.6" stopColor="#D6249F" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradId})`} />
      <rect x="7.5" y="7.5" width="17" height="17" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="21" cy="11" r="1.2" fill="#fff" />
    </svg>
  )
}
