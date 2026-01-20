export const recommendationsStore: { recommendations: string[] } = { recommendations: [] }

export function addRecommendation(r: string): void {
  recommendationsStore.recommendations.push(r)
}
