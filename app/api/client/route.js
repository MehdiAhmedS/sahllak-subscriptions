import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  const { data } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });

  return new NextResponse(
    JSON.stringify({
      data: data,
      status: 200,
    })
  );
}

export async function POST(request) {
  const body = await request.json();

  console.log(body);

  const {
    client_name,
    email,
    client_phone,
    client_company,
    onboarding_cost,
    subscription_cost,
  } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  const data = await supabase.from("clients").insert({
    client_name: client_name,
    email: email,
    client_phone: client_phone,
    client_company_name: client_company,
    onboarding_cost: onboarding_cost,
    subscription_cost: subscription_cost,
  });

  console.log(data);

  return new NextResponse(JSON.stringify(data));
}

export async function PUT(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  const body = await request.json();

  const { id, clientName, clientEmail, clientOC, clientSC } = body;

  const data = await supabase
    .from("clients")
    .update({
      client_name: clientName,
      email: clientEmail,
      onboarding_cost: clientOC,
      subscription_cost: clientSC,
    })
    .eq("id", id);

  console.log(data);

  return new NextResponse(JSON.stringify(data));
}
