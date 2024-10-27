import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Article } from '@/app/models/Article';

interface Params {
  params: { id: string };
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    await dbConnect();
    const article = await Article.findById(params.id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { title, metaDescription, imageUrl, content } = await request.json();

    await dbConnect();

    const slug = title.trim().toLowerCase()
      .replace(/[àáâäæãåā]/g, 'a')
      .replace(/[çćč]/g, 'c')
      .replace(/[èéêëēėę]/g, 'e')
      .replace(/[îïíīįì]/g, 'i')
      .replace(/[ôöòóœøōõ]/g, 'o')
      .replace(/[ùûüūú]/g, 'u')
      .replace(/[ÿ]/g, 'y')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const article = await Article.findByIdAndUpdate(
      params.id,
      {
        title,
        slug,
        metaDescription,
        imageUrl,
        content,
      },
      { new: true }
    );

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    await dbConnect();
    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'article' },
      { status: 500 }
    );
  }
}
