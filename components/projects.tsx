'use client'

import React, { useState, useEffect } from 'react';
import { GripVertical, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useUser } from '@clerk/nextjs';

// Define TypeScript interfaces for your data
interface Member {
  id: number;
  user_id?: string;
  user_email?: string;
  role?: string;
  projectId: number;
}

interface Project {
  id: number;
  title?: string;
  description?: string;
  deadline?: string;
  revenue?: number;
  status?: string;
  for?: string;
  category?: string;
  comments?: any[]; // Define properly if needed
  members?: Member[];
  tasks?: any[]; // Define properly if needed
  createdAt?: string;
  updatedAt?: string;
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, moveCard }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'PROJECT_CARD',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'PROJECT_CARD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex w-full sm:w-[83rem] items-start gap-4 bg-white border border-gray-100 rounded-xl shadow-md p-6 mb-5 transition-shadow hover:shadow-lg relative ${
        isDragging ? 'opacity-60' : 'opacity-100'
      }`}
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      <div
        className="cursor-grab active:cursor-grabbing flex items-center justify-center mt-1"
        title="Drag to reorder"
      >
        <GripVertical className="text-blue-300 w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-blue-700 mb-2 sm:mb-0">{project.title || 'No Title'}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>
              Deadline:{' '}
              <span className="text-blue-600 font-semibold">{project.deadline || 'N/A'}</span>
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 mb-3">
          {project.description
            ? project.description.length > 250
              ? project.description.slice(0, 247) + '...'
              : project.description
            : 'No description available.'}
        </p>
        <p className="text-gray-600 mt-2 mb-3">
          { project.deadline ?
           Math.abs(new Date(project?.deadline).getTime() - new Date().getTime()) <= 2 * 24 * 60 * 60 * 1000 ?
           <span className='text-red-500 underline'>Deadline Approaching</span> : ""
           : ""
          }
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-lg text-purple-700 font-semibold">
            <DollarSign className="w-5 h-5 text-purple-400" />
            ₹{project.revenue ? project.revenue.toLocaleString() : '0'}
          </div>
          <button onClick={() => { window.location.href = `/projects/project/${project.id}` }} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors font-semibold">
            Open Project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Project List Component
interface ProjectListProps {
  projects: Project[];
  onReorder?: (updatedProjects: Project[]) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onReorder }) => {
  const [projectList, setProjectList] = useState<Project[]>(projects);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  const moveCard = (from: number, to: number) => {
    const updated = [...projectList];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    setProjectList(updated);
    onReorder && onReorder(updated);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col gap-2 mt-8">
        {projectList.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

// DashboardProjects Component
const DashboardProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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
        setProjects(data.results || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className="max-w-3xl sm:mx-[150px] my-[40px] px-2">
      <h2
        className="text-4xl sm:text-left text-center font-bold text-blue-800 mb-6"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Your Projects
      </h2>
      <ProjectList projects={projects} />
    </div>
  );
};

export default DashboardProjects;
