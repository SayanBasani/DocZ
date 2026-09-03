"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  File,
  FileArchive,
  FileImage,
  FileText,
  FolderOpen,
  Info,
  LockKeyhole,
  ShieldCheck,
  Tag,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

type DocumentType =
  | "LEGAL_DOCUMENT"
  | "INVESTIGATION_REPORT"
  | "WITNESS_STATEMENT"
  | "EVIDENCE"
  | "CORRESPONDENCE"
  | "OTHER";

type SelectedFile = {
  file: File;
  id: string;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".zip",
  ".csv",
  ".xlsx",
  ".xls",
];

const DOCUMENT_TYPES = [
  {
    value: "LEGAL_DOCUMENT",
    label: "Legal Document",
  },
  {
    value: "INVESTIGATION_REPORT",
    label: "Investigation Report",
  },
  {
    value: "WITNESS_STATEMENT",
    label: "Witness Statement",
  },
  {
    value: "EVIDENCE",
    label: "Evidence",
  },
  {
    value: "CORRESPONDENCE",
    label: "Correspondence",
  },
  {
    value: "OTHER",
    label: "Other",
  },
] as const;

export default function UploadDocumentPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<SelectedFile | null>(null);

  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] =
    useState<DocumentType | "">("");

  const [caseReference, setCaseReference] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const getExtension = (fileName: string) => {
    const lastDot = fileName.lastIndexOf(".");

    if (lastDot === -1) {
      return "";
    }

    return fileName.slice(lastDot).toLowerCase();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const getFileIcon = (file: File) => {
    const extension = getExtension(file.name);

    if (
      [".jpg", ".jpeg", ".png", ".webp"].includes(extension)
    ) {
      return <FileImage size={24} />;
    }

    if (
      [".pdf", ".doc", ".docx", ".txt"].includes(extension)
    ) {
      return <FileText size={24} />;
    }

    if (
      [".zip"].includes(extension)
    ) {
      return <FileArchive size={24} />;
    }

    return <File size={24} />;
  };

  const validateFile = (file: File) => {
    const extension = getExtension(file.name);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `File type ${extension || "unknown"} is not supported.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be 50 MB or less.";
    }

    return "";
  };

  const selectFile = (file: File) => {
    setError("");
    setUploaded(false);

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile({
      file,
      id: `${file.name}-${file.size}-${file.lastModified}`,
    });

    if (!documentName) {
      setDocumentName(
        file.name.substring(0, file.name.lastIndexOf("."))
      );
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    selectFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    selectFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setDocumentName("");
    setError("");
    setUploaded(false);
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setDocumentName("");
    setDocumentType("");
    setCaseReference("");
    setTags("");
    setDescription("");
    setError("");
    setUploaded(false);
    setUploading(false);
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!selectedFile) {
      setError("Please select a document before uploading.");
      return;
    }

    if (!documentName.trim()) {
      setError("Please enter a document name.");
      return;
    }

    if (!documentType) {
      setError("Please select a document type.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    /*
     * Frontend upload simulation.
     *
     * Replace this section with your real API call when
     * /api/documents/upload is ready.
     */
    const formData = new FormData();

    formData.append(
      "file",
      selectedFile.file
    );

    formData.append(
      "documentName",
      documentName.trim()
    );

    formData.append(
      "documentType",
      documentType
    );

    formData.append(
      "caseReference",
      caseReference.trim()
    );

    formData.append(
      "tags",
      tags
    );

    formData.append(
      "description",
      description.trim()
    );

    const response = await fetch(
      "/api/documents/upload",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.message ||
          "Unable to upload document."
      );

      return;
    }

    setUploaded(true);
    // end 
    
    for (let progress = 10; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      setUploadProgress(progress);
    }

    setUploading(false);
    setUploaded(true);
  };

  if (uploaded) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to Documents
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

          <div className="px-6 py-14 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle2 size={42} />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Document Uploaded Successfully
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {documentName}
              </span>{" "}
              has been added to your DocZ workspace.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-xl border border-gray-200 bg-gray-50 p-4 text-left dark:border-slate-700 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  {getFileIcon(selectedFile!.file)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {selectedFile!.file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(selectedFile!.file.size)} •{" "}
                    {documentType}
                  </p>
                </div>

                <div className="ml-auto shrink-0">
                  <CheckCircle2
                    size={20}
                    className="text-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/documents"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <FolderOpen size={17} />
                View Documents
              </Link>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                <UploadCloud size={17} />
                Upload Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      {/* Page Header */}
      <div>
        <Link
          href="/documents"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          Back to Documents
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-500">
              <UploadCloud size={20} />

              <span className="text-sm font-medium">
                Document Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Upload Document
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Add a document to your DocZ workspace, provide relevant
              information, and keep it organized for future access.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* Main Upload Area */}
        <div className="space-y-8 lg:col-span-2">
          {/* File Upload Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Document
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Upload the file you want to store in your DocZ workspace.
              </p>
            </div>

            {!selectedFile ? (
              <div
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setDragActive(false);
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-14 ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-500/5 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-blue-500"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={ALLOWED_EXTENSIONS.join(",")}
                  onChange={handleFileChange}
                />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-105">
                  <UploadCloud size={30} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
                  Drag & drop your file here
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  or click anywhere to browse your device
                </p>

                <div className="mt-5 inline-flex items-center rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500 dark:bg-slate-800 dark:text-gray-400">
                  Maximum file size: 50 MB
                </div>

                <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-gray-400 dark:text-gray-500">
                  PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, WEBP,
                  ZIP, CSV, XLS and XLSX
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    {getFileIcon(selectedFile.file)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedFile.file.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(selectedFile.file.size)} •{" "}
                      {getExtension(selectedFile.file.name)
                        .replace(".", "")
                        .toUpperCase()}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-green-500">
                      <Check size={14} />
                      Ready to upload
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-500"
                    aria-label="Remove file"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
                <Info size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Document Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Document Information
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add information that will help you identify and find this
                document later.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Document Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Document Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={documentName}
                  onChange={(event) =>
                    setDocumentName(event.target.value)
                  }
                  placeholder="e.g. Investigation Report"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Document Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Document Type
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  value={documentType}
                  onChange={(event) =>
                    setDocumentType(
                      event.target.value as DocumentType
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white"
                >
                  <option value="">
                    Select document type
                  </option>

                  {DOCUMENT_TYPES.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Case Reference */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Case / Reference
                </label>

                <input
                  type="text"
                  value={caseReference}
                  onChange={(event) =>
                    setCaseReference(event.target.value)
                  }
                  placeholder="e.g. CASE-1024"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Tags
                </label>

                <div className="relative">
                  <Tag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={tags}
                    onChange={(event) =>
                      setTags(event.target.value)
                    }
                    placeholder="evidence, report, case"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={5}
                placeholder="Add a short description or relevant context about this document..."
                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
              />

              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Keep descriptions factual and relevant to the document.
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Uploading document...
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Please keep this window open.
                  </p>
                </div>

                <span className="text-sm font-semibold text-blue-500">
                  {uploadProgress}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetForm}
              disabled={uploading}
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UploadCloud size={18} />

              {uploading
                ? "Uploading..."
                : "Upload Document"}
            </button>
          </div>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Security Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Controlled Workspace
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Designed for sensitive documents
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Access Control
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Documents are managed within your authenticated
                    workspace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-green-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Document Integrity
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Keep document information organized for integrity
                    tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText
                  size={17}
                  className="mt-0.5 shrink-0 text-indigo-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Activity History
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Upload activity can be associated with your
                    document history.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Info size={19} />
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white">
                Upload Guidelines
              </h3>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Use a clear and meaningful document name.",
                "Select the most appropriate document type.",
                "Add a case reference when applicable.",
                "Use tags to make documents easier to find.",
                "Avoid unnecessary sensitive information in descriptions.",
              ].map((guideline) => (
                <div
                  key={guideline}
                  className="flex items-start gap-2.5"
                >
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-500"
                  />

                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {guideline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Files */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Supported Files
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "PDF",
                "DOC",
                "DOCX",
                "TXT",
                "JPG",
                "PNG",
                "WEBP",
                "ZIP",
                "CSV",
                "XLSX",
              ].map((format) => (
                <span
                  key={format}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400"
                >
                  {format}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Maximum file size: 50 MB
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}