"use client";

import Link from "next/link";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  File,
  FileArchive,
  FileImage,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type DocumentItem = {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  extension: string | null;
  size: string;
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
  DocumentItem["type"],
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
    return <FileImage size={22} />;
  }

  if (
    [".pdf", ".doc", ".docx", ".txt"].includes(
      ext
    )
  ) {
    return <FileText size={22} />;
  }

  if (ext === ".zip") {
    return <FileArchive size={22} />;
  }

  return <File size={22} />;
};

export default function DocumentsPage() {
  const [documents, setDocuments] =
    useState<DocumentItem[]>([]);

  const [search, setSearch] =
    useState("");

  const [searchInput, setSearchInput] =
    useState("");

  const [type, setType] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalDocuments, setTotalDocuments] =
    useState(0);

  const fetchDocuments = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const params =
          new URLSearchParams();

        if (search) {
          params.set("search", search);
        }

        if (type) {
          params.set("type", type);
        }

        params.set("page", page.toString());
        params.set("limit", "20");

        const response =
          await fetch(
            `/api/documents?${params.toString()}`,
            {
              credentials: "include",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to load documents."
          );
        }

        setDocuments(
          result.data.documents
        );

        setTotalPages(
          result.data.pagination.totalPages
        );

        setTotalDocuments(
          result.data.pagination.total
        );
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load documents."
        );
      } finally {
        setLoading(false);
      }
    },
    [search, type, page]
  );

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleDelete = async (
    documentId: string
  ) => {
    const confirmed =
      window.confirm(
        "Archive this document? It will no longer appear in your active documents."
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/documents/${documentId}`,
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

      await fetchDocuments();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to archive document."
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-blue-500">
            <FolderOpen size={20} />

            <span className="text-sm font-medium">
              Document Management
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Documents
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage and access your stored legal and
            investigation-related documents.
          </p>
        </div>

        <Link
          href="/documents/upload"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <UploadCloud size={18} />
          Upload Document
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 lg:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
              placeholder="Search documents, cases, tags or metadata..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <select
            value={type}
            onChange={(event) => {
              setPage(1);
              setType(event.target.value);
            }}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-gray-200"
          >
            <option value="">
              All document types
            </option>

            <option value="LEGAL_DOCUMENT">
              Legal Document
            </option>

            <option value="INVESTIGATION_REPORT">
              Investigation Report
            </option>

            <option value="WITNESS_STATEMENT">
              Witness Statement
            </option>

            <option value="EVIDENCE">
              Evidence
            </option>

            <option value="CORRESPONDENCE">
              Correspondence
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Documents
            </span>

            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500">
              <FileText size={19} />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {totalDocuments}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Current Page
            </span>

            <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-500">
              <FolderOpen size={19} />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {page}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Verified Records
            </span>

            <div className="rounded-xl bg-green-500/10 p-2.5 text-green-500">
              <ShieldCheck size={19} />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {documents.filter(
              (document) =>
                document.sha256.length === 64
            ).length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Storage Status
            </span>

            <div className="rounded-xl bg-green-500/10 p-2.5 text-green-500">
              <CheckCircle2 size={19} />
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold text-green-500">
            Available
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Documents */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Documents
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Recently stored and managed documents.
            </p>
          </div>

          <span className="text-xs text-gray-400">
            {totalDocuments} document
            {totalDocuments === 1
              ? ""
              : "s"}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <FileText size={28} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
              No documents found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              Upload your first document or change your
              search/filter criteria.
            </p>

            <Link
              href="/documents/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <UploadCloud size={17} />
              Upload Document
            </Link>
          </div>
        ) : (
          <div>
            {documents.map(
              (document) => (
                <div
                  key={document.id}
                  className="group border-b border-gray-200 p-5 transition hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      {getFileIcon(
                        document.extension
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-2 lg:flex-row">
                        <div className="min-w-0">
                          <Link
                            href={`/documents/${document.id}`}
                            className="block truncate text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                          >
                            {document.name}
                          </Link>

                          <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                            {document.originalName}
                          </p>
                        </div>

                        <span className="w-fit rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-500">
                          {document.status}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                        <span>
                          {
                            TYPE_LABELS[
                              document.type
                            ]
                          }
                        </span>

                        <span>
                          {formatFileSize(
                            document.size
                          )}
                        </span>

                        {document.caseReference && (
                          <span>
                            {document.caseReference}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1">
                          <CalendarDays
                            size={13}
                          />
                          {formatDate(
                            document.createdAt
                          )}
                        </span>
                      </div>

                      {document.tags.length >
                        0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {document.tags
                            .slice(0, 5)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-gray-100 px-2 py-1 text-[10px] text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <Link
                        href={`/documents/${document.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-500/10 hover:text-blue-500"
                        title="View document"
                      >
                        <ArrowRight size={17} />
                      </Link>

                      <a
                        href={`/api/documents/${document.id}/download`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-500/10 hover:text-blue-500"
                        title="Download"
                      >
                        <Download size={17} />
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            document.id
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-500"
                        title="Archive"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading &&
          documents.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((current) =>
                    Math.max(
                      current - 1,
                      1
                    )
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                <ChevronLeft size={15} />
                Previous
              </button>

              <span className="text-xs text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  page >= totalPages
                }
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      current + 1,
                      totalPages
                    )
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}