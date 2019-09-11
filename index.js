document.addEventListener("DOMContentLoaded", function(){
    const usersURL = "http://localhost:3000/users"
    const hotelsURL = "http://localhost:3000/hotels"
    const booksURL = "http://localhost:3000/bookings"


    const userForm = document.querySelector("#user")
    const userCont = document.querySelector("#user-container")

    let userId;

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
            userId = userInfo.id
            userCont.innerHTML = `
                <h1>Welcome, ${userInfo.name}</h1>
                <div id="books">
                    <h2> You don't have any hotels booked.</h2>
                    You're going to ${userInfo.search} <br>
                    <button id="my-books">My Hotels</button>
                </div>
            `
        })
        

    })

    
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
                const id = hotelsArray[i].id

                // console.log(name, img, rating, price, phone, address1, address2, id)

                const allHotels = document.querySelector("#all-hotels")

                // append to page
                const str = `
                    <div class="hotels">
                        <div class="hotel" id="hotel">
                            <h4>${name}</h4>
                            <img class="i" src="${img}"/>
                            <div>Phone: ${phone}</div>
                            <div id="a1">${address1}</div>
                            <div id="a2">${address2}</div>
                            <div>Rating: ${rating}</div> 
                            <div>Price: ${price}</div>

                            <button id="button-${id}">BOOK</button>
                        </div>
                    </div>
                `
                allHotels.insertAdjacentHTML("beforeend", str)

                // change display 
                // change user cont to display  nonne


                // event delegation on allHotels
                // or



                // const bookBtnArr = document.querySelectorAll("#book")

                const bookBtn = document.querySelector(`#button-${id}`)
                

                // bookBtnArr.forEach(function(btn){



                bookBtn.addEventListener("click", function(e){
                    // console.log("ALL CLICK") 
                    

                    const address = address1 + " " + address2

                    const hotelData = {
                        hotelName: name,
                        address: address,
                        image: img,
                        user_id: userId
                    }

                    console.log(hotelData)


                    // post to bookings

                    
                    fetch(booksURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accepts": "application/json"
                        },
                        body: JSON.stringify(hotelData)
                    })
                })
            }
        })
    })

    const myBooksBtn = document.querySelector("#my-books")

    myBooksBtn.addEventListener("click", function(e){
        console.log("HI")
    })

    // fetch(booksURL)
    // .then(json => json)
    // .then(console.log)

    
})