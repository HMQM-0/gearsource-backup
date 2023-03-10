export interface ISingleFilterAttribute {
  id: string;
  name: string;
  slug: string;
  selected?: boolean;
}

export interface IFilterAttributes {
  id: string;
  name: string;
  slug: string;
  inputType?: string;
  values: ISingleFilterAttribute[];
}
