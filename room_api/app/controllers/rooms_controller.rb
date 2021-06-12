class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms
  end

  def show
    # display by room_id
    room = Room.find_by(id: params[:id])
    render json: room
  end


  def create
    room = Room.create(room_params)
    if room.valid?
      ActionCable.server.broadcast 'rooms_channel', room
      head :ok
    else
      render json: { error: 'Could not create the room'}, status: 422
    end
  end

  private

  def room_params
    params.require(:room).permit(:name, :room_id)
  end

end
