"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveAdminUserAction, type AdminUserActionState } from "@/modules/admin-user/actions/admin-user.actions";
import type { AdminUser } from "@/modules/admin-user/repositories/admin-user.repository";

type AdminUserFormProps = {
  users: AdminUser[];
};

const initialState: AdminUserActionState = {
  ok: false,
  message: ""
};

export function AdminUserForm({ users }: AdminUserFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveAdminUserAction, initialState);
  const selectedUser = users.find((user) => user.id === selectedId);

  useEffect(() => {
    if (state.ok) {
      setSelectedId("");
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedUser ? "Editar administrador" : "Novo administrador"}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Todos os administradores possuem os mesmos poderes no MVP.
        </p>
      </div>

      <input name="id" type="hidden" value={selectedUser?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar novo administrador</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium">
          <span>Nome</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedUser?.name ?? ""}
            key={`name-${selectedUser?.id ?? "new"}`}
            name="name"
            placeholder="Nome completo"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>E-mail</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedUser?.email ?? ""}
            key={`email-${selectedUser?.id ?? "new"}`}
            name="email"
            placeholder="admin@palmadamao.com"
            type="email"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium sm:col-span-2">
          <span>{selectedUser ? "Nova senha temporaria" : "Senha temporaria"}</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            key={`password-${selectedUser?.id ?? "new"}`}
            name="password"
            placeholder={selectedUser ? "Deixe em branco para manter a senha atual" : "Minimo de 8 caracteres"}
            type="password"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          className="h-4 w-4 rounded border-slate-300 text-primary"
          defaultChecked={selectedUser?.active ?? true}
          key={`active-${selectedUser?.id ?? "new"}`}
          name="active"
          type="checkbox"
        />
        Administrador ativo
      </label>

      {state.message ? (
        <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}

      <Button disabled={isPending} type="submit">
        {isPending ? "Salvando..." : selectedUser ? "Salvar alteracoes" : "Criar administrador"}
      </Button>
    </form>
  );
}
