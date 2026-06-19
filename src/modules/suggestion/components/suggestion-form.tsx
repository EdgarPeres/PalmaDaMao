"use client";

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
    <form action={formAction} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Sugerir empresa</h2>
        <p className="mt-1 text-sm text-slate-600">Indique uma empresa local para o portal.</p>
      </div>
      <input className="hidden" name="company" tabIndex={-1} />
      <input className="h-11 w-full rounded-md border border-slate-300 px-3" name="name" placeholder="Nome da empresa" />
      <input className="h-11 w-full rounded-md border border-slate-300 px-3" name="category" placeholder="Categoria" />
      <input className="h-11 w-full rounded-md border border-slate-300 px-3" name="phone" placeholder="Telefone" />
      {state.message ? <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.message}</p> : null}
      <Button disabled={isPending} type="submit">
        {isPending ? "Enviando..." : "Enviar sugestão"}
      </Button>
    </form>
  );
}
