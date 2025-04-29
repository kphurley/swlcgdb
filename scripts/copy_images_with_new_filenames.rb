#!/usr/bin/env ruby
require 'mini_magick'

# Load Rails so we can use some helpful methods
require_relative '../config/environment.rb'

def set_xml_filenames
  Dir.glob('./db/cardXml/**/*set.xml')
end

set_xml_filenames.each do |filename|
  xml = File.open(filename)
  set_data = Hash.from_xml(xml)["set"]

  card_list = set_data["cards"]["card"]
  card_list.each do |card|
    property_arr = card["property"]
    block = property_arr.find { |prop| prop["name"] == "Block" }["value"].to_i
    block_number = property_arr.find { |prop| prop["name"] == "Block Number" }["value"].to_i

    root_dir = File.expand_path(".")

    # First try to find the image will be jpg
    # If not found, try to find the image with png
    base_path = "#{root_dir}/octgn_cards/SWLCG-images/Sets/#{set_data["id"]}/Cards/#{card["id"]}"
    current_path = "#{base_path}.jpg"
    current_path = "#{base_path}.png" unless File.exist?(current_path)

    updated_path = "#{root_dir}/cards/#{block}-#{block_number}.jpg"

    begin
      raise "File not found: #{current_path}" unless File.exist?(current_path)

      puts "Copying file:"
      puts "#{current_path} --> #{updated_path}"
      puts "\n"

       # Convert the image at current_path to jpg if it is a png
      if File.extname(current_path) == ".png"
        image = MiniMagick::Image.open(current_path)
        image.format "jpg"
        image.write(updated_path)
      else
        FileUtils.cp(current_path, updated_path)
      end

      puts "Copy succeeded!"
    rescue => e
      puts "Error copying file: #{current_path}"
      puts "Message: #{e.message}"

      next
    end
  end
end
