// src/renderer/src/shared/config/routes.ts

export const AppRoutes = {
  public: {
    root: '/auth',
    login: '/auth/login'
  },
  private: {
    root: '/dashboard',
    onboarding: {
      root: '/dashboard/onboarding'
    }
  }
}

export default AppRoutes
