// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHeRK7IzULgGUJiiTylRjlYQLuOdWiSXk",
    authDomain: "humber-dhruv28.firebaseapp.com",
    projectId: "humber-dhruv28",
    storageBucket: "humber-dhruv28.firebasestorage.app",
    messagingSenderId: "131352238477",
    appId: "1:131352238477:web:790697bda864f8f07905c4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages");

onValue(
    messages,
    (snapshot) =>{
        // console.log(snapshot);
        const ul = document.getElementById("messages");
        ul.replaceChildren();
        snapshot.forEach((childsnapshot) => {
            const childkey = childsnapshot.key;
            const childdata = childsnapshot.val();

            console.log(childkey);
            console.log(childdata);

            const text = document.createTextNode(
                childdata.message + "~" + childdata.name
            );
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);
        });
    },{
        onlyOnce: false,
    }
);

const add = document.getElementById("add");

add.addEventListener("click", function(e){
    const name = document.getElementById("name");
    const message = document.getElementById("message");

    const newMessageRef = push(messages);

    set(newMessageRef, {
        name : name.value,
        message: message.value,
        createdAt: serverTimestamp(),
    });
    e.preventDefault();

});