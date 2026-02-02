/**
 * Transcription Panel Store
 * Manages state and actions for the transcription panel using Jotai
 */

import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import type { DocumentTranscription, TranscriptionFormat } from './transcription-panel.domain'
import { transcriptionPanelRepository } from './transcription-panel.repository'

// ============================================================================
// ATOMS - Base state atoms
// ============================================================================

/** Atom for current transcription */
export const transcriptionAtom = atom<DocumentTranscription | null>(null)

/** Atom for output format */
export const formatAtom = atom<TranscriptionFormat>('json')

/** Atom for loading state */
export const isLoadingAtom = atom<boolean>(false)

/** Atom for error state */
export const errorAtom = atom<string | null>(null)

// ============================================================================
// DERIVED ATOMS - Computed state
// ============================================================================

/**
 * Derived atom for formatted output based on selected format
 */
export const formattedOutputAtom = atom((get) => {
  const transcription = get(transcriptionAtom)
  const format = get(formatAtom)

  if (!transcription) {
    return '{\n  "message": "Sin transcripción"\n}'
  }

  switch (format) {
    case 'json':
      return JSON.stringify(transcription, null, 2)

    case 'text':
      return transcription.transcript

    case 'srt':
      return transcription.segments
        .map((seg, i) => {
          const startTime = formatSrtTime(seg.start)
          const endTime = formatSrtTime(seg.end)
          return `${i + 1}\n${startTime} --> ${endTime}\n${seg.text}\n`
        })
        .join('\n')

    case 'vtt': {
      const header = 'WEBVTT\n\n'
      const cues = transcription.segments
        .map((seg) => {
          const startTime = formatVttTime(seg.start)
          const endTime = formatVttTime(seg.end)
          return `${startTime} --> ${endTime}\n${seg.text}\n`
        })
        .join('\n')
      return header + cues
    }

    default:
      return JSON.stringify(transcription, null, 2)
  }
})

/**
 * Derived atom for segment count
 */
export const segmentCountAtom = atom((get) => {
  const transcription = get(transcriptionAtom)
  return transcription?.segments.length ?? 0
})

/**
 * Derived atom for total duration
 */
export const totalDurationAtom = atom((get) => {
  const transcription = get(transcriptionAtom)
  if (!transcription?.segments.length) return 0
  const lastSegment = transcription.segments[transcription.segments.length - 1]
  return lastSegment.end
})

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatSrtTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${pad(ms, 3)}`
}

function formatVttTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${pad(ms, 3)}`
}

function pad(num: number, size = 2): string {
  return num.toString().padStart(size, '0')
}

// ============================================================================
// TYPES - Hook return types
// ============================================================================

/**
 * Return type for useTranscriptionPanel hook
 */
export interface UseTranscriptionPanelReturn {
  // State
  transcription: DocumentTranscription | null
  format: TranscriptionFormat
  formattedOutput: string
  segmentCount: number
  totalDuration: number
  isLoading: boolean
  error: string | null
  // Actions
  fetchTranscription: (documentId: string) => Promise<void>
  requestNewTranscription: (documentId: string, language?: string) => Promise<void>
  setFormat: (format: TranscriptionFormat) => void
  copyToClipboard: () => Promise<void>
  clear: () => void
}

// ============================================================================
// HOOKS - Custom hooks for transcription panel management
// ============================================================================

/**
 * Hook for managing transcription panel state and actions
 */
export function useTranscriptionPanel(): UseTranscriptionPanelReturn {
  const [transcription, setTranscription] = useAtom(transcriptionAtom)
  const [format, setFormat] = useAtom(formatAtom)
  const formattedOutput = useAtomValue(formattedOutputAtom)
  const segmentCount = useAtomValue(segmentCountAtom)
  const totalDuration = useAtomValue(totalDurationAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [error, setError] = useAtom(errorAtom)

  /**
   * Fetches existing transcription for a document
   */
  const fetchTranscription = useCallback(
    async (documentId: string): Promise<void> => {
      console.log(`[TranscriptionPanelStore] Fetching transcription for: ${documentId}`)
      setIsLoading(true)
      setError(null)

      try {
        const result = await transcriptionPanelRepository.getTranscription(documentId)
        setTranscription(result)
        console.log(
          `[TranscriptionPanelStore] Loaded transcription with ${result.segments.length} segments`
        )
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error fetching transcription'
        setError(message)
        console.error('[TranscriptionPanelStore] Error:', message)
      } finally {
        setIsLoading(false)
      }
    },
    [setTranscription, setError, setIsLoading]
  )

  /**
   * Requests a new transcription (triggers ASR processing)
   */
  const requestNewTranscription = useCallback(
    async (documentId: string, language?: string): Promise<void> => {
      console.log(`[TranscriptionPanelStore] Requesting new transcription for: ${documentId}`)
      setIsLoading(true)
      setError(null)

      try {
        const result = await transcriptionPanelRepository.requestTranscription(documentId, language)
        setTranscription(result)
        console.log(
          `[TranscriptionPanelStore] Transcription completed in ${result.processingTime}s`
        )
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error processing transcription'
        setError(message)
        console.error('[TranscriptionPanelStore] Error:', message)
      } finally {
        setIsLoading(false)
      }
    },
    [setTranscription, setError, setIsLoading]
  )

  /**
   * Copies the formatted output to clipboard
   */
  const copyToClipboard = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(formattedOutput)
      console.log('[TranscriptionPanelStore] Copied to clipboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error copying to clipboard'
      setError(message)
    }
  }, [formattedOutput, setError])

  /**
   * Clears the current transcription
   */
  const clear = useCallback((): void => {
    setTranscription(null)
    setError(null)
  }, [setTranscription, setError])

  return useMemo(
    () => ({
      // State
      transcription,
      format,
      formattedOutput,
      segmentCount,
      totalDuration,
      isLoading,
      error,
      // Actions
      fetchTranscription,
      requestNewTranscription,
      setFormat,
      copyToClipboard,
      clear
    }),
    [
      transcription,
      format,
      formattedOutput,
      segmentCount,
      totalDuration,
      isLoading,
      error,
      fetchTranscription,
      requestNewTranscription,
      setFormat,
      copyToClipboard,
      clear
    ]
  )
}

/**
 * Hook for reading formatted output only
 */
export function useFormattedOutput(): string {
  return useAtomValue(formattedOutputAtom)
}
