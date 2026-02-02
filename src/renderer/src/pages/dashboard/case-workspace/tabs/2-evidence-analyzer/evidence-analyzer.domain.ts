export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface Finding {
  id: number
  title: string
  desc: string
  confidence: number
  type: ConfidenceLevel
  sourceId?: string
}

export interface TimelineEvent {
  id: string
  title: string
  time: string
  description: string
  type: 'critical' | 'info' | 'verified'
  status: 'confirmed' | 'unconfirmed'
}

export interface EvidenceAnalysis {
  id: string
  summary?: string
  findings: Finding[]
  timeline: TimelineEvent[]
}
