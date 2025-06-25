'use client';

import React, { useState } from 'react';
import { Jost } from 'next/font/google';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleGenerate = async (e:any) => {

    e.preventDefault()

    if (prompt.length > 0) {
      const formData = new FormData()
      formData.append("prompt", prompt)

      const res = await fetch('/api/ai', {
        method: "POST",
        body: formData
      })


      const jsres = await res.json()

      
      if (!jsres.ok) {
        console.log("Error In Fetching Response")
      }

      setResponse(jsres.output)
      setPrompt("Break Your Projects and Get Suggestions from AI")

    } else {  
        console.log("Internal Server Error")
    }
  };

  return (
    <main
      className={`${jost.className} min-h-screen w-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center px-6 py-16 sm:py-24`}
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* Hero Section */}
      <section className="max-w-4xl text-center mb-16 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Manage Your Tasks More Effectively
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 mb-4">
          Break Down Projects with Taskify AI
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto">
          Taskify AI, developed by Ehsan Saleem using the Gemini API, helps you organize and
          streamline your projects by intelligently breaking them down into manageable tasks.
        </p>
      </section>

      {/* Input Section */}
      <section className="w-full max-w-3xl px-4">
        <textarea
          rows={6}
          placeholder="Enter your project or task prompt here..."
          className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 p-4 text-gray-900 text-lg resize-none shadow-sm transition"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className={`mt-6 w-full py-4 rounded-xl font-semibold text-white text-lg transition ${
            loading || !prompt.trim()
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } shadow-lg`}
          aria-label="Generate response"
        >
          {loading ? 'Generating...' : 'Generate Response'}
        </button>

        {/* Response Section */}
        {response && (
          <div className="mt-10 bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-indigo-900 text-lg whitespace-pre-wrap shadow-inner">
            <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
          </div>
        )}
      </section>
    </main>
  );
}
