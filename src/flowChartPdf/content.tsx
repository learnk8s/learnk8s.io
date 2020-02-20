import * as React from 'react'

export interface FlowchartPdf {
  title: string
  featureImg: JSX.Element
  downloadList: {
    text: string
    url: string
  }[]
}

export const content: Record<string, FlowchartPdf> = {
  chokolates: {
    title: 'Flowchart 1',
    featureImg: <img src='src/flowchartPdf/assets/flowchart.jpg' alt='Flowchart' />,
    downloadList: [
      {
        text: 'Download Flowchart 1',
        url: 'src/flowchartPdf/assets/flowchart.pdf',
      },
    ],
  },
  magic: {
    title: 'Flowchart 2',
    featureImg: <img src='src/flowchartPdf/assets/flowchart.jpg' alt='Flowchart' />,
    downloadList: [
      {
        text: 'Download Flowchart 2',
        url: 'src/flowchartPdf/assets/flowchart.pdf',
      },
    ],
  },
}
