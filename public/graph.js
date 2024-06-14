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

const ctx = document.getElementById('employeeChart').getContext('2d');
let chart;

const createChart = (data) => {
    if (chart) chart.destroy();

    // Process data to count submissions per employee
    const submissionCounts = {};
    for (const [employeeName, submissions] of Object.entries(data)) {
        submissionCounts[employeeName] = Object.keys(submissions).length;
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(submissionCounts),
            datasets: [{
                label: 'Number of Submissions',
                data: Object.values(submissionCounts),
                backgroundColor: 'rgba(255, 126, 95, 0.4)',
                borderColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    font: {
                        weight: '900' // Extra bold
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        font: {
                            weight: '900' // Extra bold
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};

database.ref('employees').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    createChart(data);
});
