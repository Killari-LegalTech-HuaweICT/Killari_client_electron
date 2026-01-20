import React from 'react'
import CaseFileComponent from '../../../entities/case-file/ui/CaseFile.view'
import { CaseFile as CaseFileModel } from '../../../entities/case-file/model/case-file.domain'

export const CaseCard: React.FC<{ c: CaseFileModel }> = ({ c }) => {
  return (
    <article>
      <CaseFileComponent caseFile={c} />
    </article>
  )
}

export default CaseCard
