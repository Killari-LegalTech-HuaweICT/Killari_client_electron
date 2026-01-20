import React from 'react'
import { CaseFile as CaseFileModel } from '../model/case-file.domain'

export const CaseFile: React.FC<{ caseFile: CaseFileModel }> = ({ caseFile }) => {
  return (
    <div>
      <h3>{caseFile.title}</h3>
      <p>{caseFile.description}</p>
    </div>
  )
}

export default CaseFile
