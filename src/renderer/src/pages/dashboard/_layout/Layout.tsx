import React from 'react'

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <nav>Navbar (placeholder)</nav>
      <main>{children}</main>
    </div>
  )
}

export default DashboardLayout
