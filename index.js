document.addEventListener("DOMContentLoaded", function(){
    const usersURL = "http://localhost:3000/users"
    const hotelsURL = "http://localhost:3000/hotels"
    const booksURL = "http://localhost:3000/bookings"

    // const mainContainer = document.querySelector("#main")
    const titleContainer = document.querySelector("#title")
    const contentContainer = document.querySelector("#content")
    const messageContainer = document.querySelector("#message")

    // let seeHotelsButton

    function renderUserForm(){
        titleContainer.insertAdjacentHTML("beforeend", `
            <h4>Welcome to Hotels Explorer</h4>
        `)
        contentContainer.insertAdjacentHTML("beforeend", `
            <form id="user">
                <label for="name">Enter your name to create profile: </label><br>
                <input type="text" name="name"><br>
                <input type="submit" id="submit" data-action="submit" class="submit button">
            </form>
        `)

        const userForm = document.querySelector("#user")
        let userId;

        userForm.addEventListener("submit", function (e){
            e.preventDefault()

            const userName = e.target.name.value
            // const userLoc = e.target.location.value

            const formData = {
                name: userName,
                // search: userLoc
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
                // search = userInfo.search
                titleContainer.innerHTML = `
                    <h4>Hello, ${userInfo.name}</h4>
                `
            })

            contentContainer.innerHTML = `
                    <div id="books">
                        <h5> You don't have any hotels booked.</h5>
                        <button id="see-hotels">See Hotels</button>
                        <button id="my-hotels">My Hotels</button>
                    </div>
                `
                
            const seeHotelsButton = document.querySelector("#see-hotels")

            seeHotelsButton.addEventListener("click", function(e){
                console.log("CLICK")
            
                fetch(hotelsURL)
                .then(res => res.json())
                .then(data => {
                    hotel = data
                    console.log(hotel)
                    const hotelsArray = hotel.businesses.slice(0, 10)
                    console.log(hotelsArray)
                    titleContainer.innerHTML = `
                        <h4>Hotels in New York</h4>
                    `
                    contentContainer.innerHTML = `
                        <div id="books">
                            
                        </div>
                    `

                    for(let i = 0; i < hotelsArray.length; i++){
                        const name = hotelsArray[i].name
                        const img = hotelsArray[i].image_url
                        const rating = hotelsArray[i].rating
                        const price = hotelsArray[i].price
                        const phone = hotelsArray[i].phone
                        const address1 = hotelsArray[i].location.display_address[0]
                        const address2 = hotelsArray[i].location.display_address[1]
                        const id = hotelsArray[i].id


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

                                    <button id="button-${id}">Add to my favorites</button>
                                </div>
                            </div>
                        `
                        contentContainer.insertAdjacentHTML("beforeend", str)


                        
                        const bookBtn = document.querySelector(`#button-${id}`)

                        bookBtn.addEventListener("click", function(e){
                            // console.log("ALL CLICK") 

                            messageContainer.innerHTML = `
                                <div id="books">
                                    <p>${name} was added</p>
                                </div>
                            `
                            
                            const address = address1 + " " + address2
        
                            const hotelData = {
                                hotelName: name,
                                address: address,
                                image: img,
                                user_id: userId
                            }
        
                            console.log(hotelData)
    
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

            const myBooksBtn = document.querySelector("#my-hotels")
            
            myBooksBtn.addEventListener("click", function(e){
                // console.log("HI")

                fetch(booksURL)
                .then(json => json)
                .then(data => {
                    myHotel = data
                    console.log(myHotel)

                    titleContainer.innerHTML = `
                        <h4>My Saved Hotels</h4>
                    `

                })
            })
        })
    }
    renderUserForm()
    
})