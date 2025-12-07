"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Dynamically import react-pdf with no SSR to avoid DOMMatrix issues
const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600 dark:border-indigo-300"></div>
    </div>
  ),
});

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

interface ResumeDialogContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResumeDialogContent({ open, onOpenChange }: ResumeDialogContentProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // Set up the PDF.js worker on client side only
    const setupPdfjs = async () => {
      const pdfjsModule = await import("react-pdf");
      // Use legacy build for Node.js compatibility
      pdfjsModule.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsModule.pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
    };

    setupPdfjs();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[80vh] w-full max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Resume</DialogTitle>
        </DialogHeader>
        <div className="h-full flex-1 overflow-auto p-6 pt-0">
          <Document
            file="https://lfjzmnveejtlimxyhvaa.supabase.co/storage/v1/object/public/general/Dhira_Tengara_Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center"
            error={
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Resume PDF not found.
                </p>
              </div>
            }
          >
            {numPages && (
              <div className="flex flex-col items-center gap-4">
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                />
                {numPages > 1 && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                      disabled={pageNumber <= 1}
                      className="rounded-md bg-indigo-600 px-3 py-1 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Page {pageNumber} of {numPages}
                    </span>
                    <button
                      onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                      disabled={pageNumber >= numPages}
                      className="rounded-md bg-indigo-600 px-3 py-1 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
}
