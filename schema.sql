-- Create Active User Table
CREATE TABLE offense (
  years INT, 
	abbreviation TEXT,
	yards INT,
	margin_of_victory INT,
	offensive_simple_rating_system INT,
	pass_attempts INT,
	pass_completions INT,
	pass_first_downs INT,
	pass_net_yards_per_attempt INT,
	pass_touchdowns INT,
	pass_yards INT,
	percent_drives_with_turnovers INT,
	percent_drives_with_points INT,
	plays INT,
	points_contributed_by_offense INT,
    rank INT,
    rush_attempts INT,
    rush_first_downs INT,
    rush_yards_per_attempt INT,
    turnovers INT,
    win_percentage INT,
    yards_per_play INT,
    first_downs INT
);

CREATE TABLE defense (
  years INT, 
  abbreviation TEXT, 
  defensive_simple_rating_system INT,
  interceptions INT, 
  points_against INT
);

CREATE TABLE misc (
  years INT, 
  abbreviation TEXT, 
  fumbles, games_played INT,
  losses INT, 
  name TEXT, 
  first_downs_from_penalties INT,
  penalties, points_difference INT,
  points_for INT, 
  post_season_result INT,
  simple_rating_system INT, 
  strength_of_schedule INT, 
  win_percentage INT, 
  wins INT, 
  yards_from_penalties INT
);