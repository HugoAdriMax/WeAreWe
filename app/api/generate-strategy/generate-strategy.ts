import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Configuration de l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Fonction pour gérer les erreurs
function handleError(error: unknown) {
  console.error('Strategy generation error:', error);
  return NextResponse.json(
    { 
      error: 'Failed to generate strategy', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    },
    { status: 500 }
  );
}

// Handler POST
export async function POST(request: Request) {
  try {
    // Validation de la requête
    if (!request.body) {
      return NextResponse.json(
        { error: 'Missing request body' },
        { status: 400 }
      );
    }

    // Récupération et validation des données
    const data = await request.json();
    const { industry, target, budget, goals, timeline } = data;

    if (!industry || !target || !budget || !goals || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Construction du prompt
    const prompt = `En tant qu'expert en marketing digital, crée une stratégie marketing détaillée pour une entreprise avec les caractéristiques suivantes:

    Secteur: ${industry}
    Cible: ${target}
    Budget mensuel: ${budget}
    Objectifs principaux: ${goals.join(', ')}
    Durée: ${timeline}

    Réponds uniquement avec un objet JSON contenant ces éléments :
    {
      "objectives": ["objectif 1", "objectif 2", "objectif 3"],
      "channels": ["canal 1", "canal 2", "canal 3"],
      "tactics": ["tactique 1", "tactique 2", "tactique 3"],
      "kpis": ["kpi 1", "kpi 2", "kpi 3"],
      "budget": {
        "min": "montant minimum",
        "max": "montant maximum"
      },
      "timeline": "planning d'implémentation"
    }`;

    // Appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Tu es un expert en marketing digital spécialisé dans la création de stratégies marketing personnalisées. Tu réponds uniquement en JSON valide."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4",
      response_format: { type: "json_object" },
    });

    // Validation de la réponse
    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse et validation du JSON
    const strategyResponse = JSON.parse(responseContent);

    // Construction de la réponse formatée
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

    // Envoi de la réponse
    return NextResponse.json(strategy);

  } catch (error) {
    return handleError(error);
  }
}

// Handler OPTIONS pour CORS (si nécessaire)
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}