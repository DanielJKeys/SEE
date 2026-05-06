import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Role } from '../../types';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { state } = useSEE();
  const location = useLocation();

  if (!state.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(state.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
