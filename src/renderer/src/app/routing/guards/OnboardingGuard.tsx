// src/renderer/src/features/onboarding-guard/index.tsx

import { Outlet } from 'react-router-dom'

// Placeholder OnboardingGuard. En el futuro debería comprobar si el usuario
// necesita completar onboarding y redirigir cuando sea necesario.
export const OnboardingGuard: React.FC = () => {
  return <Outlet />
}

export default OnboardingGuard
