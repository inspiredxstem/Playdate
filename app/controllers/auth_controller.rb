class AuthController < ApplicationController
    skip_before_action :authorize, only: [:login]



    private
    


end
