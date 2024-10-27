import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Article } from '@/app/models/Article';

export async function GET(request: Request, { params }: any) {
  await dbConnect();
  const article = await Article.findById(params.id);
  return article
    ? NextResponse.json(article)
    : NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
}

export async function PUT(request: Request, { params }: any) {
  const { title, metaDescription, imageUrl, content } = await request.json();
  await dbConnect();
  const updatedArticle = await Article.findByIdAndUpdate(
    params.id,
    { title, metaDescription, imageUrl, content },
    { new: true }
  );
  return updatedArticle
    ? NextResponse.json(updatedArticle)
    : NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: any) {
  await dbConnect();
  const deletedArticle = await Article.findByIdAndDelete(params.id);
  return deletedArticle
    ? new NextResponse(null, { status: 204 })
    : NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
}
