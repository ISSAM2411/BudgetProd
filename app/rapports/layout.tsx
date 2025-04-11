import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function RapportsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
