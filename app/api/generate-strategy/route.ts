import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';  // Ajout pour le runtime Edge

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Types pour TypeScript
interface StrategyRequest {
  industry: string;
  target: string;
  budget: string;
  goals: string[];
  timeline: string;
}

interface StrategyResponse {
  objectives: string[];
  channels: string[];
  tactics: string[];
  kpis: string[];
  budget: {
    min: number;
    max: number;
  };
  timeline: string;
}

export async function POST(request: Request) {
  try {
    const { industry, target, budget, goals, timeline }: StrategyRequest = await request.json();

    // Validation des données
    if (!industry || !target || !budget || !goals || !timeline) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en marketing digital senior spécialisé dans la création de stratégies marketing B2B et B2C. 
          Tu fournis des stratégies détaillées, concrètes et actionnables, adaptées au budget et au secteur du client.
          Tes réponses sont toujours en format JSON et en français.`
        },
        {
          role: "user",
          content: `Crée une stratégie marketing détaillée pour ce client :

          Secteur: ${industry}
          Cible: ${target}
          Budget mensuel: ${budget}
          Objectifs principaux: ${goals.join(', ')}
          Durée souhaitée: ${timeline}
          
          La stratégie doit inclure :
          - Des objectifs SMART spécifiques et mesurables
          - Des canaux pertinents pour ce secteur et cette cible
          - Des tactiques concrètes et actionnables
          - Des KPIs précis et mesurables
          - Une recommandation budgétaire réaliste
          
          Respecte strictement ce format JSON :
          {
            "objectives": ["3-5 objectifs SMART"],
            "channels": ["4-6 canaux marketing"],
            "tactics": ["5-7 tactiques"],
            "kpis": ["3-5 KPIs"],
            "budget": {
              "min": number,
              "max": number
            },
            "timeline": "string"
          }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('Réponse vide de l\'API');
    }

    const strategyResponse = JSON.parse(responseContent) as StrategyResponse;

    // Validation et nettoyage des données
    const cleanStrategy: StrategyResponse = {
      objectives: Array.isArray(strategyResponse.objectives) ? strategyResponse.objectives : [],
      channels: Array.isArray(strategyResponse.channels) ? strategyResponse.channels : [],
      tactics: Array.isArray(strategyResponse.tactics) ? strategyResponse.tactics : [],
      kpis: Array.isArray(strategyResponse.kpis) ? strategyResponse.kpis : [],
      budget: {
        min: Number(strategyResponse.budget?.min) || 0,
        max: Number(strategyResponse.budget?.max) || 0
      },
      timeline: strategyResponse.timeline || timeline
    };

    return NextResponse.json(cleanStrategy);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la génération de la stratégie',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

// Handler pour les requêtes OPTIONS (CORS)
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