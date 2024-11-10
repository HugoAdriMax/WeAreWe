// app/api/generate-strategy/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // Ajout de cette option
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'La clé API OpenAI n\'est pas configurée' },
      { status: 500 }
    );
  }

  try {
    const { industry, target, budget, goals, timeline } = await request.json();

    if (!industry || !target || !budget || !goals || !timeline) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const prompt = `En tant qu'expert en marketing digital, crée une stratégie marketing détaillée pour :
    
    Secteur: ${industry}
    Cible: ${target}
    Budget: ${budget}
    Objectifs: ${goals.join(', ')}
    Durée: ${timeline}
    
    Format de réponse en JSON :
    {
      "objectives": ["3-5 objectifs SMART"],
      "channels": ["4-6 canaux marketing"],
      "tactics": ["5-7 tactiques"],
      "kpis": ["3-5 KPIs"],
      "budget": {
        "min": "budget minimum",
        "max": "budget maximum"
      },
      "timeline": "planning d'implémentation"
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Changement du modèle pour correspondre
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en marketing digital spécialisé dans la création de stratégies marketing. Répondez uniquement en format JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('Pas de réponse de l\'API OpenAI');
    }

    const strategyResponse = JSON.parse(responseContent);
    
    const strategy = {
      objectives: strategyResponse.objectives || [],
      channels: strategyResponse.channels || [],
      tactics: strategyResponse.tactics || [],
      kpis: strategyResponse.kpis || [],
      budget: {
        min: parseInt(strategyResponse.budget?.min || '0'),
        max: parseInt(strategyResponse.budget?.max || '0'),
      },
      timeline: strategyResponse.timeline || timeline,
    };

    return NextResponse.json(strategy);

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