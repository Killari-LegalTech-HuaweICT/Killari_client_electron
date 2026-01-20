import { Session } from './session.domain'

export const sessionStore: { current?: Session } = {}

export function setSession(s: Session) {
  sessionStore.current = s
}

export function clearSession() {
  delete sessionStore.current
}
