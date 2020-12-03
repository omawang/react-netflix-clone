import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Card, Player } from '../../../views/components';

const category = 'films';
const slideRows = [
  {
    title: 'Documentaries',
    data: [
      {
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
        docId: 'IsdnmsdfnlkJJUds',
        title: 'Tiger King',
        description: 'Tiger King descriptions',
        genre: 'documentaries',
        maturity: '18',
        slug: 'tiger-king',
      },
    ],
  },
  {
    title: 'Comedies',
    data: [
      {
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxsss',
        docId: 'IsdnmsdfnlkJJUaa',
        title: 'The Office',
        description: 'The Office descriptions',
        genre: 'comedies',
        maturity: '11',
        slug: 'the-office',
      },
    ],
  },
];

describe('<Card />', () => {
  it('renders the <Card /> with populated data', () => {
    const { container, getByText } = render(
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
    );

    expect(getByText('Documentaries')).toBeTruthy();
    expect(getByText('Tiger King')).toBeTruthy();
    expect(getByText('Tiger King descriptions')).toBeTruthy();

    expect(getByText('Comedies')).toBeTruthy();
    expect(getByText('The Office')).toBeTruthy();
    expect(getByText('The Office descriptions')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the <Card /> and toggles the card feature', () => {
    const { container, queryByText, getByTestId, getByAltText } = render(
      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item
                  key={item.docId}
                  item={item}
                  data-testid={`${item.slug}-item-feature`}
                >
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
    );

    expect(queryByText('18')).toBeFalsy();
    fireEvent.click(getByTestId('tiger-king-item-feature'));
    expect(queryByText('18')).toBeTruthy();

    fireEvent.click(getByAltText('Close'));
    expect(queryByText('18')).toBeFalsy();

    expect(queryByText('PG')).toBeFalsy();
    fireEvent.click(getByTestId('the-office-item-feature'));
    expect(queryByText('PG')).toBeTruthy();

    fireEvent.click(getByAltText('Close'));
    expect(queryByText('PG')).toBeFalsy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
