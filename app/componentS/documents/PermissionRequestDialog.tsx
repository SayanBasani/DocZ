"use client";

import { useState } from "react";

type PermissionType =
  | "VIEW"
  | "DOWNLOAD"
  | "EDIT"
  | "DELETE"
  | "SHARE"
  | "VIEW_AUDIT";

type PermissionRequestDialogProps = {
  documentId: string;
  documentName: string;
  onClose: () => void;
  onSuccess?: () => void;
};

const PERMISSIONS: {
  value: PermissionType;
  label: string;
  description: string;
}[] = [
  {
    value: "VIEW",
    label: "View",
    description: "Open and view this document.",
  },
  {
    value: "DOWNLOAD",
    label: "Download",
    description: "Download a copy of this document.",
  },
  {
    value: "EDIT",
    label: "Edit",
    description: "Modify document information.",
  },
];

export default function PermissionRequestDialog({
  documentId,
  documentName,
  onClose,
  onSuccess,
}: PermissionRequestDialogProps) {
  const [permission, setPermission] =
    useState<PermissionType>("VIEW");

  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function submitRequest() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/permissions/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId,
            permission,
            reason,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.message ||
            "Failed to send permission request."
        );

        return;
      }

      onSuccess?.();

      onClose();
    } catch (error) {
      console.error(
        "Permission request failed:",
        error
      );

      setError(
        "Something went wrong while sending the request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Request Permission
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Request access to this document from its owner.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-lg text-muted-foreground hover:bg-muted"
          >
            ×
          </button>
        </div>

        <div className="mt-6 rounded-xl border bg-muted/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Document
          </p>

          <p className="mt-1 break-all font-medium">
            {documentName}
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Permission
          </label>

          <div className="mt-3 space-y-2">
            {PERMISSIONS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setPermission(item.value)
                }
                className={`w-full rounded-xl border p-4 text-left transition ${
                  permission === item.value
                    ? "border-blue-500 bg-blue-500/10"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {item.label}
                  </span>

                  <span
                    className={`h-4 w-4 rounded-full border ${
                      permission === item.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-muted-foreground"
                    }`}
                  />
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="permission-reason"
            className="text-sm font-medium"
          >
            Reason
          </label>

          <textarea
            id="permission-reason"
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            placeholder="Explain why you need access..."
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={submitRequest}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}