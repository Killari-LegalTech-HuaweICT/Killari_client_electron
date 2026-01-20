import { User } from './user.domain'

export const userStore: { current?: User } = {}

export function setUser(u: User): void {
  userStore.current = u
}

export function clearUser(): void {
  delete userStore.current
}
