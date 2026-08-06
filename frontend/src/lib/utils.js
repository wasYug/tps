import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const forceDownload = (url, filename) => {
  try {
    let downloadUrl = url;
    
    // For Supabase URLs, append the download parameter to force Content-Disposition: attachment
    // This avoids CORS issues that happen with fetch()
    if (url && url.includes('supabase.co')) {
      const separator = url.includes('?') ? '&' : '?';
      downloadUrl = `${url}${separator}download=${encodeURIComponent(filename)}`;
    }

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    a.target = "_blank"; // Opens in new tab safely if download attribute is ignored by browser
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Download failed:", error);
    window.open(url, "_blank"); // Fallback
  }
};
