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
    onboarding: {
      root: '/dashboard/onboarding'
    }
  }
}

export default AppRoutes
