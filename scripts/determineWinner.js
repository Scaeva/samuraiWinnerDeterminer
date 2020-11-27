'use strict';
const determineWinner = (playersStats) => {
    const results = {};
    const filteredPlayersStats = [];
    for (const player of ['red', 'green', 'blue', 'yellow']) {
        const playerStats = playersStats[player];
        if(!playerStats){
            continue;
        }
        const filteredPlayerStats = (({buddhas, helmets, rice}) => ({
            buddhas: buddhas || 0,
            helmets: helmets || 0,
            rice: rice || 0,
            total: 0,
            player
        }))(playerStats);
        filteredPlayersStats.push(filteredPlayerStats);

        for (const type of ['buddhas', 'helmets', 'rice']){
            const count = filteredPlayerStats[type];

            if(!(count > 0)){
                continue;
            }

            filteredPlayerStats.total += count;

            const typeWinners = results[type];
            if(!typeWinners || typeWinners.max < count){
                results[type] = {
                    max: count,
                    players: [filteredPlayerStats]
                };
            } else if (typeWinners.max === count){
                typeWinners.players.push(filteredPlayerStats);
            }
        }
    }
    if(Object.keys(results).length === 0){
        console.info('No results');
        return false;
    }
    const winPlayers = {};
    for(const type in results){
        const stats = results[type];
        if(stats.players.length === 1){//Note that if 2 or more players were to tie with the most of a particular figurine, none of those players would receive the majority for that figurine.
            const player = stats.players[0];
            let winPlayer = winPlayers[player.player];
            if(!winPlayer){
                winPlayer = {
                    wins: [],
                    max: stats.max,
                    ...player
                };
                winPlayers[player.player] = winPlayer;
            }
            if(winPlayer.wins.push(type) >= 2){//The player with the most of at least any two particular figurines is considered the winner.
                console.info('2 wins for player', winPlayer);
                return [winPlayer];
            }
        }
    }
    //console.log('winPlayers', winPlayers);
    const winPlayersArr = Object.values(winPlayers);
    if(winPlayersArr.length === 1){
        console.info('Only 1 player with majority');
        return winPlayersArr;
    } else if(winPlayersArr.length === 0){
        console.info('All tied');
    /*
        If none of the players from above had a majority of any particular figurine
        (again, ties do NOT constitute a majority)
        the winner is decided by total number of figurines.
    */
        let maxTotal = 0;
        let maxTotalPlayers = [];
        for(const player of filteredPlayersStats){
            if(player.total > maxTotal){
                maxTotal = player.total;
                maxTotalPlayers = [player];
            } else if(player.total === maxTotal){
                maxTotalPlayers.push(player);
            }
        }
        return maxTotalPlayers;
    }

    /*
        Of the remaining players, the winner is the player with the highest number of figurines
        excluding the type in which the player has a majority, or their 'other' figurines.
    */
    let maxTotalWithoutMax = 0;
    let totalWithoutMaxPlayers = [];
    for(const player of winPlayersArr){
        const totalWithoutMax = player.total - player.max;
        if(totalWithoutMax > maxTotalWithoutMax){
            maxTotalWithoutMax = totalWithoutMax;
            totalWithoutMaxPlayers = [player];
        } else if(totalWithoutMax === maxTotalWithoutMax){
            totalWithoutMaxPlayers.push(player);
        }
    }

    if(totalWithoutMaxPlayers.length === 1){
        console.info('Only 1 player with max total without max');
        return totalWithoutMaxPlayers;
    }
    /*
        If there is a tie between the other figurines, then the winner is the player with
        the most total figurines.

        If there is still a tie after that, then those players
        who are tied with the highest total figurines share the victory.
    */
    let maxTotal = 0;
    let maxTotalPlayers = [];
    for(const player of winPlayersArr){
        if(player.total > maxTotal){
            maxTotal = player.total;
            maxTotalPlayers = [player];
        } else if(player.total === maxTotal){
            maxTotalPlayers.push(player);
        }
    }

    return maxTotalPlayers;
}