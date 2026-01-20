import { EvidenceAnalysis } from './evidence-analyzer.domain'

export const evidenceAnalyzerStore: { analyses: EvidenceAnalysis[] } = {
  analyses: []
}

export function addAnalysis(a: EvidenceAnalysis): void {
  evidenceAnalyzerStore.analyses.push(a)
}
