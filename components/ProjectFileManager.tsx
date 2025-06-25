// app/components/ProjectFileManager.tsx
'use client';

import { useEffect, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import axios from 'axios';

interface Props {
  projectId: number;
}

export default function ProjectFileManager({ projectId }: Props) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  async function fetchFiles() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/files/${projectId}`);
      setFiles(res.data);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }

  async function linkFilesToProject(uploadResults: Array<{ key: string; url: string }>) {
    try {
      await axios.post('/api/projects/link-files', {
        projectId,
        files: uploadResults,
      });
      fetchFiles();
    } catch (e) {
      alert('Failed to link files to project');
    }
  }

  return (
    <div className="max-w-2xl mb-6 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Project Files</h2>

      <UploadButton<OurFileRouter, "projectFile">
        endpoint="projectFile"
        onClientUploadComplete={(res:any) => {
          linkFilesToProject(res);
        }}
        onUploadError={(e:any) => alert(`Upload error: ${e.message}`)}
        appearance={{
          button:
            'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all',
          container: 'mb-4',
        }}
      />

      <h3 className="text-lg font-medium mt-8 mb-2">Uploaded Files</h3>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="bg-white p-3 rounded shadow flex justify-between items-center"
            >
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate max-w-xs"
              >
                {file.url.split('/').pop()}
              </a>
              <span className="text-sm text-gray-500 ml-4">
                {new Date(file.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
