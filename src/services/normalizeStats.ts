export const normalize = (stats: any) => {
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
        acc.new_cases = Math.max(acc.total_cases - current.Confirmed, 0);
        acc.new_death = Math.max(acc.total_deaths - current.Deaths, 0);
      }
      return acc;
    }, {});
  result.mothly_new_deaths = result.total_deaths - stats[0].Deaths;
  result.mothly_new_cases = result.total_cases - stats[0].Confirmed;
  return result;
};
