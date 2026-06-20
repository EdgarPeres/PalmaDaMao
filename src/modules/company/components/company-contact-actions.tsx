"use client";

import { AtSign, ExternalLink, Link as LinkIcon, Phone } from "lucide-react";
import type { PublicCompanyDetail } from "@/modules/company/types/public-company";

type CompanyContactActionsProps = {
  company: PublicCompanyDetail;
};

export function CompanyContactActions({ company }: CompanyContactActionsProps): React.ReactElement {
  const contacts: Array<{
    href: string;
    label: string;
    icon: typeof Phone;
  }> = [];

  if (company.whatsapp) {
    contacts.push({
      href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
      label: "WhatsApp",
      icon: Phone
    });
  }

  if (company.mainLink) {
    contacts.push({ href: company.mainLink, label: "Link principal", icon: LinkIcon });
  }

  if (company.instagram) {
    contacts.push({ href: company.instagram, label: "Instagram", icon: AtSign });
  }

  if (company.website) {
    contacts.push({ href: company.website, label: "Site", icon: ExternalLink });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {contacts.map((contact) => {
        const Icon = contact.icon;
        return (
          <a
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-700"
            href={contact.href}
            key={contact.label}
            onClick={() => registerExternalClick(company.id, contact.label)}
            rel="noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {contact.label}
          </a>
        );
      })}
    </div>
  );
}

function registerExternalClick(companyId: string, label: string): void {
  const typeByLabel: Record<string, "WHATSAPP" | "INSTAGRAM" | "MAIN_LINK"> = {
    WhatsApp: "WHATSAPP",
    Instagram: "INSTAGRAM",
    "Link principal": "MAIN_LINK",
    Site: "MAIN_LINK"
  };
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
      type: typeByLabel[label],
      sessionId
    })
  }).catch(() => undefined);
}
