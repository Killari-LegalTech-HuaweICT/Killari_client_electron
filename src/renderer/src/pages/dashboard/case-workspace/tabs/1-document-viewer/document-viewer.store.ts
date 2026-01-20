export const documentViewerStore: { activeDocumentId?: string } = {}

export function setActiveDocument(id: string): void {
  documentViewerStore.activeDocumentId = id
}
