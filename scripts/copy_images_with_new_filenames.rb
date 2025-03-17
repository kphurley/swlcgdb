#!/usr/bin/env ruby

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

    ROOT_DIR = File.expand_path(".")
    current_path = "#{ROOT_DIR}/octgn_cards/SWLCG-images/Sets/#{set_data["id"]}/Cards/#{card["id"]}.jpg"
    updated_path = "#{ROOT_DIR}/cards/#{block}-#{block_number}.jpg"

    begin
      puts "Copying file:"
      puts "#{current_path} --> #{updated_path}"
      puts "\n"

      FileUtils.cp(current_path, updated_path)

      puts "Copy succeeded!"
    rescue => e
      puts "Error copying file: #{current_path}"
      puts "Message: #{e.message}"

      next
    end
  end
end
