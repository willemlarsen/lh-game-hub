require 'sinatra'

require "sinatra/reloader" if development?

#require_relative 'app/sale/sale'

#load 'app/sale/route.rb'


if development?
  set :public_folder, '../client/build'

  get '/' do
    send_file File.expand_path('index.html', settings.public_folder)
  end

end

