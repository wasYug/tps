import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  School,
  Clock,
  FileText,
  AlertCircle,
  ExternalLink,
  Minimize2,
  Maximize2,
  HelpCircle,
  Compass,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { sendChatMessage } from "../lib/chatbotapi";

// Suggested quick prompts matching school FAQ categories
const SUGGESTED_PROMPTS = [
  {
    icon: Clock,
    title: "School Timings",
    query: "What are the regular operating hours and winter timings for students?",
  },
  {
    icon: FileText,
    title: "Admission Process",
    query: "Explain the admission process, eligibility, and required documents.",
  },
  {
    icon: Calendar,
    title: "Fee Guidelines",
    query: "What is the fee payment schedule and quarterly due dates?",
  },
  {
    icon: ShieldCheck,
    title: "Uniform Guidelines",
    query: "What is the mandatory summer and winter uniform code?",
  },
  {
    icon: Compass,
    title: "Campus Facilities",
    query: "What laboratory, library, and sports facilities does the campus provide?",
  },
  {
    icon: School,
    title: "Principal & Office Hours",
    query: "Who is the Principal and what are the visiting hours for parents?",
  },
];

// Comprehensive markdown-to-JSX renderer for bot responses
function FormattedMessage({ content }) {
  if (!content) return null;

  // Clean raw image placeholders like [IMAGE: filename] if echoed from knowledge base
  const sanitized = content.replace(/\[IMAGE:\s*[^\]]+\]/gi, "").trim();
  if (!sanitized) return null;

  const lines = sanitized.split(/\r?\n/);
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // 1. Fenced Code Blocks (```)
    if (line.trim().startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${elements.length}`}
          className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs font-mono overflow-x-auto my-2 border border-slate-800"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // 2. Horizontal Rules (---, ***, ___)
    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      elements.push(
        <hr key={`hr-${elements.length}`} className="my-2.5 border-t border-slate-200" />
      );
      i++;
      continue;
    }

    // 3. Headings (#, ##, ###, ####, etc.)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      if (level === 1) {
        elements.push(
          <h3
            key={`h-${elements.length}`}
            className="text-base font-bold text-[#294868] mt-3 mb-1 tracking-tight"
          >
            {formatInline(headingText)}
          </h3>
        );
      } else if (level === 2) {
        elements.push(
          <h4
            key={`h-${elements.length}`}
            className="text-[14.5px] font-bold text-[#294868] mt-2.5 mb-1 tracking-tight flex items-center gap-1.5"
          >
            <span className="size-1.5 rounded-full bg-[#DD9808] shrink-0"></span>
            <span>{formatInline(headingText)}</span>
          </h4>
        );
      } else if (level === 3) {
        elements.push(
          <h5
            key={`h-${elements.length}`}
            className="text-sm font-semibold text-slate-900 mt-2 mb-0.5"
          >
            {formatInline(headingText)}
          </h5>
        );
      } else {
        elements.push(
          <h6
            key={`h-${elements.length}`}
            className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-2 mb-0.5"
          >
            {formatInline(headingText)}
          </h6>
        );
      }
      i++;
      continue;
    }

    // 4. Blockquotes (> ...)
    if (line.trim().startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${elements.length}`}
          className="border-l-3 border-[#2F79B8] bg-slate-50/80 px-3 py-1.5 my-1.5 text-xs italic text-slate-700 rounded-r-lg"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx}>{formatInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 5. Tables (| col 1 | col 2 |)
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (rowStr) =>
          rowStr
            .slice(1, -1)
            .split("|")
            .map((cell) => cell.trim());

        const headers = parseRow(tableLines[0]);
        const isSeparator = (rowStr) => /^\|[\s-:]+(\|[\s-:]+)*\|$/.test(rowStr);
        const contentRows = tableLines.slice(1).filter((r) => !isSeparator(r));

        elements.push(
          <div
            key={`table-${elements.length}`}
            className="overflow-x-auto my-2 rounded-xl border border-slate-200/90 shadow-2xs"
          >
            <table className="min-w-full text-xs text-left divide-y divide-slate-200">
              <thead className="bg-[#294868]/5 text-slate-800 font-semibold">
                <tr>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-3 py-2 text-slate-900 font-semibold">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {contentRows.map((rowStr, rIdx) => {
                  const cells = parseRow(rowStr);
                  return (
                    <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                      {cells.map((c, cIdx) => (
                        <td key={cIdx} className="px-3 py-1.5 text-slate-700">
                          {formatInline(c)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 6. Unordered List (- , * , • )
    if (/^\s*[-*•]\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*•]\s+/, ""));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="list-disc pl-5 space-y-1 my-1.5 text-slate-700 marker:text-[#2F79B8]"
        >
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered List (1. , 2. )
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="list-decimal pl-5 space-y-1 my-1.5 text-slate-700 marker:font-semibold marker:text-[#2F79B8]"
        >
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{formatInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Regular Paragraph (gather lines until blank line or next markdown block)
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !lines[i].trim().startsWith(">") &&
      !/^\s*[-*•]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(\s*[-*_]\s*){3,}$/.test(lines[i]) &&
      !(lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|"))
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="text-slate-800 my-1">
          {paraLines.map((pLine, lIdx) => (
            <React.Fragment key={lIdx}>
              {formatInline(pLine)}
              {lIdx < paraLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    }
  }

  return <div className="space-y-1.5 text-sm leading-relaxed text-slate-800">{elements}</div>;
}

// Parses markdown inline tokens: links, images, bold, italic, code, URLs, emails
function formatInline(text) {
  if (!text) return text;

  // Regex matching: markdown images, markdown links, bold-italic, bold, italic, inline code, URLs, emails
  const regex = /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`|https?:\/\/[^\s<]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Inline image: ![alt](url)
    const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, url] = imgMatch;
      return (
        <span key={i} className="block my-2 rounded-xl overflow-hidden border border-slate-200">
          <img
            src={url}
            alt={alt || "School image"}
            className="w-full h-auto object-cover max-h-48 rounded-lg"
          />
        </span>
      );
    }

    // Markdown Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2F79B8] hover:text-[#1E5A8E] underline font-medium inline-flex items-center gap-0.5 break-all"
        >
          {label}
        </a>
      );
    }

    // Bold-italic: ***text***
    if (part.startsWith("***") && part.endsWith("***") && part.length > 6) {
      return (
        <strong key={i} className="font-semibold italic text-slate-900">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text** or __text__
    if (
      (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
      (part.startsWith("__") && part.endsWith("__") && part.length > 4)
    ) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith("*") && part.endsWith("*") && part.length > 2) ||
      (part.startsWith("_") && part.endsWith("_") && part.length > 2)
    ) {
      return (
        <em key={i} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="bg-slate-100 text-[#294868] px-1.5 py-0.5 rounded text-xs font-mono font-medium border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Direct URL: https://...
    if (/^https?:\/\/[^\s<]+$/.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2F79B8] hover:text-[#1E5A8E] underline font-medium break-all"
        >
          {part}
        </a>
      );
    }

    // Direct Email: user@domain.com
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[#2F79B8] hover:text-[#1E5A8E] underline font-medium"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

// Safely extracts, flattens, and deduplicates image items from either arrays or topic-grouped objects
function extractImages(imagesData) {
  if (!imagesData) return [];

  const rawList = [];

  if (Array.isArray(imagesData)) {
    imagesData.forEach((item) => {
      if (!item) return;
      if (typeof item === "string") {
        rawList.push({ url: item, alt: "School photograph", caption: "" });
      } else if (typeof item === "object" && item.url) {
        rawList.push({
          url: item.url,
          alt: item.alt || item.caption || "School photograph",
          caption: item.caption || item.alt || "",
          category: item.category || null,
        });
      }
    });
  } else if (typeof imagesData === "object") {
    for (const [category, val] of Object.entries(imagesData)) {
      const cleanCategory =
        category !== "other" && category !== "default"
          ? category.replace(/_/g, " ")
          : null;

      if (Array.isArray(val)) {
        val.forEach((item) => {
          if (!item) return;
          if (typeof item === "string") {
            rawList.push({
              url: item,
              alt: cleanCategory || "School photograph",
              caption: "",
              category: cleanCategory,
            });
          } else if (typeof item === "object" && item.url) {
            rawList.push({
              url: item.url,
              alt: item.alt || item.caption || cleanCategory || "School photograph",
              caption: item.caption || item.alt || "",
              category: cleanCategory,
            });
          }
        });
      } else if (val && typeof val === "object" && val.url) {
        rawList.push({
          url: val.url,
          alt: val.alt || val.caption || cleanCategory || "School photograph",
          caption: val.caption || val.alt || "",
          category: cleanCategory,
        });
      }
    }
  }

  // Deduplicate by URL
  const seen = new Set();
  const result = [];
  for (const img of rawList) {
    if (img.url && typeof img.url === "string" && !seen.has(img.url.trim())) {
      seen.add(img.url.trim());
      result.push({ ...img, url: img.url.trim() });
    }
  }
  return result;
}

// Renders the responsive image gallery inside assistant message bubbles
function MessageImages({ images, onPreview }) {
  const [failedUrls, setFailedUrls] = useState({});

  const validImages = React.useMemo(() => {
    return extractImages(images).filter((img) => !failedUrls[img.url]);
  }, [images, failedUrls]);

  if (!validImages || validImages.length === 0) return null;

  const handleImageError = (url) => {
    setFailedUrls((prev) => ({ ...prev, [url]: true }));
  };

  const isSingle = validImages.length === 1;

  return (
    <div className="mt-3 pt-2.5 border-t border-slate-100">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#294868] mb-2">
        <ImageIcon className="size-3.5 text-[#2F79B8]" />
        <span>Campus & Facility Photos ({validImages.length})</span>
      </div>

      <div className={`grid gap-2 ${isSingle ? "grid-cols-1" : "grid-cols-2"}`}>
        {validImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => onPreview(img)}
            className="group relative rounded-xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col hover:border-[#2F79B8]/40"
          >
            <div
              className={`relative overflow-hidden w-full ${
                isSingle ? "h-40 sm:h-44" : "h-28 sm:h-30"
              } bg-slate-100`}
            >
              <img
                src={img.url}
                alt={img.alt || "School photograph"}
                loading="lazy"
                onError={() => handleImageError(img.url)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Dark Overlay with View Action */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2">
                <span className="bg-white/95 text-slate-900 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="size-3 text-[#2F79B8]" />
                  View Photo
                </span>
              </div>

              {/* Category pill badge */}
              {img.category && (
                <span className="absolute top-1.5 left-1.5 bg-[#294868]/85 backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                  {img.category}
                </span>
              )}
            </div>

            {/* Optional caption bar */}
            {img.caption && (
              <div className="px-2 py-1.5 bg-white border-t border-slate-100/80">
                <p className="text-[11px] font-medium text-slate-700 truncate" title={img.caption}>
                  {img.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Namaste! Welcome to Takshashila Public School. How can I assist you today? You can ask me about admissions, fees, timings, uniform guidelines, facilities, or campus life.",
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };
    if (previewImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  // Auto-scroll when new messages arrive or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotice(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const toggleSources = (msgId) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleCopy = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    const nextHeight = Math.min(e.target.scrollHeight, 100);
    e.target.style.height = `${nextHeight}px`;
    e.target.style.overflowY = e.target.scrollHeight > 100 ? "auto" : "hidden";
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Namaste! Welcome to Takshashila Public School. How can I assist you today? Feel free to ask any question.",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.overflowY = "hidden";
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const botLoadingId = `bot-loading-${Date.now()}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Append user message immediately
    const newUserMsg = {
      id: userMessageId,
      sender: "user",
      text: query,
      timestamp: timeNow,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.overflowY = "hidden";
    }
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query);
      const newBotMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.answer || "Thank you for asking. I could not find additional details on that topic.",
        images: response.images,
        sources: response.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      const errorMsg = {
        id: `error-${Date.now()}`,
        sender: "bot",
        isError: true,
        text:
          err?.message ||
          "I am having trouble connecting to the school knowledge base. Please try again shortly or contact the school office directly.",
        retryQuery: query,
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ── Keyframe styles for smooth blinking logo & animations ── */}
      <style>{`
        @keyframes tpsLogoBlink {
          0%, 100% {
            opacity: 0.22;
            transform: scale(0.92);
            filter: drop-shadow(0 0 2px rgba(47, 121, 184, 0.25));
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
            filter: drop-shadow(0 0 16px rgba(47, 121, 184, 0.75));
          }
        }
        @keyframes tpsGlowRing {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.18);
          }
        }
        @keyframes subtleBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-tps-logo-blink {
          animation: tpsLogoBlink 1.7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-tps-ring {
          animation: tpsGlowRing 1.7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-subtle-bounce {
          animation: subtleBounce 2.5s ease-in-out infinite;
        }
        .chat-textarea {
          resize: none !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .chat-textarea::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .chat-textarea::-webkit-scrollbar-button {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .chat-textarea::-webkit-resizer {
          display: none !important;
        }
      `}</style>

      {/* ── Floating Launcher Trigger Button ── */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Floating Callout Pill (visible when closed) */}
        {!isOpen && hasUnreadNotice && (
          <div className="relative mb-2.5 mr-1 animate-subtle-bounce cursor-pointer group" onClick={() => setIsOpen(true)}>
            <div className="flex items-center gap-2 bg-[#294868] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-[#DD9808]/40 text-xs font-medium tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DD9808] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DD9808]"></span>
              </span>
              <span>Ask TPS AI Assistant</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadNotice(false);
                }}
                className="text-white/60 hover:text-white ml-0.5"
                title="Dismiss"
              >
                <X className="size-3" />
              </button>
            </div>
            {/* Small triangle arrow pointer */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#294868] absolute right-6 -bottom-1"></div>
          </div>
        )}

        {/* Main Floating Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close TPS AI Assistant" : "Open TPS AI Assistant"}
          className={`relative group flex items-center justify-center size-14 sm:size-15 rounded-full transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-[#2F79B8]/30 ${
            isOpen
              ? "bg-[#294868] text-white rotate-90 scale-95 shadow-[#294868]/40"
              : "bg-gradient-to-tr from-[#294868] via-[#2F79B8] to-[#3a8bd0] text-white hover:scale-105 shadow-[#2F79B8]/40"
          }`}
        >
          {isOpen ? (
            <X className="size-6 transition-transform duration-300" />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* Soft pulsating aura ring */}
              <span className="absolute -inset-1 rounded-full bg-[#2F79B8]/30 animate-ping opacity-60"></span>
              {/* School Logo */}
              <img
                src="/logo.png"
                alt="TPS Logo"
                className="size-8 object-contain drop-shadow-md rounded-full bg-white/10 p-0.5"
              />
              {/* Sparkle badge */}
              {/* <span className="absolute -top-1 -right-1 bg-[#DD9808] text-white rounded-full p-0.5 shadow-sm">
                <Sparkles className="size-2.5 text-white" />
              </span> */}
            </div>
          )}
        </button>
      </div>

      {/* ── Chat Widget Modal Window ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Takshashila Public School Chatbot"
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col bg-white border border-slate-200/90 shadow-2xl overflow-hidden ${
            isExpanded
              ? "inset-3 sm:inset-6 sm:bottom-6 sm:right-6 sm:top-12 sm:left-auto sm:w-[540px] sm:h-[calc(100vh-80px)] rounded-2xl sm:rounded-3xl shadow-[#294868]/30"
              : "inset-x-3 bottom-22 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[410px] h-[580px] max-h-[calc(100vh-120px)] rounded-2xl sm:rounded-3xl shadow-[#294868]/25"
          }`}
        >
          {/* ── Header ── */}
          <div className="relative bg-gradient-to-r from-[#294868] via-[#2F79B8] to-[#1E5A8E] text-white px-4 py-3.5 flex items-center justify-between shadow-md select-none">
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-full bg-white/95 p-1 flex items-center justify-center shadow-inner border border-white/30 shrink-0">
                <img src="/logo.png" alt="Takshashila School Crest" className="size-7 object-contain" />
                <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-white text-[15px] tracking-tight">TPS Assistant</h3>
                  <span className="bg-[#DD9808] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-wide uppercase">
                    AI
                  </span>
                </div>
                <p className="text-white/80 text-xs font-normal">Takshashila Public School</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {/* Reset Chat */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="size-4" />
              </button>

              {/* Expand/Collapse Toggle (Desktop only) */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Standard Size" : "Expand Size"}
                className="hidden sm:inline-flex p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                aria-label={isExpanded ? "Collapse window" : "Expand window"}
              >
                {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                aria-label="Close assistant"
              >
                <X className="size-4.5" />
              </button>
            </div>
          </div>

          {/* ── Subheader Notice: Official School Information Grounding ── */}
          <div className="bg-[#F8FAF4] border-b border-slate-200/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-[#DD9808]" />
              <span>Grounded in official TPS prospectus & guidelines</span>
            </div>
            <span className="text-[10px] font-medium text-[#2F79B8] bg-[#2F79B8]/10 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>

          {/* ── Messages Container ── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#F8FAF4]/70 to-white/60">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              if (isUser) {
                return (
                  <div key={msg.id} className="flex justify-end items-end gap-2 group">
                    <div className="flex flex-col items-end max-w-[85%]">
                      <div className="bg-gradient-to-r from-[#2F79B8] to-[#245b88] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm shadow-md shadow-[#2F79B8]/15 leading-relaxed break-words">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                    <div className="size-7 rounded-full bg-[#294868] text-white flex items-center justify-center shrink-0 text-xs shadow-sm">
                      <User className="size-3.5" />
                    </div>
                  </div>
                );
              }

              // Bot / Assistant Message
              return (
                <div key={msg.id} className="flex items-start gap-2.5 group">
                  {/* School Avatar */}
                  <div className="size-8 rounded-full bg-white p-0.5 border border-slate-200 shadow-sm shrink-0 flex items-center justify-center">
                    <img src="/logo.png" alt="TPS Avatar" className="size-6 object-contain" />
                  </div>

                  <div className="flex flex-col items-start max-w-[88%] w-full">
                    <div
                      className={`w-full rounded-2xl rounded-tl-xs px-4 py-3 text-sm shadow-sm border transition-all ${
                        msg.isError
                          ? "bg-rose-50/90 border-rose-200 text-rose-900"
                          : "bg-white border-slate-200/90 text-slate-800"
                      }`}
                    >
                      {/* Message Content */}
                      <FormattedMessage content={msg.text} />

                      {/* Attached Images */}
                      <MessageImages
                        images={msg.images}
                        onPreview={(img) => setPreviewImage(img)}
                      />

                      {/* Error State with Retry Button */}
                      {msg.isError && msg.retryQuery && (
                        <div className="mt-3 pt-2.5 border-t border-rose-200/70 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSendMessage(msg.retryQuery)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <RotateCcw className="size-3" />
                            Retry Question
                          </button>
                        </div>
                      )}

                      {/* Sources Accordion */}
                      {Array.isArray(msg.sources) && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => toggleSources(msg.id)}
                            className="flex items-center justify-between w-full text-[11px] font-medium text-[#2F79B8] hover:text-[#294868] transition-colors"
                          >
                            <span className="flex items-center gap-1">
                              <FileText className="size-3" />
                              Official Sources ({msg.sources.length})
                            </span>
                            {expandedSources[msg.id] ? (
                              <ChevronUp className="size-3" />
                            ) : (
                              <ChevronDown className="size-3" />
                            )}
                          </button>

                          {expandedSources[msg.id] && (
                            <div className="mt-2 space-y-1.5">
                              {msg.sources.map((src, idx) => (
                                <div
                                  key={idx}
                                  className="text-[11px] bg-slate-50 border border-slate-200/70 p-2 rounded-lg text-slate-600 flex items-start gap-1.5"
                                >
                                  <span className="text-[#DD9808] font-bold">•</span>
                                  <div>
                                    <span className="font-semibold text-slate-700">{src.title || "School Document"}</span>
                                    {src.source && (
                                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{src.source}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Meta bar: timestamp and copy button */}
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      {!msg.isError && (
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="size-3 text-emerald-600" />
                              <span className="text-[10px] text-emerald-600 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── REQUIRED LOADING STATE: Smoothly blinking in and out TPS School Logo ── */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                {/* School Avatar */}
                <div className="size-8 rounded-full bg-white p-0.5 border border-slate-200 shadow-sm shrink-0 flex items-center justify-center">
                  <img src="/logo.png" alt="TPS Loading Avatar" className="size-6 object-contain" />
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 shadow-sm max-w-[85%] w-full flex flex-col items-center justify-center py-5">
                  {/* Blinking in & out logo showcase */}
                  <div className="relative flex items-center justify-center my-2">
                    {/* Pulsing halo wave */}
                    <div className="absolute size-16 rounded-full bg-[#2F79B8]/15 animate-tps-ring"></div>
                    <div className="absolute size-12 rounded-full bg-[#DD9808]/15 animate-tps-ring" style={{ animationDelay: "0.3s" }}></div>

                    {/* Center Logo with smooth blink in / blink out animation */}
                    <img
                      src="/logo.png"
                      alt="Takshashila Loading..."
                      className="size-11 object-contain drop-shadow-md animate-tps-logo-blink relative z-10"
                    />
                  </div>

                  {/* Pulsing text indicator */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-2">
                    <span className="text-[#2F79B8]">Takshashila Assistant is thinking</span>
                    <span className="inline-flex gap-0.5">
                      <span className="animate-bounce text-[#2F79B8] delay-0">•</span>
                      <span className="animate-bounce text-[#2F79B8] delay-150">•</span>
                      <span className="animate-bounce text-[#2F79B8] delay-300">•</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">Searching school knowledge base...</span>
                </div>
              </div>
            )}

            {/* Suggested Question Chips (only shown when conversation is fresh) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 pb-1">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="size-3 text-[#2F79B8]" />
                  Suggested Questions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => {
                    const IconComp = prompt.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt.query)}
                        className="text-left bg-white hover:bg-slate-50/90 border border-slate-200/80 hover:border-[#2F79B8]/40 p-2.5 rounded-xl transition-all duration-200 flex items-start gap-2.5 group shadow-xs hover:shadow-sm"
                      >
                        <div className="size-6 rounded-lg bg-[#2F79B8]/10 text-[#2F79B8] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2F79B8] group-hover:text-white transition-colors">
                          <IconComp className="size-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-slate-800 group-hover:text-[#2F79B8] transition-colors truncate">
                            {prompt.title}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{prompt.query}</p>
                        </div>
                        <ArrowRight className="size-3 text-slate-300 group-hover:text-[#2F79B8] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input Bar ── */}
          <div className="p-3 bg-white border-t border-slate-200/90 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-[#2F79B8] focus-within:ring-2 focus-within:ring-[#2F79B8]/20 focus-within:bg-white transition-all"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about TPS (e.g. fees, timings, admission)..."
                disabled={isLoading}
                style={{ resize: "none", overflow: "hidden" }}
                className="chat-textarea w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 py-1.5 leading-normal"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="size-8 rounded-lg bg-[#2F79B8] hover:bg-[#245b88] disabled:opacity-40 disabled:hover:bg-[#2F79B8] text-white flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                title="Send Message"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>

            {/* ── REQUIRED AI DISCLAIMER: "AI can make mistakes" notice ── */}
            <div className="mt-2 text-center flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <AlertCircle className="size-3 text-[#DD9808] shrink-0" />
              <span>AI can make mistakes. Please verify official details with the school office.</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Image Lightbox Preview Modal ── */}
      {previewImage && (
        <div
          role="dialog"
          aria-label="Image Preview"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in duration-200"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <ImageIcon className="size-4 text-[#DD9808] shrink-0" />
                <h4 className="text-white text-xs sm:text-sm font-semibold truncate">
                  {previewImage.caption || previewImage.alt || "Takshashila Public School Photo"}
                </h4>
                {previewImage.category && (
                  <span className="bg-[#2F79B8] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
                    {previewImage.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Open original image in new tab"
                >
                  <ExternalLink className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Image Center View */}
            <div className="relative flex-1 bg-black/60 flex items-center justify-center p-2 sm:p-4 min-h-[220px] overflow-hidden">
              <img
                src={previewImage.url}
                alt={previewImage.alt || "Takshashila School Photo"}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg select-none"
              />
            </div>

            {/* Bottom Caption Bar */}
            {(previewImage.caption || previewImage.alt) && (
              <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 text-center">
                <p className="text-xs text-white/90 font-medium">
                  {previewImage.caption || previewImage.alt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

