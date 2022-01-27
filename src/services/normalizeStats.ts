/**
 *
 * @param {Array} stats: Monthly stats array
 * @returns {Object} Evaluated results in the following structure:
 *  {
 *     country,
 *     total_deaths,
 *     total_cases,
 *     new_cases_since_yesterday,
 *     new_death_since_yesterday,
 *     new_deaths_since_last_month,
 *     new_cases_since_last_month,
 *  }
 */
export const normalize = (stats: any) => {
  if (!stats.length) return { error: "No record found" };
  const oldestDayStats = stats[0];
  const result = stats
    .reverse()
    .splice(0, 2)
    //  @ts-ignore
    .reduce((acc, current, i) => {
      if (i === 0) {
        acc.country = current.Country;
        acc.total_deaths = current.Deaths;
        acc.total_cases = current.Confirmed;
      }
      if (i === 1) {
        acc.new_cases_since_yesterday = Math.max(
          acc.total_cases - current.Confirmed,
          0
        );
        acc.new_death_since_yesterday = Math.max(
          acc.total_deaths - current.Deaths,
          0
        );
      }
      return acc;
    }, {});
  result.new_deaths_since_last_month =
    result.total_deaths - oldestDayStats.Deaths;
  result.new_cases_since_last_month =
    result.total_cases - oldestDayStats.Confirmed;
  return result;
};
