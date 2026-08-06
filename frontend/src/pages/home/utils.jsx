// utils.jsx

export const loadFonts = async (fonts) => {
  for (const [font, weight] of Object.entries(fonts)) {
    try {
      const fontFace = new FontFace(font, `url(/${font}.ttf)`, {
        weight: weight.toString(),
      });

      await fontFace.load();
      document.fonts.add(fontFace);
    } catch (error) {
      console.warn(`Failed to load font "${font}":`, error);
    }
  }
};

export function WorldMapGraphic() {
  return (
    <img
      src="/news_map.png"
      alt="World Map Grid"
      className="w-full h-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
    />
  );
}
