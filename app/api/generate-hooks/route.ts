// app/api/generate-hooks/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'La clé API OpenAI n\'est pas configurée' },
      { status: 500 }
    );
  }

  try {
    const { prompt, platform, type } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Le prompt est requis' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en marketing digital spécialisé dans la création d'accroches pour les réseaux sociaux."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedText = completion.choices[0]?.message?.content || '';
    const hooks = generatedText.split('\n').filter(hook => hook.trim() !== '');

    return NextResponse.json({ hooks });
    
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la génération des accroches',
        details: error.message 
      },
      { status: 500 }
    );
  }
}