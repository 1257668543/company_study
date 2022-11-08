interface Obj {
  a: string;
  b: number;
  c: boolean;
}

// 映射类型
type ReadonlyObj = Readonly<Obj>

type PartialObj = Partial<Obj>

type PickObj = Pick<Obj, 'a' | 'b'>

type RecordObj = Record<'x' | 'y', Obj>