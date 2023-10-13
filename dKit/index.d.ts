declare namespace kit {
    interface Instance {
        id(id: string): this;
        class(className: string): this;
        tag(tagName: string): this;
        query(selector: string): this;
        create(tag: string): this;
        get(): HTMLElement | null;
        revert(): this; // Added cleanup function
    }
}

declare const Dkit: {
    init(): kit.Instance;
};

export = Dkit;
