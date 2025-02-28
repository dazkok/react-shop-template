declare namespace JSX {
    interface IntrinsicElements {
        'inpost-geowidget': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
            token: string;
            language: string;
            config: string;
            onpoint?: (event: CustomEvent) => void;
        },
            HTMLElement
        >;
    }
}