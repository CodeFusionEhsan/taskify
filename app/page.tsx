import Image from "next/image";
import Overview  from '@/components/overview'
import DashboardProjects from "@/components/projects";

export default function Home() {
  return (
    <div className="">
      <Overview />
      <DashboardProjects />
    </div>
  );
}
