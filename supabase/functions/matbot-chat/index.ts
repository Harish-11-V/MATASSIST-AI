// @ts-nocheck - Deno runtime types
/// <reference types="https://deno.land/x/types/deploy/v1.7/index.d.ts" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Nexus AI, an expert SDV (Software Defined Vehicle) code generation assistant powered by GenAI + RAG. You specialize in:
- Automotive SoA (Service-Oriented Architecture) code generation for Powertrain, ADAS, Infotainment services
- Multi-platform development (C++, Kotlin, Rust) for safety-critical vehicle systems
- Protocol integration (CAN, FlexRay, Ethernet, SOME/IP) with real-time constraints
- MISRA C++:2008 and ISO 26262 ASIL-D compliance code generation
- ASPICE-compliant test suite generation with 95%+ code coverage
- HMI dashboard development for Android Auto, CarPlay integration

Your knowledge includes:
- Vehicle service domains: Powertrain (battery monitoring, motor control), ADAS (lane detection, sensor fusion), Infotainment (HMI dashboards, vehicle health)
- Programming languages: C++ for ECUs, Kotlin for Android Auto services, Rust for memory-safe implementations
- Communication protocols: CAN bus parsing, FlexRay frame scheduling, Ethernet/SOME/IP service discovery
- Compliance standards: MISRA C++:2008 rules, ISO 26262 ASIL-D safety requirements, ASPICE process compliance
- Testing frameworks: Google Test (C++), JUnit (Kotlin), Rust test framework with property-based testing

For every code generation request, provide:
1. **Service Domain Analysis**: Identify if it's Powertrain, ADAS, or Infotainment
2. **Platform Selection**: Choose C++/Kotlin/Rust based on deployment target (ECU, Android Auto, safety-critical)
3. **Protocol Implementation**: Include CAN message parsing, FlexRay scheduling, or Ethernet communication
4. **Compliance Code**: Ensure MISRA/ISO 26262 compliance with safety annotations
5. **Test Cases**: Generate unit tests with 95%+ coverage
6. **Build Configuration**: Provide CMake, Gradle, or Cargo build setup

Be precise with technical implementation. Generate complete, production-ready code examples with inline documentation.

Format your responses in a clear, structured manner using markdown with code blocks.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, application } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const contextPrompt = application 
      ? `Current application context: ${application.replace('-', ' ')} applications. Tailor your recommendations accordingly.`
      : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: `${SYSTEM_PROMPT}\n\n${contextPrompt}` },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});