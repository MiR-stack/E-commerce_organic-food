import { useEffect, useState } from "react";
import { intervalToDuration, formatDuration } from "date-fns";

function useTimer(expireDate) {
  const [timer, setTimer] = useState();

  let duration = intervalToDuration({
    start: new Date(expireDate),
    end: new Date(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const formatDur = formatDuration(duration, {
        delimiter: ", ",
      });

      if (formatDur === "") clearInterval(interval);
      setTimer(formatDur);
    }, 1000);

    return () => clearInterval(interval);
  });

  return timer;
}

export default useTimer;
