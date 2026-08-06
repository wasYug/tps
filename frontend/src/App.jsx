import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from './pages/home';
import AdmissionPage from './pages/admission';
import InfrastructurePage from './pages/infrasturcture';
import ResultPage from './pages/result';
import FacultyPage from './pages/faculty';
import ContactPage from './pages/contact';
import MagazinePage from './pages/magazine';
import GalleryPage from './pages/gallery';
import AlbumViewer from './pages/gallery/AlbumViewer';

import AboutPage from './pages/about';
import AlumniPage from './pages/alumni';
import PrivacyPolicy from './pages/privacy';
import TermsOfUse from './pages/terms-of-use';
import MissionPage from './pages/mission';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import NewsPage from './pages/news/News';
import VirtualTourPage from './pages/virtual_tour';
import NotFound from './pages/NotFound';
import YearCalendar from './pages/year-calender';
import CoCurricularClubs from './pages/co-curricular-clubs';
import ScholarshipPage from './pages/scholarship';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mission" element={<MissionPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/alumni" element={<AlumniPage />} />
      <Route path="/admission" element={<AdmissionPage />} />
      <Route path="/infra" element={<InfrastructurePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery/:albumId" element={<AlbumViewer />} />
      <Route path="/virtual-tour" element={<VirtualTourPage />} />
      <Route path="/calendar" element={<YearCalendar />} />
      <Route path='/co-curricular-clubs' element={<CoCurricularClubs />} />
      <Route path='/scholarship' element={<ScholarshipPage />} />


      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
