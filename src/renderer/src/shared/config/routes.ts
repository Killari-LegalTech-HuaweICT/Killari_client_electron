// src/renderer/src/shared/config/routes.ts

export const AppRoutes = {
  public: {
    root: '/auth',
    login: '/auth/login'
  },
  private: {
    root: '/dashboard',
    // Lista de casos
    cases: '/dashboard/cases',
    // Ruta para un caso específico (parametrizada)
    caseDetail: '/dashboard/cases/:caseId',
    // Helper para construir URLs a un caso
    caseById: (id: string) => `/dashboard/cases/${id}`,
    onboarding: {
      root: '/dashboard/onboarding'
    }
  }
}

export default AppRoutes
