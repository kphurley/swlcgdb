# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Reset the tables, including the auto-increment value
# Using CASCADE automatically blows away tables related to card_sets
ActiveRecord::Base.connection.execute("TRUNCATE card_sets RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE card_blocks RESTART IDENTITY CASCADE")
ActiveRecord::Base.connection.execute("TRUNCATE cards RESTART IDENTITY CASCADE")

files, dirs = Pathname.glob(File.join("./db/cardXml/", '**/*')).partition(&:file?)
files_to_process = files.select { |f| f.to_s.include?("set.xml") }

files_to_process.each do |file|
  xml = File.open(file.to_s)
  set_data = Hash.from_xml(xml)["set"]

  card_set = CardSet.create({ name: set_data["name"]})

  card_list = set_data["cards"]["card"]
  raw_card_attrs = card_list.map do |card_hsh|
    card_attrs = card_hsh.slice("name")
    card_attrs.tap do |hsh|
      hsh_arr = card_hsh["property"]
      hsh_arr.each do |prop_hsh|
        next if ["Instructions", "AutoScript", "AutoAction"].include?(prop_hsh["name"])
        
        # This avoids using type as a field, which is reserved for STI
        if prop_hsh["name"] == "Type"
          hsh["card_type"] = prop_hsh["value"]
          next
        end

        hsh[prop_hsh["name"].delete(' ').underscore] = prop_hsh["value"]
      end
    end

    card_attrs
  end

  # Pull the objectives first, create blocks from these, associate to set
  # Leave out custom cards with no block for now
  objective_cards = raw_card_attrs
                      .select { |c| c["card_type"] == "Objective" && c["block"].to_i != 0 }
                      .map { |c| c.slice("affiliation", "block", "name", "side").merge({ "card_set" => card_set }) }

  card_blocks = CardBlock.create(objective_cards)

  card_blocks.each do |cb|
    cards_for_block = raw_card_attrs.select { |oc| oc["block"].to_i == cb.block }
    cards_to_create = cards_for_block.map { |cfb| cfb.except("card_set").merge({ "card_block" => cb }) }
    Card.create(cards_to_create) 
  end

  # This labels the custom sets clearly
  ffg_sets = CardBlock.all.map(&:card_set).uniq
  custom_sets = CardSet.all - ffg_sets
  custom_sets.each do |set|
    set.is_custom = true
    set.save!
  end
end

# These are the IDs cardgamedb uses to store images
# We're going to use these to store the release_order value
# This is needed for a variety of views
card_game_db_names_to_release_order = [
  {:name=>"Core", :cgdb_number=>1},
  {:name=>"The Desolation of Hoth", :cgdb_number=>2},
  {:name=>"The Search For Skywalker", :cgdb_number=>3},
  {:name=>"A Dark Time", :cgdb_number=>4},
  {:name=>"Assault on Echo Base", :cgdb_number=>5},
  {:name=>"The Battle of Hoth", :cgdb_number=>6},
  {:name=>"Escape from Hoth", :cgdb_number=>7},
  {:name=>"Edge of Darkness", :cgdb_number=>8},
  {:name=>"Balance of the Force", :cgdb_number=>9},
  {:name=>"Heroes and Legends", :cgdb_number=>10},
  {:name=>"Lure of the Dark Side", :cgdb_number=>11},
  {:name=>"Knowledge and Defense", :cgdb_number=>12},
  {:name=>"Join Us or Die", :cgdb_number=>13},
  {:name=>"It Binds All Things", :cgdb_number=>14},
  {:name=>"Darkness and Light", :cgdb_number=>15},
  {:name=>"Ready for Takeoff", :cgdb_number=>16},
  {:name=>"Draw Their Fire", :cgdb_number=>17},
  {:name=>"Evasive Maneuvers", :cgdb_number=>18},
  {:name=>"Attack Run", :cgdb_number=>19},
  {:name=>"Chain of Command", :cgdb_number=>20},
  {:name=>"Jump to Lightspeed", :cgdb_number=>21},
  {:name=>"Between the Shadows", :cgdb_number=>22},
  {:name=>"Imperial Entanglements", :cgdb_number=>23},
  {:name=>"Solo's Command", :cgdb_number=>24},
  {:name=>"New Alliances", :cgdb_number=>25},
  {:name=>"The Forest Moon", :cgdb_number=>26},
  {:name=>"So Be It", :cgdb_number=>27},
  {:name=>"Press the Attack", :cgdb_number=>28},
  {:name=>"Redemption and Return", :cgdb_number=>29},
  {:name=>"Galactic Ambitions", :cgdb_number=>30},
  {:name=>"Ancient Rivals", :cgdb_number=>31},
  {:name=>"A Wretched Hive", :cgdb_number=>32},
  {:name=>"Meditation and Mastery", :cgdb_number=>33},
  {:name=>"Scrap Metal", :cgdb_number=>34},
  {:name=>"Power of the Force", :cgdb_number=>35},
  {:name=>"Technological Terror", :cgdb_number=>36},
  {:name=>"Allies of Necessity", :cgdb_number=>37},
  {:name=>"Aggressive Negotiations", :cgdb_number=>38},
  {:name=>"Desperate Circumstances", :cgdb_number=>39},
  {:name=>"Swayed by the Dark Side", :cgdb_number=>40},
  {:name=>"Trust in the Force", :cgdb_number=>41},
  {:name=>"Promise of Power", :cgdb_number=>42}
]

# This is done one-by-one to root out issues
card_game_db_names_to_release_order.each do |hsh|
  found_set = CardSet.find_by(name: hsh[:name])
  if found_set.nil?
    puts "WARNING - SET NAME #{hsh[:name]} WAS NOT FOUND AND THE RELEASE ORDER NOT SEEDED"
  else
    found_set.release_order = hsh[:cgdb_number]
    found_set.save!
  end
end
