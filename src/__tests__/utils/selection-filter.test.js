import { selectionFilter } from '../../utils';

test('seklectionFilter with legitimate data', () => {
  const series = [
    {
      id: 'serie_id',
      title: 'Series Title',
      description: 'Series Description',
      genre: 'documentaries',
      maturity: 15,
      slug: 'series-title',
    },
  ];
  const films = [
    {
      id: 'film_id',
      title: 'Film Title',
      description: 'Film Description',
      genre: 'drama',
      maturity: 15,
      slug: 'film-title',
    },
  ];

  const slides = selectionFilter({ series, films });

  expect(slides.series[0].data[0].title).toBe('Series Title');
  expect(slides.series[0].data[0].genre).toBe('documentaries');

  expect(slides.films[0].data[0].title).toBe('Film Title');
  expect(slides.films[0].data[0].genre).toBe('drama');
});
