import { } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js"

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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value;
    const employeeId = document.getElementById('employeeId').value;
    const kaizen = document.getElementById('kaizen').value;
    const InvolvementDesc = document.getElementById('InvolvementDesc').value;

    const employeeRef = database.ref('employees/' + employeeName);
    employeeRef.get().then((snapshot) => {
        let count = 1;
        if (snapshot.exists()) {
            count = snapshot.val().count + 1;
        }
        let data = {
            employeeId,
            count,
            kaizen,
            InvolvementDesc,
            

        };
        employeeRef.set(data);
        alert("ಸಲ್ಲಿಕೆ ದಾಖಲಿಸಲಾಗಿದೆ | Submission Recorded ");
    });


    document.getElementById('employeeForm').reset();
});
