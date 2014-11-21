ENV['RACK_ENV'] = 'test'

require_relative '../app'

require 'minitest/autorun'
require 'rack/test'


describe 'End to End' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  before do
  end

  it '"/" redirects to index.html' do
    get '/'
    last_response.redirect?.must_equal true
    assert_match /index.html$/, last_response.location
  end

  it '"audio/hi.mp3" sends audio file' do
    get '/audio/hi.mp3'
    puts last_response
    # TODO start here
  end

end
