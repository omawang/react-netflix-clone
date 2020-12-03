import React, { useContext, useEffect, useState } from 'react';
import Fuse from 'fuse.js';

import { FirebaseContext } from '../../contexts/firebase';

import { SelectProfileContainer } from './profile';
import { FooterContainer } from './footer';

import { Card, Header, Loading, Player } from '../components';

import * as ROUTES from '../../constants/routes';
import logo from '../../logo.svg';

export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState('films');
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [slideRows, setSlideRows] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  const handleSelectProfile = (selectedProfile) => {
    setLoading(true);
    setProfile(selectedProfile);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ['data.description', 'data.title', 'data.genre'],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);

  return profile.displayName ? (
    loading ? (
      <Loading src={user.photoURL} />
    ) : (
      <>
        <Loading.ReleaseBody />

        <Header src="joker1" dontShowOnSmallViewPort>
          <Header.Frame>
            <Header.Group>
              <Header.Logo to={ROUTES.HOME} src={logo} />
              <Header.TextLink
                active={category === 'films'}
                onClick={() => setCategory('films')}
              >
                Films
              </Header.TextLink>
              <Header.TextLink
                active={category === 'series'}
                onClick={() => setCategory('series')}
                data-testid="link-category-series"
              >
                Series
              </Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Header.Profile>
                <Header.Picture src={user.photoURL} />
                <Header.Dropdown>
                  <Header.Group>
                    <Header.Picture src={user.photoURL} />
                    <Header.TextLink>{user.displayName}</Header.TextLink>
                  </Header.Group>
                  <Header.Group>
                    <Header.TextLink onClick={() => firebase.auth().signOut()}>
                      Sign Out
                    </Header.TextLink>
                  </Header.Group>
                </Header.Dropdown>
              </Header.Profile>
            </Header.Group>
          </Header.Frame>

          <Header.Feature>
            <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
            <Header.Text>
              Forever alone in a crowd, failed comedian Arthur Fleck seeks
              connection as he walks the streets of Gotham City. Arthur wears
              two masks -- the one he paints for his day job as a clown, and the
              guise he projects in a futile attempt to feel like he&apos;s part
              of the world around him.
            </Header.Text>
            <Header.PlayButton>Play</Header.PlayButton>
          </Header.Feature>
        </Header>

        <Card.Group>
          {slideRows.map((slideItem) => (
            <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
              <Card.Title>{slideItem.title}</Card.Title>
              <Card.Entities>
                {slideItem.data.map((item) => (
                  <Card.Item key={item.docId} item={item}>
                    <Card.Image
                      src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                    />
                    <Card.Meta>
                      <Card.SubTitle>{item.title}</Card.SubTitle>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Meta>
                  </Card.Item>
                ))}
              </Card.Entities>
              <Card.Feature category={category}>
                <Player>
                  <Player.Button>Play</Player.Button>
                  <Player.Video src="/videos/bunny.mp4" />
                </Player>
              </Card.Feature>
            </Card>
          ))}
        </Card.Group>
        <FooterContainer />
      </>
    )
  ) : (
    <SelectProfileContainer
      user={user}
      handleSelectProfile={handleSelectProfile}
    />
  );
}
