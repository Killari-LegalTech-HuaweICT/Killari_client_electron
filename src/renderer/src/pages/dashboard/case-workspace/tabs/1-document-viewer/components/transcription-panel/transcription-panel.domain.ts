/**
 * Transcription Panel Domain
 * Types and interfaces for the transcription panel module
 */

/**
 * Transcription segment with timing
 */
export interface TranscriptionSegment {
  start: number
  end: number
  text: string
  confidence?: number
  speaker?: string
}

/**
 * Full document transcription
 */
export interface DocumentTranscription {
  documentId: string
  transcript: string
  language: string
  confidence: number
  segments: TranscriptionSegment[]
  processingTime?: number
  model?: string
}

/**
 * Transcription output format
 */
export type TranscriptionFormat = 'json' | 'text' | 'srt' | 'vtt'

/**
 * Transcription panel state
 */
export interface TranscriptionPanelState {
  transcription: DocumentTranscription | null
  format: TranscriptionFormat
  isLoading: boolean
  error: string | null
}
