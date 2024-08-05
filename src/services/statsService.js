// Mocking stats data. In a real application, this data would be fetched from the database.
var stats = {
  totalUsers: 4,
  totalBets: 1,
  totalEvents: 1,
};

exports.getStats = async () => {
  return stats;
};
