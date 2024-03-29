class BookingsController < ApplicationController
    def index
        bookings = Booking.all
        render json: bookings
    end

    def show
        booking = Booking.find(params[:id])
        render json: booking
    end 

    def create
        booking = Booking.new(booking_params)
        
        if booking.save
            render json: booking
        else
            render json: {message: "meh", errors: booking.errors.full_messages}, status: 406
        end
    end

    def destroy
        # byebug
        booking = Booking.find(params[:id])
        booking.destroy

        render json: {message: "Successfully deleted"}
    end

    # HOTELS
    def search
        res = RestClient.get("https://api.yelp.com/v3/businesses/search?term=hotel&location=NYC", headers={"Authorization": ENV["API_KEY"]})
        render json: JSON.parse(res)
    end


    private

    def booking_params
        params.require(:booking).permit(:user_id, :name, :hotelName, :address, :check_in, :check_out, :comment, :image)
    end
end
