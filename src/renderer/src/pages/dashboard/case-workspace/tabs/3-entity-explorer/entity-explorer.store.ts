export const entityExplorerStore: { entities: any[] } = { entities: [] }

export function setEntities(list: any[]): void {
  entityExplorerStore.entities = list
}
