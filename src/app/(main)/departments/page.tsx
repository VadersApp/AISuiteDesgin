import { DepartmentGrid } from "@/components/departments/department-grid";

export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Abteilungen
        </h1>
        <p className="text-slate-400">Übersicht unterstützter Bereiche.</p>
      </header>
      <DepartmentGrid />
    </div>
  );
}
