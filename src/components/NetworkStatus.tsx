import { useEffect, useState } from "react";

const PING_EP = "https://httpbin.org/get";

//  @ts-ignore
const ping = ({ url, timeout }) => {
  return new Promise((resolve) => {
    const isOnline = () => resolve(true);
    const isOffline = () => resolve(false);

    const xhr = new XMLHttpRequest();

    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status) {
          isOnline();
        } else {
          isOffline();
        }
      }
    };

    xhr.open("GET", url);
    xhr.timeout = timeout;
    xhr.send();
  });
};

function NetworkStatus(props: any) {
  const [status, setStatus] = useState<boolean | undefined>();

  useEffect(() => {
    const pollingId = setInterval(() => {
      const { url, timeout } = {
        url: PING_EP,
        timeout: 5000,
      };
      ping({ url, timeout }).then((online) => {
        online ? setStatus(true) : setStatus(false);
      });
    }, 2500);
    return function () {
      clearInterval(pollingId);
    };
  }, []);

  return props.render(status);
}

export default NetworkStatus;
