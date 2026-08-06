import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { forceDownload } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  BookOpen,
  Maximize2,
  Minimize2,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ── Configure PDF.js worker (CDN — works with any Vite setup) ─────────── */
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/* ─── Constants ─────────────────────────────────────────────────────────── */
const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3.0;

/* ─── Static sub-components (never re-created) ──────────────────────────── */
const DocumentLoading = () => (
  <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
    <Loader2 className="size-10 text-[#2F79B8] animate-spin" />
    <p className="text-white/60 text-sm">Loading magazine…</p>
  </div>
);

const PageLoadingOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a] rounded-lg z-10 min-h-[500px] min-w-[300px]">
    <Loader2 className="size-8 text-[#2F79B8] animate-spin" />
  </div>
);

const ErrorState = ({ pdfUrl }) => (
  <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh] text-center">
    <div className="size-16 bg-red-500/10 rounded-2xl flex items-center justify-center">
      <AlertCircle className="size-8 text-red-400" />
    </div>
    <div>
      <p className="text-white font-semibold mb-1">Failed to load PDF</p>
      <p className="text-white/50 text-sm">
        The file could not be fetched. Check the URL or try downloading instead.
      </p>
    </div>
    <button
      onClick={(e) => {
        e.preventDefault();
        forceDownload(pdfUrl, "TPS-Magazine.pdf");
      }}
      className="flex items-center gap-2 bg-[#DD9808] hover:bg-[#c48507] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
    >
      <Download className="size-4" /> Download Instead
    </button>
  </div>
);

/* ─── Toolbar Button ─────────────────────────────────────────────────────── */
function TBtn({ onClick, disabled, title, children, variant = "default" }) {
  const base =
    "flex items-center justify-center rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    default: "size-9 bg-white/10 hover:bg-white/20 text-white",
    primary:
      "px-3 h-9 gap-1.5 bg-[#DD9808] hover:bg-[#c48507] text-white font-semibold text-xs",
    danger: "size-9 bg-white/10 hover:bg-red-500/60 text-white",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

/* ─── Page Input ─────────────────────────────────────────────────────────── */
function PageInput({ current, total, onGo }) {
  const [val, setVal] = useState(String(current));

  useEffect(() => setVal(String(current)), [current]);

  const commit = () => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 1 && n <= total) onGo(n);
    else setVal(String(current));
  };

  return (
    <div className="flex items-center gap-1.5 text-white text-xs font-semibold select-none">
      <input
        type="number"
        min={1}
        max={total}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className="w-10 text-center bg-white/15 border border-white/20 rounded-md py-1 text-white text-xs focus:outline-none focus:border-[#DD9808] transition-colors"
      />
      <span className="text-white/50">/</span>
      <span>{total}</span>
    </div>
  );
}

/* ─── Zoom Display ───────────────────────────────────────────────────────── */
function ZoomLabel({ scale }) {
  return (
    <span className="text-white/70 text-xs font-mono w-12 text-center select-none">
      {Math.round(scale * 100)}%
    </span>
  );
}

