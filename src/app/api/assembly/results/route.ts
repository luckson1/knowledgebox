import { env } from "@/lib/env.mjs";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request)  {
  try {
    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
    });
    const idSchema = z.string();
    const { id } = await req.json();
    const isValidId = idSchema.safeParse(id);
    if (!isValidId.success) {
        throw new TRPCError({
          code: 'PARSE_ERROR',
          message: "Invalid id provided",
        });
      }
      const validId = idSchema.parse(id);

        const response = await assembly.get(`/transcript/${validId}`);

    

    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error);
  }
}
