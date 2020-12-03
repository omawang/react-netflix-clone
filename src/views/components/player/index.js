import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';

import * as S from './styles/player';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <S.Container {...restProps}>{children}</S.Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, children, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <S.Overlay
          onClick={() => setShowPlayer(false)}
          data-testid="player"
          {...restProps}
        >
          <S.Inner>
            <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video>
          </S.Inner>
        </S.Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ children, ...restProps }) {
  const { setShowPlayer } = useContext(PlayerContext);

  return (
    <S.Button
      onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
      {...restProps}
    >
      {children}
    </S.Button>
  );
};
