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


document.getElementById('employeeForm').addEventListener('submit', function(event) {
    var inputElement = document.getElementById('employeeName');
    inputElement.value = inputElement.value.toUpperCase();
});

console.log(employeeName) ;


document.getElementById('fileInput').addEventListener('change', function(event) {
    var fileInput = event.target;
    var file = fileInput.files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }

    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            var progressBar = document.getElementById('progressBar');
            progressBar.style.width = percentComplete + '%';
            progressBar.textContent = Math.round(percentComplete) + '%';
        }
    });

    xhr.addEventListener('load', function(event) {
        var messageDiv = document.getElementById('message');
        if (xhr.status == 100) {
            messageDiv.textContent = 'Image uploaded successfully!';
            messageDiv.style.color = 'green';
        } 
    });

    xhr.addEventListener('error', function(event) {
        var messageDiv = document.getElementById('message');
        messageDiv.textContent = 'An error occurred while uploading the image.';
        messageDiv.style.color = 'red';
    });

    xhr.send(formData);
});

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    

    const employeeName = document.getElementById('employeeName').value;
    const employeeId = document.getElementById('employeeId').value;
    const kaizen = document.getElementById('kaizen').value;
    const InvolvementDesc = document.getElementById('InvolvementDesc').value;  
   
   
       

    const form = document.getElementById('employeeForm');
            const formData = new FormData(form);
            const selectedValue01 = formData.get('assembly');
            const selectedValue02 = formData.get('areas');
            console.log (selectedValue01) ;
            console.log (selectedValue02) ;


            const file = document.getElementById('fileInput').files[0];
        if (file) {
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef.child('images/' + file.name).put(file);
        }

        
            


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
            selectedValue01,
            selectedValue02,
            

        };
        employeeRef.set(data);
        alert("ಸಲ್ಲಿಕೆ ದಾಖಲಿಸಲಾಗಿದೆ | Submission Recorded ");
    });


    document.getElementById('employeeForm').reset();
});
