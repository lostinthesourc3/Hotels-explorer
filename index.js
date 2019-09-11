document.addEventListener("DOMContentLoaded", function(){
    const usersURL = "http://localhost:3000/users"
    const hotelsURL = "http://localhost:3000/hotels"

    /*
        SAVE A USER AND SEARCH LOCATION
    */

    const userForm = document.querySelector("#user")
    // const userName = userForm.value
    const userCont = document.querySelector("#user-container")
        // console.log(userCont, "THE QUOTE")

    userForm.addEventListener("submit", function (e){
        e.preventDefault()

        // console.log("SUBMIT!")

        const userName = e.target.name.value
        const userLoc = e.target.location.value

        // debugger

        const formData = {
            name: userName,
            search: userLoc
        }

        console.log(formData)

        fetch(usersURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(userInfo => {
            console.log(userInfo)
            userCont.innerHTML = `
                <h1>${userInfo.name}</h1>
                <div id="books">
                    <h2> You don't have any hotels booked.</h2>
                    You're going to ${userInfo.search}
                </div>
            `
        })
    })

    
    /*
        GET ALL HOTELS
    */

    // const booksDiv = document.getElementById("books")
    const bookButton = document.createElement("BUTTON")
    bookButton.innerHTML = "Book a hotel"

    document.body.appendChild(bookButton)
    
    
    // document.getElementById("book-hotel")
    
    bookButton.addEventListener("click", function(){
        console.log("CLICK")

        fetch(hotelsURL)
        .then(res => res.json())
        .then(data => {
            hotel = data
            console.log(hotel)
            const hotelsArray = hotel.businesses.slice(0, 10)
            console.log(hotelsArray)

            for(let i = 0; i < hotelsArray.length; i++){
                const name = hotelsArray[i].name
                const img = hotelsArray[i].image_url
                const rating = hotelsArray[i].rating
                const price = hotelsArray[i].price
                const phone = hotelsArray[i].phone
                const address1 = hotelsArray[i].location.display_address[0]
                const address2 = hotelsArray[i].location.display_address[1]

                console.log(name, img, rating, price, phone, address1, address2)

                const allHotels = document.querySelector("#all-hotels")

                // append to page
                const str = `
                    <div class="hotels">
                        <div class="hotel">
                            <h4>${name}</h4>
                            <img class="i" src="${img}"/>
                            <div>Phone: ${phone}</div>
                            <div>${address1}</div>
                            <div>${address2}</div>
                            <div>Rating: ${rating}</div> 
                            <div>Price: ${price}</div>

                            <button id="book">BOOK</button>
                        </div>
                    </div>
                `
                allHotels.insertAdjacentHTML("beforeend", str)
            }
        })
    })


    const bookBtnArr = document.querySelectorAll("#book")

    bookBtnArr.forEach(function(btn){
        btn.addEventListener("click", function(){
            console.log("CLICK") //MAYBE???
        })
    })

})