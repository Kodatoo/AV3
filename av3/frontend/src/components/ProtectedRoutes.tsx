import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
  allow: string[]
}

export default function ProtectedRoute({ children, allow }: Props) {
  const nivel = localStorage.getItem("nivel")

  if (!nivel) {
    return <Navigate to="/" replace />
  }

  if (!allow.includes(nivel)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
