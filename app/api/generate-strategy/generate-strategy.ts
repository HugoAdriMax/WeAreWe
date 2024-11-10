import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { industry, target, budget, goals, timeline } = await req.json();

    // Création d'un prompt détaillé
    const prompt = `En tant qu'expert en marketing digital, crée une stratégie marketing détaillée 
    pour une entreprise avec les caractéristiques suivantes:

    Secteur: ${industry}
    Cible: ${target}
    Budget mensuel: ${budget}
    Objectifs principaux: ${goals.join(', ')}
    Durée: ${timeline}

    Fournis une réponse structurée au format JSON avec:
    - 3-5 objectifs SMART spécifiques (objectives)
    - 4-6 canaux marketing recommandés (channels)
    - 5-7 tactiques concrètes (tactics)
    - 3-5 KPIs essentiels à suivre (kpis)
    - Une recommandation de budget (budget avec min et max)
    - Un timeline d'implémentation (timeline)

    Format de réponse attendu:
    {
      "objectives": [],
      "channels": [],
      "tactics": [],
      "kpis": [],
      "budget": {
        "min": "",
        "max": ""
      },
      "timeline": ""
    }`;

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
      temperature: 0.7,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No content in response');
    }

    const strategyResponse = JSON.parse(responseContent);

    // Transformation et validation des données
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

  } catch (error) {
    console.error('Strategy generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate strategy', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}