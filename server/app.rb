require 'sinatra'

require "sinatra/reloader" if development?



if development? || test?
  set :public_folder, '../client/build'
end

get '/audio/:filename' do
  send_file "#{params[:filename]}"
end

get '/' do
  redirect 'index.html'
end


