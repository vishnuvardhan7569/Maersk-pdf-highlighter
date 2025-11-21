import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({
  fileUrl,
  activeHighlight,
  currentPage,
  onPageChange,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(600); // will be overridden
  const containerRef = useRef(null);

  // When PDF loads, store number of pages
  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Responsive: page width = 90% of container
  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      // Use 90% of container, with a sensible min width
      const nextWidth = Math.max(320, containerWidth * 0.82);
      setPageWidth(nextWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pagesToRender = useMemo(
    () => Array.from(new Array(numPages || 0), (_, i) => i + 1),
    [numPages]
  );

  useEffect(() => {
    // Clear ALL previous highlights on all pages
    const allSpans = document.querySelectorAll(
      ".react-pdf__Page__textContent span"
    );
    allSpans.forEach((span) => {
      if (span.dataset.originalText) {
        span.textContent = span.dataset.originalText;
        delete span.dataset.originalText;
      }
    });

    // If nothing to highlight, stop here
    if (!activeHighlight) return;

    const { page, phrase } = activeHighlight;

    // 1) Scroll to the right page wrapper
    const targetPage = document.getElementById(`pdf-page-${page}`);
    if (targetPage) {
      targetPage.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // 2) Wait a bit so text layer is fully rendered, then highlight
    const timeoutId = setTimeout(() => {
      const pageEl = document.getElementById(`pdf-page-${page}`);
      if (!pageEl) return;

      const spans = pageEl.querySelectorAll(
        ".react-pdf__Page__textContent span"
      );

      const lowerPhrase = phrase.toLowerCase();

      spans.forEach((span) => {
        const text = span.textContent;
        if (!text) return;

        const lowerText = text.toLowerCase();
        const idx = lowerText.indexOf(lowerPhrase);
        if (idx === -1) return;

        // Store original text so we can restore later
        span.dataset.originalText = text;

        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + phrase.length);
        const after = text.slice(idx + phrase.length);

        // Wrap only the phrase, not duplicating it
        span.innerHTML = `${before}<mark class="pdf-highlight">${match}</mark>${after}`;
      });
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [activeHighlight]);

  return (
    <div className="pdf-container" ref={containerRef}>
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-left">
          <span className="pdf-toolbar-label">PDF Viewer</span>
        </div>
        <div className="pdf-toolbar-right">
          <span className="pdf-page-indicator">
            Page <strong>{currentPage}</strong>
            {numPages ? ` / ${numPages}` : ""}
          </span>
        </div>
      </div>

      <div className="pdf-scroll-wrapper">
        <Document
          file={fileUrl}
          onLoadSuccess={handleLoadSuccess}
          loading={<p>Loading PDF…</p>}
        >
          {pagesToRender.map((pageNumber) => (
            <div
              key={pageNumber}
              id={`pdf-page-${pageNumber}`}
              className={`pdf-page-wrapper ${
                currentPage === pageNumber ? "pdf-page-wrapper--active" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth} 
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
