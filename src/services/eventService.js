const eventRepository = require("../repositories/eventRepository");
const { statEmitter } = require("../eventsEmitter");

exports.createEvent = async (eventData) => {
  const { odds, ...event } = eventData;

  const [oddsResult] = await eventRepository.insertOdds({
    home_win: odds.homeWin,
    away_win: odds.awayWin,
    draw: odds.draw,
  });

  const [eventResult] = await eventRepository.insertEvent({
    ...event,
    away_team: event.awayTeam,
    home_team: event.homeTeam,
    start_at: event.startAt,
    odds_id: oddsResult.id,
  });

  statEmitter.emit("newEvent");

  const formattedEvent = formatEvent(eventResult);
  const formattedOdds = formatOdds(oddsResult);

  return { ...formattedEvent, odds: formattedOdds };
};

const formatEvent = (event) => {
  return {
    eventId: event.event_id,
    awayTeam: event.away_team,
    homeTeam: event.home_team,
    startAt: event.start_at,
    ...event,
  };
};

const formatOdds = (odds) => {
  return {
    homeWin: odds.home_win,
    awayWin: odds.away_win,
    draw: odds.draw,
    ...odds,
  };
};
