import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";

const useNow = () => {
  const [now, setNow] = useState(Temporal.Instant.fromEpochSeconds(0));

  useEffect(() => {
    let requestId: number | undefined;

    const update = () => {
      setNow(Temporal.Now.instant());
      requestId = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (requestId !== undefined) cancelAnimationFrame(requestId);
    };
  }, []);

  return now;
};

export default useNow;
