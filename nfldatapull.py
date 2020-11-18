import pandas as pd
import sportsreference as sportsreference
from pprint import pprint
import pymongo

from sportsreference.nfl.teams import Teams
def pull_data():

    df=pd.DataFrame()   
    teams = []
    years = []
    for i in range(2002, 2020):
        teams = Teams(i)
        for team in teams:
            df = df.append(team.dataframe)
            years.append(i)
        
    df["years"]=years
    df

    #offense only df
    Offense_df = df[['years', 'abbreviation', 'yards', 'margin_of_victory', 'offensive_simple_rating_system', 'pass_attempts', 'pass_completions', 'pass_first_downs', 'pass_net_yards_per_attempt', 'pass_touchdowns', 'pass_yards', 'percent_drives_with_turnovers', 'percent_drives_with_points', 'plays', 'points_contributed_by_offense', 'rank', 'rush_attempts', 'rush_yards','rush_first_downs', 'rush_yards_per_attempt', 'turnovers', 'win_percentage', 'yards_per_play', 'first_downs']]
    Offense_df

    #defense only df
    Defense_df = df[['years', 'abbreviation', 'defensive_simple_rating_system', 'interceptions', 'points_against']]
    Defense_df

    #misc df
    Misc_df = df[['years', 'abbreviation', 'fumbles', 'games_played', 'losses', 'name', 'first_downs_from_penalties', 'penalties', 'points_difference', 'points_for', 'post_season_result', 'simple_rating_system', 'strength_of_schedule', 'win_percentage', 'wins', 'yards_from_penalties']]
    Misc_df

    offense = Offense_df.to_dict('records')
    defense = Defense_df.to_dict('records')
    misc = Misc_df.to_dict('record')

    return offense, defense, misc
if __name__ == "__main__":
    x, y, z = pull_data()
    # print(x)

    conn = "mongodb://localhost:27017"
    client = pymongo.MongoClient(conn)
    db = client.sportsball
    off = db.offense
    off.insert_many(x)
    defense = db.defense
    defense.insert_many(y)
    misc = db.misc
    misc.insert_many(z)