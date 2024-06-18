import './style.css'
import { replicateHighChartsIssue } from './replicateHighChartsIssue.js'

replicateHighChartsIssue(document.getElementById('container1'), true)
replicateHighChartsIssue(document.getElementById('container2'), false)
