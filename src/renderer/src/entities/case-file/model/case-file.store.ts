import { CaseFile } from './case-file.domain'

// Simple in-memory store placeholder
export const caseFileStore: { activeCase?: CaseFile; list: CaseFile[] } = {
  list: []
}

export function setActiveCase(c: CaseFile) {
  caseFileStore.activeCase = c
}

export function addCase(c: CaseFile) {
  caseFileStore.list.push(c)
}
