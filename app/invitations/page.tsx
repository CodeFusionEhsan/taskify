'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import useSWR from 'swr';
import { Jost } from 'next/font/google';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });


type Invitation = {
  id: number;
  by: string | null;
  to: string | null;
  projectId: number;
};

export default function InvitationsPage() {
  const { isSignedIn, user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || null;
  const userId = user?.id || null;

  const { data, error, isLoading, mutate } = useSWR(
    isSignedIn && email ? `/api/get/invitations?email=${encodeURIComponent(email)}` : null,
    fetcher
  );

  // Local state to track loading and success/error for each invitation
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [successIds, setSuccessIds] = useState<number[]>([]);
  const [errorIds, setErrorIds] = useState<number[]>([]);

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-gray-700 text-lg">Please sign in to view your invitations.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-red-600 text-lg">Failed to load invitations.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-gray-700 text-lg">Loading invitations...</p>
      </div>
    );
  }

  const invitations: Invitation[] = data?.invitations || [];

  async function handleAccept(invitationId: number, projectId: number) {
  if (!userId || !email) return;

  setLoadingIds((ids) => [...ids, invitationId]);
  setErrorIds((ids) => ids.filter((id) => id !== invitationId));
  setSuccessIds((ids) => ids.filter((id) => id !== invitationId));

  try {
    const res = await fetch('/api/add-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        userId,
        userEmail: email,
        role: 'member',
        invitationId
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Failed to add member');
    }

    setSuccessIds((ids) => [...ids, invitationId]);
    mutate();
  } catch (err) {
    console.error(err);
    setErrorIds((ids) => [...ids, invitationId]);
  } finally {
    setLoadingIds((ids) => ids.filter((id) => id !== invitationId));
  }
}

  return (
    <main className={`${jost.className} min-h-screen bg-gray-50 p-6 sm:p-12`}>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Your Invitations</h1>

      {invitations.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">You have no invitations.</p>
      ) : (
        <ul className="max-w-4xl mx-auto space-y-8">
          {invitations.map(({ id, by, to, projectId }) => {
            const isLoading = loadingIds.includes(id);
            const isSuccess = successIds.includes(id);
            const isError = errorIds.includes(id);

            return (
              <li
                key={id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-gray-800 font-semibold text-lg">Invitation #{id}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">From:</span> {by || 'Unknown'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">To:</span> {to}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Project ID:</span> {projectId}
                  </p>
                </div>

                <div className="flex ml-4 flex-col items-start sm:items-center sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={isLoading || isSuccess}
                    onClick={() => handleAccept(id, projectId)}
                    className={`py-2 px-5 rounded-md font-semibold transition ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : isSuccess
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isLoading ? 'Accepting...' : isSuccess ? 'Accepted' : 'Accept Invitation'}
                  </button>
                  {isError && (
                    <p className="text-red-600 text-sm">Failed to accept. Try again.</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
