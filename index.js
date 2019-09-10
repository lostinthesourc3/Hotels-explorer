document.addEventListener("DOMContentLoaded", function(){

    const userForm = document.querySelector("#user")
    const userName = userForm.value
    const userCont = document.querySelector("#user-container")
        // console.log(userCont, "THE QUOTE")

    userForm.addEventListener("submit", function (e){
        e.preventDefault()

        // console.log("SUBMIT!")

        const userName = e.target.name.value
        // debugger
        const formData = {
            name: userName
        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(userInfo => {
            userCont.innerHTML = `<h1>${userInfo.name}</h1>`
            // append data to the page

        })
    })
})


// fetch(likeURL, {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "image_id": `${imageId}`
//     })
//   })
//     // .then(parseJSON)
// });

