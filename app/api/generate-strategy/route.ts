import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function POST(request: Request) {
  try {
    const { industry, target, budget, goals, timeline } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en marketing digital spécialisé dans la création de stratégies marketing."
        },
        {
          role: "user",
          content: `Crée une stratégie marketing pour :
            Secteur: ${industry}
            Cible: ${target}
            Budget: ${budget}
            Objectifs: ${goals.join(', ')}
            Durée: ${timeline}
            
            Format de réponse attendu :
            {
              "objectives": ["3-5 objectifs SMART"],
              "channels": ["4-6 canaux marketing"],
              "tactics": ["5-7 tactiques"],
              "kpis": ["3-5 KPIs"],
              "budget": {
                "min": "budget minimum",
                "max": "budget maximum"
              },
              "timeline": "durée"
            }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('Pas de réponse de l\'API');
    }

    const strategyResponse = JSON.parse(responseContent);

    return NextResponse.json(strategyResponse);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la génération de la stratégie' },
      { status: 500 }
    );
  }
}