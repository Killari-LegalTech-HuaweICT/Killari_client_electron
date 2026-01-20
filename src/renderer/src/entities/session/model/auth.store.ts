import { atom } from 'jotai'

// Átomos simples para controlar si el usuario está autenticado y si la sesión está cargando.
export const isAuthenticatedAtom = atom<boolean>(false)
export const isLoadingSessionAtom = atom<boolean>(false)
