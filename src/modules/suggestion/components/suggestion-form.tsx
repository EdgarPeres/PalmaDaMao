"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  createSuggestionAction,
  type CreateSuggestionState
} from "@/modules/suggestion/actions/create-suggestion.action";

const initialState: CreateSuggestionState = { ok: false, message: "" };

export function SuggestionForm(): React.ReactElement {
  const [state, formAction, isPending] = useActionState(createSuggestionAction, initialState);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <form action={formAction} className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Comunidade</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Sugerir empresa</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Indique uma empresa local para entrar no guia de Montividiu.
          </p>
        </div>

        <input className="hidden" name="company" tabIndex={-1} />

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            name="name"
            placeholder="Nome da empresa"
          />
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            name="category"
            placeholder="Categoria"
          />
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            name="phone"
            placeholder="Telefone"
          />
        </div>

        {state.message ? (
          <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
            {state.message}
          </p>
        ) : null}

        <Button disabled={isPending} type="submit">
          <Send aria-hidden="true" className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar sugestao"}
        </Button>
      </form>
    </section>
  );
}
