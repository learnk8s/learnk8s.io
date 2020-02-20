import * as React from 'react'

export interface Wallpaper {
  title: string
  featureImg: JSX.Element
  downloadList: {
    text: string
    url: string
  }[]
}

export const content: Record<string, Wallpaper> = {
  chokolates: {
    title: 'Chokolates Wallpaper',
    featureImg: <img src='src/wallpaper/chokolates-01.png' alt='Chokolates Wallpaper' />,
    downloadList: [
      {
        text: 'Download for Mac Book Pro (1280x900)',
        url: 'src/wallpaper/chokolates-01.png',
      },
      {
        text: 'Download for Mac Book Air (1280x900)',
        url: 'src/wallpaper/chokolates-01.png',
      },
    ],
  },
  magic: {
    title: 'Magician Wallpaper',
    featureImg: <img src='src/wallpaper/magic-02.png' alt='Magician Wallpaper' />,
    downloadList: [
      {
        text: 'Download for Mac Book Pro (1280x900)',
        url: 'src/wallpaper/magic-02.png',
      },
      {
        text: 'Download for Mac Book Air (1280x900)',
        url: 'src/wallpaper/magic-02.png',
      },
    ],
  },
}
