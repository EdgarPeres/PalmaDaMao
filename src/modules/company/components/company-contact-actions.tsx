"use client";

import { AtSign, ExternalLink, Link as LinkIcon, MessageCircle } from "lucide-react";
import type { PublicCompanyDetail } from "@/modules/company/types/public-company";

type CompanyContactActionsProps = {
  company: PublicCompanyDetail;
};

type ContactAction = {
  href: string;
  label: string;
  type: "WHATSAPP" | "INSTAGRAM" | "MAIN_LINK";
  icon: typeof MessageCircle;
  primary?: boolean;
};

function normalizeInstagramHref(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://instagram.com/${value.replace(/^@/, "")}`;
}

export function CompanyContactActions({ company }: CompanyContactActionsProps): React.ReactElement {
  const contacts: ContactAction[] = [];

  if (company.whatsapp) {
    contacts.push({
      href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
      label: "WhatsApp",
      type: "WHATSAPP",
      icon: MessageCircle,
      primary: true
    });
  }

  if (company.mainLink) {
    contacts.push({ href: company.mainLink, label: "Link principal", type: "MAIN_LINK", icon: LinkIcon });
  }

  if (company.instagram) {
    contacts.push({
      href: normalizeInstagramHref(company.instagram),
      label: "Instagram",
      type: "INSTAGRAM",
      icon: AtSign
    });
  }

  if (company.website) {
    contacts.push({ href: company.website, label: "Site", type: "MAIN_LINK", icon: ExternalLink });
  }

  return (
    <section aria-label="Canais de contato" className="grid gap-3 sm:grid-cols-2">
      {contacts.map((contact) => {
        const Icon = contact.icon;
        return (
          <a
            className={
              contact.primary
                ? "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                : "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 shadow-sm hover:border-primary hover:text-primary"
            }
            href={contact.href}
            key={contact.label}
            onClick={() => registerExternalClick(company.id, contact.type)}
            rel="noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {contact.label}
          </a>
        );
      })}
    </section>
  );
}

function registerExternalClick(companyId: string, type: ContactAction["type"]): void {
  const sessionStorageKey = "palma-da-mao-session-id";
  const existingSessionId = window.localStorage.getItem(sessionStorageKey);
  const sessionId = existingSessionId ?? crypto.randomUUID();

  if (!existingSessionId) {
    window.localStorage.setItem(sessionStorageKey, sessionId);
  }

  fetch("/api/metrics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyId,
      type,
      sessionId
    })
  }).catch(() => undefined);
}
