import { useState } from 'react';
import { HIGHLIGHTS as INITIAL_HIGHLIGHTS } from './config/highlightConfig';
import PdfViewer from './components/PdfViewer';
import AnalysisPanel from './components/AnalysisPanel';

import './index.css';
import './styles/layout.css';
import './styles/pdf.css';

export default function App() {
  const [highlights, setHighlights] = useState(INITIAL_HIGHLIGHTS);
  const [activeHighlightId, setActiveHighlightId] = useState(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleReferenceClick = (id) => {
    const config = highlights.find((h) => h.id === id);
    if (!config) return;

    setActiveHighlightId(id);

    // add ts so PdfViewer useEffect runs even if same ref clicked again
    setActiveHighlight({ ...config, ts: Date.now() });

    setCurrentPage(config.page);
  };

  const handleUpdateHighlight = (id, patch) => {
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...patch } : h))
    );

    // also refresh activeHighlight if the currently active one is edited
    setActiveHighlight((prev) => {
      if (!prev || prev.id !== id) return prev;
      return { ...prev, ...patch, ts: Date.now() };
    });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-left">
          <h1 className="app-title">Maersk - PDF Highlighter</h1>
          <p className="app-subtitle">
            Click on references on the right to jump &amp; highlight text inside
            the PDF.
          </p>
        </div>
        <div className="app-header-right">
          <span className="app-pill app-pill-secondary">PDF Highlighter</span>
        </div>
      </header>

      <main className="app-main">
        <section className="app-pane app-pane-left">
          <PdfViewer
            fileUrl="/Maersk-Q2-2025-Interim-Report.pdf"
            activeHighlight={activeHighlight}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </section>

        <section className="app-pane app-pane-right">
          <AnalysisPanel
            highlights={highlights}
            activeHighlightId={activeHighlightId}
            onReferenceClick={handleReferenceClick}
            onUpdateHighlight={handleUpdateHighlight}
          />
        </section>
      </main>
    </div>
  );
}
