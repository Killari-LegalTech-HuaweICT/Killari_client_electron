export interface CaseDocument {
  id: string
  name: string
  type: 'PDF' | 'DOCX' | 'JPG' | 'TXT'
  pages: number
  status: 'Procesado' | 'Pendiente' | 'Error'
  uploadDate: string
  url?: string
}

export interface TranscriptionSegment {
  start: number
  end: number
  text: string
}

export interface DocumentTranscription {
  transcript: string
  language: string
  confidence: number
  segments: TranscriptionSegment[]
}
