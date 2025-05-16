
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  filePath: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  filePath, 
  className 
}) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`);
        }
        const text = await response.text();
        setMarkdown(text);
        setLoading(false);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("Markdown content could not be loaded.");
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (loading) {
    return <div className="animate-pulse bg-gray-100 h-96 rounded-md"></div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn("prose prose-slate dark:prose-invert max-w-none", className)}
      components={{
        // Define custom rendering for markdown elements
        table: ({ ...props }) => (
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse" {...props} />
          </div>
        ),
        thead: ({ ...props }) => (
          <thead className="bg-gray-100" {...props} />
        ),
        th: ({ ...props }) => (
          <th className="border p-3 text-left font-semibold" {...props} />
        ),
        td: ({ ...props }) => (
          <td className="border p-3" {...props} />
        ),
        a: ({ ...props }) => (
          <a className="text-primary hover:underline" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
        ),
        h1: ({ ...props }) => (
          <h1 className="text-2xl font-heading font-bold my-6" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-xl font-heading font-semibold mt-8 mb-4" {...props} />
        ),
        hr: ({ ...props }) => (
          <hr className="my-8 border-gray-200" {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
