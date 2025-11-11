import { redirect } from 'next/navigation'
import React from 'react'

function DashboardPage() {
  return (
    
     redirect("/dashboard/settings")
  )
}

export default DashboardPage