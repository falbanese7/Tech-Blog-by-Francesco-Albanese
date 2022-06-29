module.exports = {
  format_date: (date) => {
    // Using JavaScript Date methods, we get and format the month, date, and year
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      // We add five years to the 'year' value to calculate the end date
      new Date(date).getFullYear()
    }`;
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return '<span for="img" aria-label="lightbulb">💡</span>';
    } else if (randomNum > 0.4) {
      return '<span for="img" aria-label="laptop">💻</span>';
    } else {
      return '<span for="img" aria-label="gear">⚙️</span>';
    }
  },
};