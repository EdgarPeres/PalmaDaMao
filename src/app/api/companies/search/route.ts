import { NextResponse } from "next/server";
import { searchPublicCompanies } from "@/modules/company/services/public-company.service";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const citySlug = searchParams.get("city") ?? "montividiu";
  const query = searchParams.get("q") ?? "";

  if (query.trim().length < 2) {
    return NextResponse.json({ companies: [] });
  }

  const companies = await searchPublicCompanies(citySlug, query);

  return NextResponse.json({ companies });
}
