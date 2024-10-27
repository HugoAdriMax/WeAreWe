"use client";

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';

interface EditorProps {
  initialValue: string;
  onSave: (content: string) => void;
}

export default function EditorComponent({ initialValue, onSave }: EditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <div className="bg-white rounded-lg shadow">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'media', 'paste'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 1rem;
            }
          `,
          branding: false,
          statusbar: false,
          paste_data_images: true,
          images_upload_handler: async function (blobInfo) {
            // Ici, vous pouvez implémenter votre propre logique d'upload d'images
            return new Promise((resolve, reject) => {
              resolve('https://via.placeholder.com/800x400');
            });
          },
        }}
        onEditorChange={(content) => onSave(content)}
      />
    </div>
  );
}