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
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"  // Assurez-vous que ce chemin est correct
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      init={{
        skin: 'oxide',
        width: '100%',
        height: 500,
        menubar: true,
        base_url: '/tinymce',
        plugins: [
          'lists', 'link', 'image', 'charmap', 'preview',
          'searchreplace', 'fullscreen',
          'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'styles | bold italic | alignleft aligncenter alignright | ' +
                'bullist numlist | link image | preview fullscreen',
        content_style: `
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 15px;
          }
        `,
        textpattern_patterns: [
          {pattern: '*', replacement: '<li>'},
          {pattern: '#', replacement: '<h1>'},
          {pattern: '##', replacement: '<h2>'},
          {pattern: '###', replacement: '<h3>'},
          {pattern: '####', replacement: '<h4>'},
          {pattern: '#####', replacement: '<h5>'},
          {pattern: '######', replacement: '<h6>'},
          {pattern: '1.', replacement: '<ol><li>'},
          {pattern: '* ', replacement: '<ul><li>'},
          {pattern: '- ', replacement: '<ul><li>'}
        ],
        // Ajout de ces paramètres spécifiques
        directionality : 'ltr',
        text_direction: 'ltr',
        rtl_ui: false,
        element_format: 'html',
        entity_encoding: 'raw',
        schema: 'html5',
        // Forcer le formatage en UTF-8
        document_base_url: '/',
        encoding: 'UTF-8',
        browser_spellcheck: true,
        gecko_spellcheck: true
      }}
      value={initialValue}
      onEditorChange={onSave}
    />
  );
}