export const getCurrentDate = () => {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const dateOptions = {
    date: date,
    dayOfWeek: dayOfWeek,
  };

  return dateOptions;
};
