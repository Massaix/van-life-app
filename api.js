
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCfciOORQlGMi1tcZRhypPvxN7sTrpVXcQ",
  authDomain: "vanlife-ee6db.firebaseapp.com",
  projectId: "vanlife-ee6db",
  storageBucket: "vanlife-ee6db.appspot.com",
  messagingSenderId: "811499839046",
  appId: "1:811499839046:web:d54f2ae1e03176d81a7447"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollection = collection(db, "vans")

export async function getVans() {
const snapshot = getDocs(vansCollection)
const vans = snapshot.docs.map(doc => ({
    ...doc.map,
    id: doc.id
}))
console.log(vans)
}


// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}