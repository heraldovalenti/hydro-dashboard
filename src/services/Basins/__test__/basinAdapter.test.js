import { basinAdapter } from '../basinAdapter';

describe('basin adapter verification', () => {
  it('should map path when there is data', () => {
    const input = {
      id: 11,
      description: 'basin11',
      path: `-64.4912916049	-25.1781233693
      -64.4905321953	-25.1781233693
      -64.4905321953	-25.1774366606
      -64.4897727856	-25.1774366606
      -64.4897727856	-25.1767499519
      -64.4897727856	-25.1760632433`,
      color: '#ff8800',
    };
    const output = basinAdapter(input);
    expect(output.id).toBe(11);
    expect(output.description).toBe('basin11');
    expect(output.color).toBe('#ff8800');
    expect(output.path).toHaveLength(6);
    expect(output.path[0]).toStrictEqual({
      lng: '-64.4912916049',
      lat: '-25.1781233693',
    });
    expect(output.path[5]).toStrictEqual({
      lng: '-64.4897727856',
      lat: '-25.1760632433',
    });
  });
});
