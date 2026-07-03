"use client";

import Link from "next/link";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import type { diagnosisEntries } from "@/data/diagnosis/registry";

type Entry = (typeof diagnosisEntries)[number];

export default function DiagnosisDomainCard({ entry, isArabic }: { entry: Entry; isArabic: boolean }) {
  return (
    <Link
      href={`/diagnosis/${entry.slug}`}
      className="group flex min-h-[17rem] flex-col justify-between rounded-[1.35rem] border border-border bg-surface p-5 text-foreground shadow-[0_24px_70px_-56px_var(--cool-shadow)] transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary-theme hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme sm:p-6"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-muted text-primary-theme">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-primary-theme" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase text-muted">{entry.domain}</p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-foreground">
          {isArabic ? entry.titleAr : entry.title}
        </h2>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted">
        {isArabic ? entry.descriptionAr : entry.description}
      </p>
      <span className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full border border-border px-4 text-sm font-bold text-primary-theme">
        {isArabic ? "ابدأ التشخيص" : "Start diagnosis"}
      </span>
    </Link>
  );
}
