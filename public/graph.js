const firebaseConfig = {
    apiKey: "AIzaSyAONOxsSyhwnvYuXFaMKbrSYwL-IlEGoBY",
    authDomain: "volvo-ce-1274c.firebaseapp.com",
    projectId: "volvo-ce-1274c",
    storageBucket: "volvo-ce-1274c.appspot.com",
    messagingSenderId: "766534663379",
    databaseURL:"https://volvo-ce-1274c-default-rtdb.firebaseio.com/",
    appId: "1:766534663379:web:791c71dd8759272a5ae826"
  };


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const ctx = document.getElementById('employeeChart').getContext('2d');
let chart;

const createChart = (data) => {
    if (chart) chart.destroy();
    let values = Object.values(data).map(d=>d.count);
    console.log(data);
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Number of Submissions',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

database.ref('employees').on('value', (snapshot) => {
    const data = snapshot.val() || {};
    createChart(data);
});
