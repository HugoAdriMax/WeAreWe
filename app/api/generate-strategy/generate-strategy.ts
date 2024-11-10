// app/api/generate-strategy/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';  // Ajout de cette ligne

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
    const data = await request.json();
    const { industry, target, budget, goals, timeline } = data;

    const systemMessage = "Vous êtes un expert en marketing digital spécialisé dans la création de stratégies marketing.";
    
    const userPrompt = `Créez une stratégie marketing détaillée pour :
    
    Secteur: ${industry}
    Cible: ${target}
    Budget: ${budget}
    Objectifs: ${goals.join(', ')}
    Durée: ${timeline}
    
    Incluez:
    1. 3-5 objectifs SMART
    2. 4-6 canaux marketing recommandés
    3. 5-7 tactiques spécifiques
    4. 3-5 KPIs à suivre
    5. Recommandation budgétaire
    6. Planning d'implémentation`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedText = completion.choices[0]?.message?.content || '';

    // Structuration de la réponse
    const strategy = {
      objectives: generatedText.split('\n').filter(line => line.includes('objectif') || line.includes('Objectif')),
      channels: generatedText.split('\n').filter(line => line.includes('canal') || line.includes('Canal')),
      tactics: generatedText.split('\n').filter(line => line.includes('tactique') || line.includes('Tactique')),
      kpis: generatedText.split('\n').filter(line => line.includes('KPI') || line.includes('indicateur')),
      budget: {
        min: budget.includes('small') ? 500 : budget.includes('medium') ? 1000 : 3000,
        max: budget.includes('small') ? 1000 : budget.includes('medium') ? 3000 : 5000,
      },
      timeline: timeline
    };

    return NextResponse.json({ strategy });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      {
        error: 'Une erreur est survenue lors de la génération de la stratégie',
        details: error.message
      },
      { status: 500 }
    );
  }
}

// Ajout des méthodes OPTIONS et GET
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Méthode GET non supportée' }, { status: 405 });
}