import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "../../../../prisma/index";

//GET REQUEST
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = await req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Post Not Found " }, { status: 404 });
    }
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error : ", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//PUT REQUEST
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = await req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error : ", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//DELETE REQUEST
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = await req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error : ", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
