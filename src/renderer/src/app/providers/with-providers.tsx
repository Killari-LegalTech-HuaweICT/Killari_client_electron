import type { ComponentType, PropsWithChildren, ReactElement } from 'react'

// HOC minimal que provee un punto central para envolver la App con providers
// (ThemeProvider, StoreProvider, I18nProvider, etc.). Actualmente no añade
// providers adicionales, pero facilita añadirlos en el futuro.
export function withProviders<P = Record<string, unknown>>(Component: ComponentType<P>) {
  return function WithProviders(props: PropsWithChildren<P>): ReactElement {
    // Aquí podríamos envolver <Component /> con contextos, por ejemplo:
    // return (
    //   <ThemeProvider>
    //     <StoreProvider>{<Component {...props} />}</StoreProvider>
    //   </ThemeProvider>
    // )
    return <Component {...props} />
  }
}
