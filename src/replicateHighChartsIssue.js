import showChart from './showChart.js'

const trimTrailingZeros = (stringValue) => stringValue.replace(/\.?0+$/, '')

export const separateDigitGroups = (stringValue, decimalSeparator = '.') => {
    const isNegative = stringValue[0] === '-'
    const [integer, remainder] = stringValue.replace(/^-/, '').split('.')

    const groups = []
    for (let i = integer.length; i > 0; i -= 3) {
        groups.unshift(integer.substring(i - 3, i))
    }

    if (isNegative) {
        groups[0] = '-' + groups[0]
    }

    if (remainder) {
        const trimmedRemainder = trimTrailingZeros(remainder)
        if (trimmedRemainder.length) {
            groups[groups.length - 1] += decimalSeparator + remainder
        }
    }

    return groups
}

const formatDataLabel = (name = '', y, percentage) => {
    const value = separateDigitGroups(y.toString()).join(' ')
    return (
        '<span style="font-weight:normal">' +
        name +
        '</span><br/>' +
        value +
        '<span style="font-weight:normal"> (' +
        parseFloat(percentage.toFixed(1)) +
        '%)</span>'
    )
}

export function replicateHighChartsIssue(containerElement, withFormatter) {
    const dataLabelsConfig = withFormatter
        ? {
              enabled: true,
              padding: 0,
              formatter: function () {
                  return formatDataLabel(
                      this.point.name,
                      this.y,
                      this.percentage
                  )
              },
          }
        : { enabled: true, padding: 0 }
    const chart = showChart({
        chart: {
            type: 'pie',
            renderTo: containerElement,
            spacingTop: 20,
            style: {
                fontFamily: 'Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
            },
            events: {},
        },
        title: {
            margin: 30,
            align: 'center',
            style: {
                color: '#212934',
                fontSize: '18px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            text: '2024 - Fully Immunized child',
        },
        subtitle: {
            align: 'center',
            style: {
                color: '#4a5768',
                fontSize: '13px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        },
        yAxis: [
            {
                min: 0,
                title: {
                    text: null,
                },
                gridLineColor: '#F1F1F1',
                labels: {
                    style: {
                        color: '#404b5a',
                        fontSize: '11px',
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                    },
                },
                id: 'AXIS_0',
                reversedStacks: true,
                opposite: false,
            },
        ],
        series: [
            {
                colorByPoint: true,
                allowPointSelect: true,
                cursor: 'pointer',
                data: [
                    {
                        id: 'tDZVQ1WtwpA',
                        name: 'Hospital',
                        y: 3442,
                    },
                    {
                        id: 'RXL3lPSK8oG',
                        name: 'Clinic',
                        y: 9378,
                    },
                    {
                        id: 'CXw2yu5fodb',
                        name: 'CHC',
                        y: 45716,
                    },
                ],
                colors: ['#a9be3b', '#558cc0', '#d34957'],
                dataLabels: dataLabelsConfig,
                tooltip: {
                    headerFormat: '',
                    pointFormat:
                        '<span style="color:{point.color}">●</span> {point.name}: <b>{point.y}</b><br/>',
                },
                animation: {
                    duration: 0,
                },
            },
        ],
        legend: {
            align: 'center',
            itemStyle: {
                fontSize: '13px',
                fontWeight: 'normal',
                color: '#212934',
                fontStyle: 'normal',
            },
        },
        lang: {
            noData: 'No data',
            resetZoom: 'Reset zoom',
        },
        noData: {
            style: {
                fontSize: '13px',
                fontWeight: 'normal',
            },
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
        plotOptions: {},
    })

    const resizeObserver = new ResizeObserver(() => {
        chart.reflow()
    })
    resizeObserver.observe(containerElement)
}
