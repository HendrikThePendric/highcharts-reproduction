import './style.css'
import { replicateHighChartsIssue } from './replicateHighChartsIssue.js'

const containerElement = document.getElementById('container')
const chart = replicateHighChartsIssue(containerElement)
const resizeObserver = new ResizeObserver(() => {
    chart.reflow()
})
resizeObserver.observe(containerElement)
