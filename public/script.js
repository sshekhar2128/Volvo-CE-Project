import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

// Firebase Configuration
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value.toUpperCase();
    const employeeId = document.getElementById('employeeId').value;
    const kaizen = document.getElementById('kaizen').value;
    const InvolvementDesc = document.getElementById('InvolvementDesc').value;

    const form = document.getElementById('employeeForm');
    const formData = new FormData(form);
    const selectedValue01 = formData.get('assembly');
    const selectedValue02 = formData.get('areas');



    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('uploadProgress');
    
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const storage = firebase.storage(); // initialize your Firebase storage
            const storageRef = storage.ref('images/' + file.name);
            
            const uploadTask = storageRef.put(file);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    progressBar.value = progress;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Upload failed:', error);
                }, 
                () => {
                    // Handle successful uploads on complete
                    console.log('Upload complete!');
                }
            );
        }
    });
    const employeeRef = ref(database, 'employees/' + employeeName);
    get(employeeRef).then((snapshot) => {
        let count = 1;
        if (snapshot.exists()) {
            const employeeData = snapshot.val();
            count = Object.keys(employeeData).length + 1;
        }

        const newData = {
            employeeId,
            kaizen,
            InvolvementDesc,
            selectedValue01,
            selectedValue02
        };

        const newEntryRef = ref(database, `employees/${employeeName}/${count}`);
        set(newEntryRef, newData).then(() => {
            alert("ಸಲ್ಲಿಕೆ ದಾಖಲಿಸಲಾಗಿದೆ | Submission Recorded");
        });
    });

    document.getElementById('employeeForm').reset();
});
