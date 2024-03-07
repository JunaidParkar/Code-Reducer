declare namespace kit {
  interface Instance {
    from(element: HTMLElement): this
    id(id: string): this;
    class(className: string): this;
    tag(tagName: string): this;
    query(selector: string): this;
    create(tag: string): this;
    get(): HTMLElement | null;
    revert(): this;
  }
}

declare const Dkit: {
  init(): kit.Instance;
};

export default Dkit;
