/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SEEProvider } from './context/SEEContext';

// Layouts & Guards
import MainLayout from './components/layout/MainLayout';
import RoleGuard from './components/common/RoleGuard';

// Pages
import Login from './pages/Login';
import LeadershipHome from './pages/leadership/Home';
import Ideate from './pages/leadership/Ideate';
import PlanLibrary from './pages/leadership/PlanLibrary';
import ROIDashboard from './pages/leadership/ROIDashboard';

import ManagerHome from './pages/manager/Home';
import Instantiate from './pages/manager/Instantiate';

import ProgressDashboard from './pages/dashboard/Progress';

import ImagineerHome from './pages/imagineer/Home';
import Tasks from './pages/imagineer/Tasks';
import Metrics from './pages/imagineer/Metrics';
import Discover from './pages/imagineer/Discover';

import PlanDetail from './pages/shared/PlanDetail';
import ProjectDetail from './pages/shared/ProjectDetail';

export default function App() {
  return (
    <SEEProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-[#F8FAFC] text-[#1F3864] font-bold">Loading SEE...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Leadership Routes */}
              <Route path="/leadership" element={
                <RoleGuard allowedRoles={['Leadership']}>
                  <LeadershipHome />
                </RoleGuard>
              } />
              <Route path="/leadership/ideate" element={
                <RoleGuard allowedRoles={['Leadership']}>
                  <Ideate />
                </RoleGuard>
              } />
              <Route path="/leadership/plans" element={
                <RoleGuard allowedRoles={['Leadership']}>
                  <PlanLibrary />
                </RoleGuard>
              } />
              <Route path="/leadership/roi" element={
                <RoleGuard allowedRoles={['Leadership']}>
                  <ROIDashboard />
                </RoleGuard>
              } />

              {/* Manager Routes */}
              <Route path="/manager" element={
                <RoleGuard allowedRoles={['Manager']}>
                  <ManagerHome />
                </RoleGuard>
              } />
              <Route path="/manager/instantiate" element={
                <RoleGuard allowedRoles={['Manager']}>
                  <Instantiate />
                </RoleGuard>
              } />

              {/* Shared Routes */}
              <Route path="/dashboard/progress" element={
                <RoleGuard allowedRoles={['Leadership', 'Manager']}>
                  <ProgressDashboard />
                </RoleGuard>
              } />

              {/* Imagineer Routes */}
              <Route path="/imagineer" element={
                <RoleGuard allowedRoles={['Imagineer']}>
                  <ImagineerHome />
                </RoleGuard>
              } />
              <Route path="/imagineer/tasks" element={
                <RoleGuard allowedRoles={['Imagineer']}>
                  <Tasks />
                </RoleGuard>
              } />
              <Route path="/imagineer/metrics" element={
                <RoleGuard allowedRoles={['Imagineer']}>
                  <Metrics />
                </RoleGuard>
              } />
              <Route path="/imagineer/discover" element={
                <RoleGuard allowedRoles={['Imagineer']}>
                  <Discover />
                </RoleGuard>
              } />

              {/* Detail Views */}
              <Route path="/plans/:id" element={<PlanDetail />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SEEProvider>
  );
}


