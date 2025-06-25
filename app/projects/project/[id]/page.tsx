'use client'

import React, { useState, useEffect, use } from 'react';
import { Jost } from 'next/font/google';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import ProjectFileManager from '@/components/ProjectFileManager';

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

interface Member {
  id: number;
  user_id?: string;
  user_email?: string;
  role?: string;
  projectId: number;
}

interface Comment {
  id: number;
  by?: string;
  text?: string;
  at?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  status: string;
}

interface Project {
  id: number;
  title?: string;
  description?: string;
  deadline?: string;
  revenue?: string | number;
  status?: 'active' | 'inactive' | string;
  for?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  members?: Member[];
  comments?: Comment[];
  tasks?: Task[];
}

const ProjectPage: React.FC<{}> = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [isAdmin] = useState(true); // Toggle admin privileges here

  const isActive = project?.status === 'active';

  const params = useParams();

  const {user, isLoaded, isSignedIn} = useUser()

  // Fetch project from backend
  useEffect(() => {
    const fetchProject = async () => {
      const id = params.id
      if (id) {
        const res = await fetch(`/api/get/project/${id}`, { method: 'GET' });
        if (!res.ok) {
          console.log('Internal Server Error');
          return;
        }
        const jsres = await res.json();
        setProject(jsres.results);
        setComments(jsres.results?.comments || []);
      } else {
        console.log('No ID Received');
      }
    };
    fetchProject();
  }, [params]);

  // Mark project complete handler
  const markProjectComplete = async () => {
     const formData = new FormData()
     formData.append("id", project?.id.toString() as string)
     
     const res = await fetch('/api/update/status/project/', {
      method: "POST",
      body: formData
     })

     if (!res.ok) {
      console.log("Internal Server Error")
     }

     const jsres = await res.json()

     if (jsres.success == true) {
      window.location.reload()
     } else {
      console.log(jsres.message)
     }
  };

  // Delete project handler
  const deleteProject = async () => {
    const body_json = {
      id: project?.id.toString()
    }

    const res = await fetch('/api/delete/project', {
      method:"DELETE",
      body: JSON.stringify(body_json),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // Mark task complete handler
  const markTaskComplete = async (taskId: number) => {
    const formData = new FormData()
    formData.append("id", taskId.toString())

    const res = await fetch('/api/update/status/task', {
      method: "POST",
      body: formData
    })

    if(!res.ok) {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true)  {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // Delete task handler
  const deleteTask = async (taskId: number) => {
    const body_json = {
      id: taskId.toString()
    }

    const res = await fetch('/api/delete/task', {
      method:"DELETE",
      body: JSON.stringify(body_json),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // Add new task handler
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append("title",  newTaskTitle)
    formData.append("deadline", newTaskDeadline)
    formData.append("description", newTaskDescription)
    formData.append("id", project?.id.toString() as string)
    
    console.log(formData)

    const res = await fetch("/api/new/task", {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // Add comment handler
  const handleAddComment = async (e: React.FormEvent) => {
    const formData = new FormData()

    formData.append("user_email", user?.emailAddresses[0].emailAddress as string)
    formData.append("comment", newComment)
    formData.append("id", project?.id.toString() as string)
    
    console.log(formData)

    const res = await fetch("/api/new/comment", {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // Invite member handler
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("by", user?.emailAddresses[0].emailAddress as string)
    formData.append("to", inviteEmail)
    formData.append("id", project?.id.toString() as string)

    const res = await fetch('/api/new/invitation', {
      method: "POST",
      body: formData
    })

    if (!res.ok)  {
      console.log("Internal Server Error")
    }

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location.reload()
    } else {
      console.log(jsres.message)
    }
  };

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  if (!project) {
    return (
      <main className={`${jost.className} min-h-screen flex items-center justify-center text-black`}>
        <div className="text-2xl font-semibold">Project not found or deleted.</div>
      </main>
    );
  }

  return (
    <main className={`${jost.className} min-h-screen bg-gray-50 font-jost p-6 max-w-7xl mx-auto text-black`}>
      {/* Project Header Card */}
      <section
        className={`rounded-lg p-8 mb-10 shadow-lg border flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 ${
          isActive ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300'
        }`}
      >
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${isActive ? 'text-green-700' : 'text-gray-600'}`}>
            {project.title || 'Untitled Project'}
          </h1>
          <p className="text-gray-700 mb-4">{project.description || 'No description provided.'}</p>
          <div className="flex flex-wrap gap-6 text-gray-600 text-base font-medium">
            <div>
              <span className="font-semibold">Deadline:</span>{' '}
              <span className="text-blue-600">{project.deadline || 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold">Revenue:</span>{' '}
              <span className="text-purple-700">₹{project.revenue ? Number(project.revenue).toLocaleString() : '0'}</span>
            </div>
            <div>
              <span className="font-semibold">Category:</span> {project.category || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">For:</span> {project.for || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{' '}
              <span className={isActive ? 'text-green-600 font-semibold' : 'text-gray-500 font-semibold'}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 md:mt-0">
          {isActive && (
            <button
              onClick={markProjectComplete}
              className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-5 py-2 rounded-md"
            >
              Mark Project As Complete
            </button>
          )}
          <button
            onClick={deleteProject}
            className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-5 py-2 rounded-md"
          >
            Delete Project
          </button>
        </div>
      </section>

      {/* Members Card */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(project.members && project.members.length > 0) ? (
            project.members.map((m) => (
              <div key={m.id} className="bg-blue-100 text-blue-800 rounded-lg p-4 shadow text-black">
                <p className="font-semibold">{m.user_email || 'Unknown Email'}</p>
                <p className="italic text-sm">{m.role || 'Member'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No members added yet.</p>
          )}
        </div>
      </section>

      {/* File Upload Card */}
      <ProjectFileManager projectId={project.id}/>

      {/* Comments Card */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-h-96 overflow-y-auto text-black">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="mb-4 border-b border-gray-100 pb-3 last:border-none">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{c.by || 'Anonymous'}</span> commented{' '}
                  <time dateTime={c.at || undefined}>
                    {c.at ? new Date(c.at).toLocaleString() : 'some time ago'}
                  </time>
                </p>
                <p className="text-gray-800">{c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Add comment"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      </section>

      {/* Tasks Card */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          {isAdmin && (
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task title"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                aria-label="New task title"
              />
              <input
                type="date"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
                placeholder="Deadline"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                aria-label="Task deadline"
              />
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter Task Description"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                aria-label="Task deadline"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Add Task
              </button>
            </form>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(project.tasks && project.tasks.length > 0) ? (
            project.tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg shadow text-black flex flex-col justify-between ${
                  task.status == "completed" ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div>
                  <h3
                    className={`font-semibold ${
                      task.status == "completed" ? 'line-through text-green-700' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Deadline: {task.deadline ? (
                      <span className="text-blue-600">{task.deadline}</span>
                    ) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Description: {task?.description ? (
                      <span className="text-blue-600">{task?.description}</span>
                    ) : 'N/A'}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {isAdmin && task.status != "completed" && (
                    <button
                      onClick={() => markTaskComplete(task.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Mark As Complete
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks added yet.</p>
          )}
        </div>
      </section>

      {/* Invite Member Card */}
      <section className="mb-10 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Invite A Member to Collaborate</h2>
        <form onSubmit={handleInvite} className="flex flex-col gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="User email"
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            aria-label="User email to invite"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Invite User
          </button>
        </form>
      </section>
    </main>
  );
};

export default ProjectPage;
