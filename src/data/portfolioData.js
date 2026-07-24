// Krish Shrestha Portfolio Data

export const USER_INFO = {
  name: "Krish Shrestha",
  role: "Graphic & Typography Designer",
  bio: "BSc.IT student and graphic artist from Kathmandu, Nepal. Specializing in typography poster design, Photoshop manipulation, editorial magazine layouts, and sports graphics.",
  email: "krishshrestha679@gmail.com",
  location: "Kathmandu, Nepal / Remote",
  driveFolderUrl: "https://drive.google.com/drive/folders/1-oV0gxcxPaerZLyhiYn-Iogri0N76rDo?usp=sharing",
  linkedinUrl: "https://www.linkedin.com/in/krish-shrestha-312568286/",
  instagramUrl: "https://www.instagram.com/_krish_shrestha10/",
  githubUrl: "https://github.com/krishshresthaa"
};

export const PROJECTS_DATA = [
  {
    id: "krish-typography-art",
    number: "01",
    title: "KRISH — Typography & Silhouette Poster",
    category: "Typography Art",
    year: "2024",
    client: "Personal Exploration / Poster Series",
    tools: ["Adobe Photoshop", "Typography Studio", "Illustrator"],
    images: [
      "/projects/krish-typography-art.png"
    ],
    summary: "Bold typographic composition blending negative space, silhouette art, and distressed paper textures into a signature branding piece.",
    challenge: "Crafting a high-impact poster where text elements form the structural frame of the portrait silhouette while maintaining ultra-clean legibility.",
    solution: "Combined heavy serif typography, grain overlay textures, and custom halftone masking in Photoshop to achieve an editorial magazine finish.",
    link: USER_INFO.driveFolderUrl
  },
  {
    id: "spidey-no-fear",
    number: "02",
    title: "NO FEAR — Just Responsibility",
    category: "Cinematic Poster Art",
    year: "2024",
    client: "Movie & Comic Poster Series",
    tools: ["Photoshop Composite", "Color Grading", "Halftone Brushwork"],
    images: [
      "/projects/spidey-no-fear.jpg"
    ],
    summary: "Atmospheric cinematic Spider-Man artwork focusing on dramatic scale, city rain glow, and gritty pop-culture poster aesthetics.",
    challenge: "Blending comic book halftone dot aesthetics with realistic movie lighting and wet reflection textures on skyscraper roofs.",
    solution: "Layered red and blue atmospheric rim lights, custom rain streak brushes, and bold comic typography framing Spider-Man overlooking the city skyline.",
    link: USER_INFO.driveFolderUrl
  },
  {
    id: "focus-editorial",
    number: "03",
    title: "FOCUS! — Editorial Magazine Cover",
    category: "Editorial Magazine",
    year: "2024",
    client: "Creative Print Publication",
    tools: ["InDesign / Photoshop", "Grid Layout", "Typography Art"],
    images: [
      "/projects/focus-editorial.jpg"
    ],
    summary: "High-fashion editorial layout exploring focal photography, grid breaking typography, and minimalist monochrome poster design.",
    challenge: "Balancing large title typography with intimate portrait photography without cluttering the publication grid.",
    solution: "Used high-contrast monochrome tones, layered vertical barcode notes, and asymmetric text margins for a modern streetwear aesthetic.",
    link: USER_INFO.driveFolderUrl
  },
  {
    id: "messi-world-champion",
    number: "04",
    title: "MESSI — 18.12.2022 World Champion",
    category: "Sports & Halftone Art",
    year: "2023",
    client: "Sports Graphic Tribute",
    tools: ["Adobe Photoshop", "Sports Halftone", "Gold Foil Texture"],
    images: [
      "/projects/messi-world-champion.jpg"
    ],
    summary: "Celebratory sports graphic poster honoring Lionel Messi's historic World Cup victory with gold leaf accents and halftone portrait textures.",
    challenge: "Capturing the emotional intensity of the 18.12.2022 World Cup win while incorporating historical match dates and gold championship typography.",
    solution: "Integrated vintage Argentine flag color accents, dual-exposure celebration action shots, and distressed victory typography stamps.",
    link: USER_INFO.driveFolderUrl
  }
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "RESEARCH",
    subtitle: "Discovery & Moodboards",
    icon: "search",
    description: "Deep dive into visual references, typography hierarchy, color theory, and high-res asset gathering.",
    details: ["Visual Moodboards", "Typography Pairing", "Asset & Texture Sourcing", "Composition Thumbnails"]
  },
  {
    num: "02",
    title: "CONCEPT",
    subtitle: "Sketch & Composition",
    icon: "lightbulb",
    description: "Translating ideas into rough digital layouts, experimenting with focal points, negative space, and poster framing.",
    details: ["Digital Wireframe", "Subject Masking", "Grid Alignment", "Focal Point Placement"]
  },
  {
    num: "03",
    title: "DESIGN",
    subtitle: "Crafting & Texturing",
    icon: "pen-tool",
    description: "High-resolution photoshop compositing, adding paper textures, halftones, grain, lighting effects, and custom text brushes.",
    details: ["High-Res Compositing", "Distressed Textures", "Color Grading & LUTs", "Typography Masking"]
  },
  {
    num: "04",
    title: "REFINE",
    subtitle: "Color & Contrast Polish",
    icon: "message-square",
    description: "Fine-tuning contrast, sharpening micro-details, testing theme variations, and finalizing color balance.",
    details: ["Shadow & Highlight Polish", "Micro-detail Cleanup", "Print Bleed Calibration", "Client Review"]
  },
  {
    num: "05",
    title: "DELIVER",
    subtitle: "Export & Archive",
    icon: "check-circle",
    description: "Exporting print-ready 300 DPI PDFs, ultra-HD PNG showcase files, and archiving raw PSD source files into Google Drive.",
    details: ["300 DPI CMYK/RGB Print PDF", "Ultra-HD PNG Showcase", "PSD Source Files", "Google Drive Sync"]
  }
];
