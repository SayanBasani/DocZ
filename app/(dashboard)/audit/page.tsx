"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AuditLog = {
  id: string;
  action: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;

  document: {
    id: string;
    originalName: string;
    type: string;
  } | null;

  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const ACTIONS = [
  {
    value: "",
    label: "All activity",
  },
  {
    value: "DOCUMENT_UPLOADED",
    label: "Document uploaded",
  },
  {
    value: "DOCUMENT_ACCESSED",
    label: "Document accessed",
  },
  {
    value: "DOCUMENT_DOWNLOADED",
    label: "Document downloaded",
  },
  {
    value: "DOCUMENT_UPDATED",
    label: "Document updated",
  },
  {
    value: "DOCUMENT_ARCHIVED",
    label: "Document archived",
  },
  {
    value: "DOCUMENT_DELETED",
    label: "Document deleted",
  },
];

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAuditLogs(page = 1) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", "20");

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (action) {
        params.set("action", action);
      }

      const response = await fetch(
        `/api/audit?${params.toString()}`,
        {
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load audit logs."
        );
      }

      setLogs(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load audit logs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAuditLogs(1);
  }, [action]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    loadAuditLogs(1);
  }

  function formatAction(action: string) {
    return action
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  function getActionStyle(action: string) {
    if (action.includes("DELETED")) {
      return "bg-red-500/10 text-red-500";
    }

    if (action.includes("DOWNLOADED")) {
      return "bg-purple-500/10 text-purple-500";
    }

    if (action.includes("UPLOADED")) {
      return "bg-green-500/10 text-green-500";
    }

    if (action.includes("UPDATED")) {
      return "bg-yellow-500/10 text-yellow-500";
    }

    return "bg-blue-500/10 text-blue-500";
  }

  return (
    <main className="space-y-6 p-6">
      {/* Header */}

      <div>
        <p className="text-sm font-medium text-blue-500">
          Security & Activity
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Audit Trail
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Review document and account activity recorded by DocZ.
        </p>
      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-card p-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 lg:flex-row"
        >
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search documents, users or activity..."
              className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
            />
          </div>

          <select
            value={action}
            onChange={(event) =>
              setAction(event.target.value)
            }
            className="rounded-xl border bg-background px-4 py-2.5 text-sm outline-none"
          >
            {ACTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Summary */}

      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {pagination.total} activity records
          </p>

          <p className="text-xs text-muted-foreground">
            Page {pagination.page} of{" "}
            {Math.max(pagination.totalPages, 1)}
          </p>
        </div>
      )}

      {/* Audit list */}

      <div className="overflow-hidden rounded-2xl border bg-card">
        {loading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Loading audit trail...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium">
              No activity found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Audit events will appear here as activity occurs.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-5 transition hover:bg-muted/30"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Activity */}

                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${getActionStyle(
                        log.action
                      )}`}
                    >
                      •
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getActionStyle(
                            log.action
                          )}`}
                        >
                          {formatAction(log.action)}
                        </span>
                      </div>

                      {log.document ? (
                        <Link
                          href={`/documents/${log.document.id}`}
                          className="mt-2 block truncate text-sm font-medium hover:text-blue-500 hover:underline"
                        >
                          {log.document.originalName}
                        </Link>
                      ) : (
                        <p className="mt-2 text-sm font-medium">
                          Account activity
                        </p>
                      )}

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(log.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Actor */}

                  <div className="shrink-0 lg:text-right">
                    <p className="text-sm font-medium">
                      {log.user.username}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {log.user.email}
                    </p>

                    <span className="mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {log.user.role}
                    </span>
                  </div>
                </div>

                {/* Technical information */}

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t pt-3 text-xs text-muted-foreground">
                  <span>
                    IP: {log.ipAddress || "Not available"}
                  </span>

                  {log.document && (
                    <span>
                      Type: {log.document.type}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}

      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() =>
              loadAuditLogs(pagination.page - 1)
            }
            className="rounded-xl border px-4 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-muted-foreground">
            {pagination.page} / {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={
              pagination.page >= pagination.totalPages
            }
            onClick={() =>
              loadAuditLogs(pagination.page + 1)
            }
            className="rounded-xl border px-4 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}