'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle2, PlayCircle, DollarSign } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface DashboardStatsProps {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  revenue: number;
}

const stats = [
  {
    label: 'Total Projects',
    icon: <BarChart3 className="w-7 h-7 text-blue-500" />,
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  {
    label: 'Completed Projects',
    icon: <CheckCircle2 className="w-7 h-7 text-green-500" />,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  {
    label: 'Active Projects',
    icon: <PlayCircle className="w-7 h-7 text-yellow-500" />,
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
  {
    label: 'Revenue Generated',
    icon: <DollarSign className="w-7 h-7 text-purple-500" />,
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    isCurrency: true,
  },
];

const DashboardStats: React.FC = () => {
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [projects, setProjects] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/get/projects/${user.id}`, {
          method: 'GET',
        });

        if (!res.ok) {
          console.error('Failed to fetch projects:', res.statusText);
          return;
        }

        const data = await res.json();

        let n_completed = 0
        let n_active = 0
        let total_revenue = 0
        
        let data_arr = []
        data_arr.push(data.results.length)

        data.results.map((project:any) => {
          if (project.status === "active") {
            n_active = n_active + 1
          } else {
            n_completed = n_completed + 1
            total_revenue = total_revenue + project.revenue
          }
        })

        data_arr.push(n_completed)
        data_arr.push(n_active)
        data_arr.push(total_revenue)

        setValues(data_arr)

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className="sm:w-full w-[21rem] flex flex-col sm:flex-row gap-6 sm:mt-8 ml-[35px] mt-[65px] sm:ml-[150px]">
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className={`flex-1 rounded-xl shadow-md ${stat.bg} ${stat.border} border p-10 flex items-center gap-4 min-w-[10px] transition-transform hover:-translate-y-1 hover:shadow-lg`}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-inner">
            {stat.icon}
          </div>
          <div>
            <div className={`text-2xl font-bold ${stat.text} font-jost`}>
              {stat.isCurrency ? (
                <span>&#8377;{values[idx]}</span>
              ) : (
                values[idx]
              )}
            </div>
            <div className="text-gray-500 font-medium mt-1 font-jost">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
