import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { Router } from "next/router";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: any }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // If the `_type` is `testimonial`, then all `client.fetch` calls with
    // `{next: {tags: ['testimonial']}}` will be revalidated
    revalidateTag(body._type);
    console.log("Revalidated");
    return NextResponse.json({ body });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
