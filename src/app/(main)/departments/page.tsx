import { DepartmentGrid } from "@/components/departments/department-grid";

export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Abteilungen
        </h1>
        <p className="text-muted-foreground">Übersicht unterstützter Bereiche.</p>
      </header>
      <DepartmentGrid />
    </div>
  );
}
