
export type Percent<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N ? Acc[number] :
  Percent<N, [...Acc, Acc['length']]>;
