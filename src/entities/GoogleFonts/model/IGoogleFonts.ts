export interface IGoogleFonts {
  kind: string
  items: WebfontItem[]
}

interface WebfontItem {
  family: string
  variants: string[]
  subsets: string[]
  version: string
  lastModified: string
  files: FontFiles
  category: string
  kind: string
  menu: string
}

interface FontFiles {
  [variant: string]: string
}
