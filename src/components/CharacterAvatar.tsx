import Image from 'next/image'
import styles from './CharacterAvatar.module.css'

/** Round avatar artwork (circle, colour and ring are part of the image). */
const ALT_TEXT = {
  channel: 'Purple Belvoro character avatar',
  memory: 'Beige Belvoro character avatar',
  marketing: 'Sage green Belvoro character avatar',
} as const

const AVATARS = {
  channel: '/characters/avatar-channel.png',
  memory: '/characters/avatar-memory.png',
  marketing: '/characters/avatar-marketing.png',
} as const

export type CharacterName = keyof typeof AVATARS

export default function CharacterAvatar({ name, size = 44 }: { name: CharacterName; size?: number }) {
  return (
    <Image
      src={AVATARS[name]}
      alt={ALT_TEXT[name]}
      aria-hidden="true"
      width={size}
      height={size}
      className={styles.avatar}
    />
  )
}
