document.addEventListener("DOMContentLoaded", function(){

    const userForm = document.querySelector("#user")
    const userName = userForm.value

    userForm.addEventListener("submit", function (e){
        e.preventDefault()

        console.log("SUBMIT!")

        // const userName = e.target.name.value
        // const formData = {
        //     name: name
        // }

        // fetch("http://localhost:3000/users", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accepts": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "name": `${userName}`
        //     })
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
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

