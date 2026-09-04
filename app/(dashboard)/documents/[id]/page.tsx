"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  File,
  FileArchive,
  FileImage,
  FileText,
  Hash,
  Info,
  ShieldCheck,
  Tag,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

type DocumentData = {
  id: string;
  name: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  extension: string | null;
  size: string;
  storagePath: string;
  sha256: string;
  type:
    | "LEGAL_DOCUMENT"
    | "INVESTIGATION_REPORT"
    | "WITNESS_STATEMENT"
    | "EVIDENCE"
    | "CORRESPONDENCE"
    | "OTHER";
  caseReference: string | null;
  description: string | null;
  status:
    | "UPLOADING"
    | "ACTIVE"
    | "ARCHIVED"
    | "DELETED";
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const TYPE_LABELS: Record<
  DocumentData["type"],
  string
> = {
  LEGAL_DOCUMENT: "Legal Document",
  INVESTIGATION_REPORT: "Investigation Report",
  WITNESS_STATEMENT: "Witness Statement",
  EVIDENCE: "Evidence",
  CORRESPONDENCE: "Correspondence",
  OTHER: "Other",
};

const formatFileSize = (bytes: string) => {
  const value = Number(bytes);

  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  if (value < 1024 * 1024 * 1024) {
    return `${(
      value /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return `${(
    value /
    (1024 * 1024 * 1024)
  ).toFixed(1)} GB`;
};

const formatDateTime = (
  date: string
) => {
  return new Date(date).toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
};

const getFileIcon = (
  extension: string | null
) => {
  const ext =
    extension?.toLowerCase() || "";

  if (
    [".jpg", ".jpeg", ".png", ".webp"].includes(
      ext
    )
  ) {
    return <FileImage size={28} />;
  }

  if (
    [".pdf", ".doc", ".docx", ".txt"].includes(
      ext
    )
  ) {
    return <FileText size={28} />;
  }

  if (ext === ".zip") {
    return <FileArchive size={28} />;
  }

  return <File size={28} />;
};

export default function DocumentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const documentId =
    params.id as string;

  const [document, setDocument] =
    useState<DocumentData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response =
          await fetch(
            `/api/documents/${documentId}`,
            {
              credentials: "include",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to load document."
          );
        }

        setDocument(result.data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load document."
        );
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const handleArchive = async () => {
    if (!document) {
      return;
    }

    const confirmed =
      window.confirm(
        "Archive this document?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/documents/${document.id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to archive document."
        );
      }

      router.push("/documents");
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to archive document."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading document...
          </p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <Info size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
          Document Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {error ||
            "The requested document could not be found."}
        </p>

        <Link
          href="/documents"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={17} />
          Back to Documents
        </Link>
      </div>
    );
  }

  return (
    <div className="ui-stagger mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          Back to Documents
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              {getFileIcon(
                document.extension
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="break-words text-2xl font-bold text-gray-900 dark:text-white">
                  {document.name}
                </h1>

                <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-500">
                  {document.status}
                </span>
              </div>

              <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                {document.originalName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`/api/documents/${document.id}/download`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Download size={17} />
              Download
            </a>

            <button
              type="button"
              onClick={handleArchive}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-900/20"
            >
              <Trash2 size={17} />
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Information */}
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Document Information
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Metadata associated with this document.
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400">
                  Document Type
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {TYPE_LABELS[
                    document.type
                  ]}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  File Size
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {formatFileSize(
                    document.size
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  File Type
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {document.mimeType}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Case / Reference
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {document.caseReference ||
                    "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Uploaded
                </p>

                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
                  <CalendarDays
                    size={14}
                    className="text-blue-500"
                  />
                  {formatDateTime(
                    document.createdAt
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {formatDateTime(
                    document.updatedAt
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Description
              </h2>
            </div>

            <div className="p-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600 dark:text-gray-300">
                {document.description ||
                  "No description was provided for this document."}
              </p>
            </div>
          </div>

          {/* Integrity */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-5 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Document Integrity
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SHA-256 integrity record
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Hash size={14} />
                  SHA-256
                </div>

                <p className="break-all font-mono text-xs leading-6 text-gray-700 dark:text-gray-300">
                  {document.sha256}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-green-500">
                <CheckCircle2 size={15} />
                Integrity record available
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Tags */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Tag size={19} />
              </div>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                Tags
              </h2>
            </div>

            {document.tags.length >
            0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {document.tags.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                No tags assigned.
              </p>
            )}
          </div>

          {/* File Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Info size={19} />
              </div>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                File Details
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400">
                  Original Filename
                </p>

                <p className="mt-1 break-all text-sm text-gray-700 dark:text-gray-300">
                  {document.originalName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Stored Filename
                </p>

                <p className="mt-1 break-all font-mono text-xs text-gray-700 dark:text-gray-300">
                  {document.storedName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  MIME Type
                </p>

                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {document.mimeType}
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-900/10">
            <ShieldCheck
              size={22}
              className="text-blue-500"
            />

            <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
              Controlled Access
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
              This document is accessible through your
              authenticated DocZ workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
