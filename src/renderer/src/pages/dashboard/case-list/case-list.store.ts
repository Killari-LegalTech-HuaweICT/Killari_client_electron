import { CaseFile } from '../../../entities/case-file/model/case-file.domain'

export const caseListStore: { list: CaseFile[] } = {
  list: []
}

export function setCaseList(list: CaseFile[]): void {
  caseListStore.list = list
}
