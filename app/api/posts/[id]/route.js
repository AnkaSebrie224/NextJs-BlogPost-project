//url= 'http://localhost:3000/api/posts/12345'
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
//Get post
export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      return NextResponse.json(
        { message: 'post not found', error },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: 'Get Error', error }, { status: 500 });
  }
};
//update post
export const PATCH = async (request, { params }) => {
  try {
    const body = await request.json();
    const { title, description } = body;
    const { id } = params;
    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    if (!updatePost) {
      return NextResponse.json(
        { message: 'post not found', error },
        { status: 404 }
      );
    }
    return NextResponse.json(updatePost);
  } catch (error) {
    return NextResponse.json(
      { message: 'update Error', error },
      { status: 500 }
    );
  }
};

//Delete a post
export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(' post has been deleted');
  } catch (error) {
    return NextResponse.json(
      { message: 'Delete Error', error },
      { status: 500 }
    );
  }
};
