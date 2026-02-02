import { Finding, TimelineEvent } from './evidence-analyzer.domain'

const MOCK_FINDINGS: Finding[] = [
  {
    id: 1,
    title: 'Inconsistencia en Hora',
    desc: 'La hora declarada por el testigo (22:00) no coincide con el video de seguridad (21:15).',
    confidence: 92,
    type: 'high'
  },
  {
    id: 2,
    title: 'Coincidencia Biométrica',
    desc: 'Huella parcial en el arma coincide con el sospechoso Juan Pérez.',
    confidence: 88,
    type: 'medium'
  },
  {
    id: 3,
    title: 'Vehículo Identificado',
    desc: 'Placa ABC-123 registrada en pórtico de peaje a las 23:00.',
    confidence: 99,
    type: 'high'
  }
]

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    title: 'Inicio del Incidente',
    time: '21:15',
    description: 'Cámara de seguridad capta vehículo.',
    type: 'info',
    status: 'confirmed'
  },
  {
    id: 't2',
    title: 'Ingreso de Sospechoso',
    time: '21:20',
    description: 'Registro de ingreso en portería.',
    type: 'verified',
    status: 'confirmed'
  },
  {
    id: 't3',
    title: 'Evento Crítico',
    time: '21:45',
    description: 'Ventana de tiempo no corroborada.',
    type: 'critical',
    status: 'unconfirmed'
  },
  {
    id: 't4',
    title: 'Salida',
    time: '22:10',
    description: 'Vehículo abandona la zona.',
    type: 'info',
    status: 'confirmed'
  }
]

export const evidenceAnalyzerStore = {
  currentAnalysis: {
    findings: [...MOCK_FINDINGS],
    timeline: [...MOCK_TIMELINE]
  } as { findings: Finding[]; timeline: TimelineEvent[] }
}

export const evidenceActions = {
  runAnalysis: async (): Promise<void> => {
    console.log('[EvidenceAnalyzer] Ejecutando nuevo análisis de IA...')
    // Simulation
    await new Promise((r) => setTimeout(r, 2000))
    console.log('[EvidenceAnalyzer] Análisis completado. Nuevos hallazgos encontrados.')
  },

  verifyFinding: (id: number): void => {
    console.log(`[EvidenceAnalyzer] Verificando hallazgo ID: ${id}`)
  }
}
