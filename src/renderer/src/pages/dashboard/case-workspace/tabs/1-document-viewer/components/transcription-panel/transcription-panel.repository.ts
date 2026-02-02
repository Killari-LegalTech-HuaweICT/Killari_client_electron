/**
 * Transcription Panel Repository
 * Handles data fetching for document transcriptions
 */

import type { DocumentTranscription } from './transcription-panel.domain'

/**
 * Repository interface for transcription operations
 */
export interface ITranscriptionPanelRepository {
  getTranscription(documentId: string): Promise<DocumentTranscription>
  requestTranscription(documentId: string, language?: string): Promise<DocumentTranscription>
}

/**
 * Mock transcription data
 */
const MOCK_TRANSCRIPTION: DocumentTranscription = {
  documentId: '1',
  transcript:
    'Se encontró evidencia en la escena del hecho. El testigo declaró haber visto al sospechoso cerca del lugar aproximadamente a las 22:30 horas.',
  language: 'es-PE',
  confidence: 0.92,
  segments: [
    { start: 0, end: 3.5, text: 'Se encontró evidencia', confidence: 0.95 },
    { start: 3.5, end: 7.2, text: 'en la escena del hecho.', confidence: 0.91 },
    { start: 7.2, end: 11.0, text: 'El testigo declaró haber visto', confidence: 0.89 },
    { start: 11.0, end: 14.5, text: 'al sospechoso cerca del lugar', confidence: 0.93 },
    { start: 14.5, end: 18.0, text: 'aproximadamente a las 22:30 horas.', confidence: 0.94 }
  ],
  processingTime: 1.2,
  model: 'whisper-large-v3'
}

/**
 * Implementation of transcription panel repository
 */
class TranscriptionPanelRepository implements ITranscriptionPanelRepository {
  /**
   * Gets existing transcription for a document
   */
  async getTranscription(documentId: string): Promise<DocumentTranscription> {
    console.log(`[TranscriptionPanelRepository] Fetching transcription for: ${documentId}`)

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_URL}/documents/${documentId}/transcription`)
    // return response.json()

    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      ...MOCK_TRANSCRIPTION,
      documentId
    }
  }

  /**
   * Requests a new transcription (triggers ASR processing)
   */
  async requestTranscription(
    documentId: string,
    language = 'es-PE'
  ): Promise<DocumentTranscription> {
    console.log(
      `[TranscriptionPanelRepository] Requesting transcription for: ${documentId} (${language})`
    )

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_URL}/documents/${documentId}/transcribe`, {
    //   method: 'POST',
    //   body: JSON.stringify({ language })
    // })
    // return response.json()

    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      ...MOCK_TRANSCRIPTION,
      documentId,
      language
    }
  }
}

// Singleton instance
export const transcriptionPanelRepository = new TranscriptionPanelRepository()
