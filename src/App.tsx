import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

declare global {
  interface Window {
    Pilot: any; // 👈️ turn off type checking
  }
}

const App = (): JSX.Element => {
  const [hlsConfig, setHlsConfig] = useState<any>();
  const hlsVersion = '1.1.5';

  const [hlsURL, setHlsURL] = useState<string | ''>();
  useEffect(() => {
    const { Pilot } = window;
    Pilot.addConfigListener(() => {
      const hlsObj = { config: {} };
      Pilot.configHls(hlsObj, hlsVersion);
      setHlsConfig(hlsObj.config);

      Pilot.loadConfig('onsport_property');
      setHlsURL('https://eqosqbkcuwliv.vcdn.cloud/hls/test2/index.m3u8');
    });
    Pilot.initPilot('192fb6afa8e2475c9441d0b0fdd6535d');
    // eslint-disable-next-line
  }, []);

  return (
    <ReactPlayer
      config={{
        file: {
          hlsVersion,
          hlsOptions: hlsConfig,
        },
      }}
      controls
      url={hlsURL}
    />
  );
};

export default App;
