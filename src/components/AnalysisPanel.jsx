import { useState } from 'react';

export default function AnalysisPanel({
  highlights,
  activeHighlightId,
  onReferenceClick,
  onUpdateHighlight,
}) {
  const [isEditingAnalysis, setIsEditingAnalysis] = useState(false);
  const [isEditingRefs, setIsEditingRefs] = useState(false);

  const [analysisText, setAnalysisText] = useState({
    p1: 'No extraordinary or one-off items affecting EBITDA were reported in Maersk’s Q2 2025 results.',
    p2: 'The report notes that EBITDA improvements stemmed from operational performance—including volume growth, cost control, and margin improvement across Ocean, Logistics & Services, and Terminals segments.',
    p3: 'Gains or losses from asset sales, which could qualify as extraordinary items, are shown separately under EBIT and not included in EBITDA. The gain on sale of non-current assets was USD 25m in Q2 2025, compared to USD 208m in Q2 2024, but these affect EBIT, not EBITDA.',
  });

  const getRefButtonClass = (id) =>
    `analysis-ref-btn${
      activeHighlightId === id ? ' analysis-ref-btn--active' : ''
    }`;

  const refBtn = (id) => (
    <button
      type="button"
      className={getRefButtonClass(id)}
      onClick={() => onReferenceClick(id)}
    >
      [{id}]
    </button>
  );

  const handleAnalysisChange = (key, value) => {
    setAnalysisText((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="analysis-container">
      {/* ==================== Analysis card ==================== */}
      <div className="analysis-card">
        <div className="analysis-header-row">
          <h2 className="analysis-title">Analysis</h2>
          <button
            type="button"
            className="analysis-edit-btn"
            onClick={() => setIsEditingAnalysis((v) => !v)}
          >
            {isEditingAnalysis ? 'Done' : 'Edit'}
          </button>
        </div>

        <p className="analysis-tagline">
          Understanding whether EBITDA includes extraordinary items.
        </p>

        <div className="analysis-body">
          {/* Paragraph 1 */}
          {isEditingAnalysis ? (
            <textarea
              className="analysis-edit-textarea"
              value={analysisText.p1}
              onChange={(e) => handleAnalysisChange('p1', e.target.value)}
            />
          ) : (
            <p>{analysisText.p1}</p>
          )}

          {/* Paragraph 2 – references [1] [2] are appended */}
          {isEditingAnalysis ? (
            <textarea
              className="analysis-edit-textarea"
              value={analysisText.p2}
              onChange={(e) => handleAnalysisChange('p2', e.target.value)}
            />
          ) : (
            <p>
              {analysisText.p2}
              {refBtn('1')}
              {refBtn('2')}
            </p>
          )}

          {/* Paragraph 3 – reference [3] appended */}
          {isEditingAnalysis ? (
            <textarea
              className="analysis-edit-textarea"
              value={analysisText.p3}
              onChange={(e) => handleAnalysisChange('p3', e.target.value)}
            />
          ) : (
            <p>
              {analysisText.p3}
              {refBtn('3')}
            </p>
          )}
        </div>
      </div>

      {/* ==================== Reference mapping card ==================== */}
      <div className="analysis-card analysis-card--secondary">
        <div className="analysis-header-row">
          <h3 className="analysis-subtitle">Reference mapping</h3>
          <button
            type="button"
            className="analysis-edit-btn"
            onClick={() => setIsEditingRefs((v) => !v)}
          >
            {isEditingRefs ? 'Done' : 'Edit'}
          </button>
        </div>

        <p className="analysis-help">
          Each reference jumps to a page and highlights a specific phrase in the
          PDF.
        </p>

        <ul className="analysis-ref-list">
          {highlights.map((h) => (
            <li key={h.id} className="analysis-ref-item">
              <button
                type="button"
                className={getRefButtonClass(h.id)}
                onClick={() => onReferenceClick(h.id)}
              >
                {h.label}
              </button>

              <div className="analysis-ref-meta">
                {/* Page editable when ref editing is ON */}
                <span className="analysis-ref-page">
                  Page{' '}
                  {isEditingRefs ? (
                    <input
                      type="number"
                      className="analysis-ref-input analysis-ref-input--page"
                      value={h.page}
                      onChange={(e) =>
                        onUpdateHighlight(h.id, {
                          page: Number(e.target.value) || h.page,
                        })
                      }
                    />
                  ) : (
                    h.page
                  )}
                </span>

                {/* Phrase editable when ref editing is ON */}
                {isEditingRefs ? (
                  <input
                    type="text"
                    className="analysis-ref-input analysis-ref-input--phrase"
                    value={h.phrase}
                    onChange={(e) =>
                      onUpdateHighlight(h.id, { phrase: e.target.value })
                    }
                  />
                ) : (
                  <span className="analysis-ref-phrase">“{h.phrase}”</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
