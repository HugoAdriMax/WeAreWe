import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Données de test pour le développement
const mockStrategy = {
  objectives: [
    "Augmenter le trafic web de 50% en 6 mois",
    "Générer 100 leads qualifiés par mois",
    "Atteindre un taux de conversion de 3%",
    "Développer la présence sur les réseaux sociaux"
  ],
  channels: [
    "SEO",
    "Google Ads",
    "LinkedIn",
    "Email Marketing",
    "Content Marketing",
    "Social Media"
  ],
  tactics: [
    "Optimisation du contenu pour les mots-clés ciblés",
    "Campagnes publicitaires segmentées",
    "Publication régulière sur le blog",
    "Newsletter hebdomadaire",
    "Webinaires mensuels"
  ],
  kpis: [
    "Trafic organique mensuel",
    "Taux de conversion des visiteurs",
    "Coût par acquisition",
    "Taux d'engagement sur les réseaux sociaux"
  ],
  budget: {
    min: 1500,
    max: 3000
  },
  timeline: "6 mois"
};

export async function POST(request: Request) {
  try {
    // Vérification de la requête
    if (!request.body) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const { industry, target, budget, goals, timeline } = await request.json();

    // Validation des données
    if (!industry || !target || !budget || !goals || !timeline) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Pour le développement, retournez les données mockées
    return NextResponse.json(mockStrategy);

    /* Version avec OpenAI (à décommenter plus tard)
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
    */

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

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Méthode GET non supportée' }, { status: 405 });
}

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