import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetAdminMe, useGetDashboardStats } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Megaphone, Briefcase, FileText, Image, ArrowRight, UserCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { CoursesManager } from "@/components/admin/CoursesManager";
import { FacultyManager } from "@/components/admin/FacultyManager";
import { NewsManager } from "@/components/admin/NewsManager";
import { PlacementsManager } from "@/components/admin/PlacementsManager";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { MediaManager } from "@/components/admin/MediaManager";
import { AdminsManager } from "@/components/admin/AdminsManager";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: admin, isLoading: adminLoading, isError } = useGetAdminMe();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  
  const searchParams = new URLSearchParams(window.location.search);
  const tabParam = searchParams.get('tab') || 'overview';
  
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    if (isError) {
      setLocation("/admin");
    }
  }, [isError, setLocation]);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    const newUrl = val === 'overview' ? '/admin/dashboard' : `/admin/dashboard?tab=${val}`;
    window.history.pushState({}, '', newUrl);
  };

  if (adminLoading) {
    return <div className="flex h-screen items-center justify-center bg-[#f8fafc] text-[#0a1e2f] font-semibold">Loading console...</div>;
  }

  if (!admin) return null;

  return (
    <AdminLayout>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
        <div className="hidden">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0 space-y-6">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#023859] to-[#0d5c8a] p-8 text-white shadow-lg border border-[#0d5c8a]/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
            <div className="relative z-10 space-y-2 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome to the Administrator Console</h2>
              <p className="text-blue-100/90 text-sm font-light">
                Manage academic programs, update faculty directories, review admission inquiries, and add news announcements or media gallery items in real time.
              </p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl group cursor-pointer" onClick={() => handleTabChange('courses')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Courses</CardTitle>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"><GraduationCap className="h-4.5 w-4.5" /></div>
              </CardHeader>
              <CardContent className="pt-2">
                {statsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <div className="text-3xl font-black text-slate-800">{stats?.totalCourses}</div>
                )}
                <p className="text-[10px] text-slate-400 mt-1">Active pharmacy programs</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl group cursor-pointer" onClick={() => handleTabChange('faculty')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Faculty Members</CardTitle>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300"><Users className="h-4.5 w-4.5" /></div>
              </CardHeader>
              <CardContent className="pt-2">
                {statsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <div className="text-3xl font-black text-slate-800">{stats?.totalFaculty}</div>
                )}
                <p className="text-[10px] text-slate-400 mt-1">Teaching &amp; research roster</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl group cursor-pointer" onClick={() => handleTabChange('leads')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Leads</CardTitle>
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300"><FileText className="h-4.5 w-4.5" /></div>
              </CardHeader>
              <CardContent className="pt-2">
                {statsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <div className="text-3xl font-black text-rose-600">{stats?.pendingLeads}</div>
                )}
                <p className="text-[10px] text-slate-400 mt-1">Requires review &amp; follow-up</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl group cursor-pointer" onClick={() => handleTabChange('placements')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Placements</CardTitle>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300"><Briefcase className="h-4.5 w-4.5" /></div>
              </CardHeader>
              <CardContent className="pt-2">
                {statsLoading ? <Skeleton className="h-8 w-16" /> : (
                  <div className="text-3xl font-black text-slate-800">{stats?.totalPlacements}</div>
                )}
                <p className="text-[10px] text-slate-400 mt-1">Seeded placement records</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="border border-slate-100 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-800">Quick Console Shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-slate-400 mb-2">Jump straight to edit different sections of the website:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('courses')}><GraduationCap className="h-4 w-4 text-blue-500" /> Manage Courses</Button>
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('faculty')}><Users className="h-4 w-4 text-emerald-500" /> Manage Faculty</Button>
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('news')}><Megaphone className="h-4 w-4 text-purple-500" /> Manage News</Button>
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('placements')}><Briefcase className="h-4 w-4 text-amber-500" /> Manage Placements</Button>
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('leads')}><FileText className="h-4 w-4 text-rose-500" /> Manage Admissions</Button>
                  <Button variant="outline" className="justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('media')}><Image className="h-4 w-4 text-teal-500" /> Manage Media</Button>
                  <Button variant="outline" className="col-span-2 justify-start gap-2 h-11 text-xs" onClick={() => handleTabChange('users')}><UserCheck className="h-4 w-4 text-slate-700" /> Manage Admin Users</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 shadow-sm rounded-2xl flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-800">Console Systems Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600 text-xs flex-1 flex flex-col justify-center">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-400">Database Engine</span>
                  <span className="font-bold text-slate-700">PostgreSQL (Drizzle ORM)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-400">Frontend Framework</span>
                  <span className="font-bold text-slate-700">React + Vite + TailwindCSS</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-400">API Gateway Port</span>
                  <span className="font-bold text-slate-700">5000 (Proxy routed via 5173)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <CoursesManager />
        </TabsContent>
        <TabsContent value="faculty" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <FacultyManager />
        </TabsContent>
        <TabsContent value="news" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <NewsManager />
        </TabsContent>
        <TabsContent value="placements" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <PlacementsManager />
        </TabsContent>
        <TabsContent value="leads" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <LeadsManager />
        </TabsContent>
        <TabsContent value="media" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <MediaManager />
        </TabsContent>
        <TabsContent value="users" className="m-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <AdminsManager />
        </TabsContent>

      </Tabs>
    </AdminLayout>
  );
}
