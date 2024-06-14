// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAONOxsSyhwnvYuXFaMKbrSYwL-IlEGoBY",
    authDomain: "volvo-ce-1274c.firebaseapp.com",
    projectId: "volvo-ce-1274c",
    storageBucket: "volvo-ce-1274c.appspot.com",
    messagingSenderId: "766534663379",
    databaseURL: "https://volvo-ce-1274c-default-rtdb.firebaseio.com/",
    appId: "1:766534663379:web:791c71dd8759272a5ae826"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const ctxBar = document.getElementById('employeeChart').getContext('2d');
const ctxPie = document.getElementById('employeePieChart').getContext('2d');
let barChart;
let pieChart;

const createBarChart = (data) => {
    if (barChart) barChart.destroy();

    // Process data to count submissions per employee
    const submissionCounts = {};
    for (const [employeeName, submissions] of Object.entries(data)) {
        submissionCounts[employeeName] = Object.keys(submissions).length;
    }

    const color = 'rgba(100, 149, 237, 0.7)'; // Cornflower blue

    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: Object.keys(submissionCounts),
            datasets: [{
                label: 'Number of Submissions',
                data: Object.values(submissionCounts),
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(100, 149, 237, 0.9)',
                hoverBorderColor: 'rgba(100, 149, 237, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Employee Involvement Graph',
                    font: {
                        size: 24,
                        weight: 'bold',
                        family: "'Arial', sans-serif"
                    },
                    color: '#333'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    }
                },
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    color: '#333',
                    font: {
                        weight: '900',
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    title: {
                        display: true,
                        text: 'Number of Submissions',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: "'Arial', sans-serif"
                        },
                        color: '#333'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            weight: '900',
                            size: 14
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};

const createPieChart = (data) => {
    if (pieChart) pieChart.destroy();

    const totalEmployees = 38;
    const filledForms = Object.keys(data).length;
    const notFilledForms = totalEmployees - filledForms;

    pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Filled Forms', 'Not Filled Forms'],
            datasets: [{
                data: [filledForms, notFilledForms],
                backgroundColor: ['#6baed6', '#c6dbef'], // Subtle blue colors
                borderColor: ['#6baed6', '#c6dbef'],
                borderWidth: 1,
                hoverBackgroundColor: ['#4292c6', '#9ecae1'],
                hoverBorderColor: ['#6baed6', '#c6dbef']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Form Submission Status',
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: "'Arial', sans-serif"
                    },
                    color: '#333'
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value) => {
                        return value;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};

database.ref('employees').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    createBarChart(data);
    createPieChart(data);
});
