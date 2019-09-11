class BookingsController < ApplicationController
    def index
        bookings = Booking.all
        render json: bookings
    end

    def create
        booking = Booking.new(booking_params)
        
        if booking.save
            render json: booking
        else
            render json: {message: "meh", errors: game.errors.full_messages}, status: 406
        end
    end

    def destroy
        booking = Booking.find(params[:id])
        booking_params.destroy

        render json: {message: "Successfully deleted"}
    end

    # HOTELS
    def search
        res = RestClient.get("https://api.yelp.com/v3/businesses/search?term=hotel&location=NYC", headers={"Authorization": ENV["API_KEY"]})
        render json: JSON.parse(res)
    end

    
    private

    def booking_params
        params.require(:booking).permit(:name, :hotelName, :address, :check_in, :check_out, :comment, :image)
    end
end