/* ─── Custom PDF Viewer Modal ────────────────────────────────────────────── */
export default function PdfViewer({
  mag,
  monthName,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(600);
  const scrollRef = useRef(null);

  /* ── Memoized page width (prevents Page re-render on every parent render) ─ */
  const pageWidth = useMemo(
    () => Math.max(containerWidth * scale, 200),
    [containerWidth, scale]
  );

  /* ── Debounced ResizeObserver (stops render storms during load/resize) ──── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout;
    const measure = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setContainerWidth(Math.max(el.clientWidth - 48, 200));
      }, 100);
    };

    measure(); // initial
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  /* ── Reset state when magazine changes ──────────────────────────────────── */
  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
    setLoadError(false);
    setPageLoading(true);
  }, [mag?.id]);

  /* ── Show loader immediately when flipping pages ──────────────────────── */
  useEffect(() => {
    setPageLoading(true);
  }, [pageNumber]);

  /* ── Stable callbacks for Document / Page events ──────────────────────── */
  const handleLoadSuccess = useCallback(({ numPages: total }) => {
    setNumPages(total);
    setPageLoading(false);
  }, []);

  const handleLoadError = useCallback(() => {
    setLoadError(true);
    setPageLoading(false);
  }, []);

  const handleRenderSuccess = useCallback(() => {
    setPageLoading(false);
  }, []);

  const handleRenderError = useCallback(() => {
    setPageLoading(false);
  }, []);

  /* ── Navigation & zoom helpers (all memoized) ─────────────────────────── */
  const nextPage = useCallback(
    () => setPageNumber((p) => Math.min(p + 1, numPages ?? 1)),
    [numPages]
  );
  const prevPage = useCallback(
    () => setPageNumber((p) => Math.max(p - 1, 1)),
    []
  );
  const zoomIn = useCallback(
    () => setScale((s) => Math.min(+(s + ZOOM_STEP).toFixed(2), ZOOM_MAX)),
    []
  );
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(+(s - ZOOM_STEP).toFixed(2), ZOOM_MIN)),
    []
  );
  const resetZoom = useCallback(() => setScale(1.0), []);
  const rotate = useCallback(() => setRotation((r) => (r + 90) % 360), []);

  /* ── Keyboard shortcuts (registered ONCE, reads latest state via ref) ─── */
  const stateRef = useRef({
    pageNumber,
    numPages,
    onClose,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
  });

  // Keep ref current without re-registering the listener
  useEffect(() => {
    stateRef.current = {
      pageNumber,
      numPages,
      onClose,
      nextPage,
      prevPage,
      zoomIn,
      zoomOut,
    };
  });

  useEffect(() => {
    const handler = (e) => {
      const { onClose, nextPage, prevPage, zoomIn, zoomOut } =
        stateRef.current;

      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextPage?.();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevPage?.();
      if (e.key === "+" || e.key === "=") zoomIn?.();
      if (e.key === "-") zoomOut?.();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []); // empty deps = register once

  if (!mag) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Top Toolbar ──────────────────────────────────────────────────── */}
      <div className="shrink-0 bg-gradient-to-r from-[#0b1b2b] via-[#1a3350] to-[#0b1b2b] border-b border-white/10 px-3 py-2.5 flex items-center gap-2">
        {/* Left: info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="size-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="size-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              {mag.title}
            </p>
            <p className="text-white/50 text-[10px] leading-tight">
              {monthName} {mag.year} · {mag.pages} pages
            </p>
          </div>
        </div>

        {/* Center: page controls */}
        <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2 py-1.5">
          <TBtn
            onClick={prevPage}
            disabled={pageNumber <= 1}
            title="Previous page (←)"
          >
            <ChevronLeft className="size-4" />
          </TBtn>
          <PageInput
            current={pageNumber}
            total={numPages ?? 1}
            onGo={setPageNumber}
          />
          <TBtn
            onClick={nextPage}
            disabled={pageNumber >= (numPages ?? 1)}
            title="Next page (→)"
          >
            <ChevronRight className="size-4" />
          </TBtn>
        </div>

        {/* Right: zoom + tools */}
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-1.5 py-1">
            <TBtn
              onClick={zoomOut}
              disabled={scale <= ZOOM_MIN}
              title="Zoom out (-)"
            >
              <ZoomOut className="size-3.5" />
            </TBtn>
            <ZoomLabel scale={scale} />
            <TBtn
              onClick={zoomIn}
              disabled={scale >= ZOOM_MAX}
              title="Zoom in (+)"
            >
              <ZoomIn className="size-3.5" />
            </TBtn>
            <TBtn onClick={resetZoom} title="Reset zoom" disabled={scale === 1.0}>
              <span className="text-[10px] font-bold">1:1</span>
            </TBtn>
          </div>

          <TBtn onClick={rotate} title="Rotate 90°">
            <RotateCcw className="size-3.5" />
          </TBtn>

          <TBtn
            onClick={() => setFullscreen((f) => !f)}
            title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </TBtn>

          <button
            onClick={(e) => {
              e.preventDefault();
              forceDownload(mag.pdfUrl, `TPS-${monthName}-${mag.year}.pdf`);
            }}
            className="flex items-center justify-center gap-1.5 h-9 px-3 bg-[#DD9808] hover:bg-[#c48507] text-white rounded-lg text-xs font-semibold transition-colors duration-150"
            title="Download PDF"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <TBtn onClick={onClose} title="Close (Esc)" variant="danger">
            <X className="size-4" />
          </TBtn>
        </div>
      </div>

      {/* ── Main View Area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Prev magazine button */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="shrink-0 w-10 sm:w-14 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white/60 hover:text-white transition-all duration-200 group"
            title="Previous magazine"
          >
            <ChevronLeft className="size-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* PDF Canvas Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto bg-[#1a1a1a] flex justify-center"
          id="pdf-scroll-container"
        >
          <div className="py-6 px-4 w-full flex justify-center">
            {loadError ? (
              <ErrorState pdfUrl={mag.pdfUrl} />
            ) : (
              <Document
                file={mag.pdfUrl}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
                loading={<DocumentLoading />}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative will-change-transform">
                  {pageLoading && <PageLoadingOverlay />}
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    rotate={rotation}
                    onRenderSuccess={handleRenderSuccess}
                    onRenderError={handleRenderError}
                    loading={null}
                    className="shadow-2xl shadow-black/60 rounded-sm overflow-hidden"
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                  />
                </div>
              </Document>
            )}
          </div>
        </div>

        {/* Next magazine button */}
        {hasNext && (
          <button
            onClick={onNext}
            className="shrink-0 w-10 sm:w-14 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white/60 hover:text-white transition-all duration-200 group"
            title="Next magazine"
          >
            <ChevronRight className="size-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* ── Bottom Bar: mobile page controls ─────────────────────────────── */}
      <div className="sm:hidden shrink-0 bg-[#0b1b2b] border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3">
        <TBtn onClick={prevPage} disabled={pageNumber <= 1} title="Prev">
          <ChevronLeft className="size-4" />
        </TBtn>
        <div className="flex items-center gap-2">
          <TBtn onClick={zoomOut} disabled={scale <= ZOOM_MIN} title="Zoom out">
            <ZoomOut className="size-4" />
          </TBtn>
          <ZoomLabel scale={scale} />
          <TBtn onClick={zoomIn} disabled={scale >= ZOOM_MAX} title="Zoom in">
            <ZoomIn className="size-4" />
          </TBtn>
        </div>
        <PageInput
          current={pageNumber}
          total={numPages ?? 1}
          onGo={setPageNumber}
        />
        <TBtn
          onClick={nextPage}
          disabled={pageNumber >= (numPages ?? 1)}
          title="Next"
        >
          <ChevronRight className="size-4" />
        </TBtn>
      </div>

      {/* ── Keyboard shortcut hint ────────────────────────────────────────── */}
      <div className="hidden sm:flex shrink-0 bg-[#0b1b2b]/80 border-t border-white/5 px-4 py-1 items-center justify-center gap-6 text-[10px] text-white/30">
        {[
          ["←/→", "Page"],
          ["+/-", "Zoom"],
          ["Esc", "Close"],
        ].map(([key, label]) => (
          <span key={key}>
            <kbd className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-white/50">
              {key}
            </kbd>{" "}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}