import { CaseWorkspaceState } from './case-workspace.domain'

export const caseWorkspaceStore: CaseWorkspaceState = {
  activeTab: 1,
}

export function setActiveTab(n: number): void {
  caseWorkspaceStore.activeTab = n
}
