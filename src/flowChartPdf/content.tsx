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
  flowchart_1: {
    title: 'Flowchart 1',
    featureImg: <img src='src/flowChartPdf/assets/flowchart.jpg' alt='Flowchart' />,
    downloadList: [
      {
        text: 'Download Flowchart 1',
        url: 'src/flowChartPdf/assets/flowchart.pdf',
      },
    ],
  },
  flowchart_2: {
    title: 'Flowchart 2',
    featureImg: <img src='src/flowChartPdf/assets/flowchart.jpg' alt='Flowchart' />,
    downloadList: [
      {
        text: 'Download Flowchart 2',
        url: 'src/flowChartPdf/assets/flowchart.pdf',
      },
    ],
  },
}
