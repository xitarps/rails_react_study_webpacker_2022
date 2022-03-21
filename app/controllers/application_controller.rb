class ApplicationController < ActionController::API#Base
  include DeviseTokenAuth::Concerns::SetUserByToken
end
